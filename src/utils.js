const readInfoKey = "readingStatus";

let readInfoInMemo = null;
let isInit = false;

const initReadInfo = (getAllBookIds) => {
  // just run once in init time
  if (isInit) return;
  isInit = true;

  const readInfo = window.localStorage.getItem("readInfoKey");

  if (readInfo && /* Validator(readInfo) */ true) {
    readInfoInMemo = JSON.parse(readInfo);
    return;
  }
  readInfoInMemo = {
    read: [],
    unread: getAllBookIds(),
    lastChangeTime: new Date(),
  };

  /* readInfo like this
  {
    read: [],
    unread: [],
    lastChangeTime: new Date()
  }
  */
};

const updateReadInfo = (handleFn) => {
  if (!readInfoInMemo) {
    console.error("do not get readInfoInMemo here");
    return;
  }
  try {
    handleFn();
  } catch (e) {
    console.error("updateReadInfo error occur", e);
    return;
  }

  readInfoInMemo.lastChangeTime = new Date().getTime();
  window.localStorage.setItem("readInfoKey", JSON.stringify(readInfoInMemo));
};

const moveIdsToOtherPlace = (props1, props2, ids = []) => {
  const array1 = readInfoInMemo[props1];
  const array2 = readInfoInMemo[props2];

  const existIds = [];
  const array1AfterFilter = [];
  array1.forEach((id) => {
    if (ids.includes(id)) {
      existIds.push(id);
      return;
    }
    array1AfterFilter.push(id);
  });

  readInfoInMemo[props1] = array1AfterFilter;
  readInfoInMemo[props2] = [...array2, ...existIds];
};

const readBookByIds = (ids) => {
  updateReadInfo(() => {
    moveIdsToOtherPlace("read", "unread", ids);
  });
};

const unreadBookByIds = (ids) => {
  updateReadInfo(() => {
    moveIdsToOtherPlace("unread", "read", ids);
  });
};

export { readInfoInMemo, initReadInfo, readBookByIds, unreadBookByIds };
