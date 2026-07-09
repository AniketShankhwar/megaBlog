import React from "react";

// Imports the Appwrite configuration file to access backend services like database and storage
import appwriteService from "../appwrite/configuration";

import { Link } from "react-router-dom";
// Imports Link from react-router-dom to navigate between pages without reloading the browser

// The dollar sign ($) in $id is a syntax choice made by Appwrite.
function PostCard({ $id, title, featuredImage }) {
  return (
    // Dynamic routing: Clicks on this card will take the user to the unique URL of this specific post using its $id
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {/* appwriteService.getFileView() is a custom method that takes the image ID (featuredImage) 
              and returns the actual URL string of the image. */}
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="rounded-xl w-full aspect-video object-cover object-center"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
