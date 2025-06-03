import { Link } from "react-router-dom";
import LogoBar from "../Logos/LogoBar";

const Navbar = () => {
  return (
    <div>
      <ul className="flex space-x-4 text-white">
        <li>
          <LogoBar />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/hakkimizda">Psychologists</Link>
        </li>
        <li>
          <Link to="/iletisim">Favorites</Link>
        </li>
        <li>
          <button onClick={() => {}}>Login</button>
        </li>
        <li>
          <button onClick={() => {}}>Registration</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
