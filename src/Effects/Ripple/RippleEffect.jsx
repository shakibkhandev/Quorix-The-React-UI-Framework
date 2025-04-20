import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const RippleEffect = ({
  color = "rgba(33, 33, 41, 0.7)",
  duration = 700,
  children,
}) => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const cleanup = () => {
      ripples.forEach((ripple) => {
        if (ripple.timer) clearTimeout(ripple.timer);
      });
    };
    return cleanup;
  }, [ripples]);

  const addRipple = (event) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Calculate ripple position as percentage
    const x = ((event.pageX - rect.left) * 100) / container.offsetWidth;
    const y = ((event.pageY - rect.top) * 100) / container.offsetHeight;

    const ripple = {
      x,
      y,
      id: Date.now(),
    };

    const timer = setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((item) => item.id !== ripple.id)
      );
    }, duration);

    ripple.timer = timer;
    setRipples((prevRipples) => [...prevRipples, ripple]);
  };

  return (
    <div
      ref={containerRef}
      onClick={addRipple}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        borderRadius: "inherit",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            backgroundColor: color,
            borderRadius: "50%",
            width: "5px",
            height: "5px",
            zIndex: 5,
            animation: `ripple ${duration}ms linear`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes ripple {
            0% {
              width: 0;
              height: 0;
              opacity: 0.4;
            }
            100% {
              width: 500px;
              height: 500px;
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

RippleEffect.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default RippleEffect;
