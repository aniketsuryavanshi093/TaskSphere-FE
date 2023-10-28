/* eslint-disable react/jsx-key */
/* eslint-disable no-underscore-dangle */
import React, { ReactNode, useEffect, useState } from 'react';
import { Label, Input } from 'reactstrap';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import './index.css';

export type PaginationConfigType = {
  pageCount: number
  itemCount: number,
  currentPage: number,
  onPageChange: (number: number) => void,
  showLabel?: boolean,
  perpageItemCount: number,
  onperpageItemCountchange: (number: number) => void,
  showStartEndPage?: boolean,
}

const Pagination: React.FC<{ paginationConfig: PaginationConfigType, showRowperpage?: boolean }> = ({ showRowperpage = true, paginationConfig: {
  pageCount,
  itemCount,
  currentPage,
  onPageChange,
  showLabel = true,
  perpageItemCount,
  onperpageItemCountchange,
  showStartEndPage = true
} }) => {


  const [_currentPage, setCurrentPage] = useState(currentPage || 1);
  const perpagearr = [2, 5, 10, 15, 25, 50];
  const _onPageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  useEffect(() => {
    setCurrentPage(currentPage)
  }, [currentPage])
  console.log("😎😎🤣🤣🤩🤩😀😀😂🥰🥰😃😃😚😚", _currentPage);

  const nextPage = () => {
    const updatedPage = currentPage + 1 <= pageCount ? currentPage + 1 : _currentPage;
    setCurrentPage(updatedPage);
    onPageChange(updatedPage);
  };

  const prevPage = () => {
    const updatedPage = currentPage - 1 >= 1 ? currentPage - 1 : 1;
    console.log(currentPage - 1 >= 1, updatedPage, currentPage)
    setCurrentPage(updatedPage);
    onPageChange(updatedPage);
  };

  return (
    <div>
      {
        pageCount > 1 && (
          <div className="pagination ">
            {showLabel && (
              <span className="align-self-center mx-4">
                Total Entries <strong>{itemCount}</strong>
              </span>
            )}
            {showRowperpage &&
              <div className="wrapper mx-2 text_primary ">
                <Label htmlFor="rowperpage" className="nowrap mx-3 mb-0">
                  Rows per Page
                </Label>
                <Input
                  name="select"
                  type="select"
                  className='border-0 text_primary'
                  id="rowperpage "
                  onChange={onperpageItemCountchange}
                  value={perpageItemCount}
                >
                  {perpagearr.map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </Input>
              </div>
            }

            {pageCount > 1 && (
              <>
                {showStartEndPage && (
                  <button
                    disabled={_currentPage === 1}
                    type="button"
                    onKeyDown={() => _onPageChange(1)}
                    onClick={() => _onPageChange(1)}
                    className="page active"
                  >
                    <AiOutlineDoubleLeft />
                  </button>
                )}
                <button
                  // disabled={_currentPage === 1}
                  type="button"
                  onKeyDown={() => prevPage()}
                  onClick={() => prevPage()}
                  className="page active"
                >
                  Prev
                </button>
                {Array.from(Array(pageCount), (ele, i) => {
                  const start = currentPage + 4 <= pageCount ? currentPage : pageCount - 4;
                  const end = currentPage + 4 <= pageCount ? currentPage + 4 : pageCount;
                  let dom: ReactNode = null;
                  if (i + 1 >= start && i + 1 <= end) {
                    dom = (
                      <span
                        tabIndex={i}
                        key={`pagination${i}`}
                        role="button"
                        className={i + 1 === _currentPage ? 'active page' : 'page'}
                        onClick={() => _onPageChange(i + 1)}
                        onKeyDown={() => _onPageChange(i + 1)}
                      >
                        {i + 1}
                      </span>
                    );
                  }
                  return dom;
                })}
                <button
                  disabled={_currentPage === pageCount}
                  className="page active"
                  type="button"
                  onKeyDown={() => nextPage()}
                  onClick={() => nextPage()}
                >
                  Next
                </button>
                {showStartEndPage && (
                  <button
                    disabled={_currentPage === pageCount}
                    type="button"
                    onKeyDown={() => _onPageChange(pageCount)}
                    onClick={() => _onPageChange(pageCount)}
                    className="page active"
                  >
                    <AiOutlineDoubleRight />
                  </button>
                )}
              </>
            )}
          </div>
        )
      }
    </div>
  );
};

export default Pagination;
