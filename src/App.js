import React from "react";
import './assets/css/style.css';
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from './utils/theme';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./containers/header";
import { Footer } from "./containers/footer";
import { Login } from './pages/login/index'
import { Register } from './pages/register/index'
import { User } from './pages/user/index'
import { Category  } from './pages/category/index'
import { Book } from './pages/book/index'
import { BookList } from './pages/book-listing'
import { EditCategory } from './pages/category/editCategory/index'
import { EditUser } from './pages/user/editUser/index'
import { EditBook } from './pages/book/editBook/index'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<></>}>
        <BrowserRouter>
          <div className="wrapper">
            <Header />
            <main>
              <Routes>
                <Route exact path="/" element={<BookList/>} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/user" element={<User/>} />
                <Route exact path="/edit-user/:id" element={<EditUser/>} />
                <Route exact path="/category" element={<Category />} />
                <Route exact path="/edit-category/:id" element={<EditCategory/>} />
                <Route exact path="/add-category" element={<EditCategory/>} />
                <Route exact path="/book" element={<Book/>} />
                <Route exact path="/edit-book/:id" element={<EditBook/>} />
                <Route exact path="/add-book" element={<EditBook/>} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer />
        </BrowserRouter>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
