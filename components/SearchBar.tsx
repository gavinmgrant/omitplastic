import React from "react";
import { IconSearch } from "@tabler/icons";

interface Props {
  value: string;
  feature?: string | string[];
}

const SearchBar: React.FC<Props> = ({ value, feature }) => {
  let featureURL;
  if (feature === undefined) {
    featureURL = "";
  } else {
    featureURL = feature;
  }

  return (
    <form
      action={`/products/${featureURL}`}
      method="get"
      className="w-full"
    >
      <label htmlFor="header-search">
        <span className="hidden">Search</span>
      </label>
      <div className="flex items-center relative">
        <div className="absolute left-2">
          <IconSearch />
        </div>
        <input
          type="text"
          id="header-search"
          placeholder={!value ? "Search products" : value}
          name="s"
          className="border-solid border-2 border-black rounded-full p-1 pl-10 bg-white focus:bg-white focus:shadow-lg outline-none w-full"
        />
      </div>
    </form>
  );
};

export default SearchBar;
