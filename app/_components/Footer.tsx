import Link from "next/link";
import Image from "next/image";
import logo from '../../assets/images/freshcart-logo.svg';

export default function Footer() {
    const links = [
        { path: '/', element: 'Home' },
        { path: '/products', element: 'Products' },
        { path: '/auth/login', element: 'Login' },
        { path: '/auth/register', element: 'Register' },
    ];

    return (  
        <footer className="bg-white rounded-lg shadow-sm border border-gray-200 m-4 dark:bg-gray-800 dark:border-gray-700 mt-auto">
            <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-4 sm:mb-0">
                        <Image src={logo} className="h-7 w-auto" alt="FreshCart Logo" />
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-4 sm:gap-6">
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link href={link.path} className="hover:underline me-4 md:me-6">
                                    {link.element}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2026 FreshCart™. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}