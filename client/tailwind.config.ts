theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        "glow-pulse": "glow-pulse 3s infinite ease-in-out",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(255, 171, 64, 0.6)",
            transform: "scale(1)" 
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(255, 171, 64, 0.8)",
            transform: "scale(1.05)" 
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },