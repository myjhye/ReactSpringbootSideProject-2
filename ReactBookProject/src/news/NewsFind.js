import {useState, Fragment, useEffect} from "react";
import axios from "axios";

function NewsFind() {

    // 1. 변수 설정 => useState
    const [newsList, setNewsList] = useState([]);
    const [ss, setSs] = useState("레시피")

    
    
    // 2. 서버에서 데이터 읽기 => useEffect() 
    useEffect(() => {
        axios.get("http://localhost/news/find_react", {
            params: {
                ss: ss
            }
        }).then(result => {
            console.log(result.data);
            setNewsList(result.data);
        }, [])
    })


    // 3. 이벤트 등록 => const xxx = () => {}
    const newsChange = (e) => {
        setSs(e.target.value); // 사용자가 입력한 단어 저장
    }

    const findBtnClick = () => {
        axios.get("http://localhost/news/find_react", {
            params: {
                ss: ss
            }
        }).then(result => {
            console.log(result.data);
            setNewsList(result.data);
        }, [])
    }


    // 4. 서버에서 읽은 데이터를 누적 시키기 => map
    let html = newsList.map((news) => 
        <table className={"table"}>
            <tr>
                <td><a href={news.link}><span style={{"color": "black", "font-size": "18px"}}><strong>{news.title}</strong></span></a></td>
            </tr>
            <tr>
                <td><a href={news.link}><span style={{"color": "black"}}>{news.description}</span></a></td>
            </tr>
        </table>
    )

    // 5. return으로 출력
    return (
        <div className={"container"}>
            <div className={"row row1"}>
                <div style={{"height": "30px"}}></div>
                <h1 className={"text-center"}>뉴스 검색</h1><hr />
                <div style={{"height": "80px"}}></div>
                <input type={"text"} placeholder={"뉴스 제목/내용을 입력하세요"} size={"25"} className={"input-sm"} onChange={newsChange} />
                <button className={"btn btn-sm btn-success"} onClick={findBtnClick} value={ss}>검색</button>
                <div style={{"height": "30px"}}></div>
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row row1"}>
                <table className={"table"}>
                    <tbody>
                        <td>
                            {html}
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NewsFind