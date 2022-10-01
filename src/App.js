import React, {Context, useEffect, useMemo, useState} from "react";
import {cloneDeep} from "lodash";
import produce from "immer";

import {
  BookItem,
  BookList,
  Filter,
  ProgressBar,
  Icons,
  ProgressDetail,
} from "./component";
import GlobalContext from "./Context";
import coreData from "./fixedData";

import {
  readInfoInMemo,
  initReadInfo,
  unreadBookByIds,
  readBookByIds,
} from "./utils";

import {Status, allGradesForFilter, allStatusForFilter} from "./constant";
import "./App.css";
import {css} from "@emotion/css";

const {Gears} = Icons;

const getAllBookIds = () => {
  const bookIds = [];
  coreData.gradeList.forEach((item) => {
    const ids = new Array(item.booksNum).fill("").map((_, index) => {
      // id builder
      return item.id + "-" + (index + 1);
    });
    bookIds.push(...ids);
  });
  return bookIds;
};

const fillCoreDataStatus = () => {
  const ret = cloneDeep(coreData.gradeList);
  const allBooks = new Map();
  coreData.gradeList.forEach((item, gradeIndex) => {
    const books = [];
    new Array(item.booksNum).fill("").map((_, index) => {
      const id = item.id + "-" + (index + 1);
      const status = readInfoInMemo.read.includes(id)
        ? Status.read
        : Status.unread;
      const book = {
        id,
        name: getCNName(id),
        status,
        index: index,
        grade: ret[gradeIndex],
      };
      allBooks.set(id, book);
    });
  });
  return allBooks;
};

const getCNName = (id) => {
  return coreData.bookIDToCnList[id] || "口口";
};

function App() {
  const [showOptBtn, setShowOptBtn] = useState(false);
  const [filterPrams, setFilterPrams] = useState(() => {
    return {
      gradeIds: allGradesForFilter,
      statuses: allStatusForFilter,
    };
  });
  const [allBooks, setAllBooks] = useState(() => {
    initReadInfo(getAllBookIds);
    const booksWithStatus = fillCoreDataStatus();
    return booksWithStatus;
  });

  const [bookAfterFilter, setBookAfterFilter] = useState(() => {
    return [...allBooks].map(([_, book]) => book);
  });

  useEffect(() => {
    const {gradeIds, statuses} = filterPrams;
    const bookAfterFilter = [...allBooks]
      .map(([_, book]) => book)
      .filter((book) => {
        if (!gradeIds.includes(book.grade.id)) {
          return false;
        }
        if (!statuses.includes(book.status)) {
          return false;
        }
        return true;
      });

    setBookAfterFilter(bookAfterFilter);
  }, [allBooks, filterPrams]);

  const contextVal = useMemo(() => {
    return {
      allBooks,
      setAllBooks,
      showOptBtn,
      filterPrams,
      setFilterPrams,
      bookAfterFilter,
      markBookReadStatusById: (id, status) => {
        setAllBooks((store) => {
          const book = allBooks.get(id);
          if (book.status === status) {
            return store;
          }
          if (status === Status.unread) {
            readBookByIds([id]);
          } else {
            unreadBookByIds([id]);
          }

          return produce(allBooks, (draft) => {
            const book = draft.get(id);
            book.status = status;
          });
        });
      },
    };
  }, [showOptBtn, allBooks, setAllBooks, filterPrams, bookAfterFilter]);

  const [unreadNum, readNum, total, percent] = useMemo(() => {
    let unreadNum = 0;
    let readNum = 0;
    let total = bookAfterFilter.length;

    bookAfterFilter.forEach((item) => {
      if (item.status === Status.unread) {
        unreadNum++;
      } else {
        readNum++;
      }
    });

    let percent = total === 0 ? 0 : Math.floor((readNum / total) * 100);

    return [unreadNum, readNum, total, percent];
  }, [bookAfterFilter]);
  return (
    <GlobalContext.Provider value={contextVal}>
      <div className="main">
        <div
          className={css`
            display: none;
            @media (max-width: 830px) {
              display: flex;
            }

            position: fixed;
            top: 5px;
            right: 5px;
            margin: 20px auto;
            height: 15px;
            user-select: none;
            cursor: pointer;

            & svg {
              height: 20px;
              width: 20px;
              margin-right: 3px;
            }
          `}
          onClick={() => {
            setShowOptBtn((show) => !show);
          }}
        >
          <Gears/>
          {showOptBtn ? "退出" : "编辑"}
        </div>
        <div className="bookListWrapper">
          <BookList/>
        </div>
        <div className="progressWrapper">
          <Filter/>
          <ProgressDetail
            unreadNum={unreadNum}
            readNum={readNum}
            total={total}
          />
          <ProgressBar val={percent}/>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
