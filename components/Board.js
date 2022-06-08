import Image from 'next/image'
import chat from '../public/chat.png'
import course from '../public/online-course.png'
import Link from 'next/link'

export function Board() { 
    
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
                                />
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h3 className="font-bold text-xl uppercase text-gray-800 mb-3">Cours</h3>
                                <h5 className="font-bold text-lg text-gray-600">- Structure de données: Piles & files<span className="text-green-500"></span></h5>
                                <h5 className="font-bold text-lg text-gray-600">- Structure de données: Arbres binaires<span className="text-green-500"></span></h5>
                            </div>
                        </div>
                        <Link href="/cours">
                        <button type="button" className="rounded-md px-3 py-1 bg-green-500">
                                <span className="text-lg font-bold text-gray-100">Envoyer un cours</span>
                        </button>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                        <div className="flex flex-row items-center mb-5">
                            <div className="flex-shrink pr-4 relative">
                                <Image
                                  src={chat}
                                  height={60}
                                  width={60} 
                                />
                                <div className="rounded-full h-3 w-3 bg-green-500 absolute text-sm top-0 right-4 translate-x-1/2 -translate-y-1/3"></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h3 className="font-bold text-xl uppercase text-gray-800 mb-3">Nouveaux messages</h3>
                                <h5 className="font-semibold font-Ubuntu text-gray-600 text-md">15 messages actifs <span className="text-yellow-600"></span></h5>
                            </div>
                        </div>
                        <button type="button" className="rounded-md px-3 py-1 bg-amber-500">
                            <span className="text-lg font-bold text-gray-100">Envoyer un message</span>
                        </button>
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
                            <table className="w-full p-5 mb-5 text-gray-700">
                                <thead>
                                    <tr>
                                        <th className="text-left text-blue-900">Nom</th>
                                        <th className="text-left text-blue-900">Email</th>
                                        <th className="text-left text-blue-900">ID</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Amer Sikira</td>
                                        <td>something@gmail.com</td>
                                        <td>3598</td>
                                    </tr>
                                    <tr>
                                        <td>Dagobert Renouf</td>
                                        <td>something1@gmail.com</td>
                                        <td>2711</td>
                                    </tr>
                                    <tr>
                                        <td>Magdalena</td>
                                        <td>something2@gmail.com</td>
                                        <td>6958</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link href="/etudiants">
                            <button type="button" className="rounded-md px-3 py-1 bg-orange-200">
                                <span className="text-lg font-bold text-gray-600">Voir plus</span>
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}