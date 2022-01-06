import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';

export const getStars = (rating: number): JSX.Element[] => {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--) output.push(<IoStar />);

  // If there is a half a star, append it
  if (i == 0.5) output.push(<IoStarHalf />);

  // Fill the empty stars
  for (let i = 5 - rating; i >= 1; i--) output.push(<IoStarOutline />);

  return output;
};
