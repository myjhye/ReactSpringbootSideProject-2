import axios from "axios";
import { Fragment, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Update() {
    
    const [boardList, setBoardList] = useState([]);
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [pwd, setPwd] = useState("");
    const location = useLocation();
    const nameChange = (e) => {

        setName(e.target.value);
        
    }
    const subjectChange = (e) => {

        setSubject(e.target.value);
    }
    const contentChange = (e) => {

        setContent(e.target.value);
    }
    const pwdChange = (e) => {

        setPwd(e.target.value);
    }


    // 작성처리
    const writeClick = () => {
        axios.get("http://localhost/board/update_react", {
            params: {
                name: name,
                subject: subject,
                content: content,
                pwd: pwd
            }
        }).then(result => {
            window.location.href = "/board/list";
            // 작성 후 이동 == sendRedirect()
        })
    }
    

    
    return (
        <div className={"container-fluid"}>
            <div style={{"height": "30px"}}></div>
            <h1 className={"text-center"}>수정하기</h1>
            <div className={"row row1"}>
                <table className={"table"}>
                    <tbody>
                        <tr>
                            <th width={"20%"} className={"text-right success"}>이름</th>
                            <td width={"80%"}>
                                <input type={"text"} size={"15"} className={"input-sm"} 
                                            onChange={nameChange} value={name}/>
                            </td>
                        </tr>
                        <tr>
                            <th width={"20%"} className={"text-right success"}>제목</th>
                            <td width={"80%"}>
                                <input type={"text"} size={"55"} className={"input-sm"} 
                                            onChange={subjectChange} value={subject} />
                            </td>
                        </tr>
                        <tr>
                            <th width={"20%"} className={"text-right success"}>내용</th>
                            <td width={"80%"}>
                                <textarea rows={"10"} cols={"55"} 
                                    onChange={contentChange} value={content}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th width={"20%"} className={"text-right success"}>비밀번호</th>
                            <td width={"80%"}>
                                <input type={"text"} size={"10"} className={"input-sm"} 
                                    onChange={pwdChange} value={pwd} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={"2"} className={"text-center"}>
                                <button className={"btn btn-sm btn-danger"} onClick={writeClick}>글쓰기</button>
                                <NavLink to={"/board/list"} className={"btn btn-sm btn-danger"}>취소</NavLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Update