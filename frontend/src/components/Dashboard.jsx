


// function Dashboard(){

//    return(
//     <div>
//          <div>  
//             <p><span>Costumer </span> Login/SignUp</p>
//          </div>
//          <div>  
//             <p><span>Supplier </span>  Login/SignUp</p>
//          </div>
//     </div>
//    )
// }


// export default Dashboard



function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center space-y-6">
        
        <h1 className="text-2xl font-bold text-gray-800">
          Login / Sign Up
        </h1>

        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
          <p className="text-lg font-semibold">
            <span className="text-blue-600">Customer</span> Login / SignUp
          </p>
        </div>

        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
          <p className="text-lg font-semibold">
            <span className="text-green-600">Supplier</span> Login / SignUp
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

