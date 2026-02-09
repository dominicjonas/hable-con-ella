import PropTypes from "prop-types";

import { ChevronLeft, Heart, Menu, Shuffle, HeartIcon, Camera } from "lucide-react";

const iconMap = {
  "chevron-left": ChevronLeft,
  menu: Menu,
  shuffle: Shuffle,
  heart: HeartIcon,
  camera: Camera,
};

const Icon = ({ name, size = 28, color = "#666", strokeWidth = 2, className = "", onClick, ...props }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      onClick={onClick}
      {...props}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
