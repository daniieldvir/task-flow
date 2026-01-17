import { createContext, useContext, useState } from "react";

const FilterContext = createContext({
  filter: "All",
  setFilter: () => {},
});

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("All");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
