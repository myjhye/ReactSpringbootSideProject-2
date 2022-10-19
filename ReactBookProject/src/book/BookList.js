import {Fragment, useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";


function BookList()
{
    // 변수 설정
    const [bookList, setBookList] = useState([]);
    const [curpage, setCurpage] = useState(1);
    const [totalpage, setTotalpage] = useState(0);
    

    // 스프링 부트에서 데이터 읽기 => JSON이나 일반 데이터형만 보낼 수 있음
    // 목록
    useEffect(() => {
        axios.get("http://localhost/book/list_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setBookList(result.data);
        })
    }, [])

    // 전체 페이지
    useEffect(() => {
        axios.get("http://localhost/book/list_total").then(result => {
            console.log(result.data);
            setTotalpage(result.data);
        })
    }, {})



    // 읽어온 데이터 출력
    let html = bookList.map((book) => 
    <div className="gallery">
        <NavLink to={"/book/book_detail/" + book.no}>
            <img src={book.img} width="1200" height="700" />
            <h4 className="desc">{book.title}</h4>
            <div className="desc">{book.author}</div>
            <div className="desc">{book.pinfo}</div>
        </NavLink>
    </div>

    )


    // 이벤트 등록
    const prevHandler = () => {
        setCurpage(curpage>1?curpage-1:curpage)
        axios.get("http://localhost/book/list_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setBookList(result.data);
        })
    }

    const nextHandler = () => {
        setCurpage(curpage<totalpage?curpage+1:curpage)
        axios.get("http://localhost/book/list_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setBookList(result.data);
        })
    }


    return (
        <Fragment>
            <div className={"row"}>
                <div style={{"height": "40px"}}></div>
                <h1 className={"text-center"}>전체 목록</h1><hr />
                <div style={{"height": "40px"}}></div>
                {html}  
            </div>
            <div style={{"height": "50px"}}></div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn-btn-sm btn-success"} onClick={prevHandler}>이전</button>
                        {curpage} page / {totalpage} pages
                    <button className={"btn-btn-sm btn-success"} onClick={nextHandler}>다음</button>
                </div>
            </div>
            <div style={{"height": "70px"}}></div>
        </Fragment>
        
    )
}

export default BookList