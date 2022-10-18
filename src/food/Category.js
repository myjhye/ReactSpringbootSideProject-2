import {Fragment, useEffect, useState} from "react"; // use.. => Hooks => 사라지지 않는 변수를 잡을 때 사용
import {NavLink} from "react-router-dom"; // a 태그 주면 안돼서 사용
import axios from "axios"; // axios => 서버와 통신 => 서버에서 데이터 가져오기

function Category() {
    const [cateno, setCateno] = useState(1); // 카테고리 넘버 1로 default set
    const [cateList, setCateList] = useState([]); // List => 카테고리 목록 배열로 default set


    // 데이터 읽기 => useEffect => componentDidMount()와 같음 => 데이터 호출하면 return해서 적용 => 화면 바뀜
    useEffect(() => { // function 없어짐 => arrow 함수
        
        axios.get("http://localhost/food/category_react", { // 1. 사이트한테
                            // 개인 ip나 localhost
            
            params: { // 2. 이 값을 달라고 요청하고
                no: cateno, // 카테고리 번호 1 주입
            }
        }).then(result => { // 3. 결과 값 받아오기
            console.log(result.data) // 데이터 들어오는지 확인
            setCateList(result.data) // return에서 HTML 구현
        })                      
    }, []) // [] => 배열 형식으로 받기


    // 이벤트 처리 => 버튼 클릭 시
    const categoryChange = (no) => { // no 변수 받아서 카테고리 목록 변경 시 사용
        axios.get("http://localhost/food/category_react", { 
            
            params: { 
                no: no, 
            }
        }).then(result => { 
            console.log(result.data) 
            setCateList(result.data) 
        })      
    }

    /*
        for(CategoryVO c:list)

        http://localhost:3001/food/list/2 => path variable
    */

    let html = cateList.map((c) => 
        <div class="col-md-4">
            <div class="thumbnail">
                <NavLink to={"/food/list/" + c.cno}>
                    <img src={c.poster} alt="Lights" style={{"width":"100%"}} />
                    <div class="caption">
                        <p> {c.title} </p>
                    </div>
                </NavLink>
            </div>
        </div>
    )

    // 출력하는 부분
    return(
        <Fragment>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn btn-lg btn-success"} style={{"marginLeft": "5px"}} onClick={() => categoryChange(1)}>믿고 보는 맛집 리스트</button>
                    <button className={"btn btn-lg btn-info"} style={{"marginLeft": "5px"}} onClick={() => categoryChange(2)}>지역별 인기 맛집</button>
                    <button className={"btn btn-lg btn-warning"} style={{"marginLeft": "5px"}} onClick={() => categoryChange(3)}>메뉴별 인기 맛집</button>
                </div>
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row"}> 
                {html}
            </div>
        </Fragment>
    )
}

export default Category;