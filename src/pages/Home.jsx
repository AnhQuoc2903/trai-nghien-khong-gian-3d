import { tours } from "../data/tours";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container} className="home-container">
      <h1 style={styles.title} className="home-title">
        TRẢI NGHIỆM KHÔNG GIAN 3D
      </h1>

      <div style={styles.grid} className="home-grid">
        {tours.map((t) => (
          <div
            key={t.id}
            style={styles.card}
            className="home-card"
            onClick={() => navigate(`/view/${t.id}`)}
          >
            <div style={styles.icon} className="home-icon">
              {t.icon}
            </div>
            <div style={styles.cardTitle}>{t.title}</div>
            <div style={styles.cardSub}>Xem tham quan 3D</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 👇👇👇 PHẢI CÓ ĐOẠN NÀY 👇👇👇 */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "60px 80px",
    background: "radial-gradient(circle at top, #1b1b22, #0e0e11)",
  },
  title: {
    textAlign: "center",
    marginBottom: 60,
    fontSize: 36,
    letterSpacing: 2,
  },
  icon: {
    fontSize: 48,
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 40,
  },
  card: {
    background: "linear-gradient(145deg, #1e1e28, #15151d)",
    borderRadius: 24,
    padding: "60px 30px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 12,
  },
  cardSub: {
    fontSize: 14,
    opacity: 0.7,
    letterSpacing: 1,
  },
  logo: {
    position: "absolute",
    top: 30,
    left: 40,
    height: 50,
    opacity: 0.9,
  },
};
