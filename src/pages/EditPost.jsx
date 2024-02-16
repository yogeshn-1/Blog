import React, { useEffect, useState } from "react";
import dbServices from "../appwrite/db_service";
import { useNavigate, useParams } from "react-router-dom";
import { CardForPost, Container } from "../components/index";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dbServices.getPost(id).then((res) => {
      if (res) {
        setPost(res);
      } else {
        navigate("/");
      }
    });
  }, [id]);
  return post ? (
    <div className="w-full p-2">
      <Container>
        <CardForPost post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
