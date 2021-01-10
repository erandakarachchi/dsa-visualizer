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
  const [searchKeyValue, setSearchKeyValue] = useState(10)

  const delay = (delayInMS) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInMS); //delay in milliseconds
    });
  };
  const _renderList = ({ list }) => {
    console.log("RENDERING");
    console.log(" LOW : ", listLow, "MID : ", listMid, "HIGH : ", listHigh);
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
    let count = 0;
    const list = [...itemList.current];
    let low = 0;
    let high = list.length - 1;
    let mid = 0;
    while (low <= high) {
      count++;
      mid = Math.trunc((low + high) / 2);
      setListMid(mid);
      await delay(500);
      console.log("COMPARE : ", list[mid], " ==== ", searchFor)
      if (list[mid] === searchFor) {
        console.log("COUNT :: ", count);
        console.log("ITEM FOUND")
        setItemFound("found");
        setListHigh(-1)
        setListLow(-1)
        return true;
      } else if (searchFor > mid) {
        low = mid + 1;
        setListLow(low);
      } else {
        high = mid - 1;
        setListHigh(high);
      }
    }
    console.log("COUNT :: ", count);
    setItemFound("not-found");
    console.log("ITEM NOT FOUND : EXITING")
    return false;
  };

  const _onInputChange = ({ target: { value } }) => {
    console.log(value);
    if (value && value !== searchKeyValue) {
      try {
        const search = parseInt(value);
        setSearchKeyValue(search)
      } catch (error) {

      }

    }
  }

  useEffect(() => {
    if (!itemFound) {
      console.log("SEARCH FOR : ", searchKeyValue);

    }
  }, [itemFound]);

  const _onStartPress = () => {
    setListHigh(itemList.current.length - 1);
    setListLow(0);
    setItemFound("");
    _binarySearch(searchKeyValue);
  };

  return (
    <div className={'main-container'}>
      <p className="header-title">Binary Search</p>
      <div className={'control-container'}>
        <input
          className={"input-box"}
          id="outlined"
          placeholder={"Enter a value to search"}
          onChange={_onInputChange}
        />
        <button className={"button-box"} onClick={_onStartPress}>Start</button>
      </div>
      <div className={"container"}>
        {_renderList({ list: itemList.current })}
      </div>
    </div>
  );
}

export default Container;
