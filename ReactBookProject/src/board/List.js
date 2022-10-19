import {Fragment, useState, useEffect} from "react";
import axios from "axios"; 
import { NavLink } from "react-router-dom";

function List() {

    // 변수 설정
    const [boardList, setBoardList] = useState([]); 
    const [curpage, setCurpage] = useState(1);
    const [totalpage, setTotalpage] = useState(0);



    // 데이터 읽기
    useEffect(() => {

        // 목록
        axios.get("http://localhost/board/list_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data)
            setBoardList(result.data)
        })
    }, [])


    useEffect(() => {

        // 전체 페이지
        axios.get("http://localhost/board/total_react")
        .then(result => {
            console.log(result.data)
            setTotalpage(result.data)
        })
    })


    let html = boardList.map((board) => 
        <tr>
            <td className={"text-center"} width={"10%"}>{board.no}</td>
            <td className={"text-left"} width={"45%"}><NavLink to={"/board/detail/" + board.no}>{board.subject}</NavLink></td>
            <td className={"text-center"} width={"15%"}>{board.name}</td>
            <td className={"text-center"} width={"20%"}>{board.regdate}</td>
            <td className={"text-center"} width={"10%"}>{board.hit}</td>
        </tr>
    )

    const prevHandler = () => {
        setCurpage(curpage>1?curpage-1:curpage); // 값 설정
        axios.get("http://localhost/board/list_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data)
            setBoardList(result.data) // result가 가지고 있는 data 출력
        })
        
    }

    const nextHandler = () => {
        setCurpage(curpage<totalpage?curpage+1:curpage);
        axios.get("http://localhost/board/list_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data)
            setBoardList(result.data) // result가 가지고 있는 data 출력
            
        })
    }


    return(
        <div className={"container-fluid"}>
            <div className={"row row1"}>
                <div style={{"height": "30px"}}></div>
                <h1 className={"text-center"}>자유 게시판</h1><hr />
                <table className={"table"}>
                    <tbody>
                        <td>
                            <NavLink to={"/board/insert"} className={"btn btn-sm btn-info"}>새 글</NavLink>
                        </td>
                    </tbody>
                </table>
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row row1"}>
                <table className={"table"}>
                    <thead>
                        <tr className={"top"}>
                            <th className={"text-center"} width={"10%"}>번호</th>
                            <th className={"text-center"} width={"45%"}>제목</th>
                            <th className={"text-center"} width={"15%"}>이름</th>
                            <th className={"text-center"} width={"20%"}>작성일</th>
                            <th className={"text-center"} width={"10%"}>조회수</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {html}
                    </tbody>
                </table>
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row row1"}>
                <div className={"text-center"}>
                    <button className={"btn btn-sm btn-info" } onClick={prevHandler}>이전</button>
                        {curpage} page / {totalpage} pages
                    <button className={"btn btn-sm btn-info"} onClick={nextHandler}>다음</button>
                    <div style={{"height": "70px"}}></div>
                </div>
            </div>
        </div>
        
    )
}

export default List;