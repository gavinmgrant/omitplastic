import React from "react";
import { IconSearch } from "@tabler/icons";

interface Props {
    value: string;
};

const SearchBar: React.FC<Props> = ({ value }) => (
  <form action="/products" method="get" className="flex items-center md:mr-4 xl:mr-8">
      <label htmlFor="header-search">
          <span className="hidden">Search</span>
      </label>
      <input
          type="text"
          id="header-search"
          placeholder={!value ? "Search products" : value}
          name="s"
          className="border-solid border-2 border-black rounded-md p-1 w-full md:w-1/2 xl:w-1/3 focus:bg-green-100 outline-none"
      />
      <button type="submit" className="ml-1">
          <IconSearch />
      </button>
  </form>
);

export default SearchBar;