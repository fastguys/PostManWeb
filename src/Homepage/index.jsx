import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const HomePage = () => {
  if (!localStorage.getItem("authenticated")) {
    console.log("bbbbb")
    return <Navigate to="/" replace={true}/>;
  } else {
    console.log("cccc")
    return (
        <div>
          <p>Welcome to your Homepage</p>
        </div>
    );
  }
}
export default HomePage;
