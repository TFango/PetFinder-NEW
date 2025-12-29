import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Location = {
  lat: number;
  lng: number;
};

type MapPickerOptions = {
  element: HTMLElement;
  accessToken: string;
  initialLocation?: Location;
  zoom?: number;
};

export function createMapPicker({
  element,
  accessToken,
  initialLocation,
  zoom = 14,
}: MapPickerOptions) {
  if (!element) {
    throw new Error("MapPicker: element is required");
  }

  mapboxgl.accessToken = accessToken;

  const map = new mapboxgl.Map({
    container: element,
    style: "mapbox://styles/mapbox/streets-v12",
    center: initialLocation
      ? [initialLocation.lng, initialLocation.lat]
      : [-57.5406, -38.0142], // fallback Mar del Plata
    zoom,
  });

  let marker: mapboxgl.Marker | null = null;
  let currentLocation: Location | null = initialLocation ?? null;

  function setLocation(location: Location) {
    currentLocation = location;

    if (!marker) {
      marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([location.lng, location.lat])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker!.getLngLat();
        currentLocation = {
          lat: lngLat.lat,
          lng: lngLat.lng,
        };
      });
    } else {
      marker.setLngLat([location.lng, location.lat]);
    }

    map.flyTo({
      center: [location.lng, location.lat],
      zoom,
    });
  }

  map.on("click", (e) => {
    setLocation({
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    });
  });

  return {
    setLocation,
    getLocation() {
      return currentLocation;
    },
    destroy() {
      map.remove();
    },
  };
}
