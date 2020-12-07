import React from "react";

const Page404 = ({ location }) => {
  const path = location.pathname.slice(1, 7);
  const slug = location.pathname.slice(7);

  console.log("path ", path);
  console.log("slug ", slug);
  return (
    <div>
     404
    </div>
  );
};

export default Page404;