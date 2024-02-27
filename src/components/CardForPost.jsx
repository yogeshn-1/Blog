import React, { useEffect, useState } from "react";
import fileServices from "../appwrite/file_service";
import { Link } from "react-router-dom";
import { Button, Loader } from "./index";
import parse from "html-react-parser";

const Cards = ({ $id, title, image, content }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchImage = async () => {
    const img = await fileServices.getFilePreview(image);
    setImageUrl(img);
  };
  useEffect(() => {
    fetchImage();
    setLoading(false);
  }, [$id]);
  if (loading) return <Loader>Loading Post</Loader>;
  return (
    <Link to={`/posts/${$id}`}>
      <div className="bg-[#F5F7F8] rounded-md p-2 text-black min-w-48 hover:scale-105 duration-200">
        <div className="w-full">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-md object-cover w-full h-44"
          />
        </div>
        <h2 className="md:text-xl sm:text-base font-semibold my-1 p-0">
          {title}
        </h2>
        <div className="mb-1 browser-css w-auto max-w-60 max-h-6 overflow-hidden md:text-base sm:text-sm xs:text-sm xs:max-w-96">
          {parse(content)}
        </div>
        <Button
          bgColor="bg-[#436782]"
          hoverBg="hover:bg-[#435abc]"
          className="text-white md:text-sm sm:text-xs"
        >
          Read more...
        </Button>
      </div>
    </Link>
  );
};

export default Cards;
