import {NavLink} from "react-router-dom";


function Header() {
    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">     
                <NavLink className="navbar-brand" to={"/"}>여행&상품</NavLink>
                </div>
                <ul className="nav navbar-nav">
                <li className="active"><NavLink to="/">Home</NavLink></li>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">스토어
                    <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li><NavLink to="../goods/all">전체 목록</NavLink></li>
                        <li><NavLink to="../goods/best">베스트 상품</NavLink></li>
                        <li><NavLink to="../goods/new">신상품</NavLink></li>
                        <li><NavLink to="../goods/special">특가 상품</NavLink></li>
                    </ul>
                </li>
                <li><NavLink to="/board/list">자유 게시판</NavLink></li>
                <li><NavLink to="/recipe/find">레시피 검색</NavLink></li>
                <li><NavLink to="/news/find">뉴스 검색</NavLink></li>
                </ul>
            </div>
            </nav>
    )
}

export default Header;