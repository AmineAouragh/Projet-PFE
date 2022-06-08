import facebook from '../../public/facebook.png'
import Image from 'next/image'

export function FacebookSignIn() {
    return (
        <button 
            className="rounded-3xl w-4/5 xl:w-1/2 bg-white mb-5 hover:bg-blue-100 hover:border-2 hover:border-blue-200 border-gray-100 border-2 shadow-xs py-2 px-4 flex flex-row items-center justify-center"
        >
            <Image
                src={facebook}
                height={24}
                width={24}
                alt="Facebook Logo" 
            />
            <span className="ml-2 text-md font-medium">Sign in with Facebook</span>
        </button>
    )
}