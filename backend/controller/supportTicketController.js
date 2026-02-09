import { SupportTicket } from "../model/supportTicket.js";

export const createSupportTicket = async (req, res) => {
  try {
    const { customerId, orderDetailsId, subject, description } = req.body;
    const {userid} = req.user;
    console.log(userid);
    

    if (!customerId || !orderDetailsId || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
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


