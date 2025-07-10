import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const data = [
  { id: 1, name: "위치1", lat: 37.56, lon: 126.97 },
  { id: 2, name: "위치2", lat: 37.57, lon: 126.98 },
];

function MyMap() {
  return (
    <div style={{ height: "500px", width: "500px" }}>
      <MapContainer
        center={[37.5665, 126.978]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 고정 마커 */}
        <Marker position={[37.5665, 126.978]}>
          <Popup>서울 시청</Popup>
        </Marker>

        {/* 데이터 배열 기반 마커들 */}
        {data.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lon]}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MyMap;
