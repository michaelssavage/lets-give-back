export const HeartIcon = ({
  color = "#F15A29",
  size = 24,
  className = "",
  onClick,
  ...props
}: React.ComponentProps<"svg"> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 665 665"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    {...props}
  >
    <path
      d="M514.563 25.0809C356.903 8.39367 331.131 190.438 331.131 190.438C331.131 190.438 312.939 143.412 262.911 110.035C203.79 70.592 138.603 75.434 103.735 97.899C-117.597 240.5 99.6779 424.66 146.182 472.608C196.208 524.188 397.833 641 397.833 641C397.833 641 409.051 624.009 514.563 495.364C620.074 366.719 654.537 240.501 658.58 193.473C662.623 141.387 639.16 38.2687 514.563 25.0809Z"
      fill={color}
    />
  </svg>
);
