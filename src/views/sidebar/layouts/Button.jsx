
const Button = ({event, bgColour, textColour, label, type}) => {
    return(
        <button style={{backgroundColor: bgColour, color: textColour}} onClick={event} type={type}
        className={`w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-[${{bgColour}}] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
            {label}
        </button>
    )
}


export default Button