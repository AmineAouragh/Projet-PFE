import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'
import { Sidebar_Etudiant } from '../components/Sidebar_Etudiant'

export default function Messages() {
    useEffect(() => {
        getStudentRecord()
    })

    useEffect(() => {
        getAnnonceRecord()
    })

    const [ nomEtud, setNomEtud ] = useState('')
    const [ emailEtud, setEmailEtud ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ date, setDate ] = useState('')
    const [ emetteur, setEmetteur ] = useState('')
    const [ annonces, setAnnonces ] = useState([])

    async function getStudentRecord() {
        const { data: etudiant, error } = await supabase
        .from('etudiant')
        .select('nom, email')
        .eq('nom', "Amine Aouragh")
        setNomEtud(etudiant[0].nom)
        setEmailEtud(etudiant[0].email)
    }

    async function getAnnonceRecord() {
        const { data: annonce, error } = await supabase 
        .from('annonce')
        .select('message, emetteur, created_at')
        setAnnonces(annonce)
    }

    return (
        <div className="flex flex-row relative">
            <Sidebar_Etudiant nom={nomEtud} email={emailEtud} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
              <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Messages et annonces</h3>
                </div>
              </div>
              <div className="m-5">
                {
                  annonces.map(annonce => 
                    <div className="mb-4" key={annonce.id}>
                      <p className="text-gray-800 font-extrabold" key={annonce.id}>Envoyé par {annonce.emetteur}</p>
                      <p className="text-lg text-gray-600 font-bold" key={annonce.id}>{annonce.message}</p>
                    </div>
                  )
                }
              </div>
            </div> 
        </div>
    )
}