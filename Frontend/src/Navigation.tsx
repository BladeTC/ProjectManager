import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <button>
              <Link to="/">Home</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/main">Main</Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
