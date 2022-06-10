import { Sidebar_Admin } from '../components/Sidebar_Admin'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

export default function TableEtudiantsA() {

  const [ students, setStudents ] = useState([])
  const [ nom, setNom ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ université, setUniversité ] = useState('')
  const [ categorie, setCategorie ] = useState('')

  useEffect(() => {
    getStudentRecord()
  })

  useEffect(() => {
    getAdminRecord()
  })

  async function getAdminRecord() {
      const { data: admin, error } = await supabase
      .from('admin')
      .select('nom, email, code, université, categorie')
      .eq('nom', "test")
      console.log(professeur[0].code)
      setNom(admin[0].nom)
      setEmail(admin[0].email)
      setCategorie(admin[0].categorie)
      setUniversité(admin[0].université)

  }

  async function getStudentRecord() {
    const { data: etudiant, error } = await supabase
    .from('etudiant')
    .select('*')
    setStudents(etudiant)
  }

    const columns = [
        { key: 'CNE', name: 'CNE' },
        { key: 'CNI', name: 'CNI' },
        {key: 'nom', name: 'Nom & Prénom'},
        { key: 'age', name: 'Age'},
        {key: 'email', name: 'Email'},
        {key: 'filière', name: 'Filière'}
      ];

      const rows = []

      students.map(student => rows.push(student))
      
     
    return (
        <div className="flex flex-row">
            <Sidebar_Admin nom={nom} email={email} category={categorie} université={université} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Etudiants</h3>
                </div>
            </div>
            <DataGrid columns={columns} rows={rows} />
            </div>
            
        </div>
    )
}