import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";

interface NavBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleModal: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ setSearchTerm, handleModal }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {" "}
        <FontAwesomeIcon icon={faRocket} /> SpaceX Rockets
      </div>
      <div className="navbar-search">
        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
        <input
          className="searchInput"
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
        />
      </div>
      <Button
        style={{
          backgroundColor: "#fff",
          color: "#1F2937",
          borderRadius: 30,
        }}
        onClick={handleModal}
      >
        + Add
      </Button>
    </nav>
  );
};

export default NavBar;
