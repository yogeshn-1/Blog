import React from "react";
import fileServices from "../appwrite/file_service";
import { Link } from "react-router-dom";
const Cards = ({ $id, title, image }) => {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="p-2 rounded-lg w-full m-1">
        <img
          src={fileServices.getFilePreview(image)}
          alt={title}
          className="rounded-md"
        />
        <h2 className="text-xl">{title}</h2>
      </div>
    </Link>
  );
};

export default Cards;
