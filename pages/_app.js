import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";

//Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Layout from "../components/layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth";

//loader
import Loader from "../util/loader";
import "../styles/loader.scss";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  const [loader, setLoader] = useState(false);

  // swiper Slider config
  SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

  return (
    <AuthProvider>
      {loader ? (
        <Loader isFirst setLoader={(bool) => setLoader(bool)} />
      ) : (
        <Layout
          customize={pageProps.customize}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        >
          <ToastContainer pauseOnHover theme="colored" />
          <React.StrictMode>
            <Component
              {...pageProps}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </React.StrictMode>
        </Layout>
      )}
    </AuthProvider>
  );
}

export default MyApp;
