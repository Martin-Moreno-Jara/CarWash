import ReviewOption from "./ReviewOption";
import "../../stylesheets/serviceReview.css";
import { useState } from "react";

const ServiceReview = ({
  showReview,
  setShowReview,
  setShowConfirm,
  selectedRow,
}) => {
  const reviewOptions = [
    { icon: "sentiment_sad", score: 1, text: "Malo" },
    { icon: "sentiment_dissatisfied", score: 2, text: "Deficiente" },
    { icon: "sentiment_neutral", score: 3, text: "Regular" },
    { icon: "sentiment_satisfied", score: 4, text: "Bueno" },
    { icon: "sentiment_excited", score: 5, text: "Excelente" },
  ];

  const close = () => {
    setShowReview(false);
    setShowConfirm(false);
  };
  return (
    <div className="review-div">
      <span className="material-symbols-outlined close-span" onClick={close}>
        close
      </span>
      <p>Califica nuestro servicio</p>
      <div className="review-options">
        {reviewOptions.map((option) => (
          <ReviewOption
            icon={option.icon}
            text={option.text}
            score={option.score}
            setShowReview={setShowReview}
            setShowConfirm={setShowConfirm}
            selectedRow={selectedRow}
          />
        ))}
      </div>
      <button>Enviar</button>
    </div>
  );
};
export default ServiceReview;
