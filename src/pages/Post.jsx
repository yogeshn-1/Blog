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
  const { id } = useParams();
  const navigate = useNavigate();
  let imgsrc = "";
  const userData = useSelector((state) => state.authSlice.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    dbServices.getPost(id).then((res) => {
      setPost(res);
      imgsrc = res.image;
      console.log(imgsrc);
    });
  }, []);
  const deletePost = (post) => {
    console.log(post);
    dbServices.deletePost(post.$id).then((status) => {
      if (status) {
        fileServices.deleteFile(post.image);
        navigate("/");
      }
    });
  };
  return post ? (
    <Container>
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={fileServices.getFilePreview(imgsrc)}
          alt={post.title}
          className="rounded-xl"
        />
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={() => deletePost(post)}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">{parse(post.content)}</div>
    </Container>
  ) : null;
};

export default Post;
