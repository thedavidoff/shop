import React  from "react";
import StarRatingComponent from "react-star-rating-component";
import ReactTooltip from "react-tooltip";
import * as PropTypes from "prop-types";

import styles from "./Rating.module.css";
import stylesTooltip from "../Tooltip/Tooltip.module.css";

const emptyStar = "#c6c6c6";
const fullStar = "#f70000";

const Star = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
        fill={color}
      />
    </svg>
  );
};

const Rating = ({ totalRating, ratingsCount }) => {
  const width = (totalRating - parseInt(totalRating)) * 100 + "%";

  let rating;
  let tooltipText;
  ratingsCount === 1 ? (rating = "оценки") : (rating = "оценок");
  tooltipText = `${
    Number.isInteger(totalRating) ? totalRating + ".0" : totalRating
  } из 5 на основе ${ratingsCount} ${rating}`;

  return (
    <div className={styles.totalRating} data-tip={tooltipText}>
      <ReactTooltip className={stylesTooltip.tooltip} />
      <StarRatingComponent
        name="totalRating"
        value={totalRating}
        starColor="red"
        emptyStarColor="#adadad"
        editing={false}
        renderStarIcon={() => <Star color={fullStar} />}
        renderStarIconHalf={() => (
          <div className={styles.starContainer}>
            <span style={{ width }} className={styles.star}>
              <Star color={fullStar} />
            </span>
            <Star color={emptyStar} />
          </div>
        )}
      />
    </div>
  );
};

Rating.propTypes = {
  totalRating: PropTypes.number,
  ratingsCount: PropTypes.number,
};

export default Rating;
