import { Feature } from "@/interfaces/places";

export interface GeolocationState {
  isLoading: boolean;
  // MapBox trabaja con [lng,lat] y GoogleMaps con [lat,lng]
  // debe ser opcional por que al principio no sabremos la location
  userLocation?: [number, number]; //[lng,lat]
  isLoadingPlaces: boolean;
  places: Feature[];
}

function state(): GeolocationState {
  return {
    isLoading: true,
    // undefined para verlo siempre en el store
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
  };
}

export default state;
