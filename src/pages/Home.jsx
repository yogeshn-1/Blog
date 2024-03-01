import React, { useEffect, useState } from "react";
import dbServices from "../appwrite/db_service";
import { CardForPost, Container, Loader, Welcome } from "../components/index";
import { useSelector } from "react-redux";
const Home = () => {
  const [posts, setPosts] = useState(null);
  const userData = useSelector((state) => state.authSlice.userData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userData) {
      try {
        console.log("inside try useeffect");
        dbServices.getUserPost(userData.$id).then((res) => {
          if (res) {
            setPosts(res.documents);
          }
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
    return () => {
      setPosts(null);
    };
  }, []);
  if (loading) return <Loader>Loading Posts</Loader>;
  if (userData === null)
    return (
      <div className="w-full mt-6">
        <Container>
          <Welcome />
        </Container>
      </div>
    );
  if (posts === null || posts.length === 0)
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-200">
                No Posts to display
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  return (
    <div className="w-full p-2">
      <h2 className="text-center text-xl font-bold bg-[#f0e8da] text-black rounded-md py-2">
        Your Posts
      </h2>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 mx-1 flex-auto">
              <CardForPost {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
