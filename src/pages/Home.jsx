import { tours } from "../data/tours";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
  };

  return (
    <div style={styles.container} className="home-container">
      {/* Hiệu ứng nền */}
      <div style={styles.backgroundEffect}></div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logoCircle}></div>
          <h1 style={styles.logoText}>VRTOUR</h1>
        </div>

        <div style={styles.titleContainer}>
          <h2 style={styles.subtitle}>KHÁM PHÁ THẾ GIỚI ẢO</h2>
          <h1 style={styles.title} className="home-title">
            TRẢI NGHIỆM <span style={styles.highlight}>KHÔNG GIAN 3D</span>
          </h1>
          <p style={styles.description}>
            Chọn một tour tham quan để bắt đầu hành trình khám phá không gian
            sống động với công nghệ thực tế ảo
          </p>
        </div>
      </div>

      {/* Grid container căn giữa - ĐÃ SỬA */}
      <div style={styles.gridWrapper}>
        <div
          style={{
            ...styles.grid,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          }}
          className="home-grid"
        >
          {tours.map((t) => (
            <div
              key={t.id}
              style={styles.card}
              className="home-card"
              onClick={() => navigate(`/view/${t.id}`)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div style={styles.cardHoverBg}></div>

              <div style={styles.cardContent}>
                <div style={styles.iconContainer} className="home-icon">
                  <div style={styles.iconBackground}>{t.icon}</div>
                </div>

                <div style={styles.cardInfo}>
                  <div style={styles.cardTitle}>{t.title}</div>
                  <div style={styles.cardSub}>Xem tham quan 3D</div>
                </div>

                <div style={styles.cardArrow}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Sử dụng công nghệ WebGL và Three.js để hiển thị không gian 3D
        </p>
        <div style={styles.badgeContainer}>
          <span style={styles.badge}>VR Ready</span>
          <span style={styles.badge}>360° View</span>
          <span style={styles.badge}>Interactive</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100svh",
    padding: "40px 20px 60px",
    background:
      "linear-gradient(180deg, #0a0a0f 0%, #151522 50%, #0a0a0f 100%)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  backgroundEffect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 30%, rgba(41, 98, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 41, 117, 0.1) 0%, transparent 50%)",
    zIndex: 0,
  },

  header: {
    maxWidth: "1200px",
    margin: "0 auto 60px",
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
    justifyContent: "center",
  },

  logoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2962ff, #ff2a75)",
    boxShadow: "0 4px 20px rgba(41, 98, 255, 0.3)",
  },

  logoText: {
    fontSize: "24px",
    fontWeight: 800,
    background: "linear-gradient(90deg, #fff, #a0a0ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
  },

  titleContainer: {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },

  subtitle: {
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "3px",
    color: "#a0a0ff",
    marginBottom: "16px",
    textTransform: "uppercase",
  },

  title: {
    fontSize: "48px",
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: "24px",
    background: "linear-gradient(90deg, #fff, #e0e0ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },

  highlight: {
    background: "linear-gradient(90deg, #2962ff, #ff2a75)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  description: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#b0b0d0",
    maxWidth: "600px",
    margin: "0 auto",
  },

  // 🔥 SỬA QUAN TRỌNG: Grid wrapper
  gridWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    width: "100%",
    margin: "0 auto 40px",
    padding: "0 20px", // 🔥 THÊM PADDING
  },

  // 🔥 SỬA QUAN TRỌNG: Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 320px)", // 3 card ngang
    gap: "30px",
    justifyContent: "center", // 🔥 CĂN GIỮA CÁC ITEMS
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    transition: "opacity 0.6s ease, transform 0.6s ease",
    margin: "0 auto", // 🔥 THÊM MARGIN AUTO
    width: "fit-content", // 🔥 FIT CONTENT ĐỂ CĂN GIỮA
  },

  // 🔥 SỬA QUAN TRỌNG: Card
  card: {
    background: "rgba(20, 20, 30, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "30px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    transition:
      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    width: "320px", // 🔥 CỐ ĐỊNH WIDTH
    height: "320px", // 🔥 CỐ ĐỊNH HEIGHT
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  cardHoverBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(41, 98, 255, 0.1), rgba(255, 41, 117, 0.1))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
    height: "100%",
    justifyContent: "space-between",
  },

  iconContainer: {
    marginBottom: "24px",
  },

  iconBackground: {
    width: "80px",
    height: "80px",
    borderRadius: "20px",
    background: "rgba(30, 30, 45, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease, background 0.3s ease",
  },

  cardInfo: {
    textAlign: "center",
    marginBottom: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#fff",
  },

  cardSub: {
    fontSize: "14px",
    color: "#a0a0ff",
    letterSpacing: "1px",
    fontWeight: 500,
  },

  cardArrow: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(41, 98, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2962ff",
    transition: "all 0.3s ease",
    marginTop: "auto",
  },

  footer: {
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    paddingTop: "40px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
  },

  footerText: {
    fontSize: "14px",
    color: "#8888aa",
    marginBottom: "20px",
  },

  badgeContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },

  badge: {
    padding: "8px 16px",
    background: "rgba(41, 98, 255, 0.1)",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#6690ff",
    letterSpacing: "0.5px",
  },
};

// Thêm CSS động cho hover effect
const dynamicStyles = `
  .home-card:hover {
    border-color: rgba(41, 98, 255, 0.3) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
  }
  
  .home-card:hover .home-icon div {
    transform: scale(1.1);
    background: linear-gradient(135deg, rgba(41, 98, 255, 0.2), rgba(255, 41, 117, 0.2)) !important;
  }
  
  .home-card:hover .cardHoverBg {
    opacity: 1;
  }
  
  .home-card:hover .cardArrow {
    background: rgba(41, 98, 255, 0.2);
    transform: translateX(5px);
  }
`;

// Thêm style động vào DOM
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = dynamicStyles;
  document.head.appendChild(styleSheet);
}
