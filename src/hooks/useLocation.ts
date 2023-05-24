import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ForecastLocations, locationState } from "src/states/locationStates";

import proj4 from "proj4";

// WGS84,EPSG:4326 좌표계(위도, 경도)
proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
// TM좌표
proj4.defs(
  "EPSG:5181",
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"
);

interface Location {
  latitude: number | null;
  longitude: number | null;
  TM_X?: number | null;
  TM_Y?: number | null;
}

const useLocation = (): [ForecastLocations, any] => {
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
              // proj4 라이브러리를 사용하여 좌표 변환
              // WGS84 좌표계(위도, 경도) ->  TM 좌표계
              // 'EPSG:4326' -> 'EPSG:5181' 파일 맨위에 define 해놓음
              const [TM_X, TM_Y] = proj4("EPSG:4326", "EPSG:5181", [
                longitude,
                latitude,
              ]);

              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                TM_X,
                TM_Y,
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
