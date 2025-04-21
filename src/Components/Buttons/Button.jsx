import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";
import RippleEffect from "./RippleEffect";
import "./RippleEffect.css";

// Design tokens
const COLORS = {
  primary: {
    main: "#3994d1",
    hover: "#1687d3",
    text: "#ffffff",
  },
  secondary: {
    main: "#873cb0",
    hover: "#9812e0",
    text: "#ffffff",
  },
  success: {
    main: "#2ecc71",
    hover: "#21da6e",
    text: "#ffffff",
  },
  error: {
    main: "#c0392b",
    hover: "#ec220c",
    text: "#ffffff",
  },
  warning: {
    main: "#e74c3c",
    hover: "#eb3824",
    text: "#ffffff",
  },
};

const SIZES = {
  sm: { padding: "8px 16px", fontSize: "13px" },
  md: { padding: "12px 24px", fontSize: "15px" },
  lg: { padding: "16px 32px", fontSize: "17px" },
};

const Button = ({
  children,
  variant = "contained",
  type = "button",
  className = "",
  id = "",
  onClick,
  size = "md",
  color = "primary",
  width,
  height,
  disabled = false,
  startIcon = null,
  endIcon = null,
  rounded = "md",
  fullWidth = false,
  loading = false,
  ariaLabel,
  rippleColor = "rgba(255, 255, 255, 0.7)",
}) => {
  // Function to calculate hover color for custom hex
  const calculateHoverColor = (hexColor) => {
    // Remove the # if present
    const hex = hexColor.replace("#", "");
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Darken by 10%
    const darkenFactor = 0.9;
    const newR = Math.floor(r * darkenFactor);
    const newG = Math.floor(g * darkenFactor);
    const newB = Math.floor(b * darkenFactor);
    // Convert back to hex
    return `#${newR.toString(16).padStart(2, "0")}${newG
      .toString(16)
      .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
  };

  // Memoize styles to prevent recalculation on every render
  const buttonStyles = useMemo(() => {
    const baseStyles = {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      outline: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 500,
      border: "none",
      position: "relative",
      textDecoration: "none",
      userSelect: "none",
      WebkitTapHighlightColor: "transparent",
      width: fullWidth ? "100%" : width,
      height,
      ...SIZES[size],
      borderRadius:
        rounded === "none"
          ? "0"
          : rounded === "sm"
          ? "4px"
          : rounded === "md"
          ? "6px"
          : rounded === "lg"
          ? "8px"
          : rounded === "full"
          ? "9999px"
          : "6px",
      overflow: "hidden",
    };

    // Determine if using predefined color or custom hex
    const colorStyles = COLORS[color] || {
      main: color,
      hover: calculateHoverColor(color),
      text: "#ffffff",
    };

    const variants = {
      contained: {
        backgroundColor: colorStyles.main,
        color: colorStyles.text,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: colorStyles.hover,
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
        "&:active": {
          transform: "translateY(0)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        },
      },
      outlined: {
        backgroundColor: "transparent",
        border: `2px solid ${colorStyles.main}`,
        color: colorStyles.main,
        "&:hover": {
          backgroundColor: `${colorStyles.main}10`,
          borderColor: colorStyles.hover,
          color: colorStyles.hover,
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        "&:active": {
          transform: "translateY(0)",
          boxShadow: "none",
        },
      },
      text: {
        backgroundColor: "transparent",
        color: colorStyles.main,
        "&:hover": {
          backgroundColor: `${colorStyles.main}10`,
        },
      },
    };

    return {
      ...baseStyles,
      ...variants[variant],
    };
  }, [variant, size, color, disabled, width, height, rounded, fullWidth]);

  const handleClick = useCallback(
    (event) => {
      if (!disabled && !loading && onClick) {
        onClick(event);
      }
    },
    [disabled, loading, onClick]
  );

  return (
    <RippleEffect color={rippleColor}>
      <button
        type={type}
        id={id}
        onClick={handleClick}
        className={className}
        style={buttonStyles}
        disabled={disabled || loading}
        aria-label={ariaLabel || children}
        aria-disabled={disabled || loading}
        role="button"
      >
        {loading ? (
          <span className="button-loader" />
        ) : (
          <>
            {startIcon && (
              <span className="button-start-icon">{startIcon}</span>
            )}
            {children}
            {endIcon && <span className="button-end-icon">{endIcon}</span>}
          </>
        )}
      </button>
    </RippleEffect>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.string, // Updated to accept any string (predefined or hex)
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "full"]),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  ariaLabel: PropTypes.string,
  rippleColor: PropTypes.string,
};

export default React.memo(Button);
