import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { tours } from "../data/tours";

export default function Viewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const tour = tours.find((t) => t.id === id);

  // Theo dõi trạng thái fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Tự động ẩn controls sau 3 giây
  useEffect(() => {
    if (!showControls) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate("/");
  }, [navigate]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
  }, []);

  if (!tour) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorContent}>
          <h2 style={styles.errorTitle}>Không tìm thấy tour</h2>
          <p style={styles.errorMessage}>
            Tour bạn đang tìm kiếm không tồn tại.
          </p>
          <button style={styles.backButton} onClick={() => navigate("/")}>
            ⬅ Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={styles.container}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Đang tải không gian 3D...</p>
        </div>
      )}

      {/* Iframe hiển thị tour */}
      <iframe
        src={tour.url}
        title={tour.title}
        width="100%"
        height="100%"
        allowFullScreen
        style={{ border: "none", opacity: isLoading ? 0 : 1 }}
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; gyroscope; xr-spatial-tracking"
      />

      {/* Controls overlay */}
      <div
        style={{
          ...styles.controlsOverlay,
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? "auto" : "none",
        }}
      >
        {/* Top bar */}
        <div style={styles.topBar}>
          <button
            style={styles.backBtn}
            onClick={handleBack}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "8px" }}
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Quay về
          </button>

          <div style={styles.tourInfo}>
            <h3 style={styles.tourTitle}>{tour.title}</h3>
            <p style={styles.tourSubtitle}>Khám phá không gian 3D</p>
          </div>

          <div style={styles.rightControls}>
            <button
              style={styles.controlBtn}
              onClick={toggleFullscreen}
              title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
            >
              {isFullscreen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3V5C8 5.55 7.55 6 7 6H5C4.45 6 4 5.55 4 5V3C4 2.45 4.45 2 5 2H7C7.55 2 8 2.45 8 3ZM20 3V5C20 5.55 19.55 6 19 6H17C16.45 6 16 5.55 16 5V3C16 2.45 16.45 2 17 2H19C19.55 2 20 2.45 20 3ZM20 19V21C20 21.55 19.55 22 19 22H17C16.45 22 16 21.55 16 21V19C16 18.45 16.45 18 17 18H19C19.55 18 20 18.45 20 19ZM8 19V21C8 21.55 7.55 22 7 22H5C4.45 22 4 21.55 4 21V19C4 18.45 4.45 18 5 18H7C7.55 18 8 18.45 8 19Z"
                    fill="currentColor"
                  />
                  <path
                    d="M15 9H9C8.45 9 8 9.45 8 10V14C8 14.55 8.45 15 9 15H15C15.55 15 16 14.55 16 14V10C16 9.45 15.55 9 15 9Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM14 17H17V14H19V19H14V17ZM17 10H14V5H19V10H17V10Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Bottom controls */}
        <div style={styles.bottomControls}>
          <div style={styles.tourStats}>
            <div style={styles.statItem}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "6px" }}
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 20 12 20ZM12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z"
                  fill="#a0a0ff"
                />
              </svg>
              <span>360° View</span>
            </div>
            <div style={styles.statItem}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org2000/svg"
                style={{ marginRight: "6px" }}
              >
                <path
                  d="M21 16V8C21 6.9 20.1 6 19 6H3C1.9 6 1 6.9 1 8V16C1 17.1 1.9 18 3 18H19C20.1 18 21 17.1 21 16ZM13 10V14H11V10H13ZM9 10V14H7V10H9ZM17 10V14H15V10H17Z"
                  fill="#a0a0ff"
                />
              </svg>
              <span>Interactive</span>
            </div>
          </div>

          <div style={styles.navigation}>
            <button
              style={styles.navButton}
              onClick={() => {
                const currentIndex = tours.findIndex((t) => t.id === id);
                const prevIndex =
                  currentIndex > 0 ? currentIndex - 1 : tours.length - 1;
                navigate(`/view/${tours[prevIndex].id}`);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
                  fill="currentColor"
                />
              </svg>
              Tour trước
            </button>

            <div style={styles.tourCounter}>
              {tours.findIndex((t) => t.id === id) + 1} / {tours.length}
            </div>

            <button
              style={styles.navButton}
              onClick={() => {
                const currentIndex = tours.findIndex((t) => t.id === id);
                const nextIndex =
                  currentIndex < tours.length - 1 ? currentIndex + 1 : 0;
                navigate(`/view/${tours[nextIndex].id}`);
              }}
            >
              Tour sau
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: "8px" }}
              >
                <path
                  d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* VR Mode indicator */}
      {isFullscreen && (
        <div style={styles.vrIndicator}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px" }}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 20 12 20ZM16.5 12C16.5 14.49 14.49 16.5 12 16.5C9.51 16.5 7.5 14.49 7.5 12C7.5 9.51 9.51 7.5 12 7.5C14.49 7.5 16.5 9.51 16.5 12Z"
              fill="#00ff88"
            />
          </svg>
          Chế độ VR đang bật
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    background: "#000",
    overflow: "hidden",
  },

  // Loading overlay
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #0a0a0f 0%, #151522 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  loadingSpinner: {
    width: "60px",
    height: "60px",
    border: "4px solid rgba(41, 98, 255, 0.1)",
    borderTop: "4px solid #2962ff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "20px",
    color: "#b0b0d0",
    fontSize: "16px",
    fontWeight: 500,
  },

  // Controls overlay
  controlsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.8) 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 50,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
  },

  // Top bar
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    background: "rgba(10, 10, 15, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    pointerEvents: "auto",
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    background: "rgba(41, 98, 255, 0.2)",
    color: "#fff",
    border: "1px solid rgba(41, 98, 255, 0.3)",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.2s ease",
    backdropFilter: "blur(5px)",
  },

  tourInfo: {
    textAlign: "center",
    flex: 1,
    margin: "0 20px",
  },

  tourTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
  },

  tourSubtitle: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#a0a0ff",
    opacity: 0.8,
  },

  rightControls: {
    display: "flex",
    gap: "12px",
  },

  controlBtn: {
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backdropFilter: "blur(5px)",
  },

  // Bottom controls
  bottomControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    background: "rgba(10, 10, 15, 0.8)",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    pointerEvents: "auto",
  },

  tourStats: {
    display: "flex",
    gap: "20px",
  },

  statItem: {
    display: "flex",
    alignItems: "center",
    color: "#a0a0ff",
    fontSize: "14px",
    fontWeight: 500,
  },

  navigation: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  navButton: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s ease",
    backdropFilter: "blur(5px)",
  },

  tourCounter: {
    padding: "8px 16px",
    background: "rgba(41, 98, 255, 0.2)",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    minWidth: "60px",
    textAlign: "center",
  },

  // VR Indicator
  vrIndicator: {
    position: "absolute",
    top: "80px",
    right: "30px",
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    background: "rgba(0, 255, 136, 0.1)",
    color: "#00ff88",
    border: "1px solid rgba(0, 255, 136, 0.3)",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    zIndex: 60,
    backdropFilter: "blur(5px)",
  },

  // Error container
  errorContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0a0a0f 0%, #151522 100%)",
  },

  errorContent: {
    textAlign: "center",
    maxWidth: "400px",
    padding: "40px",
    background: "rgba(20, 20, 30, 0.8)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },

  errorTitle: {
    margin: "0 0 16px",
    fontSize: "24px",
    fontWeight: 700,
    color: "#fff",
  },

  errorMessage: {
    margin: "0 0 24px",
    fontSize: "16px",
    color: "#b0b0d0",
  },

  backButton: {
    padding: "12px 24px",
    background: "rgba(41, 98, 255, 0.2)",
    color: "#fff",
    border: "1px solid rgba(41, 98, 255, 0.3)",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
};

// Thêm animation cho loading spinner
const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Thêm styles vào DOM
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = spinnerStyles;
  document.head.appendChild(styleSheet);
}
