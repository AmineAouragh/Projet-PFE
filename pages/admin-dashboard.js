import { useRouter } from 'next/router'
import { Sidebar } from '../components/Sidebar'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'
import { BoardAdmin } from '../components/Board-Admin'

export default function AdminDashboard() {

    useEffect(() => {
        getAdminRecord()
    })

    const router = useRouter()

    const [ nom, setNom ] = useState('')
    const [ categorie, setCategorie ] = useState('')
    const [ email, setEmail] = useState('')

    async function getAdminRecord() {
        const { data: admin, error } = await supabase
        .from('admin')
        .select('nom, email, code, categorie')
        .eq('nom', "test")
        console.log(admin[0].code)
        setNom(admin[0].nom)
        setEmail(admin[0].email)
        setCategorie(admin[0].categorie)
    }

    return (
        <div className="flex flex-row">
            <Sidebar nom={nom} email={email} category={categorie} />
            <BoardAdmin />
        </div>
    )
}