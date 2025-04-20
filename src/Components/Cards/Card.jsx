import PropTypes from "prop-types";
import React from "react";

// Design tokens
const COLORS = {
  primary: {
    main: "#ffffff",
    border: "#e1e1e1",
    text: "#000000",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  secondary: {
    main: "#f8f9fa",
    border: "#dee2e6",
    text: "#212529",
    shadow: "rgba(0, 0, 0, 0.08)",
  },
  elevated: {
    main: "#ffffff",
    border: "transparent",
    text: "#000000",
    shadow: "rgba(0, 0, 0, 0.15)",
  },
};

const SIZES = {
  sm: { padding: "12px", borderRadius: "8px" },
  md: { padding: "16px", borderRadius: "12px" },
  lg: { padding: "24px", borderRadius: "16px" },
};

const Card = ({
  children,
  variant = "primary",
  className = "",
  size = "md",
  width,
  height,
  onClick,
  hoverable = false,
  fullWidth = false,
}) => {
  // Memoize styles to prevent recalculation on every render
  const cardStyles = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: COLORS[variant].main,
    color: COLORS[variant].text,
    border:
      variant === "elevated" ? "none" : `1px solid ${COLORS[variant].border}`,
    boxShadow:
      variant === "elevated"
        ? `0 4px 6px -1px ${COLORS[variant].shadow}, 0 2px 4px -1px ${COLORS[variant].shadow}`
        : "none",
    width: fullWidth ? "100%" : width || "auto",
    height: height || "auto",
    transition: "all 0.3s ease",
    cursor: onClick ? "pointer" : "default",
    ...SIZES[size],
    "&:hover": hoverable
      ? {
          transform: "translateY(-4px)",
          boxShadow: `0 10px 15px -3px ${COLORS[variant].shadow}, 0 4px 6px -2px ${COLORS[variant].shadow}`,
        }
      : {},
  };

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={className}
      style={cardStyles}
      onClick={handleClick}
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "elevated"]),
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default Card;
