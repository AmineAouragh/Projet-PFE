import { Sidebar_Admin } from '../components/Sidebar_Admin'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

export default function Professeurs() {

    useEffect(() => {
        getProfRecord()
    })

    useEffect(() => {
        getAdminRecord()
    })

    const [ professeurs, setProfesseurs ] = useState([])
  const [ nom, setNom ] = useState('')
  const [ nomA, setNomA ] = useState('')
  const [ emailA, setEmailA ] = useState('')
  const [ universitéA, setUniversitéA ] = useState('')
  const [ categorieA, setCategorieA ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ université, setUniversité ] = useState('')

  async function getProfRecord() {
    const { data: professeur, error } = await supabase
    .from('professeur')
    .select('*')
    setProfesseurs(professeur)
}

async function getAdminRecord() {
    const { data: admin, error } = await supabase
    .from('admin')
    .select('nom, email, code, université')
    .eq('nom', "test")
    setNomA(admin[0].nom)
    setEmailA(admin[0].email)
    setUniversitéA(admin[0].université)
}



const columns = [

    {key: 'nom', name: 'Nom & Prénom'},
    { key: 'code', name: 'Code'},
    {key: 'email', name: 'Email'},
    {key: 'université', name: 'Université'},
    {key: 'module_enseigné', name: 'Module Enseigné'}
  ];

  const rows = []

  professeurs.map(professeur => rows.push(professeur))

    return (
        <div className="flex flex-row relative">
            <Sidebar_Admin nom={nomA} email={emailA} université={universitéA} bgProfColor="bg-gray-100" />
            <div className="main-content flex-1 relative bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3 ">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Professeurs</h3>
                </div>
            </div>
            <DataGrid columns={columns} rows={rows} className="h-full absolute" />
            </div>
        </div>
    )
}