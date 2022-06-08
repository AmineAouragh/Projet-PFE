import google from '../../public/google.png'
import Image from 'next/image'

export function GoogleSignIn() {
    return (
        <button 
            className="rounded-3xl w-4/5 xl:w-1/2 bg-white hover:bg-red-100 hover:border-2 hover:border-red-200 border-gray-100 border-2 shadow-xs py-2 px-4 mb-3 flex flex-row items-center justify-center"
        >
            <Image
                src={google}
                height={24}
                width={24}
                alt="Google Logo" 
            />
            <span className="ml-2 text-md font-medium">Sign in with Google</span>
        </button>
    )
}