import PropTypes from "prop-types";
import React, { useMemo } from "react";

// Design tokens
const POSITIONS = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
};

const SIZES = {
  sm: "300px",
  md: "400px",
  lg: "600px",
};

const Drawer = ({
  children,
  position = "left",
  size = "md",
  isOpen = false,
  onClose,
  className = "",
  overlayColor = "rgba(0, 0, 0, 0.7)",
  drawerColor = "#ffffff",
  closeOnOverlayClick = true,
  rounded = "none",
  elevation = true,
}) => {
  const styles = useMemo(() => {
    const overlay = {
      width: "100vw",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: overlayColor,
      visibility: isOpen ? "visible" : "hidden",
      opacity: isOpen ? 1 : 0,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const baseDrawerStyles = {
      position: "absolute",
      backgroundColor: drawerColor,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      overflow: "hidden",
      boxShadow: elevation ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
    };

    const sizeValue = SIZES[size] || size;

    const positionStyles = {
      left: {
        ...baseDrawerStyles,
        width: isOpen ? sizeValue : "0px",
        height: "100%",
        top: 0,
        left: 0,
        borderTopRightRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        borderBottomRightRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      },
      right: {
        ...baseDrawerStyles,
        width: isOpen ? sizeValue : "0px",
        height: "100%",
        top: 0,
        right: 0,
        borderTopLeftRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        borderBottomLeftRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      },
      top: {
        ...baseDrawerStyles,
        width: "100%",
        height: isOpen ? sizeValue : "0px",
        top: 0,
        left: 0,
        borderBottomLeftRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        borderBottomRightRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        transform: isOpen ? "translateY(0)" : "translateY(-100%)",
      },
      bottom: {
        ...baseDrawerStyles,
        width: "100%",
        height: isOpen ? sizeValue : "0px",
        bottom: 0,
        left: 0,
        borderTopLeftRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        borderTopRightRadius:
          rounded === "md" ? "8px" : rounded === "lg" ? "16px" : "0px",
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
      },
    };

    return {
      overlay,
      drawer: positionStyles[position],
      content: {
        padding: "20px",
        height: "100%",
        overflow: "auto",
      },
    };
  }, [position, size, isOpen, overlayColor, drawerColor, rounded, elevation]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      style={styles.overlay}
      onClick={handleOverlayClick}
      className={className}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div style={styles.drawer}>
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(Object.values(POSITIONS)),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(SIZES)),
    PropTypes.string,
  ]),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  overlayColor: PropTypes.string,
  drawerColor: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  rounded: PropTypes.oneOf(["none", "md", "lg"]),
  elevation: PropTypes.bool,
};

export default Drawer;
