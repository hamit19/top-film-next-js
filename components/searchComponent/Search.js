import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
let timeout;
let currentValue;

const fetch = (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/admin/home/banner", {
        params: { text: value },
      });

      callback(data);
    } catch (err) {
      console.log(err, "this is search error log!");
    }
  };

  timeout = setTimeout(fetchData, 300);
};

const SearchInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const [initialFilmData, setInitialFilmData] = useState(
    props.initialValues
      ? { name: props.initialValues.name, id: props.initialValues._id }
      : null
  );

  const handleSearch = (newValue) => {
    setInitialFilmData(null);

    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const options = () => {
    if (initialFilmData) {
      return [
        {
          value: initialFilmData.id,
          label: initialFilmData.name,
          key: initialFilmData.id,
        },
      ];
    } else
      return (data || []).map((d) => ({
        value: d._id,
        label: d.name,
        key: d._id,
      }));
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={initialFilmData ? true : false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={options()}
      onSelect={(value) => props.getValue(value)}
      defaultValue={initialFilmData ? initialFilmData.id : null}
    />
  );
};

const Search = ({ getValue, initialValues }) => (
  <SearchInput
    placeholder='input search text'
    style={{
      width: 200,
    }}
    getValue={getValue}
    initialValues={initialValues}
  />
);
export default Search;
