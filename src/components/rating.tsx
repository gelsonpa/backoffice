import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function RatingJobber() {
  const [ratingValue, setRatingValue] = useState(0);

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };
  //setRatingValue(5);

  return (
    <Rating
    initialValue={2}
      style={{display: 'flex', flexDirection: 'row',}}
      transition
      onClick={() => {}}
      readonly={false}
      showTooltip
      //size={11}
      ratingValue={ratingValue}
    ></Rating>
  );
}
