import Link from 'next/link'
import Image from 'next/image'
import landing from '../public/landing.png'
import { useState } from 'react'

export default function Landing() {

    const [ profClicked, setProfClicked ] = useState(false)
    const [ etudClicked, setEtudClicked ] = useState(false)

    function changeProf() {
        if (profClicked == false) {
            setProfClicked(true)
            setEtudClicked(false)
        }
    }

    function changeEtud() {
        if (etudClicked == false) {
            setEtudClicked(true)
            setProfClicked(false)
        }
    }

    return (
        <div className="flex flex-row items-center justify-center absolute w-full h-full bg-amber-100">
            <div className="lg:w-1/2 mx-8  w-full">
                <div className="flex flex-row items-center mb-4">
                    <button type="button" onClick={changeProf} className={`rounded-lg ${profClicked ? 'bg-gray-400 text-Light ring-gray-600 ring-2 ring-offset-2' : 'bg-gray-200 text-gray-500'} text-md font-bold px-2 py-1 mr-4`}>
                        Professeur
                    </button>
                    <button type="button" onClick={changeEtud} className={`rounded-lg ${etudClicked ? 'bg-gray-400 text-Light ring-gray-600 ring-2 ring-offset-2' : 'bg-gray-200 text-gray-500'} text-md font-bold px-2 py-1`}>
                        Etudiant
                    </button>
                </div>
                { profClicked && <p className="text-3xl font-bold mb-3">Consulter votre liste d&apos;étudiants, envoyer des fichiers et des messages à vos étudiants... <br /> Tout ça au meme endroit</p>}
                { etudClicked && <p className="text-3xl font-bold mb-3">Consulter vos informations personelles, recevoir des messages de vos professeurs, lire et/ou telecharger des fichiers envoyés par vos professeurs <br /> Tout ça en un seul endroit</p>}
                <button type="button" className="rounded-lg bg-amber-500 hover:bg-amber-400 text-2xl text-Light font-extrabold px-4 py-3 shadow-lg">
                    <Link href="/Login">
                        <a>Connectez vous</a>
                    </Link>
                </button>
            </div>
            <div className="lg:w-1/2 mx-8 w-full">
                <Image 
                  src={landing}
                  alt=""
                  height={500}
                  width={900}
                  className="rounded-3xl"
                />
            </div>
        </div>
    )
}