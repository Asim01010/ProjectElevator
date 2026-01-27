import React from "react";

const SimplePerspectiveGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop",
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    galleryBox: {
      background: "white",
      borderRadius: "20px",
      padding: "40px",
      maxWidth: "2000px",
      width: "100%",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      perspective: "12000px",
    },
    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: "30px",
      fontSize: "2rem",
      fontWeight: "bold",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "25px",
      perspective: "1000px",
    },
    imageContainer: {
      height: "200px",
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      transformStyle: "preserve-3d",
      transition: "transform 0.3s ease",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
    },
    hoverEffect: {
      transform: "translateZ(80px) rotateY(10deg)",
    },
    imageHover: {
      transform: "translateZ(100px) scale(1.1)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.galleryBox}>
        <h1 style={styles.title}>Simple Perspective Gallery</h1>
        <div style={styles.grid}>
          {images.map((img, index) => (
            <div
              key={index}
              style={styles.imageContainer}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateZ(80px) rotateY(10deg)";
                e.currentTarget.querySelector("img").style.transform =
                  "translateZ(100px) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateZ(0px) rotateY(0deg)";
                e.currentTarget.querySelector("img").style.transform =
                  "translateZ(0px) scale(1)";
              }}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                style={styles.image}
              />
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "30px", color: "#666" }}>
          Hover over any image to see the 3D perspective effect
        </p>
      </div>
    </div>
  );
};

export default SimplePerspectiveGallery;
