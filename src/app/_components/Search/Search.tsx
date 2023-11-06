/* eslint-disable react-hooks/exhaustive-deps */
import React, { ComponentType, ReactNode, memo, useCallback, useState } from "react";
import "./search.scss";
import Image from "next/image";
import { Spinner } from "reactstrap";
import { bloginterface } from "@/commontypes";


type PageProps = {
  SearchDataComponent: () => React.JSX.Element,
  setValue?: (e: string) => void, placeholder: string, searchwrapperclass?: string, searchData?: bloginterface[], searchLoading?: boolean, waitTime: number, minSearchChar?: number, inpClassname?: string, searchiconclass?: string
}

const Search: React.FC<PageProps> = ({ setValue, SearchDataComponent, placeholder, searchLoading, waitTime, minSearchChar = 2, searchData, inpClassname, searchiconclass, searchwrapperclass }) => {
  const [searchval, setsearchval] = useState("");
  let tempInterval: any;
  const handleChanges = useCallback((val: React.ChangeEvent<HTMLInputElement>) => {
    setsearchval(val.target.value);
    const searchedKeywrod = val.target.value.trim();
    clearTimeout(tempInterval);
    tempInterval = setTimeout(() => {
      const qp =
        searchedKeywrod.length > (minSearchChar) ? searchedKeywrod : "";
      setValue!(qp);
    }, waitTime || 500);
  }, []);
  return (
    <div className={`search text_primary ${searchwrapperclass} `}>
      <Image height={22} width={22} src='/images/icons/searchicon.svg' alt="seacrh" className={searchiconclass || "search-icon"} />
      <input
        type="text"
        value={searchval}
        placeholder={placeholder || "Search..."}
        className={`dashboard-header_search ${inpClassname}`}
        onChange={handleChanges}
      />
      {searchval?.length > 1 && (
        <>
          {
            searchLoading ? (
              <div className="searchclose">
                <Spinner className="" size="sm" />
              </div>
            )
              :
              (
                <i
                  className="fa-solid fa-xmark searchclose"
                  onClick={() => {
                    setValue!('');
                    setsearchval('');
                  }}
                />
              )
          }
        </>
      )}
      {
        searchval?.length > 1 && !searchLoading && (
          <SearchDataComponent />
        )
      }

    </div >
  );
};

export default memo(Search);
