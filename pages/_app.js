import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

//Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Layout from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <Layout
      customize={pageProps.customize}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
    </Layout>
  );
}

export default MyApp;
