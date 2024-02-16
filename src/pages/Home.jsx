import React, { useEffect, useState } from "react";
import dbServices from "../appwrite/db_service";
import { CardForPost, Container } from "../components/index";

const Home = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    dbServices.getAllpost().then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    });
  }, []);
  if (posts === null)
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-800">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  if (posts.length === 0)
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-800">
                No Posts to display
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  return (
    <div className="w-full p-2">
      <Container>
        {posts.map((post) => (
          <div className="p-2 w-1/4">
            <CardForPost post={post} />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Home;
