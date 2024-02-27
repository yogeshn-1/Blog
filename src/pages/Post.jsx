import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dbServices from "../appwrite/db_service";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Container, Button, Loader } from "../components/index";
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
  if (loading) return <Loader>Loading Post</Loader>;
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
