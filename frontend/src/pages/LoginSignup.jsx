import React, { useState } from "react";
import axios from 'axios';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
    const [action, setAction] = useState("login");
    const [role, setRole] = useState("customer");
    const [errorMessage, setErrorMessage] = useState("");
    const [signupSuccessMessage, setSignupSuccessMessage] = useState("")
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        password: "",
    });
    // signup to login navigate
    const navigateToLogin = () => {
        window.location.reload()
    }
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
                email: formData.email,
                password: formData.password,
                role: role
            }

            console.log(payload);
            try {
                const res = await axios.post('http://localhost:5000/api/login', payload);
                console.log("response:", res);
                login(res.data.userid, res.data.role, res.data.token);
                if (res.data.role === "customer") {
                    navigate('/product-list')
                } else {
                    navigate('/supplier-products')
                }

            } catch (error) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.msg);
            }


        }

        if (action == "signup") {
            const payload = {
                role,
                ...formData,
            };

            console.log(payload);
            try {
                const res = await axios.post('http://localhost:5000/api/signup', payload);
                console.log("response:", res);
                // login(res.data.userid, res.data.role, res.data.token)
                setFormData({
                    name: "",
                    phone: "",
                    address: "",
                    email: "",
                    password: "",
                })
                setSignupSuccessMessage("User Registered Successfully")

            } catch (error) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.msg);
            }
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600">
            <div className="bg-white w-96 p-8 m-4 rounded-2xl shadow-xl">

                {/* Action Buttons */}
                <div className="flex justify-between gap-4 mb-6">
                    <div
                        onClick={() => setAction("signup")}
                        className={`flex-1 text-center py-3 rounded-lg font-semibold cursor-pointer transition
              ${action === "signup"
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                    >
                        Sign Up
                    </div>

                    <div
                        onClick={() => setAction("login")}
                        className={`flex-1 text-center py-3 rounded-lg font-semibold cursor-pointer transition
              ${action === "login"
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                    >
                        Login
                    </div>
                </div>

                {/* Role Selection */}
                {action === "signup" ?
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
                    :
                    <div className="flex gap-5 justify-center mb-3">
                        <button className={`${role == "customer" ? "text-indigo-600" : "text-gray-500"}  p-1 rounded cursor-pointer`}
                            onClick={() => (setRole("customer"))}>
                            Customer
                        </button>
                        |
                        <button className={`${role == "supplier" ? "text-indigo-600" : "text-gray-500"}  p-1 rounded cursor-pointer`}
                            onClick={() => (setRole("supplier"))}>
                            Supplier
                        </button>
                    </div>
                }

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

                    {errorMessage &&
                        <p className="text-red-600 text-sm"> {errorMessage} </p>
                    }
                    {signupSuccessMessage ?
                        <div>
                            <p className="text-green-600">{signupSuccessMessage}</p>
                            <span className="text-gray-800">Please log in to continue. → </span>
                            <button className="text-indigo-600"
                            onClick={navigateToLogin}>Go to Login </button>
                        </div> :
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 cursor-pointer"
                        >
                            {action === "login" ? "Login" : "Sign Up"}
                        </button>

                    }

                </div>
            </div>
        </div>
    );
};

export default LoginSignup;