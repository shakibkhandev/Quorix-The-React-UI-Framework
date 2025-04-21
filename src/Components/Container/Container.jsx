import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const Container = ({
  children,
  maxWidth = "lg",
  padding = { base: "16px", sm: "24px" },
  className = "",
  style = {},
  fluid = false,
  background = "transparent",
  centerContent = false,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getResponsivePadding = () => {
    if (typeof padding === "string" || typeof padding === "number") {
      return padding;
    }

    if (windowWidth < 640) return padding.base || "16px";
    return padding.sm || "24px";
  };

  const containerStyles = {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: getResponsivePadding(),
    background,
    boxSizing: "border-box",
    transition: "padding 0.2s ease",
    ...(!fluid && {
      maxWidth:
        maxWidth === "sm"
          ? "640px"
          : maxWidth === "md"
          ? "768px"
          : maxWidth === "lg"
          ? "1024px"
          : maxWidth === "xl"
          ? "1280px"
          : maxWidth === "2xl"
          ? "1536px"
          : maxWidth,
    }),
    ...(centerContent && {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    ...style,
  };

  return (
    <div className={className} style={containerStyles}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl"]),
    PropTypes.string,
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      base: PropTypes.string,
      sm: PropTypes.string,
    }),
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  fluid: PropTypes.bool,
  background: PropTypes.string,
  centerContent: PropTypes.bool,
};

export default React.memo(Container);
