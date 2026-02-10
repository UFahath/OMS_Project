import { Review } from '../model/review.js';
import { OrderHeader } from '../model/orderHeader.js';

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
        message: 'All required fields must be provided',
      });
    }
    const order = await OrderHeader.findById(orderHeaderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }
    const review = await Review.create({
      customerId,
      productId,
      orderHeaderId : order._id,
      rating,
      reviewComment,
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully.',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
