import { useRouter } from 'next/router'
import { Sidebar_Admin } from '../components/Sidebar_Admin'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'
import { BoardAdmin } from '../components/Board-Admin'

export default function AdminDashboard() {

    useEffect(() => {
        getAdminRecord()
    })

    const router = useRouter()

    const [ nom, setNom ] = useState('')
    const [ email, setEmail] = useState('')
    const [ université, setUniversité ] = useState('')

    async function getAdminRecord() {
        const { data: admin, error } = await supabase
        .from('admin')
        .select('nom, email, code, université')
        .eq('nom', "test")
        setNom(admin[0].nom)
        setEmail(admin[0].email)
        setUniversité(admin[0].université)
    }

    return (
        <div className="flex flex-row">
            <Sidebar_Admin nom={nom} email={email} université={université} />
            <BoardAdmin />
        </div>
    )
}