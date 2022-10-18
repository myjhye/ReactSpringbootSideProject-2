import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

function Detail() {

    const [vo, setVo] = useState({});
    const {no} = useParams();


    useEffect(() => {
        axios.get("http://localhost/board/detail_react", {
            params: {
                no: no,

            }
        }).then(result => {
            console.log(result.data)
            setVo(result.data)
        })
    }, {})

    return (
        <div className={"container-fluid"}>
            <div className={"row row1"}>
                <h1 className={"text-center"}>내용 보기</h1>
                <table className={"table"}>
                    <tbody>
                        <tr>
                            <td width={"20%"} className={"text-center success"}>번호</td>
                            <td width={"30%"} className={"text-center"}>{vo.no}</td>
                            <td width={"20%"} className={"text-center success"}>작성일</td>
                            <td width={"30%"} className={"text-center"}>{vo.regdate}</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className={"text-center success"}>이름</td>
                            <td width={"30%"} className={"text-center"}>{vo.name}</td>
                            <td width={"20%"} className={"text-center success"}>조회수</td>
                            <td width={"30%"} className={"text-center"}>{vo.hit}</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className={"text-center success"}>제목</td>
                            <td colSpan={"3"}>{vo.subject}</td>
                        </tr>
                        <tr>
                            <td colSpan={"4"} height={"200"} className={"text-left"} valign={"top"}>
                                <pre style={{"whiteSpace": "pre-wrap", "backgroundColor": "white", "border": "none"}}>
                                    {vo.content}
                                </pre>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={"4"} className={"text-right"}>
                                <button class={"btn btn-xs btn-info"}>수정</button>
                                <button class={"btn btn-xs btn-warning"}>삭제</button>
                                <NavLink to = {"/board/list"} className={"btn btn-xs btn-success"}>목록</NavLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Detail