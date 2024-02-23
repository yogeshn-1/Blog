import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dbServices from "../appwrite/db_service";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Container, Button } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import fileServices from "../appwrite/file_service";

const Post = () => {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await dbServices.getPost(id);
        setPost(postData);
        const image = await fileServices.getFilePreview(postData.image);
        setImageUrl(image);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const deletePost = (post) => {
    console.log(post);
    dbServices.deletePost(post.$id).then((status) => {
      if (status) {
        fileServices.deleteFile(post.image);
        navigate("/");
      }
    });
  };
  if (loading)
    return (
      <div
        role="status"
        className="flex justify-center my-2 items-center text-white"
      >
        <span className="text-2xl">Loading Post</span>
        <svg
          aria-hidden="true"
          className="w-10 h-10 animate-spin fill-blue-600 mx-2"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  return post ? (
    <Container className="bg-[#e6f1ec] rounded-md text-black">
      <div className="w-full flex justify-center mb-4 relative rounded-xl p-2 bg ">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={post.title}
            className="rounded-xl w-auto max-h-[550px]"
          />
        )}
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-green-400"
                hoverBg="hover:bg-green-500"
                className="mr-3 hover:text-white hover:font-semibold duration-200 w-12"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-400"
              hoverBg="hover:bg-red-600"
              className="hover:text-white hover:font-semibold duration-200 w-16"
              onClick={() => deletePost(post)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="px-2 w-full mb-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="px-2 browser-css">{parse(post.content)}</div>
    </Container>
  ) : null;
};

export default Post;
