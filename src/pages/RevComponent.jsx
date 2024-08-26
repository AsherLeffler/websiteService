import { useEffect, useState } from "react";

const RevComponent = ({ review }) => {
  const findStars = () => {
    const stars = [];
    for (let i = 0; i < review.rating; i++) {
      stars.push(<i className="fa-solid fa-star goodStar" key={i}></i>);
    }
    for (let i = 0; i < 5 - review.rating; i++) {
      stars.push(
        <i className="fa-solid fa-star badStar" key={i + review.rating}></i>
      );
    }
    return stars;
  };

  const [starsDisplay, setStarsDisplay] = useState([]);
  useEffect(() => {
    setStarsDisplay(findStars());
  }, []);
  return (
    <div>
      <h1>
        {review.name} {starsDisplay}
      </h1>
      <p>"{review.review}"</p>
    </div>
  );
};

export default RevComponent;
