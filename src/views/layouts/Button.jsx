import { useColor } from "../config/GlobalColour";

const Button = ({
  event,
  bgColour,
  textColour,
  label,
  icon,
  type,
  paddingY,
  paddingX,
  className,
  disabled
}) => {
  const { globalColor, changeColor } = useColor();

  return (
    <button
      style={{
        backgroundColor:
          bgColour === "primary"
            ? globalColor
            : bgColour === "secondary"
            ? ""
            : bgColour === "delete"
            ? ""
            : bgColour,
        color: textColour,
      }}
      onClick={event}
      type={type}
      disabled={disabled}
      className={`${className} flex items-center gap-1 justify-center bg-white border-gray-500 dark:border-gray-400 ${
        bgColour === "primary" ? `text-white` : `border`
      } dark:text-white hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-${
        !!paddingX ? paddingX : "4"
      } py-${paddingY} dark:bg-gray-800 focus:outline-none dark:focus:ring-primary-800`}
    >
      {icon}
      <span style={{ color: textColour }}>{label}</span>
    </button>
  );
};

export default Button;
