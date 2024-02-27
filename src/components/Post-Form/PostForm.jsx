import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RealTimeEditor, Select } from "../index";
import fileServices from "../../appwrite/file_service";
import dbServices from "../../appwrite/db_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);
  const [imgUrl, setImgUrl] = useState(null);
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm({
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

      if (dbPost.error) {
        // console.log("Error", dbPost);
        toast.error(dbPost.error);
      }
      // redirect to post after post creation
      else if (dbPost) {
        toast.success("Post Updated successfully !");
        setTimeout(() => navigate(`/posts/${dbPost.$id}`), 1000);
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
        // Check if error occurred
        if (dbPost.error) {
          // console.log("Error", dbPost);
          toast.error(dbPost.error);
        }
        // redirect to post after post creation
        else if (dbPost) {
          toast.success("Post created successfully !");
          setTimeout(() => navigate(`/posts/${dbPost.$id}`), 1000);
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

  function validate() {
    if (errors?.title?.message) {
      toast.error(errors?.title?.message);
      return;
    }
    if (errors?.image?.message) {
      toast.error(errors?.image?.message);
      return;
    }
    if (errors?.status?.message) {
      toast.error(errors?.status?.message);
      return;
    }
    if (errors?.content?.message) {
      toast.error(errors?.content?.message);
      return;
    }
  }
  useEffect(() => {
    validate();
  }, [submitCount]);
  return (
    <section className="w-full">
      <header className="xs:text-base sm:text-lg text-xl font-bold text-center mb-2 bg-[#185a2e] rounded-xl px-4 w-1/2 py-1 mx-auto">
        {post ? "Update Your" : "Create New"} Post
      </header>
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex flex-wrap p-5 h-fit rounded-md  text-black"
        style={{
          background:
            "url(https://plus.unsplash.com/premium_photo-1669904022334-e40da006a0a3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center/ cover",
        }}
      >
        <div className="mx-auto max-w-[600px] w-full">
          <Input
            label="Title"
            placeholder="Enter Title"
            {...register("title", { required: "Title is required" })}
            className="rounded-md px-2 py-0.5 mb-1"
          />
          <RealTimeEditor
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-full mx-auto max-w-max p-2">
          {post && (
            <div className="p-1 w-full m-1">
              <img src={imgUrl} alt={post.title} className="h-[100px]" />
            </div>
          )}
          <Input
            label="Upload Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: post ? false : "Image is required",
            })}
            className="border-black border py-1 rounded-sm"
          />
          <Select
            label="Status"
            options={["Active", "Inactive"]}
            {...register("status", { required: "Set label before publishing" })}
            className="w-full px-2 py-0.5"
          />
          <Button
            type="submit"
            className="bg-[#405DE6] hover:bg-[#5B51D8] hover:text-white duration-200"
          >
            {post ? "Update" : "Post"}
          </Button>
        </div>
        <Toaster />
      </form>
    </section>
  );
};

export default PostForm;
