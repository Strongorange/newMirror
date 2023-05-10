import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { sgisTokenState } from "src/states/sgisTokenState";

const REQUEST_URL =
  "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json";
const SERVICE_ID = process.env.REACT_APP_SGIS_SERVICE_ID;
const SECRET_KEY = process.env.REACT_APP_SGIS_SECRET_KEY;

const useGetSGISToken = () => {
  const [sgisToken, setSgisToken] = useRecoilState(sgisTokenState);
  useEffect(() => {
    const getSGISToken = async () => {
      try {
        const response = await axios.get(REQUEST_URL, {
          params: {
            consumer_key: SERVICE_ID,
            consumer_secret: SECRET_KEY,
          },
        });
        if (response.data.errCd === 0) {
          const { accessToken, accessTimeout } = response.data.result;
          setSgisToken({
            accessToken,
            accessTimeout,
          });
        } else if (response.data.errCd === -401) {
          alert("SGIS 필수파라미터 누락");
          console.log(response.data.errMsg);
        } else if (response.data.errCd === -100) {
          alert("SGIS 검색결과 없음, SGIS 서비스 키를 확인하세요");
          console.log(response.data.errMsg);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // 토큰 수명이 만료되었는지 확인하는 함수
    // 만료되었으면 토큰 재발급
    const checkTokenExpiration = () => {
      const currentTime = new Date().getTime();
      const tokenExpirationTime = new Date(sgisToken.accessTimeout).getTime();
      const timePassedFromTokenIssued = currentTime - tokenExpirationTime;

      // 토큰 수명은 4시간이므로 3시간 50분 이상 지났을 경우 토큰 재발급
      /**
       * @description 토큰 재발급 시간은 3시간 50분으로 설정
       */
      const timeToReissueToken = 3 * 60 * 60 * 1000 + 50 * 60 * 1000;

      if (timePassedFromTokenIssued > timeToReissueToken) {
        getSGISToken();
      } else {
        const timeUntilExpiration = tokenExpirationTime - currentTime;
        setTimeout(checkTokenExpiration, timeUntilExpiration);
      }
    };

    if (!sgisToken.accessToken || !sgisToken.accessTimeout) {
      getSGISToken();
    } else {
      checkTokenExpiration();
    }
  }, [sgisToken, setSgisToken]);
};

export default useGetSGISToken;
