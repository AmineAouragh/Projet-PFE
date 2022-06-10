
import { useEffect, useState } from 'react'
import { Sidebar_Admin } from '../components/Sidebar_Professeur'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'

export default function TableProfesseurs() {

  const [ professeurs, setProfesseurs ] = useState([])
  const [ nom, setNom ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ université, setUniversité ] = useState('')
  const [ categorie, setCategorie ] = useState('')

  useEffect(() => {
    getProfRecord()
  })

  useEffect(() => {
    getAdminRecord()
  })

  async function getAdminRecord() {
    const { data: admin, error } = await supabase
    .from('admin')
    .select('nom, email, code, categorie, université')
    .eq('nom', "test")
    console.log(admin[0].code)
    setNom(admin[0].nom)
    setEmail(admin[0].email)
    setCategorie(admin[0].categorie)
    setUniversité(admin[0].université)
}

  async function getProfRecord() {
      const { data: professeur, error } = await supabase
      .from('professeur')
      .select('*')
      setProfesseurs(professeur)

  }

    const columns = [
        { key: 'nom', name: 'Nom & Prénom' },
        { key: 'email', name: 'Email' },
        {key: 'code', name: 'Code'},
        {key: 'université', name: 'Université'}
      ];

      const rows = []

      professeurs.map(professeur => rows.push(professeur))
      
     
    return (
        <div className="flex flex-row">
            <Sidebar_Admin nom={nom} email={email} category={categorie} université={université} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Professeurs</h3>
                </div>
            </div>
            <DataGrid columns={columns} rows={rows} />
            </div>
            
        </div>
    )
}