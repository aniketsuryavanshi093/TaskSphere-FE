/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import "./search.scss";
import Image from "next/image";

type PageProps = {
  setValue?: (e: string) => void, placeholder: string, waitTime: number, minSearchChar?: number
}

const Search: React.FC<PageProps> = ({ setValue, placeholder, waitTime, minSearchChar }) => {
  const [searchval, setsearchval] = useState("");
  let tempInterval: any;
  const handleChanges = useCallback((val: React.ChangeEvent<HTMLInputElement>) => {
    setsearchval(val.target.value);
    const searchedKeywrod = val.target.value.trim();
    clearTimeout(tempInterval);
    tempInterval = setTimeout(() => {
      const qp =
        searchedKeywrod.length > (minSearchChar || 2) ? searchedKeywrod : "";
      setValue!(qp);
    }, waitTime || 500);
  }, []);
  return (
    <div className="search text_primary w-100 ">
      <Image height={22} width={22} src='/images/icons/searchicon.svg' alt="seacrh" className="search-icon" />
      <input
        type="text"
        value={searchval}
        placeholder={placeholder || "Search..."}
        className="dashboard-header_search "
        onChange={handleChanges}
      />
      {searchval.length > 1 && (
        <i
          className="fa-solid fa-xmark searchclose"
          onClick={() => {
            setValue!('');
            setsearchval('');
          }}
        />
      )}
    </div>
  );
};

export default Search;
