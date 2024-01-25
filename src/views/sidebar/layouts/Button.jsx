import { useColor } from "../../conifg/GlobalColour"

const Button = ({
        event, 
        bgColour, 
        textColour, 
        label, 
        icon, 
        type, 
        paddingY,
        className,
    }) => {

    const { globalColor, changeColor } = useColor();

    return(
        <button style={{
            backgroundColor: bgColour == 'primary' ? globalColor : bgColour == 'secondary' ? '' : bgColour == 'delete' ? '' : '', 
            color: textColour}} 
            onClick={event} 
            type={type}
            className={`${className} flex items-center gap-1 justify-center bg-white border-gray-300 dark:border-gray-600 ${bgColour == 'primary' ? `text-white` : `text-gray-600 border`} dark:text-white hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-4 py-${paddingY} dark:bg-gray-800 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800`}>
            {icon}
            {label}
        </button>
    )
}


export default Button