import React, { useEffect, useState, useRef } from "react";
import Node from "./Node";
import "./styles.css";

const Container = () => {
  const itemList = useRef([
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
    26,
    27,
    28, 29, 30, 31, 32, 33, 34, 35, 36
  ]);
  const [listLow, setListLow] = useState(0);
  const [listHigh, setListHigh] = useState(itemList.current.length - 1);
  const [listMid, setListMid] = useState(0);
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
      await delay(500);
      console.log("HIGH : ", high, ' MID : ', mid, ' LOW : ', low)
      console.log(list[mid], "=== ", searchFor)
      if (list[mid] === searchFor) {
        setItemFound("found");
        setListHigh(-1)
        setListLow(-1)
        return true;
      } else if (searchFor > list[mid]) {
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



  const _onStartPress = () => {
    setListHigh(itemList.current.length - 1);
    setListLow(0);
    setItemFound("");
    _binarySearch(searchKeyValue);
  };

  return (
    <div className={'main-container'}>
      <label className="header-title">BINARY SEARCH</label>
      <hr className='hr-line' />
      <div className={'control-container'}>
        <input
          className={"input-box"}
          id="outlined"
          placeholder={"Enter a value to search"}
          onChange={_onInputChange}
        />
        <button className={"button-box"} onClick={_onStartPress}>Start</button>
      </div>
      <div className="key-container">
        <div className="flex-1 key-item-container">
          <div className="key-item key-item-low"></div>
          <label>Low {listLow}</label>
        </div>
        <div className="flex-1 key-item-container">
          <div className="key-item key-item-mid"></div>
          <label>Mid {listMid}</label>
        </div>
        <div className="flex-1 key-item-container">
          <div className="key-item key-item-high"></div>
          <label>High {listHigh}</label>
        </div>
      </div>
      <div className={"node-container"}>
        {_renderList({ list: itemList.current })}
      </div>
      <div>
        <label>Computations Taken : </label>
        <label>Item Found  :</label>
      </div>
    </div>
  );
}

export default Container;
