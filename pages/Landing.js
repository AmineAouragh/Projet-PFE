import Link from 'next/link'
import Image from 'next/image'
import landing from '../public/landing.png'

export default function Landing() {
    return (
        <div className="flex flex-row items-center justify-center absolute w-full h-full bg-amber-100">
            <div className="lg:w-1/3 mx-12  w-full">
                <p className="text-4xl font-bold mb-3">Gérer votre liste d&apos;étudiants, envoyez des fichiers et des messages tout ça à partir de votre tableau de bord</p>
                <button type="button" className="rounded-lg bg-amber-500 hover:bg-amber-400 text-2xl text-Light font-extrabold px-4 py-3 shadow-lg">
                    <Link href="/Login">
                        <a>Connectez vous</a>
                    </Link>
                </button>
            </div>
            <div className="lg:w-2/3 mx-8 w-full">
                <Image 
                  src={landing}
                  alt=""
                  height={500}
                  width={900}
                  className="rounded-xl shadow-2xl"
                />
            </div>
        </div>
    )
}