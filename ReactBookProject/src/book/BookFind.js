import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function BookFind() {

    // 변수 잡기
    const [bookList, setBookList] = useState([]);
    const [curpage, setCurpage] = useState(1);
    const [totalpage, setTotalpage] = useState(0);
    const [ss, setSs] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost/book/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setBookList(result.data);
        })
    }, [])


    // 총 페이지
    useEffect(() => {
        axios.get("http://localhost/book/find_totalpage", {
            params: {
                ss: ss
            }
        }).then(result => {
            console.log(result.data)
            setTotalpage(result.data)
        })
    }, {})


    // 데이터 출력
    let html = bookList.map((book) => 
        <div className="col-md-3">
            <div className="thumbnail">
                <NavLink to={"/book/book_detail/" + book.no}>
                    <img src={book.img} alt="Lights" style={{"height":"300px", "width":"250px"}} />
                    <div className="caption">
                        <p> {book.title} </p>
                    </div>
                </NavLink>
            </div>
        </div>
    )


    // 이벤트 등록
    const findHandler = () => {

        setCurpage(1) // 찾을 때 1페이지에서

        // 찾기
        axios.get("http://localhost/book/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setBookList(result.data);
        })


        // 총 페이지
        axios.get("http://localhost/book/find_totalpage", {
            params: {
                ss: ss
            }
        }).then(result => {
            console.log(result.data)
            setTotalpage(result.data)
        })
    }


    const changeHandler = (e) => {
        setSs(e.target.value)
    }


    const prevHandler = () => {
        setCurpage(curpage>1?curpage-1:curpage);
        axios.get("http://localhost/book/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setBookList(result.data);
        })
        
    }

    const nextHandler = () => {
        setCurpage(curpage<totalpage?curpage+1:curpage);
        axios.get("http://localhost/book/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setBookList(result.data);
        })
    }


    // view의 역할 => JSP, MVC => 화면 출력
    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div style={{"height": "50px"}}></div>
                <h1 className={"text-center"}>서적 검색</h1><hr />
                <input type={"text"} placeholder={"서적 이름을 입력하세요"} size={"20"} className={"input-sm"} onChange={changeHandler} 
                    value={ss} // 검색어 유지
                />
                <button className={"btn btn-sm btn-success"} onClick={findHandler}>검색</button>
                <div style={{"height": "40px"}}></div>
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row"}>
                {html}
            </div>
            <div style={{"height": "100px"}}></div>
            {<div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn-btn-sm btn-success"} onClick={prevHandler}>이전</button>
                        {curpage} page / {totalpage} pages
                    <button className={"btn-btn-sm btn-success"} onClick={nextHandler}>다음</button>
                    <div style={{"height": "100px"}}></div>
                </div>
            </div> }
        </div>
    )
}

export default BookFind;