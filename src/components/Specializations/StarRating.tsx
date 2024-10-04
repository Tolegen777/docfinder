import React from 'react';

interface RatingProps {
  rating: number;
}

const StarRating: React.FC<RatingProps> = ({ rating }) => {
  const stars = [];
  let ratingCount = rating > 5 ? Math.ceil(rating / 2) : rating;

  for (let i = 0; i < 5; i++) {
    if (i < ratingCount) {
      stars.push(<span key={i}>★</span>);
    } else {
      stars.push(<span key={i}>☆</span>);
    }
  }
  return <div>{stars}</div>;
};

export default StarRating;
