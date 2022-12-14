import React, { useState } from "react";
import FilmCard from "../../components/films/filmCard/FilmCard";
import Styles from "./filmsPage.module.css";
import { Pagination, Radio } from "antd";
import Head from "next/head";

function Films() {
  const [value, setValue] = useState("");
  const options = [
    { value: "Dream", label: "Dream" },
    { value: "Educational_science", label: "Educational_science" },
    { value: "Historical", label: "Historical" },
    { value: "Comedy", label: "Comedy" },
  ];

  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue(value);
  };

  return (
    <div className={Styles.main_wrapper}>
      <Head>
        <title>Films | TopFilm</title>
      </Head>
      <Radio.Group
        options={options}
        onChange={onChange3}
        value={value}
        optionType="button"
        className={Styles.radio_wrapper}
      />
      <FilmCard />
      <FilmCard />
      <FilmCard />
      <FilmCard />
      <FilmCard />
      <FilmCard />

      <Pagination size="small" total={50} pageSize={5} />
    </div>
  );
}

export default Films;
