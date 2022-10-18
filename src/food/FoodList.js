import axios from "axios";
import { NavLink, useParams } from "react-router-dom"; // 상세보기 링크 넘기기
import { Fragment, useEffect, useState } from "react";

function FoodList() {

    // 변수 잡기
    const [cateList, setCateList] = useState([]); // List 
    const [info, setInfo] = useState({}); // VO
    let {cno} = useParams(); // 값 받아오기 = request.getParameter("cno")


    // food_list_react?cno=
    useEffect(() => {
        axios.get("http://localhost/food/food_list_react", {
            params: {
                cno: cno // 보내는 데이터가 cno
            }
        }).then(result => { // 값 받기
            console.log(result.data)
            setCateList(result.data)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost/food/info_react", {
            params: {
                cno: cno // 보내는 데이터가 cno
            }
        }).then(result => { // 값 받기
            console.log(result.data)
            setInfo(result.data)
        })
    }, {})

    let html = cateList.map((m) => 
        <table className={"table"}>
            <tr>
                <td className={"text-center"} width={"30%"} rowSpan={"4"}>
                    <NavLink to={"/food/detail/" + m.fno}>
                        <img src={m.poster} style={{"width": "220px", "height:": "180px"}} />
                    </NavLink>
                </td>
                
                <NavLink to={"/food/detail/" + m.fno}>
                    <td width={"70%"}><h3>{m.name} <span style={{"color": "orange"}}>{m.score}</span></h3></td>
                </NavLink>
            </tr>
            <tr>
                <td width={"70%"}>{m.address}</td>
            </tr>
            <tr>
                <td width={"70%"}>{m.tel}</td>
            </tr>
            <tr>
                <td width={"70%"}>{m.type}</td>
            </tr>
            
        </table>
    )

    return (
        <Fragment>
            <div className={"jumbotron"}>
                <h1 className={"text-center"}>{info.title}</h1>
                <h3 className={"text-center"}>{info.subject}</h3>
            </div>
            <div className={"row row1"}>
                <table className={"table"}>
                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                </table>
            </div>
        </Fragment>
    )
}

export default FoodList;