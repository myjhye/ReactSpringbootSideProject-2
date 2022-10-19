import { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Routers, Routes} from "react-router-dom";

import Header from "./main/Header"
import Footer from './main/Footer';
import BookList from './book/BookList';
import BookDetail from './book/BookDetail';
import List from './board/List';
import Insert from './board/Insert';
import Detail from './board/Detail';
import NewsFind from './news/NewsFind';
import BookFind from './book/BookFind';
import Update from './board/Update';
import CateList from './book/CateList';

function App() {
  return (
    <Router>
      <Header /> 
        <div className={"container-fluid"}>
          <Routes>
            <Route exact path={"/"} element={<BookList />} />
            <Route path={"/book/book_detail/:no"} element = {<BookDetail />} />
            <Route path={"/board/list"} element={<List />} />
            <Route path={"/book/list?cate=:cate"} element={<CateList />} />
            <Route path={"/board/insert"} element={<Insert />} />
            <Route path={"/board/detail/:no"} element={<Detail />} />
            <Route path={"/board/update/:no"} element={<Update />} />
            <Route path={"/news/find"} element={<NewsFind />} />
            <Route path={"/book/find"} element={<BookFind />} />
          </Routes>
        </div>
      <Footer />
    </Router>
  )
}

export default App;