import "./App.css";
import Navbar from "./components/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import BuildForm from "./pages/BuildForm";
import PreviewForm from "./pages/PreviewForm";
import { Provider } from "react-redux";
import store from "./utils/store/store";
import Alert from "./components/Alert";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Alert/>
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
