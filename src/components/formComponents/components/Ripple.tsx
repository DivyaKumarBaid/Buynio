import React, { useRef, MouseEvent } from "react";

// import styles from '../css./RippleButton.module.css';
import styles from "../css.module/RippleButton.module.css";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  btnClass?: string;
  rippleBackground?: string;
  onDoubleClick?: boolean;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  btnClass,
  rippleBackground,
  onDoubleClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.style.background = rippleBackground!
      ? rippleBackground
      : "rgba(200,200,200,0.8)";
    circle.classList.add(styles.ripple);

    const ripple = button.getElementsByClassName(styles.ripple)[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button
      ref={buttonRef}
      className={`${styles.rippleButton} ${btnClass}`}
      onClick={(e) => {
        if (!onDoubleClick) {
          createRipple(e);
          if (onClick) {
            onClick(e);
          }
        }
      }}
      onDoubleClick={(e) => {
        if (onDoubleClick) {
          createRipple(e);
          if (onClick) {
            onClick(e);
          }
        }
      }}
    >
      {children}
    </button>
  );
};

export default RippleButton;
