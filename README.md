# Smart Mirror

날씨, 시간, 미세먼지, Firestore에 업데이트한 사진 정보를 보여주는 스마트 미러.
하드웨어와 한 세트

## 기술 스택

- React
- Firebase
- [OpenWeatherMap](https://openweathermap.org/)
- [한국환경공단 에어코리아 대기오염정보](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861)
- [SGIS 좌표변환 API](https://sgis.kostat.go.kr/developer/html/newOpenApi/api/dataApi/coord.html#transcoord)

## TODO

유저별로 FB 데이터에서 정보 가져오기

1. 시계 보여주기 [V]
2. 위치 정보에 따라 날씨 보여주기 [V]
   1. 현재 위치 정보 가져오기 [V]
   2. SGIS API 이용해 위도를 TM좌표로 변환 [V]
      1. accessToken 핸들링 [V]
      2. 좌표 변환 [V]
3. 미세먼지 정보 가져오기
   1. 현재 위치 미세정보 가져오기 [V]
      1. 가져온 정보를 컴포넌트에 업데이트 [V]
   2. 앱에서 선택한 위치 정보
4. 메세지 가져오기
5. 사진 가져오기

## TESTID

test@gmail.com
121212

## TIL List (TIL 브랜치로 옮길 것)

### 브라우저에서 가져오는 경/위도 정보는 WGS84 (EPSG:4326) 좌표계를 사용
