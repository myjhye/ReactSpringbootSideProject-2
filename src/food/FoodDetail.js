import axios from "axios";
import {Fragment} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react"; 
/* global kakao */

/* 
    useEffect = 데이터 가져오기
    useState = 데이터 가져와서 저장하는 공간 만들기

    1. 화면 출력
    2. 요청 ==> .do ==> <navLink to=""> => ?를 사용하지 않음
                        /food/detail/1
    3. 서버로부터 데이터 읽어오기 => useEffect() => componentDidMount(), mounted
    4. 저장 => 메모리 상에 저장 => state => useState()
    5. 화면 출력 요청
            return (
                출력 내용
            )

*/
function FoodDetail() {

    const [foodDetail, setFoodDetail] = useState({}); // 변수 잡기
    const {fno} = useParams(); // == this.props.match.param(deprecated)
    useEffect(() => {
        axios.get("http://localhost/food/detail_react", {
            params: {
                fno: fno
            }
        }).then(result => {
            console.log(result.data);
            setFoodDetail(result.data);
        })
    }, {})


    useEffect(() => {

        const script = document.createElement("script");
        script.async = true; // 비동기로 출력
        script.src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c8ee345f7b9c63ba6aa3473b042a7dc9&libraries=services";
       document.head.appendChild(script);
       script.onload=()=>{
           kakao.maps.load(()=>{
               var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                   mapOption = {
                       center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                       level: 3 // 지도의 확대 레벨
                   };

               // 지도를 생성합니다
               var map = new kakao.maps.Map(mapContainer, mapOption);

               // 주소-좌표 변환 객체를 생성합니다
               var geocoder = new kakao.maps.services.Geocoder();

               // 주소로 좌표를 검색합니다
               geocoder.addressSearch(foodDetail.address, function(result, status) {

                   // 정상적으로 검색이 완료됐으면
                   if (status === kakao.maps.services.Status.OK) {

                       var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                       // 결과값으로 받은 위치를 마커로 표시합니다
                       var marker = new kakao.maps.Marker({
                           map: map,
                           position: coords
                       });

                       // 인포윈도우로 장소에 대한 설명을 표시합니다
                       var infowindow = new kakao.maps.InfoWindow({
                           content: '<div style={{"width":"150px","textAlign":"center","padding":"6px 0"}}>'+foodDetail.name+'</div>'
                       });
                       infowindow.open(map, marker);

                       // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                       map.setCenter(coords);
                   }
               });
           })
       }
    })
    let temp=String(foodDetail.poster)
    let images=temp.split("^")
    let html=images.map((poster)=>
      <td className={"text-center"}>
          <img src={poster} style={{"width":"350px","height":"300px"}}/>
      </td>
    )
    return (
        <Fragment>
            <div className={"row"}>
               <table className={"table"}>
                   <tbody>
                       <tr>
                           {html}
                       </tr>
                   </tbody>
               </table>
            </div>
            <div style={{"height":"20px"}}></div>
            <div className={"row"}>
                <div className={"col-sm-8"}>
                  <table className={"table"}>
                      <tbody>
                      <tr>
                          <td colSpan={"2"}>
                              <h3>{foodDetail.name}
                                  <span style={{"color":"orange"}}>{foodDetail.score}</span></h3>
                          </td>
                      </tr>
                      <tr>
                          <td width={"10%"}>주소</td>
                          <td width={"90%"}>{foodDetail.address}</td>
                      </tr>
                      <tr>
                          <td width={"10%"}>전화</td>
                          <td width={"90%"}>{foodDetail.tel}</td>
                      </tr>
                      <tr>
                          <td width={"10%"}>음식종류</td>
                          <td width={"90%"}>{foodDetail.type}</td>
                      </tr>
                      <tr>
                          <td width={"10%"}>가격대</td>
                          <td width={"90%"}>{foodDetail.price}</td>
                      </tr>
                      <tr>
                          <td width={"10%"}>영업시간</td>
                          <td width={"90%"}>{foodDetail.time}</td>
                      </tr>
                      <tr>
                          <td width={"10%"}>주차</td>
                          <td width={"90%"}>{foodDetail.parking}</td>
                      </tr>
                      <tr>
                          <td width={"10%"}>메뉴</td>
                          <td width={"90%"}>{foodDetail.menu}</td>
                      </tr>
                       <tr>
                          <td className={"text-right"} colSpan={"2"}>
                              <NavLink to={"/"} className={"btn btn-sm btn-primary"}>목록</NavLink>
                          </td>
                      </tr>
                      </tbody>
                  </table>
                </div>
                <div className={"col-sm-4"}>
                    <div id="map" style={{"width":"100%","height":"350px"}}></div>
                </div>
            </div>
        </Fragment>
    )
}
export default FoodDetail