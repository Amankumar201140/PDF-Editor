import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { toast } from "react-hot-toast";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="flex items-center w-11/12 justify-between max-w-[1160px] h-full mx-auto">
      
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          width={160}
          height={32}
          loading="lazy"
        />
      </Link>

      {/* Nav Links */}
      <nav>
        <ul className="flex text-richblack-100 gap-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Contact</Link></li>
          <li><Link to="/pdf-viewer">PDF Viewer</Link></li>
        </ul>
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-x-4">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="text-richblack-100 bg-richblack-800 px-3 py-2 rounded-lg border border-richblack-700">
              Log in
            </button>
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/signup">
            <button className="text-richblack-100 bg-richblack-800 px-3 py-2 rounded-lg border border-richblack-700">
              Sign Up
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <button
            onClick={() => {
              setIsLoggedIn(false);
              toast.success("Logged Out");
            }}
            className="text-richblack-100 bg-richblack-800 px-3 py-2 rounded-lg border border-richblack-700"
          >
            Log Out
          </button>
        )}

        {isLoggedIn && (
          <Link to="/dashboard">
            <button className="text-richblack-100 bg-richblack-800 px-3 py-2 rounded-lg border border-richblack-700">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
