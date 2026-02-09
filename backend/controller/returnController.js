import { Return } from '../model/return.js';

export const createReturn = async (req, res) => {
  try {
    const { OrderDetailsId, returnReason } = req.body;

    if (!OrderDetailsId || !returnReason) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // if (!mongoose.Types.ObjectId.isValid(OrderDetailsId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid OrderDetailsId format',
    //   });
    // }

    // const reason = returnReason.trim();
    // if (!reason) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'returnReason cannot be empty',
    //   });
    // }

    // Prevent duplicates
    const existing = await Return.findOne({ OrderDetailsId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Return request already exists for this order detail',
      });
    }

    const returnDetails = await Return.create({
      OrderDetailsId,
      returnReason,
    });

    res.status(201).json({
      success: true,
      message: 'return details updated successfully',
      data: returnDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
