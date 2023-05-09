import { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const useLocation = (): [Location, any] => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
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
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
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
          setLocation(currentLocation);
        } catch (locationError) {
          setError(locationError);
        }
      } else {
        setError(new Error("위치 권한이 없습니다."));
      }
    };

    fetchLocation();
  }, []);

  return [location, error];
};

export default useLocation;
