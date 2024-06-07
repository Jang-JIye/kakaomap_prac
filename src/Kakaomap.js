import React, { Component } from 'react';
import './Kakaomap.css';

class Kakaomap extends Component {
    componentDidMount() {
        // 카카오 지도 API 스크립트를 동적으로 생성하여 페이지에 삽입
        const script = document.createElement('script');
        script.src =`${process.env.REACT_APP_KAKAOMAP_API}`;
        script.async = true;
        script.onload = () => {
            // API가 로드된 후에 실행할 코드
            this.kakaoMap();
        };
        document.body.appendChild(script);
    }

    kakaoMap() {
        // 카카오 지도 객체 생성
        const mapContainer = document.getElementById('map');
        const mapOptions = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 7
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOptions);

        // 마커를 표시할 위치와 title 객체 배열------------------------------------------------------------------------------------------------
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch('제주특별자치도 제주시 무근성7길 18', (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                var positions = [
                    {
                        title: 'test!',
                        latlng: coords,
                        get content() {
                            return `<div class ="label"><span class="left"></span><span class="center">${this.title}</span><a href="https://map.kakao.com/link/to/${this.title},${this.latlng.getLat()},${this.latlng.getLng()}" style="color:blue" target="_blank">길찾기</a><span class="right"></span></div>`;
                        }
                    },
                    {
                        title: '생태연못',
                        latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
                        get content() {
                            return `<div class ="label"><span class="left"></span><span class="center">${this.title}</span><a href="https://map.kakao.com/link/to/${encodeURIComponent(this.title)},${this.latlng.getLat()},${this.latlng.getLng()}" style="color:blue" target="_blank">길찾기</a><span class="right"></span></div>`;
                        }
                    },
                    {
                        title: '텃밭',
                        latlng: new window.kakao.maps.LatLng(33.450879, 126.569940),
                        get content() {
                            return `<div class ="label"><span class="left"></span><span class="center">${this.title}</span><a href="https://map.kakao.com/link/to/${encodeURIComponent(this.title)},${this.latlng.getLat()},${this.latlng.getLng()}" style="color:blue" target="_blank">길찾기</a><span class="right"></span></div>`;
                        }
                    },
                    {
                        title: '근린공원',
                        latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
                        get content() {
                            return `<div class ="label"><span class="left"></span><span class="center">${this.title}</span><a href="https://map.kakao.com/link/to/${encodeURIComponent(this.title)},${this.latlng.getLat()},${this.latlng.getLng()}" style="color:blue" target="_blank">길찾기</a><span class="right"></span></div>`;
                        }
                    }
                ];
                // 마커 이미지 주소
                const imageSrc = "https://blog.kakaocdn.net/dn/bchCZT/btsHOg1Tzyh/Xut8XOLpKRQJBxkEsPkCq1/img.png";

                // 마커와 오버레이 설정
                positions.forEach(position => {
                    // 마커 이미지 크기
                    const imageSize = new window.kakao.maps.Size(30, 30);
                    // 마커 이미지 생성
                    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                    // 마커를 생성
                    const marker = new window.kakao.maps.Marker({
                        position: position.latlng,
                        image: markerImage
                    });
                    // 마커를 지도 위에 표시
                    marker.setMap(map);

                    // 커스텀 오버레이 생성
                    var customOverlay = new window.kakao.maps.CustomOverlay({
                        position: position.latlng,
                        content: position.content,
                    })
                    // 오버레이 초기 상태를 숨김으로 설정
                    customOverlay.setMap(null);

                    // 마커에 클릭 이벤트 등록 -> 오버레이 보이기
                    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                        customOverlay.setMap(map);
                    });
                    // 오버레이에 클릭 이벤트 등록 -> 오버레이 숨기기
                    customOverlay.a.addEventListener('click', () => {
                        customOverlay.setMap(null);
                    });
                });
            }
        });
    }

    render() {
        return (
            <div>
                <div id="map" style={{ width: "700px", height: "400px" }}></div>
            </div>
        );
    }
}

export default Kakaomap;
