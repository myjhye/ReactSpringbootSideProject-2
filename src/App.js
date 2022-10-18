import './App.css';
import { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Routers, Routes} from "react-router-dom";
// Routes = Switch = 화면 변경

import Header from "./main/Header"
import Footer from './main/Footer';
import Category from './food/Category';
import GoodsAll from './goods/GoodsAll';
import GoodsBest from './goods/GoodsBest';
import GoodsSpecial from './goods/GoodsSpecial';
import GoodsNew from './goods/GoodsNew';
import Goods__Main from './goods/Goods_Main';
import List from './board/List';
import FoodList from './food/FoodList';
import FoodDetail from './food/FoodDetail';
import RecipeFind from './recipe/RecipeFind';
import NewsFind from './news/NewsFind';
import Insert from './board/Insert';
import Detail from './board/Detail';


class App extends Component {
  constructor(props) {
    super(props);
  }

  // render => 화면 디자인 => 화면 출력하는 html 생성
  // include
  render() {
    /*
      Route : Controller  => ex)/goods/all
      path :  @requestMapping
      element : @requestMapping 하단에 있는 메서드
      ==> path에서 element를 실행
    */
    return ( // 화면 바뀌는 영역
      <Router> 
        <Fragment>
          <Header />
            <div className={"container-fluid"}>
              <Routes> 
                <Route exact path={"/"} element={<Category />} />
                <Route path={"/food/list/:cno"} element={<FoodList />}/>
                <Route path={"/food/detail/:fno"} element={<FoodDetail />}/>
                <Route path={"/goods/all"} element={<GoodsAll />} />
                <Route path={"/goods/best"} element={<GoodsBest />} />
                <Route path={"/goods/special"} element={<GoodsSpecial />} />
                <Route path={"/goods/new"} element={<GoodsNew />} />
                <Route path={"/board/list"} element={<List />} />
                <Route path={"/board/insert"} element={<Insert />} />
                <Route path={"/board/detail/:no"} element={<Detail />} />
                <Route path={"/recipe/find"} element={<RecipeFind />} />
                <Route path={"/news/find"} element={<NewsFind />} />
              </Routes>
            </div>
          <Footer />
        </Fragment>
      </Router>      
    ) // msg 값을 props 변수에 담아 index.js에 넘김
  } 
} 

export default App;