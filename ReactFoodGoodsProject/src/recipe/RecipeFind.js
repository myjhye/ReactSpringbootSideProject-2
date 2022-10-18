import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function RecipeFind() {

    // 변수 잡기
    const [recipeList, setRecipeList] = useState([]);
    const [curpage, setCurpage] = useState(1);
    const [totalpage, setTotalpage] = useState(0);
    const [ss, setSs] = useState("김치");
    
    useEffect(() => {
        axios.get("http://localhost/recipe/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setRecipeList(result.data);
        })
    }, [])


    // 총 페이지
    useEffect(() => {
        axios.get("http://localhost/recipe/find_totalpage", {
            params: {
                ss: ss
            }
        }).then(result => {
            console.log(result.data)
            setTotalpage(result.data)
        })
    })


    // 데이터 출력
    let html = recipeList.map((recipe) => 
        <div className="col-md-3">
            <div className="thumbnail">
                <NavLink to={"#"}>
                    <img src={recipe.poster} alt="Lights" style={{"width":"100%"}} />
                    <div className="caption">
                        <p> {recipe.title} </p>
                    </div>
                </NavLink>
            </div>
        </div>
    )


    // 이벤트 등록
    const findHandler = () => {

        setCurpage(1) // 찾을 때 1페이지에서

        // 찾기
        axios.get("http://localhost/recipe/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setRecipeList(result.data);
        })


        // 총 페이지
        axios.get("http://localhost/recipe/find_totalpage", {
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
        axios.get("http://localhost/recipe/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setRecipeList(result.data);
        })
        
    }

    const nextHandler = () => {
        setCurpage(curpage<totalpage?curpage+1:curpage);
        axios.get("http://localhost/recipe/find_react", {
            params: { // 검색어, 페이지 넘기기
                ss: ss, 
                page: curpage
            }
        }).then(result => {
            console.log(result.data);
            setRecipeList(result.data);
        })
    }


    // view의 역할 => JSP, MVC => 화면 출력
    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <h1 className={"text-center"}>레시피 검색</h1>
                Search: <input type={"text"} size={"20"} className={"input-sm"} onChange={changeHandler} 
                    value={ss} // 검색어 유지
                />
                <button className={"btn btn-sm btn-success"} onClick={findHandler}>검색</button>
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row"}>
                {html}
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn btn-sm btn-info"} onClick={prevHandler}>이전</button>
                        {curpage} page / {totalpage} pages
                    <button className={"btn btn-sm btn-warning"} onClick={nextHandler}>다음</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeFind;