import { Review } from "../model/review.js";

export const createReview = async (req, res) => {
  try {
    const { customerId, productId, orderHeaderId, rating, reviewComment } =
      req.body;

    if (
      !customerId ||
      !productId ||
      !orderHeaderId ||
      rating == null ||
      !reviewComment
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }
    const review = await Review.create({
      customerId,
      productId,
      orderHeaderId,
      rating,
      reviewComment,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};










