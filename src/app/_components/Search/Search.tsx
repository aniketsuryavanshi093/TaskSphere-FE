/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useState } from "react";
import "./search.scss";
import Image from "next/image";
import { Spinner } from "reactstrap";
import { bloginterface } from "@/commontypes";
import Link from "next/link";

type PageProps = {
  setValue?: (e: string) => void, placeholder: string, searchwrapperclass?: string, searchData?: bloginterface[], searchLoading?: boolean, waitTime: number, minSearchChar?: number, inpClassname?: string, searchiconclass?: string
}

const Search: React.FC<PageProps> = ({ setValue, placeholder, searchLoading, waitTime, minSearchChar = 2, searchData, inpClassname, searchiconclass, searchwrapperclass }) => {
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
          <div className="searchresult">
            {
              (!searchLoading && !!searchData?.length) ? (
                <>
                  {searchData?.map((elem: bloginterface) => (
                    <Link prefetch={false} className="my-2" key={elem._id} href={`blog/posts/${elem.slug}`} >
                      <div className="wrapper my-2 justify-start">
                        <div className="serachimgwrapper">
                          <Image src={elem.previewImage} unoptimized width={100} height={60} alt={elem.slug} />
                        </div>
                        <p className="mb-0">{elem.title}</p>
                      </div>
                    </Link>
                  ))}
                  <Link href={`/blog?search=${searchval}`}>
                    View more
                  </Link>
                </>
              ) :
                (
                  <div className="w-100 wrapper" style={{ height: "100px" }}>
                    <p className="mb-0"> No Results found 😭 </p>
                  </div>
                )
            }
          </div>
        )
      }

    </div >
  );
};

export default memo(Search);
