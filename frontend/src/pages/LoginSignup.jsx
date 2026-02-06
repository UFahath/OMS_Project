import React, { useState } from "react";

const LoginSignup = () => {
    const [action, setAction] = useState("login");
    const [role, setRole] = useState("customer");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        password: "",
    });

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle submit
    const handleSubmit = async () => {
        if (action == "login") {
            const payload = {
                email : formData.email,
                password : formData.password
            }
         
            console.log(payload);
            
        }

        if (action == "signup") {
            const payload = {
                role,   // customer or supplier
                ...formData,
            };
         
            console.log(payload);

            const res = await axios.post('http://localhost:5000/api/signup')
            console.log(res);
            
            
           
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600">
            <div className="bg-white w-96 p-8 rounded-2xl shadow-xl">

                {/* Action Buttons */}
                <div className="flex justify-between gap-4 mb-6">
                    <div
                        onClick={() => setAction("signup")}
                        className={`flex-1 text-center py-3 rounded-lg font-semibold cursor-pointer transition
              ${action === "signup"
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                    >
                        Sign Up
                    </div>

                    <div
                        onClick={() => setAction("login")}
                        className={`flex-1 text-center py-3 rounded-lg font-semibold cursor-pointer transition
              ${action === "login"
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                    >
                        Login
                    </div>
                </div>

                {/* Role Selection */}
                {action === "signup" && (
                    <div className="mb-6 space-y-3">
                        <p className="font-semibold text-gray-700">Select Role</p>

                        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="customer"
                                checked={role === "customer"}
                                onChange={(e) => setRole(e.target.value)}
                                className="accent-indigo-600"
                            />
                            <span>Customer</span>
                        </label>

                        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="supplier"
                                checked={role === "supplier"}
                                onChange={(e) => setRole(e.target.value)}
                                className="accent-indigo-600"
                            />
                            <span>Supplier</span>
                        </label>
                    </div>
                )}

                {/* Form Inputs */}
                <div className="space-y-4">

                    {action === "signup" && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                    >
                        {action === "login" ? "Login" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;