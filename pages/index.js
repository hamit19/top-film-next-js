import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SubSlider from "../components/film/filmSlider/SubSlider";
import { Divider } from "antd";
import HeaderSlider from "../components/slider/HeaderSlider";
import Banner from "../components/banner/Banner";
import PlanBox from "../components/planBox/PlanBox";
import classNames from "classnames";
import { useRouter } from "next/router";

const connectToDatabase = require("../util/mongodb");

const baseURL = "http://localhost:3000";

const bannersData = [
  {
    id: 1,
    title: "Banner Number one!",
    content: "Watch it Now for free!",
    image: "/assets/slider/slide1.jpg",
  },
  {
    id: 2,
    title: "Banner Number one!",
    content: "Watch it Now for free!",
    image: "/assets/slider/slider8.jpg",
  },
];

export default function Home({ darkMode, setDarkMode, isConnected, data }) {
  // console.log(isConnected, "is status of db");

  const { popular, latest, oldest } = data;

  console.log(data)

  const renderBanners = () => {
    return bannersData.map((banner) => (
      <Banner
        title={banner.title}
        id={banner.id}
        content={banner.content}
        image={banner.image}
        key={banner.id}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> Home | TopFilm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HeaderSlider key="headerSlider" />

        <div className={styles.sliders_main_wrapper}>
          <div className={styles.banners_container}>{renderBanners()}</div>

          <div className={styles.sliders_wrapper}>
            <Divider orientation="left" style={{ fontSize: "24px" }}>
              The Most Top Films
            </Divider>
            <SubSlider key="mostPopular" data={popular} />
          </div>

          <div className={styles.sliders_wrapper}>
            <Divider orientation="left" style={{ fontSize: "24px" }}>
              The Latest Films
            </Divider>
            <SubSlider key="mostPopular" data={latest} />
          </div>

          <div className={styles.sliders_wrapper}>
            <Divider orientation="left" style={{ fontSize: "24px" }}>
              The Oldest Films
            </Divider>
            <SubSlider key="mostPopular" data={oldest} />
          </div>

          <div className={styles.plan_box_wrapper}>
            <div className={styles.plan_box_container}>
              <PlanBox
                key="trailerPlan"
                title="Trailer Plan"
                subTitle="You can try our services for a month"
                price={"$5.99"}
                time="monthly"
                download="0"
                tvChannel="+5"
              />
            </div>
            <div className={styles.plan_box_container}>
              <PlanBox
                key="simplePlan"
                title="Simple Plan"
                subTitle="You can use our services for 3 months"
                price={"$5.99"}
                time="monthly"
                download="+20"
                tvChannel="+15"
              />
            </div>
            <div
              className={classNames(
                styles.plan_box_container,
                styles.recommended_plan
              )}
            >
              <PlanBox
                key="familyPlan"
                title="Family Plan"
                subTitle="You can use our services for 6 months"
                price={"$3.99"}
                time="monthly"
                download="+500"
                tvChannel="+100"
                recommended
              />
            </div>
            <div className={styles.plan_box_container}>
              <PlanBox
                key="fullPlan"
                title="Full Plan"
                subTitle="You can use our services for a year"
                price={"$10.99"}
                time="monthly"
                download="+1000"
                tvChannel="+500"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await connectToDatabase();
  const isConnected = client.connections[0].readyState;

  const res = await fetch(`${baseURL}/api/films`);

  const data = await res.json();

  return {
    props: {
      isConnected,
      data,
    },
  };
}
