import { SupportTicket } from "../model/supportTicket.js";

export const createSupportTicket = async (req, res) => {
  try {
    const { customerId, OrderDetailsId, subject, description } = req.body;

    if (!customerId || !OrderDetailsId || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Prevent duplicates
      const existing = await Return.findOne({ OrderDetailsId });
        if (existing) {
          return res.status(409).json({
            success: false,
            message: 'Return request already exists for this order detail',
          });
        }
    
    const ticket = await SupportTicket.create({
      customerId,
      orderDetailsId,
      subject,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Support ticket create Successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};










