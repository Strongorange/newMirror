# Smart Mirror

> `현재 시간`, `현재 위치 날씨와 미세먼지 정보`, `내가 설정한 위치의 미세먼지 정보` , `내가 선택한 메세지와 사진`을 보여주는 스마트 미러입니다.  
> [🌐 스마트미러 컨트롤러](https://github.com/Strongorange/newMirrorController) 앱과 연동하여 사용합니다.

![미러 사진 바꾸기-0001](https://github.com/Strongorange/newMirror/assets/74127841/0a753613-6936-4821-908a-3ddfb09cf3e6)
![image](https://github.com/Strongorange/newMirror/assets/74127841/f5938a0e-593e-4ac7-9bdf-4a21031ae96d)


# 1. 제작 기간

- 2022.07 ~ 2022.07 (개인용)
- 2023.04 ~ 2022.05 (리팩토링, 배포용)

</br>

# 2. 사용 기술

### `공통`

- Firebase
  - Auth
  - Storage
  - Firestore DB
- TypeScript

### `Web`

- React.js

### `App`

- React Native

### `API`

- [OpenWeatherMap](https://openweathermap.org/)
- [한국환경공단 에어코리아 대기오염정보](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861)
- [SGIS 좌표변환 API](https://sgis.kostat.go.kr/developer/html/newOpenApi/api/dataApi/coord.html#transcoord)

</br>

# 3. 핵심 기능

스마트 미러의 화면은 5개 영역으로 나뉩니다.

## 3.1 현재 시간

- `react-live-clock` 라이브러리를 사용하여 현재 시간을 보여줍니다.

## 3.2 메세지

- 현재 위치의 `날씨`, `시간`에 따라서 Firebase에 저장된 메세지를 보여줍니다.

## 3.3 현재 위치 날씨과 미세먼지 정보, 선택한 위치의 미세먼지 정보

- 현재 위치의 `습도`, `자외선 세기`, `온도`, `체감 온도`와 가장 가까운 미세먼지 측정소에서 가져온 `대기질`을 보여줍니다.
- 앱에서 선택한 대기질 측정소에서 가져온 `대기질`을 보여줍니다.

## 3.4 사진 갤러리

- 앱에서 선택한 사진을 최대 4개까지 스마트 미러에 보여줍니다.

</br>

# 4. 핵심 트러블 슈팅

## 4.1 대기질 측정소 API 사용을 위해 WGS84 좌표계를 TM 좌표계로 변환
- React Native 얻는 위도/경도는 `WGS84 좌표계 (경도 위도)`를 사용하지만 한국환경공단의 API는 `중부원점 좌표계 (TM 좌표계)`를 사용해 변환이 필요했습니다.
- [SGIS 좌표변환 API](https://sgis.kostat.go.kr/developer/html/newOpenApi/api/dataApi/coord.html#transcoord)를 이용해 `위도/경도`를 `TM 좌표계`로 변환 후 API를 호출했습니다.
- [🌐 useLocation.ts](https://github.com/Strongorange/newMirror/blob/dev-user/src/hooks/useLocation.ts) 
- [🌐 SGIS Token 코드](https://github.com/Strongorange/newMirror/blob/dev-user/src/hooks/useGetSGISToken.ts) 
- [🌐 대기 측정소, 측정 데이터 코드](https://github.com/Strongorange/newMirror/blob/dev-user/src/utils/getDustData.tsx)


</br>

# 5. [동작 화면 (🌐 앱 저장소)](https://github.com/Strongorange/newMirrorController)


