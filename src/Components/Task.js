import React, { useEffect, useState } from "react";
import "./Task.css";

export const Task = () => {
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  console.log(data);

  const handleSUbmit = (e) => {
    e.preventDefault();
console.log("first")
    let curName = getName(fileName, data);
    if (fileName) {
      if (fileName.includes(".")) {
        if (data) {
          setData([...data, curName]);
        } else {
          setData([...curName]);
        }
        console.log(data);
      } else {
        alert("file name format is name.extention example: book.pdf");
      }
    } else {
      alert("please fill the input box empty input not allowed...");
    }
console.log("helloooo");
    setFileName("");
  };

  const handleFiles = (e) => {
    let file = e.target.files[0];
    let fileName = file.name;

    let curName = getName(fileName, files);

    if (files) {
      setFiles([...files, curName]);
    } else {
      setFiles([...curName]);
    }
  };

  const getName = (fileName, data) => {
    if (fileName) {
      let [name, end] = fileName.split(".");
      let num = 0;
      let curName = `${name}.${end}`;
      let exists = data?.filter((f) => f === curName).length;
      while (exists) {
        console.log("curName:", curName, "exists:", exists, "num:", num);
        curName = `${name}(${++num}).${end}`;
        exists = data?.filter((f) => f === curName).length;
      }
      return curName;
    }
  };

  const handleDelete = (data, index, setData) => {
    let filterd = data.filter((_, i) => i !== index);
    setData(filterd);
  };

  // Driver code
  let arr = [];
  let start = 0;
  let target = 25;
  for (let i = 1; i <= 100; i++) {
    let random = Math.floor(Math.random() * 100);
    arr.push(random);
  }
  let end = arr.length - 1;

  function binarySearch(arr, start, end, target) {
    console.log(arr.slice(start, end));
    if (start > end) return false;
    let midIndex = Math.floor((start + end) / 2);
    if (arr[midIndex] === target) return true;

    if (arr[midIndex] > target)
      return binarySearch(arr, start, midIndex - 1, target);
    else return binarySearch(arr, midIndex - 1, end, target);
  }

  console.log("binary",binarySearch(arr, start, end, target));

  return (
    <div className="myapp">
      <div className="form">
        <form className="input_form" onSubmit={handleSUbmit}>
          <input
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <form>
          <input type="file" id="file" multiple onChange={handleFiles} />
        </form>
      </div>
      <div className="file_list">
        <div className="from_input">
          {data.map((val, index) => {
            return (
              <div key={index}>
                {index + 1}.{val}
                <button onClick={() => handleDelete(data, index, setData)}>
                  Del
                </button>
              </div>
            );
          })}
        </div>
        <div className="from_file">
          {files.map((e, i) => (
            <div key={i}>
              {e}
              <button onClick={() => handleDelete(files, i, setFiles)}>
                Del
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
