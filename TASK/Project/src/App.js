import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

import Searchbar from "./Components/Searchbar";
import MyNavigation from "./MyNavigation";
import store from "./State/store";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <Header />
        <Searchbar />

        <MyNavigation />
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
