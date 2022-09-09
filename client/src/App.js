import { GlobalStyle } from "./styles/App.style";
// import { Menu } from "antd";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./components/pages/NotFound";
import { VideoLists } from "./components/pages/VideoLists";
import { UploadForm } from "./components/pages/UploadForm";

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Menu mode="horizontal">
        <Menu.Item key="mail">Videos</Menu.Item>
      </Menu> */}
      <Routes>
        <Route path="/" element={<VideoLists />} />
        <Route path="/video" element={<UploadForm />} />
        <Route
          path="*"
          element={
            <NotFound title="Sorry, the page you are trying to view does not exist" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
