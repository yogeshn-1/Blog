import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RealTimeEditor, Select } from "../index";
import fileServices from "../../appwrite/file_service";
import dbServices from "../../appwrite/db_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);
  const { register, control, getValues, setValue, handleSubmit, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        id: post?.id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    //check if post exists or not
    if (post) {
      //upload image if given
      const file = data.image[0]
        ? await fileServices.uploadFile(data.image[0])
        : null;

      //if image is uploaded delete Old image
      if (file) {
        console.log("Deleting ...", post.image);
        fileServices.deleteFile(post.image);
      }

      //update the post
      const dbPost = await dbServices.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      }
    } else {
      //upload image if given
      const file = data.image[0]
        ? await fileServices.uploadFile(data.image[0])
        : null;
      console.log("Image file", file);
      // Create Post after uploading image
      if (file) {
        const fileId = file.$id;
        data.image = fileId;
        const dbPost = await dbServices.createPost({
          ...data,
          userId: userData.$id,
        });
        // redirect to post after post creation
        if (dbPost) {
          navigate(`/posts/${dbPost.$id}`);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full flex flex-wrap p-5 h-fit bg-stone-200/35"
    >
      <div className="mx-auto max-w-full w-3/5 p-2">
        <Input
          label="Title"
          placeholder="Enter Title"
          {...register("title", { required: true })}
        />
        <RealTimeEditor
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/2 mx-auto max-w-max p-2">
        <Input
          label="Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="p-1 w-full m-1">
            <img
              src={fileServices.getFilePreview(post.image)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          label="Status"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post && "bg-green-400"}
          hoverBg={post && "bg-green-600"}
        >
          {post ? "Update" : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
