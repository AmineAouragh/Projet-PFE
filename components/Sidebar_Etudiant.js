import avatar from '../public/avatar.png'
import files from '../public/data-storage.png'
import dashboard from '../public/dashboard.png'
import email_img from '../public/email.png'
import Image from 'next/image'
import message from '../public/annonce.png'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import infos from '../public/file.png'

export function Sidebar_Etudiant(props) {

    return (
        <div className="bg-gray-800 shadow-xl h-16 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-60">
            <div className="md:w-60 mt-10 h-full md:fixed md:left-0 md:top-0 content-center md:content-start text-center justify-between">
                <Image
                  src={avatar}
                  height={80}
                  width={80} 
                  alt=""
                />
                <p className="mt-3 font-bold text-orange-400 font-Ubuntu text-xl mb-3">
                  {props.nom}
                </p>
                <div className="flex flex-col items-center justify-end">
                  <div className="flex flex-row items-center">
                    <Image
                      src={email_img} 
                      height={30}
                      width={30} 
                      alt=""
                    />
                    <p className="text-gray-400 ml-2 mt-3 font-semibold underline font-Vietnam mb-3 text-lg">{props.email}</p>
                  </div>
                </div>
                <ul className="flex flex-col mt-10 pl-6 text-center justify-around">
                  <Link href="/etudiant-dashboard">
                    <a className="flex flex-row items-center px-2 py-3 hover:bg-gray-100 rounded-lg">
                        <Image 
                          src={dashboard} 
                          height={40} 
                          width={40}
                          alt=""
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-xl text-center font-bold text-orange-400 font-Ubuntu">Tableau de bord</span>
                    </a>
                    </Link>

                    <Link href="/mes-informations-personelles">
                    <a className="py-3 px-2 flex flex-row items-center hover:bg-gray-100 rounded-lg">
                        <Image
                          src={infos}
                          height={40}  
                          width={40}
                          alt="" 
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-xl text-center font-bold text-orange-400 font-Ubuntu">Mes informations</span>
                    </a>
                    </Link>
                   
                    <Link href="/messages">
                    <a className="py-3 px-2 flex flex-row items-center hover:bg-gray-100 rounded-lg">
                        <Image
                          src={message}
                          height={40}  
                          width={40}
                          alt="" 
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-xl text-center font-bold text-orange-400 font-Ubuntu">Messages</span>
                    </a>
                    </Link>   
                    <Link href="/fichiers">
                    <a className="py-3 px-2 flex flex-row items-center hover:bg-gray-100 rounded-lg">
                        <Image
                          src={files}
                          height={40}  
                          width={40}
                          alt="" 
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-xl text-center font-bold text-orange-400 font-Ubuntu">Fichiers</span>
                    </a>
                    </Link>              
                </ul>
            </div>
        </div>
    )
}