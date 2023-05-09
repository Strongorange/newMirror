import { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<GeolocationPositionError | null>(null);

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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      let currentPosition: Location = {
        latitude: null,
        longitude: null,
      };
      navigator.geolocation.getCurrentPosition(
        (positoin) => {
          currentPosition.latitude = positoin.coords.latitude;
          currentPosition.longitude = positoin.coords.longitude;
        },
        (error) => {
          setError(error);
          throw error;
        }
      );
      return currentPosition;
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const isPermissionGranted = await getLocationPermission();
      if (isPermissionGranted) {
        try {
          const currentLocation = getCurrentLocation();
          setLocation(currentLocation!);
        } catch (error) {
          alert("위치 정보를 가져오는데 실패했습니다.");
          console.log(error);
        }
      }
    };

    fetchLocation();
  }, []);

  return [location, error];
};

export default useLocation;
