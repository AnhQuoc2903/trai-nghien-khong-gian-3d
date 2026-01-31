import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { tours } from "../data/tours";

export default function Viewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find((t) => t.id === id);

  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }, []);

  if (!tour) return null;

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <iframe
        src={tour.url}
        title={tour.title}
        width="100%"
        height="100%"
        allowFullScreen
        style={{ border: "none" }}
      />

      <button
        style={styles.backBtn}
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          navigate("/");
        }}
      >
        ⬅ Quay về menu
      </button>
    </div>
  );
}

const styles = {
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: "12px 20px",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 14,
    zIndex: 10,
  },
};
