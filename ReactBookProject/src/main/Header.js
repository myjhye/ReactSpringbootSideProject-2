import { NavLink } from "react-router-dom";

function Header()
{
    return (
        <div className="topnav">
            <a className="active" href="/">Home</a>
            <a href="/book/list?cate=1">총류</a>
            <a href="/book/list?cate=2">철학</a>
            <a href="/book/list?cate=3">종교</a>
            <a href="/book/list?cate=4">사회과학</a>
            <a></a>
            <NavLink to="/board/list">자유게시판</NavLink>
            <NavLink to="/book/find">서적 검색</NavLink>
            <NavLink to="/news/find">뉴스 검색</NavLink>
        </div>
    )
}

export default Header;