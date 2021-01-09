import React, { useEffect, useState, useRef } from "react";
import Node from "./Node";
import "./styles.css";

function Container() {
  const itemList = useRef([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
  ]);
  const [listMid, setListMid] = useState(0);
  const [listLow, setListLow] = useState(0);
  const [listHigh, setListHigh] = useState(itemList.current.length - 1);
  const [itemFound, setItemFound] = useState("");
  const delay = (delayInms) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  };
  const _renderList = ({ list }) => {
    console.log("RENDERING");
    return list.map((elem, idx) => {
      if (idx === listMid) {
        return (
          <Node mid={true} low={false} key={idx} high={false} data={elem} />
        );
      } else if (idx === listLow) {
        return (
          <Node mid={false} low={true} key={idx} high={false} data={elem} />
        );
      } else if (idx === listHigh) {
        return (
          <Node mid={false} low={false} key={idx} high={true} data={elem} />
        );
      } else {
        return (
          <Node mid={false} low={false} key={idx} high={false} data={elem} />
        );
      }
    });
  };

  const _binarySearch = async (searchFor) => {
    const list = [...itemList.current];
    let low = 0;
    let high = list.length - 1;
    let mid = 0;
    while (low <= high) {
      mid = Math.trunc((low + high) / 2);
      setListMid(mid);
      await delay(1000);
      if (list[mid] === searchFor) {
        setItemFound("found");
        return true;
      } else if (searchFor > mid) {
        low = mid + 1;
        setListLow(low);
      } else {
        high = mid - 1;
        setListHigh(high);
      }
    }
    setItemFound("not-found");
    return false;
  };

  useEffect(() => {
    if (!itemFound) {
      _binarySearch(21);
    }
  }, [itemFound]);

  const _onStartPress = () => {
    setItemFound("");
  };

  return (
    <div>
      <div>Searching For 21</div>
      <div className={"container"}>
        {_renderList({ list: itemList.current })}
        <div>
          <button onClick={_onStartPress}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default Container;
