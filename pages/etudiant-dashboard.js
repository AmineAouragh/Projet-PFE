import { useRouter } from 'next/router'
import { Sidebar_Etudiant } from '../components/Sidebar_Etudiant'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'
import { BoardEtudiant } from '../components/Board-Etudiant'

export default function EtudiantDashboard() {

    useEffect(() => {
        getStudentRecord()
    })

    const router = useRouter()

    const [ nom, setNom ] = useState('')
    const [ email, setEmail] = useState('')

    async function getStudentRecord() {
        const { data: etudiant, error } = await supabase
        .from('etudiant')
        .select('nom, email, code, CNI, CNE, age')
        .eq('nom', "Amine Aouragh")
        setNom(etudiant[0].nom)
        setEmail(etudiant[0].email)
    }

    return (
        <div className="flex flex-row">
            <Sidebar_Etudiant nom={nom} email={email} />
            <BoardEtudiant />
        </div>
    )
}