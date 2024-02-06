

const Footer = () => {

    return(
        <footer className="bg-white rounded-lg shadow dark:bg-gray-800 absolute bottom-0 w-full">
            <div className="w-full mx-auto py-6 px-6 flex flex-col md:flex-row items-center justify-between">
                <span className="text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">© Copyright 2024-
                    Octans by Boxity. All Rights Reserved by Boxity, Colaborated with KaskuID.
                </span>
                <ul
                    className="flex gap-3 w-fit flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://boxity.id/about" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="https://boxity.id/contact" className="mr-4 hover:underline md:mr-6">Contact</a>
                    </li>
                    <li>
                        <a href="/panduan" className="hover:underline">Documentation</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer