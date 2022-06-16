import Image from 'next/image'
import chat from '../public/chat.png'
import course from '../public/online-course.png'
import Link from 'next/link'

export function BoardProfesseur() { 
    
    return (
        <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">

            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Mon tableau de bord</h3>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                        <div className="flex flex-row items-center mb-5">
                            <div className="flex-shrink pr-4">
                                <Image
                                  src={course}
                                  height={60}
                                  width={60} 
                                  alt=""
                                />
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h3 className="font-bold text-xl uppercase text-gray-800 mb-3">Cours</h3>
                                <p>Ici vous pouvez ajouter des cours ou fichiers pdf pour vos étudiants</p>
                            </div>
                        </div>
                        <Link href="/cours">
                        <button type="button" className="rounded-lg px-3 py-2 bg-green-500">
                            <span className="text-xl font-bold text-gray-100">Envoyer un cours</span>
                        </button>
                        </Link>
                    </div>
                </div>
              
                
            </div>


            <div className="flex flex-row flex-wrap flex-grow mt-2">

                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div className="bg-white border-transparent rounded-lg shadow-xl">
                        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                            <h5 className="font-bold uppercase text-gray-600">Mes étudiants</h5>
                        </div>
                        <div className="p-5">
                            <p className="text-lg font-bold mb-5">Ici vous pouvez consulter votre liste d&apos;étudiants</p>
                            <Link href="/etudiants">
                            <button type="button" className="rounded-lg px-3 py-2 bg-orange-400">
                                <span className="text-xl font-bold text-Light">Afficher</span>
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}