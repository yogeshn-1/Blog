import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RealTimeEditor, Select } from "../index";
import fileServices from "../../appwrite/file_service";
import dbServices from "../../appwrite/db_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);
  const [imgUrl, setImgUrl] = useState(null);
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
  async function fetchImage() {
    try {
      const url = await fileServices.getFilePreview(post.image);
      setImgUrl(url);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (post) fetchImage();
  }, [post]);
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full flex flex-wrap p-5 h-fit rounded-md bg-[#e0cd99e1] text-black"
    >
      <div className="mx-auto max-w-full w-3/5 p-2">
        <Input
          label="Title"
          placeholder="Enter Title"
          {...register("title", { required: true })}
          className="rounded-md px-2 py-0.5 mb-1"
        />
        <RealTimeEditor
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/2 mx-auto max-w-max p-2">
        {post && (
          <div className="p-1 w-full m-1">
            <img src={imgUrl} alt={post.title} className="h-[100px]" />
          </div>
        )}
        <Input
          label="Upload Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          className="border-black border py-1 rounded-sm"
        />
        <Select
          label="Status"
          options={["Active", "Inactive"]}
          {...register("status", { required: true })}
          className="w-full px-2 py-0.5"
        />
        <Button
          type="submit"
          className="bg-[#72e0bf] hover:bg-[#58bd95] hover:text-white"
        >
          {post ? "Update" : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
