import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center w-11/12 justify-between max-w-[1160px] h-full mx-auto">

      {/* NAV LINKS */}
      <nav>
        <ul className="flex text-richblack-100 gap-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Contact</Link></li>

          {/* ✅ SHOW ONLY WHEN LOGGED IN */}
          {isLoggedIn && (
            <li>
              <Link to="/pdf-viewer">PDF Viewer</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* AUTH BUTTONS */}
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

              // ✅ REDIRECT AFTER LOGOUT
              navigate("/login");
            }}
            className="text-richblack-100 bg-richblack-800 px-3 py-2 rounded-lg border border-richblack-700"
          >
            Log Out
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;
