import {css} from "@emotion/css";
import produce from "immer";
import coreData from "../fixedData";
import {FilterBtn, SetBtn} from "./Buttons";
import {Status, allGradesForFilter, allStatusForFilter} from "../constant";
import {useContext} from "react";
import globalContext from "../Context";

export default function Filter(props) {
  const globalContextVal = useContext(globalContext);
  const {filterPrams, setFilterPrams} = globalContextVal;
  const {gradeIds, statuses} = filterPrams;

  const gradeIsAll = gradeIds.length === allGradesForFilter.length;
  const statusesIsAll = statuses.length === allStatusForFilter.length;
  return (
    <div
      className={css`
        margin-top: -50px;
      `}
    >
      <div>
        <div
          className={css`
            display: inline-block;
            box-shadow: 3px -3px 7px #dadada78;
            z-index: 10;
            position: relative;
          `}
        >
          {[
            {
              id: Status.unread,
              text: "已读",
            },
            {
              id: Status.read,
              text: "未读",
            },
          ].map((item) => {
            const {id, text} = item;
            const checked = statuses.includes(id);
            return (
              <FilterBtn
                key={id}
                checked={checked}
                text={text}
                onClick={() => {
                  setFilterPrams(
                    produce((draft) => {
                      if (checked) {
                        draft.statuses = draft.statuses.filter(
                          (item) => item !== id
                        );
                      } else {
                        draft.statuses.push(id);
                      }
                    })
                  );
                }}
              />
            );
          })}

          <SetBtn
            text={statusesIsAll ? "全不选" : "全选"}
            onClick={() => {
              setFilterPrams(
                produce((draft) => {
                  if (statusesIsAll) {
                    draft.statuses = [];
                  } else {
                    draft.statuses = allStatusForFilter;
                  }
                })
              );
            }}
          />
        </div>
      </div>
      <div>
        <div
          className={css`
            display: inline-block;
            box-shadow: 3px -3px 7px #dadada78;
          `}
        >
          {coreData.gradeList.map((grade) => {
            const {id} = grade;
            const checked = gradeIds.includes(id);
            const gradeCNName = coreData.gradeIDToCnList[id];
            return (
              <FilterBtn
                text={gradeCNName}
                checked={checked}
                onClick={() => {
                  setFilterPrams(
                    produce((draft) => {
                      if (checked) {
                        draft.gradeIds = draft.gradeIds.filter(
                          (item) => item !== id
                        );
                      } else {
                        draft.gradeIds.push(id);
                      }
                    })
                  );
                }}
              />
            );
          })}
          <SetBtn
            text={gradeIsAll ? "全不选" : "全选"}
            onClick={() => {
              setFilterPrams(
                produce((draft) => {
                  if (gradeIsAll) {
                    draft.gradeIds = [];
                  } else {
                    draft.gradeIds = allGradesForFilter;
                  }
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
