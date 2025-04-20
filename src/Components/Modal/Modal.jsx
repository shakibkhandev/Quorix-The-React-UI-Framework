import PropTypes from "prop-types";
import React, { useMemo } from "react";

// Design tokens
const SIZES = {
  sm: { width: "400px", height: "300px" },
  md: { width: "600px", height: "400px" },
  lg: { width: "800px", height: "600px" },
  full: { width: "90vw", height: "90vh" },
};

const VARIANTS = {
  basic: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  info: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
  },
  success: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },
  warning: {
    backgroundColor: "#fff3e0",
    color: "#ed6c02",
  },
  error: {
    backgroundColor: "#fbe9e7",
    color: "#d32f2f",
  },
};

const Modal = ({
  children,
  isOpen = false,
  onClose,
  size = "md",
  width,
  height,
  rounded = "md",
  variant = "basic",
  overlayColor = "rgba(0, 0, 0, 0.7)",
  closeOnOverlayClick = true,
  elevation = true,
  className = "",
  showCloseButton = true,
  animation = "scale", // scale, slideUp, slideDown
}) => {
  const styles = useMemo(() => {
    // Get size values
    const sizeValues =
      width || height ? { width, height } : SIZES[size] || SIZES.md;
    const variantStyles = VARIANTS[variant] || VARIANTS.basic;

    const overlay = {
      width: "100vw",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: overlayColor,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? "visible" : "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 1000,
    };

    const getModalTransform = () => {
      if (!isOpen) return "scale(0.8)";
      switch (animation) {
        case "scale":
          return "scale(1)";
        case "slideUp":
          return "translateY(0)";
        case "slideDown":
          return "translateY(0)";
        default:
          return "scale(1)";
      }
    };

    const getInitialTransform = () => {
      switch (animation) {
        case "scale":
          return "scale(0.8)";
        case "slideUp":
          return "translateY(100px)";
        case "slideDown":
          return "translateY(-100px)";
        default:
          return "scale(0.8)";
      }
    };

    const modal = {
      width: sizeValues.width,
      height: sizeValues.height,
      backgroundColor: variantStyles.backgroundColor,
      color: variantStyles.color,
      position: "relative",
      borderRadius:
        rounded === "none"
          ? "0"
          : rounded === "sm"
          ? "8px"
          : rounded === "md"
          ? "12px"
          : rounded === "lg"
          ? "20px"
          : rounded === "full"
          ? "30px"
          : "12px",
      boxShadow: elevation
        ? "0 24px 38px rgba(0, 0, 0, 0.14), 0 9px 46px rgba(0, 0, 0, 0.12), 0 11px 15px rgba(0, 0, 0, 0.2)"
        : "none",
      transform: getModalTransform(),
      opacity: isOpen ? 1 : 0,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      overflow: "hidden",
    };

    const closeButton = {
      position: "absolute",
      top: "16px",
      right: "16px",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      color: variantStyles.color,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    };

    const content = {
      padding: "24px",
      height: "100%",
      overflow: "auto",
    };

    return { overlay, modal, closeButton, content };
  }, [
    isOpen,
    size,
    width,
    height,
    rounded,
    variant,
    overlayColor,
    elevation,
    animation,
  ]);

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
      <div style={styles.modal}>
        {showCloseButton && (
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        )}
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(SIZES)),
  width: PropTypes.string,
  height: PropTypes.string,
  rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "full"]),
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  overlayColor: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  elevation: PropTypes.bool,
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
  animation: PropTypes.oneOf(["scale", "slideUp", "slideDown"]),
};

export default Modal;
