import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ResponsiveAppBar from "../TopBar/TopBar";
import { useLocation } from "react-router-dom";
import apis from "../../apis/user";
import { useNavigate } from "react-router-dom";

const ProgressPage = () => {
  const navigate = useNavigate();
  const route = useLocation();
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const posterId = route.search.split("=")[1];
    console.log(posterId);
    apis.FinduserByEmail({ email: posterId }).then((res) => {
      const rating = res[0].rating;
      const total = res[0].totalrating;
      const count = res[0].ratingcount;
      const newRating = (total + currentValue) / (count + 1);
      const newTotal = total + currentValue;
      const newCount = count + 1;
      const ratingpayload = {
        email: posterId,
        rating: newRating,
      };
      apis.UpdateRating(ratingpayload).then((res) => {
        const totalpayload = {
          email: posterId,
          totalrating: newTotal,
        };
        apis.UpdateTotalRating(totalpayload).then((res) => {
          const countpayload = {
            email: posterId,
            ratingcount: newCount,
          };
          apis.UpdateRatingCount(countpayload).then((res) => {
            navigate("/homepage"); 
          });
        });
      });
    });
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  return (
    <div style={styles.container}>
      <ResponsiveAppBar />
      <h2> Rate your Orders </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea placeholder="What's your experience?" style={styles.textarea} />

      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default ProgressPage;
