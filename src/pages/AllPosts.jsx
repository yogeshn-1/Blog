import React, { useEffect, useState } from "react";
import dbServices from "../appwrite/db_service";
import { CardForPost, Container } from "../components/index";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbServices.getAllpost([]).then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    });
  }, []);
  return (
    <div className="w-full p-2">
      <Container>
        {posts.map((post) => (
          <div key={post.$id} className="p-1 w-1/4">
            <CardForPost {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AllPosts;
