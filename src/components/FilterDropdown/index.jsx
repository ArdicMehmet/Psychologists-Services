import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DEFAULT_THEME, THEME_COLORS } from "../../constants/theme";
import "./styles.css";

const FilterDropdown = ({
  theme = DEFAULT_THEME,
  callback = () => "",
  filterOptions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(
    filterOptions[0] || "Empty"
  );

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
    callback(filter);
  };

  return (
    <div className="filter-dropdown">
      <h3 className="filter-dropdown-title">Filters</h3>
      <div className="filter-dropdown-container">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="filter-dropdown-button"
          style={{ backgroundColor: THEME_COLORS[theme].primary }}
        >
          <span>{selectedFilter}</span>
          {isOpen && selectedFilter?.length > 0 ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {/* Dropdown Menü */}
        {isOpen && filterOptions.length > 0 && (
          <div className="filter-dropdown-menu">
            {filterOptions.map((option, index) => (
              <button
                key={option}
                onClick={() => handleFilterSelect(option)}
                className="filter-dropdown-menu-button"
                style={{
                  backgroundColor:
                    selectedFilter === option ? "#f5f5f5" : "white",
                  color:
                    selectedFilter === option
                      ? THEME_COLORS[theme].primaryColor
                      : "#666",
                  borderBottom:
                    index < filterOptions.length - 1
                      ? "1px solid #f0f0f0"
                      : "none",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
