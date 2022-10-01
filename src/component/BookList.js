import BookItem from "./BookItem";
import {useContext, useMemo} from "react";
import {css} from "@emotion/css";
import coreData from "../fixedData";
import {cloneDeep} from "lodash";
import globalContext from "../Context";

function Grade(props) {
  const {grade} = props;
  return (
    <div
      className={css`
        margin-top: 20px;
      `}
    >
      <div
        className={css`
          margin-bottom: 10px;
          font-weight: 500;
        `}
        id={grade.id}
      >
        <a
          href={`#${grade.id}`}
          className={css`
            margin-right: 5px;
          `}
        >
          #
        </a>
        {grade.name}
      </div>

      {grade.books.map((item) => {
        return <BookItem book={item}/>;
      })}
    </div>
  );
}

export default function BookList(props) {
  const globalContextVal = useContext(globalContext);
  const {bookAfterFilter} = globalContextVal;
  const gradesListWithBook = useMemo(() => {
    const gradeInfos = [];
    coreData.gradeList.forEach((gradeRaw) => {
      const grade = cloneDeep(gradeRaw);
      const {id} = grade;
      const gradeBookList = [];

      bookAfterFilter.forEach((book) => {
        if (book.grade.id === id) {
          gradeBookList.push(book);
        }
      });
      if (gradeBookList.length > 0) {
        const gradeCNName = coreData.gradeIDToCnList[id];
        gradeInfos.push({
          ...grade,
          name: gradeCNName,
          books: gradeBookList,
        });
      }
    });
    return gradeInfos;
  }, [bookAfterFilter]);
  return (
    <div
      className={css`
        margin: 20px auto;
        max-width: 820px;
        padding: 0 10px 250px 10px;
        font-size: 20px;
      `}
    >
      {gradesListWithBook.map((grade) => {
        return <Grade grade={grade}/>;
      })}
    </div>
  );
}
