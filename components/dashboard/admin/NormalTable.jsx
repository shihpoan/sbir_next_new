"use client";
import { useState, useEffect, useRef } from "react";
import AdminEditDrawer from "@/components/muis/drawers/AdminEditDrawer.jsx";

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function NormalTable({ columns, rows, onEditClick }) {
  const advanceSearchRef = useRef(null);
  // 設計用來處理搜尋的運算元：String
  const stringOperators = [
    {
      title: "包含",
      function: (data, text) => `${data}`.indexOf(text),
      condition: (data) => data != -1,
    },
    {
      title: "有資料",
      function: (data, text) => data,
      condition: (data) => data,
    },
    {
      title: "沒有資料",
      function: (data, text) => data,
      condition: (data) => !data,
    },
  ];
  // 設計用來處理搜尋的運算元：Number
  const numberOperators = [
    {
      title: "=",
      function: (data, number) => data == number,
      condition: (data) => data,
    },
    {
      title: "!=",
      function: (data, number) => data != number,
      condition: (data) => data,
    },
    {
      title: ">",
      function: (data, number) => data > number,
      condition: (data) => data,
    },
    {
      title: ">=",
      function: (data, number) => data >= number,
      condition: (data) => data,
    },
    {
      title: "<",
      function: (data, number) => data < number,
      condition: (data) => data,
    },
    {
      title: "<=",
      function: (data, number) => data <= number,
      condition: (data) => data,
    },
    {
      title: "有資料",
      function: (data) => data,
      condition: (data) => data,
    },
    {
      title: "沒有資料",
      function: (data) => data,
      condition: (data) => !data,
    },
  ];

  // 設計用來顯示最後一格按鈕的 props
  const lastButtonProps = {
    finish: {
      color:
        "bg-primary_content_bg_100 text-primary_900 hover:bg-primary_900 hover:text-primary_content_bg_100",
      text: "已完成",
      icon: () => <CheckCircleIcon className="w-6 h-6" />,
    },
    unFinish: {
      color:
        "bg-warn_color_300 text-warn_color_500 hover:bg-warn_color_500 hover:text-warn_color_300",
      text: "未完成",
      icon: () => <ExclamationCircleIcon className="w-6 h-6" />,
    },
    editable: {
      color:
        "bg-primary_content_bg_100 text-primary_900 hover:bg-primary_900 hover:text-primary_content_bg_100",
      text: "編輯",
      icon: () => <PencilIcon className="w-4 h-4" />,
    },
  };

  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [userId, setUserId] = useState("");

  // 資料處理：每頁筆數
  const [datasNumberOfPerPage, setDatasNumberOfPerPage] = useState(20);
  // 資料處理：總頁數
  const [totalPages, setTotalPages] = useState(1);
  // 資料處理：現在頁數
  const [currentPage, setCurrentPage] = useState(1);
  // 資料處理：當頁需要顯示的資料
  const [currentPageDatas, setcurrentPageDatas] = useState(null);

  // 篩選：欄位 現在選擇的 Column
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);
  // 篩選：條件運算元 list
  const [filterOperatorList, setFilterOperatorList] = useState(null);
  // 篩選：現在選擇的 條件運算元
  const [currentfilterOperator, setCurrentFilterOperator] = useState(null);
  // 篩選： input
  const [filterValue, setFilterValue] = useState("");

  // 篩選：處理篩選展開
  const [isAdvanceSearchExpanded, setIsAdvanceSearchExpanded] = useState(false);

  // 資料處理：處理初始總頁數：使用傳進來的 rows 資料 / 每頁筆數
  useEffect(() => {
    if (datasNumberOfPerPage) {
      const _rowsLength = rows.length;
      const _totalPages = Math.ceil(_rowsLength / datasNumberOfPerPage); // 總頁數

      setTotalPages(_totalPages);
    }
  }, [rows, datasNumberOfPerPage]);

  // 資料處理：處理當頁需要顯示的資料
  useEffect(() => {
    // console.log("rows", rows);
    let allData = [...rows]; // 你的資料陣列
    // 處理篩選
    if (currentfilterOperator) {
      // 找到欄位 index
      const columnIndex = columns.findIndex(
        (column) => column.title == currentFilterColumn
      );

      // 找到 Operator index
      const operatorIndex = filterOperatorList.findIndex(
        (operator) => operator.title == currentfilterOperator
      );
      // 透過 index 找到 Operator function
      const operatorFunction = (data, text) =>
        filterOperatorList[operatorIndex].function(data, text);

      // 透過 index 找到 Operator condition
      const operatorCondition = (data) =>
        filterOperatorList[operatorIndex].condition(data);

      // 處理篩選 欄位 及 篩選值
      const dataReducer = allData.reduce((acc, curr, index) => {
        const value = operatorFunction(curr[columnIndex].data, filterValue);
        // console.log("value", value);
        if (operatorCondition(value)) acc.push(curr);

        return acc;
      }, []);
      allData = [...dataReducer];

      const _allDatasLength = allData.length;
      const _totalPages = Math.ceil(_allDatasLength / datasNumberOfPerPage); // 總頁數

      setTotalPages(_totalPages);
    }

    // 計算起始索引和結束索引，確保它們不超過陣列的範圍
    const startIndex = Math.min(
      (currentPage - 1) * datasNumberOfPerPage,
      allData.length
    );
    const endIndex = Math.min(
      startIndex + datasNumberOfPerPage,
      allData.length
    );

    // 從所有資料中取出當前頁的資料
    const currentData = allData.slice(startIndex, endIndex);
    // console.log("currentData", currentData);

    setcurrentPageDatas([...currentData]);
  }, [
    rows,
    currentPage,
    currentFilterColumn,
    currentfilterOperator,
    filterValue,
  ]);

  // 篩選：處理 點擊 篩選功能以外區域 事件
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        advanceSearchRef.current &&
        isAdvanceSearchExpanded &&
        !advanceSearchRef.current.contains(event.target)
      ) {
        // 點擊的區域在 advanceSearchRef 之外
        // 在這裡執行你想要的操作
        // console.log("點擊了 advanceSearchRef 之外的區域");
        setIsAdvanceSearchExpanded(false);
      }
    };

    // 監聽整個文件的 mousedown 事件
    document.addEventListener("mousedown", handleClickOutside);

    // 在組件卸載時移除事件監聽
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdvanceSearchExpanded]);

  // 篩選：處理更換篩選欄位 以及 初始化篩選欄位
  useEffect(() => {
    // console.log("nowFilterColumn", nowFilterColumn);
    if (!currentFilterColumn) {
      setCurrentFilterColumn(columns[0].title);
      setFilterOperatorList([...stringOperators]);
    } else {
      const findTypeByTitle = (titleToFind) => {
        const foundColumn = columns.find(
          (column) => column.title === titleToFind
        );

        if (foundColumn) {
          return foundColumn.type;
        } else {
          // 如果找不到對應的 title，你可以在這裡處理
          console.error(`找不到標題為 ${titleToFind} 的列`);

          return null;
        }
      };

      // 使用範例
      const foundType = findTypeByTitle(currentFilterColumn);

      if (foundType) {
        switch (foundType) {
          case "String":
            // 對應 String 的處理邏輯
            console.log("這是一個字串類型");
            setFilterOperatorList([...stringOperators]);
            break;

          case "Number":
            // 對應 Number 的處理邏輯
            console.log("這是一個數字類型");
            setFilterOperatorList([...numberOperators]);
            break;

          default:
            // 如果 foundType 不是 "String" 或 "Number"
            console.log("未知的類型");
            break;
        }
      }
    }
  }, [currentFilterColumn]);

  // 篩選：處理更換篩選運算元 以及 初始化篩選欄位
  useEffect(() => {
    // console.log("nowFilterColumn", nowFilterColumn);
    if (filterOperatorList)
      setCurrentFilterOperator(filterOperatorList[0]["title"]);
  }, [filterOperatorList]);

  // 資料處理：上一頁
  const handleLastPage = () => {
    const _nowPage = currentPage;
    const _lastPage = currentPage - 1;
    if (_lastPage != 0) setCurrentPage(_lastPage);
  };
  // 資料處理：下一頁
  const handleNextPage = () => {
    const _nowPage = currentPage;
    const _nextPage = currentPage + 1;
    if (_nextPage <= totalPages) setCurrentPage(_nextPage);
  };

  // 篩選：開啟進階篩選
  const handleFunnelClick = () => {
    setIsAdvanceSearchExpanded(!isAdvanceSearchExpanded);
  };

  // 篩選：篩選不同欄位時的處理
  const handleFilterColumnChange = (title) => {
    console.log("title", title);
    setCurrentFilterColumn(title);
  };
  // 篩選：篩選不同運算元時的處理
  const handleFilterOperatorChange = (operator) => {
    console.log("operator", operator);
    setCurrentFilterOperator(operator);
  };
  // 篩選：篩選輸入文字
  const handleInputChange = (text) => {
    setFilterValue(text);
  };

  // 元件區
  // 篩選：欄位名稱 元件
  function FilterColumnTitle({ content }) {
    return (
      <div className="flex w-[10rem] h-max text-text_color_300 font-bold justify-start">
        {content}
      </div>
    );
  }
  // 篩選：選擇欄位 元件
  function FilterColumnSelect({ options }) {
    return (
      <div className="flex w-[10rem] h-[2rem] text-primary_500 font-semibold border-[1px] border-content_bg_200 rounded-[5px]">
        <select
          className="w-full h-full bg-white rounded-[5px] px-2 cursor-pointer"
          style={{ outline: "none" }}
          value={currentFilterColumn ? currentFilterColumn : ""}
          onChange={(e) => handleFilterColumnChange(e.target.value)}
        >
          {options.map((option, oIdx) => (
            <option key={oIdx}>{option.title}</option>
          ))}
        </select>
      </div>
    );
  }

  // 篩選：選擇運算元 元件
  function FilterOperatorSelect({ options }) {
    return (
      <div className="flex w-[10rem] h-[2rem] text-primary_500 font-semibold border-[1px] border-content_bg_200 rounded-[5px]">
        <select
          className="w-full h-full bg-white rounded-[5px] px-2 cursor-pointer"
          style={{ outline: "none" }}
          value={currentfilterOperator ? currentfilterOperator : ""}
          onChange={(e) => {
            handleFilterOperatorChange(e.target.value);
          }}
        >
          {options.map((option, oIdx) => (
            <option key={oIdx}>{option.title}</option>
          ))}
        </select>
      </div>
    );
  }

  // 打開Drawer
  const toggleDrawer = (newOpen) => {
    // console.log("out new", newOpen);
    setIsToggleOpen(newOpen);
    setUserId("");
  };

  return (
    <>
      {/* 外層 */}
      <div className="flex flex-col w-full h-full bg-content_bg_0">
        {/* 處理 New Sort Filter session */}
        <div className="flex w-full h-[3.5rem] bg-content_bg_100 items-center select-none">
          <div className="flex h-full items-center px-2 gap-2">
            {/* 進階搜尋 */}
            <div
              ref={advanceSearchRef}
              className="relative flex w-max h-full rounded hover:bg-primary_content_bg_100 px-2"
            >
              <div
                className="flex h-full font-bold items-center gap-2 cursor-pointer"
                onClick={handleFunnelClick}
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-primary_500 font-black" />
                <span>篩選搜尋</span>
              </div>
              {/* 處理延展的container */}
              <div
                className="absolute top-[2rem] left-0 h-max bg-white rounded-[5px] overflow-hidden transition-width duration-150"
                style={{
                  width: isAdvanceSearchExpanded ? "34rem" : "0",
                  paddingTop: isAdvanceSearchExpanded ? "1rem" : "0",
                  paddingBottom: isAdvanceSearchExpanded ? "1rem" : "0",
                  paddingRight: isAdvanceSearchExpanded ? "1.5rem" : "0",
                  paddingLeft: isAdvanceSearchExpanded ? "1.5rem" : "0",
                  boxShadow: isAdvanceSearchExpanded
                    ? "0 4px 25px #A1CCDB"
                    : "none",
                }}
              >
                {/* 分層處理 */}
                <div className="flex flex-col w-max h-full gap-2">
                  <div className="flex w-max h-1/3 px-2 gap-2">
                    {/* 欄位名稱 */}
                    <FilterColumnTitle content={"篩選欄位"} />
                    {/* 搜尋條件 */}
                    <FilterColumnTitle content={"篩選條件"} />
                    {/* 搜尋輸入 */}
                    <FilterColumnTitle content={"搜尋"} />
                  </div>
                  <div className="flex w-max h-2/3 items-center gap-2">
                    <FilterColumnSelect options={columns ? columns : []} />
                    <FilterOperatorSelect
                      options={filterOperatorList ? filterOperatorList : []}
                    />
                    <div className="flex w-[10rem] h-[2rem]">
                      <input
                        className="w-full h-full bg-white border-[1px] border-content_bg_200 text-primary_500 font-semibold rounded-[5px] px-2"
                        style={{ outline: "none" }}
                        value={filterValue ? filterValue : ""}
                        onChange={(e) => handleInputChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* datas */}
        <div className="flex w-full h-[3rem] text-lg font-bold bg-content_bg_0 items-center px-2 gap-2">
          {columns.map((column, cIdx) => (
            <div
              key={cIdx}
              className="h-max bg-content_bg_0"
              style={{ width: cIdx == 0 ? "3rem" : "13rem" }}
            >
              {column.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full h-full text-lg bg-content_bg_0 overflow-y-auto">
          {currentPageDatas &&
            currentPageDatas.map((row, rIdx) => (
              <div
                key={rIdx}
                className="flex w-full h-max bg-content_bg_0 hover:bg-content_bg_200 border-b-[1px] px-2 justify-between"
              >
                <div className="flex w-full gap-2">
                  {row.map((data, dIdx) => (
                    <div
                      key={dIdx}
                      className="h-max py-2 truncate"
                      style={{ width: dIdx == 0 ? "3rem" : "13rem" }}
                      onClick={() => {
                        console.log("id", row[0].column);
                        setUserId(row[0].column);
                      }}
                    >
                      {data.isShow ? data.data : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {/* footer */}
        <div className="flex w-full h-[3.5rem] bg-content_bg_100 justify-end items-center gap-4 pr-4 select-none">
          <span>每頁筆數：{datasNumberOfPerPage}</span>
          <span>
            {currentPage} / {totalPages}
          </span>
          <span
            className="text-lg text-content_bg_200 hover:text-primary_500 font-bold cursor-pointer"
            onClick={handleLastPage}
          >
            {"<"}
          </span>
          <span
            className="text-lg text-content_bg_200 hover:text-primary_500 font-bold cursor-pointer"
            onClick={handleNextPage}
          >
            {">"}
          </span>
        </div>
      </div>
      <AdminEditDrawer
        isOpen={isToggleOpen}
        toggleDrawer={toggleDrawer}
        userId={userId}
      />
    </>
  );
}
