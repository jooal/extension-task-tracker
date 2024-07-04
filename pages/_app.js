import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { TaskProvider } from "../contexts/TaskContext";
export default function App({ Component, pageProps }) {
  return (
    <>
      <TaskProvider>
        {/* <Header/> */}
        <Component {...pageProps} />
        <Footer />
      </TaskProvider>
    </>
  );
}
