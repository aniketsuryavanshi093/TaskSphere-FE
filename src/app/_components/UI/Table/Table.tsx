"use client"
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from "react";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Row, Col, Progress } from "reactstrap";
import "./datatables.scss";
import Pagination from "../Pagination/Pagination";
import { PaginationConfigType } from "@/commontypes";

const DatatableTables: React.FC<any> = ({
  column,
  action,
  row,
  handelSort,
  commingSoon,
  // paging = true,
  norecordslabel,
  paginationConfig,
  customise,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState({
    columns: column,
    rows: [
      {
        name: "Tiger Nixon",
        position: "System Architect",
        office: "Edinburgh",
        age: "61",
        date: "2011/04/25",
      },
      {
        name: "Garrett Winters",
        position: "Accountant",
        office: "Tokyo",
        age: "63",
        date: "2011/07/25",
        salary: "$170",
      },
      {
        name: "Ashton Cox",
        position: "Junior Technical Author",
        office: "San Francisco",
        age: "66",
        date: "2009/01/12",
        salary: "$86",
      },
      {
        name: "Cedric Kelly",
        position: "Senior Javascript Developer",
        office: "Edinburgh",
        age: "22",
        date: "2012/03/29",
        salary: "$433",
      },
      {
        name: "Airi Satou",
        position: "Accountant",
        office: "Tokyo",
        age: "33",
        date: "2008/11/28",
        salary: "$162",
      },
      {
        name: "Brielle Williamson",
        position: "Integration Specialist",
        office: "New York",
        age: "61",
        date: "2012/12/02",
        salary: "$372",
      },
      {
        name: "Herrod Chandler",
        position: "Sales Assistant",
        office: "San Francisco",
        age: "59",
        date: "2012/08/06",
        salary: "$137",
      },
      {
        name: "Rhona Davidson",
        position: "Integration Specialist",
        office: "Tokyo",
        age: "55",
        date: "2010/10/14",
        salary: "$327",
      },
    ],
  });
  const copyToCLipBoard = (value: any) => {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // console.log(err);
    }
  };
  const getTableContent = (item: any, label: any) => {
    switch (label) {
      case "transactionHash":
        return item[label] ? (
          <a
            rel="noreferrer"
            href={`${process.env.REACT_APP_POLYGON_URL}${item[label]}`}
            target="_blank"
          >
            {`${item[label].slice(0, 4)}......${item[label].slice(-4)}`}
          </a>
        ) : (
          "- -"
        );

      case "source":
        return item[label]?.includes("0x") ? (
          <p
            className="cursor-pointer"
            onClick={() => copyToCLipBoard(item[label])}
          >{`${item[label].slice(0, 4)}......${item[label].slice(-4)}`}</p>
        ) : (
          item[label]
        );
      case "to":
        return item[label]?.includes("0x") ? (
          <p
            className="cursor-pointer"
            onClick={() => copyToCLipBoard(item[label])}
          >{`${item[label].slice(0, 4)}......${item[label].slice(-4)}`}</p>
        ) : (
          item[label]
        );
      case "destination":
        return item[label]?.includes("0x") ? (
          <p
            className="cursor-pointer"
            onClick={() => copyToCLipBoard(item[label])}
          >{`${item[label].slice(0, 4)}......${item[label].slice(-4)}`}</p>
        ) : (
          item[label]
        );

      default:
        return item[label];
    }
  };
  useEffect(() => {
    setData((prev) => ({ ...prev, columns: column }));
  }, [JSON.stringify(column)]);
  useEffect(() => {
    if (!row) {
      data?.rows?.forEach((item, idx) => {
        data.rows[idx] = {
          ...item,
          title: `title${idx + 1}`,
          action: (action && action(idx)) || (
            <div className="text-center">---</div>
          ),
          location: `Location${idx + 1}`,
          updated: "3/21/2022 3:03:27 EST",
          number: idx + 1,
          enddate: (
            <div className="d-flex">
              <i className="far fa-clock" />
              11/20/21
            </div>
          ),
          property: `House${idx + 1}`,
          deposite: "$5000",
          distributed: "45%",
          token: "500",
          asset: "NCB",
          role: "default",
          email: "12xgwhwhx@gmail.com",
          price: "$1000.00 - 2.15%",
          progress: <Progress value="25"> 25%</Progress>,
          category: "Commercial",
          platfee: "Paid",
          propdoc: "Uploaded",
          Destination: "Bank Account Name",
          owner: "mogul",
          mobile: "1234567890",
          update: "pending",
          label: "november.pdf",
          duration: "10 days",
          favor: 200,
          against: 0,
          date: "30/11/2022",
          pslstatus: <p className="color-green">Success</p>,
          request: "Approved",
          purpose: "Buy",
        };
      });
      setData({ ...data });
      return;
    }
    if (row === "loading") {
      const skelData = {};
      column.forEach((item: { field: string }) => {
        skelData[item.field] = <div className="skel" />;
      });
      const rowloading = [...new Array(4)].map(() => skelData);
      setData((prev) => ({ ...prev, rows: rowloading }));
      return;
    }
    setData((prev) => ({ ...prev, rows: row }));
  }, [JSON.stringify(row)]);

  return (
    <>
      <Row className="m-auto py-2">
        <Col className="col-12 px-0">
          {!commingSoon ? (
            customise && row !== "loading" ? (
              <MDBTable striped>
                <MDBTableHead>
                  <tr>
                    {data?.columns.map((col: { field: string, label: string }) => (
                      <th key={col.field} scope="col">{col.label}</th>
                    ))}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {row?.map((rowData, index) => (
                    <tr key={index + 1}>
                      {data?.columns?.map((col: { field: string }) => (
                        <td key={col.field}> {getTableContent(rowData, col?.field)}</td>
                      ))}
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            ) : (
              <>
                <MDBDataTable
                  key={data.rows?.length}
                  responsive
                  striped
                  paging={false}
                  data={data}
                  onSort={handelSort}
                  noRecordsFoundLabel={ norecordslabel||"No record found"}
                  searching
                />
              </>
            )
          ) : (
            <MDBTable striped>
              <MDBTableHead>
                <tr>
                  {data?.columns.map((col: { label: string }) => (
                    <th key={col.label} scope="col">{col.label}</th>
                  ))}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td colSpan={data?.columns.length}></td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          )}
        </Col>
        {paginationConfig && (
          <Col className="col-12">
            <Pagination paginationConfig={paginationConfig as PaginationConfigType} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default DatatableTables;
