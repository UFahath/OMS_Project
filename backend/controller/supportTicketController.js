import { SupportTicket } from "../model/supportTicket.js";

export const createSupportTicket = async (req, res) => {
  try {
    const { OrderDetailsId, subject, description } = req.body;
    const {id} = req.user;
    const customerId = id
    
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
      OrderDetailsId,
      subject,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Support ticket create Successfully. Our suppport team will contact you soon",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


