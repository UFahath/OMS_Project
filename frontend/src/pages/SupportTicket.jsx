import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const SupportTicket = () => {
    const { userId } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        customerId: userId,
        orderDetailsId: "",
        subject: "",
        description: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, customerId: userId }));
    }, [userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post("http://localhost:5000/api/supportTicket", formData);
            //   console.log(res);
            setMessage(res.data.message);
            if (res.success) {
                setFormData({
                    customerId: userId,
                    orderDetailsId: "",
                    subject: "",
                    description: "",
                });
            }
        } catch (error) {
            setMessage(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Support Ticket
                </h2>
                <p className="text-sm text-center text-gray-500 mb-6">
                    Tell us how we can help you
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Order details ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Order Details ID
                        </label>
                        <input
                            name="orderDetailsId"
                            placeholder="Enter order ID"
                            value={formData.orderDetailsId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Issue Type
                        </label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="">Select issue</option>
                            <option value="Refund Issue">Refund Issue</option>
                            <option value="Account Login Issue">Account Login Issue</option>
                            <option value="Payment Issue">Payment Issue</option>
                            <option value="Delivery Issue">Delivery Issue</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Explain your issue..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {message && (
                        <p className="mt-4 text-center text-sm text-green-600">
                            {message}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Ticket"}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default SupportTicket;
