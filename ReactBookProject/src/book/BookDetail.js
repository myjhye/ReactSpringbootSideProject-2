import {Fragment, useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router";

function BookDetail() {

    // 변수 잡기
    const [vo, setVo] = useState({})
    const {no} = useParams();

    // 데이터 받기
    useEffect(() => {
        axios.get("http://localhost/book/book_detail_react", {
            params: {
                no: no
            }
        }).then(result => {
            console.log(result.data)
            setVo(result.data)
        })
    }, {})

    // 출력
    return (
        <Fragment>
        <div class="container">
        <div style={{"height": "80px"}}></div>
            <h1>상세 보기</h1><hr />
            <div class="col-lg-8 border p-3 main-section bg-white">
                <span>※ 도서의 상세정보는 판사항에 따라 상이할 수 있습니다.</span>
                <div class="row m-0">
                    <div class="col-lg-4 left-side-product-box pb-3">
                        <img src={vo.img} />
                    </div>
                    <div class="col-lg-8">
                        <div class="right-side-pro-detail border p-3 m-0">
                            <div class="row">
                                <div class="col-lg-12">
                                    <p class="m-0 p-0"><strong>{vo.title}</strong></p>
                                    <span>{vo.author} 지음</span>
                                    <div style={{"height": "80px"}}></div>
                                </div>
                                
                                <div class="col-lg-12">
                                    <p class="tag-section"><strong>자료유형 : </strong>{vo.binfo}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="tag-section"><strong>개인저자 : </strong>{vo.author}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="tag-section"><strong>발행사항 : </strong>{vo.pinfo}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="tag-section"><strong>형태사항 : </strong>{vo.info}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="tag-section"><strong>원표제 : </strong>{vo.term}</p>
                                </div>
                                <div class="col-lg-12">
                                    <p class="tag-section"><strong>ISBN : </strong>{vo.isbn}</p>
                                    <div style={{"height": "80px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>예약/신청 안내</h3><hr />
                <span>
                    도서상태가 대출중 도서의 경우 예약 가능하며 보존서고 도서의 경우 도서상태가 신청가능 일 경우에 신청 가능
                    부득이하게 취소해야 할 경우는 [홈페이지>나의공간>내서재>신청]에서 취소 가능합니다.
                </span>
                <div style={{"height": "30px"}}></div>
                <h3>보존서고 이용 안내</h3><hr />
                <span>
                    소장처가 보존서고1, 보존서고3이고 도서상태가 신청가능일 경우, 예약/신청의 신청하기로 신청하시기 바랍니다.(신청안내)
                    보존서고 이용신청 자료는 평일 기준 1일 8회(10시30분, 11시30분, 14시, 15시, 16시, 17시, 19시), 주말 기준 1일 7회(10시30분, 11시 30분, 13시, 14시, 15시, 16시, 17시) 준비됩니다.
                    ※ 서울자료실 서가, 세계자료실 서가 자료는 평일 1일 7회(10시, 11시30분, 13시, 14시, 15시, 16시, 17시) 준비되며, 17시까지 신청자료에 한해 이용가능합니다.
                    ※ 서울자료실(3층)에 있거나, 보존서고3에 있는 자료 중 등록번호가 SG로 시작하는 자료와 참고도서는 대출이 불가하며, 방문하셔서 열람하실 수 있습니다.
                </span>
                <div style={{"height": "30px"}}></div>
                <h3>서울책보고 이용 안내</h3><hr />
                <span>
                    한상진, 김태동, 임현진 자료는 서울책보고(서울 송파구 오금로1)에서 열람가능합니다.
                </span>
                <div style={{"height": "180px"}}></div>
            </div>
            
        </div>
        
        </Fragment>
    )

}

export default BookDetail;