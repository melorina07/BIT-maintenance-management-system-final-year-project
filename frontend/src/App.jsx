import React, { useState, Suspense } from "react";
import { suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home2 from "./components/Home2";
import All from "./components/All";
import Admin from "./components/Admin";
import Header from "./components/Header";
import Addmin from "./components/Addmin";
import Uppdate from "./components/Uppdate";
import Upppdate from "./components/Upppdate";
import AddTechnician from "./components/AddTechnician";
import { Provider } from "react-redux";
import store from "./store/store";
import {ToastContainer } from "react-toastify";
import Users from "./components/Users";
import Employee from "./pages/Employee";
import Faculity from "./pages/Faculity";
import Department from "./pages/Department";
import ChangePassword from './components/ChangePassword'
import Request from "./pages/Request";
function App() {
	// const [token, setToken] = useState();
	// if(!token) {
	//   return <Login setToken={setToken} />
	// }
	return (
		<Suspense fallback={null}>
			<Provider store={store}>
      <ToastContainer />
				<div>
					<BrowserRouter>
						<Header />

						<Routes>
							<Route path="/Login" name="Login" element={<Login />} />
							<Route path="/Register" name="Register" element={<Register />} />
							<Route path="/Addmin" name="Addmin" element={<Addmin />} />
							<Route path="/" name="Home2" element={<Request />} />
							<Route path="/All" name="All" element={<All />} />
							<Route path="/Uppdate" name="Uppdate" element={<Uppdate />} />
							<Route path="/Upppdate" name="Upppdate" element={<Upppdate />} />
              <Route path="/Users" name="Users" element={<Users />} />
			  <Route path="/ChangePassword" name="Users" element={<ChangePassword />} />
              <Route path="/Department/:id/Employee" name="Users" element={<Employee />} />
			  <Route path="/Faculity" name="Faculity" element={<Faculity />} />
			  <Route path="/Faculity/:id/Department" name="Department" element={<Department />} />
			  {/* <Route path="/Requests" name="Department" element={<Request />} /> */}
							<Route
								path="/AddTechnician"
								name="AddTechnician"
								element={<AddTechnician />}
							/>

							<Route path="/Admin" name="Admin" element={<Admin />} />
						</Routes>
					</BrowserRouter>
				</div>
			</Provider>
		</Suspense>
	);
}

export default App;
