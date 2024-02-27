import React, { useEffect, useState } from "react";
import dbServices from "../appwrite/db_service";
import { CardForPost, Container, Loader } from "../components/index";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbServices.getAllpost([]).then((res) => {
      if (res) {
        setPosts(res.documents);
      }
      setLoading(false);
    });
  }, []);
  if (loading) return <Loader>Loading Posts</Loader>;
  if (posts === null || posts.length === 0)
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
    <div className="w-full ">
      <Container>
        <div className="flex flex-wrap gap-2">
          {posts.map((post) => (
            <div key={post.$id} className="p-1 mx-1 flex-auto">
              <CardForPost {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
