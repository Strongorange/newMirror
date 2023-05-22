import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ForecastLocations, locationState } from "src/states/locationStates";
import { sgisTokenState } from "src/states/sgisTokenState";

interface Location {
  latitude: number | null;
  longitude: number | null;
  TM_X?: number | null;
  TM_Y?: number | null;
}

const SGIS_TRANSFORM_URL =
  "https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json";

const useLocation = (): [ForecastLocations, any] => {
  const { accessToken } = useRecoilValue(sgisTokenState);
  // 현재 위치 정보 상태, Lat, Long, TM_X, TM_Y
  const [locations, setLocations] = useRecoilState(locationState);
  const [error, setError] = useState<any | null>(null);

  const getLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });
      return permission.state === "granted" || permission.state === "prompt";
    } catch (error) {
      console.error("위치 권한 요청 중 에러 발생", error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    return new Promise<Location>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // 위도, 경도를 TM 좌표로 변환
            const { latitude, longitude } = position.coords;
            try {
              const transformResponse = await axios(SGIS_TRANSFORM_URL, {
                params: {
                  accessToken,
                  src: 4326,
                  dst: 5181,
                  posX: longitude,
                  posY: latitude,
                },
              });
              const { posX, posY } = transformResponse.data.result;

              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                TM_X: posX,
                TM_Y: posY,
              });
            } catch (error) {
              alert(error);
              console.log(error);
            }
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const isPermissionGranted = await getLocationPermission();
      if (isPermissionGranted) {
        try {
          const currentLocation = await getCurrentLocation();
          setLocations((prev) => {
            return {
              ...prev,
              currentLocation: {
                latitude: currentLocation.latitude!,
                longitude: currentLocation.longitude!,
                tmX: currentLocation.TM_X!,
                tmY: currentLocation.TM_Y!,
              },
            };
          });
        } catch (locationError) {
          setError(locationError);
        }
      } else {
        setError(new Error("위치 권한이 없습니다."));
      }
    };

    fetchLocation();
  }, []);

  return [locations, error];
};

export default useLocation;
