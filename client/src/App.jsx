import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Signin from "./Pages/Signin";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Header from "./Component/Header";
import PrivateRoute from "./Component/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:listingId" element={<Listing />} />

          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
