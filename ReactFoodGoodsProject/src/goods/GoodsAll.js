import {Fragment, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

function GoodsAll() {

    // 변수 잡기
    const [all_list, setAll_list] = useState([]);
    const [curpage, setCurpage] = useState(1); // curpage: 1 default set
    const [totalpage, setTotalpage] = useState(0);

    // 잡은 변수 받기
    // 목록
    useEffect(() => {
        axios.get("http://localhost/goods/all_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data)
            setAll_list(result.data)
        })
    }, [])

    // 페이징
    useEffect(() => {
        axios.get("http://localhost/goods/all_totalpage") 
        .then(result => {
            console.log(result.data)
            setTotalpage(result.data);
        }) 
    }, {})


    let html = all_list.map((goods) => 
        <div className="col-md-3">
            <div className="thumbnail">
                <NavLink to={"#"}>
                    <img src={goods.goods_poster} alt="Lights" style={{"width":"100%"}} />
                    <div className="caption">
                        <p> {goods.goods_name} </p>
                    </div>
                </NavLink>
            </div>
        </div>
    )

    // 이벤트 처리
    const prevHandler = () => {
        setCurpage(curpage>1?curpage-1:curpage); // 값 설정
        axios.get("http://localhost/goods/all_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data)
            setAll_list(result.data) // result가 가지고 있는 data 출력
        })
        
    }

    const nextHandler = () => {
        setCurpage(curpage<totalpage?curpage+1:curpage);
        axios.get("http://localhost/goods/all_react", {
            params: {
                page: curpage
            }
        }).then(result => {
            console.log(result.data)
            setAll_list(result.data) // result가 가지고 있는 data 출력
            
        })
    }

    return(
        <div className="container-fluid">
            <h1>상품 전체 목록</h1>
            <hr />
            <div className="row">
                {html}
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row"}>
                <div className="text-center">
                    <button className="btn btn-sm btn-danger" onClick={prevHandler}>이전</button>
                        {curpage} page / {totalpage} pages
                    <button className="btn btn-sm btn-primary" onClick={nextHandler}>다음</button>
                </div>
            </div>
        </div>
    )
}

export default GoodsAll;