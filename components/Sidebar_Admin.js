import avatar from '../public/avatar.png'
import student from '../public/student.png'
import teacher from '../public/teacher.png'
import schedule from '../public/schedule.png'
import books from '../public/books.png'
import dashboard from '../public/dashboard.png'
import email_img from '../public/email.png'
import Image from 'next/image'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import add from '../public/add-user.png'

export function Sidebar_Admin(props) {

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
                  <p className="text-Light font-semibold italic font-Vietnam mb-1 text-lg">Administrateur à {props.université}</p>
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
                  <Link href="/admin-dashboard">
                    <a className={`flex flex-row items-center px-2 py-3 ${props.bgDashColor}  rounded-lg`}>
                        <Image 
                          src={dashboard} 
                          height={40} 
                          width={40}
                          alt=""
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-lg text-center font-bold text-orange-400 font-Ubuntu">Tableau de bord</span>
                    </a>
                    </Link>

                    <Link href="/ajouter-un-etudiant">
                    <a className={`py-3 px-2 flex flex-row items-center ${props.bgNewColor} rounded-lg`}>
                        <Image
                          src={add}
                          height={40}  
                          width={40}
                          alt="" 
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-lg text-center font-bold text-orange-400 font-Ubuntu">Nouveau étudiant</span>
                    </a>
                    </Link>

                    <Link href="/ajouter-un-professeur">
                    <a className={`py-3 px-2 flex flex-row items-center ${props.bgNewProfColor} rounded-lg`}>
                        <Image
                          src={add}
                          height={40}  
                          width={40}
                          alt="" 
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-lg text-center font-bold text-orange-400 font-Ubuntu">Nouveau professeur</span>
                    </a>
                    </Link>
                   
                    <Link href="/etudiants">
                    <a className={`py-3 px-2 flex flex-row items-center ${props.bgEtudColor} rounded-lg`}>
                        <Image
                          src={student}
                          height={40}  
                          width={40}
                          alt="" 
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-lg text-center font-bold text-orange-400 font-Ubuntu">Etudiants</span>
                    </a>
                    </Link>   
                    <Link href="/professeurs">
                    <a className={`py-3 px-2 flex flex-row items-center ${props.bgProfColor} rounded-lg`}>
                        <Image
                          src={teacher}
                          height={40}  
                          width={40}
                          alt="" 
                        />
                        <span className="pb-1 ml-2 md:pb-0 text-lg text-center font-bold text-orange-400 font-Ubuntu">Professeurs</span>
                    </a>
                    </Link>              
                </ul>
            </div>


        </div>
    )
}