import { Sidebar_Admin } from '../components/Sidebar_Admin'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

export default function TableEtudiantsA() {

  const [ students, setStudents ] = useState([])
  const [ nom, setNom ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ université, setUniversité ] = useState('')

  useEffect(() => {
    getStudentRecord()
  })

  useEffect(() => {
    getAdminRecord()
  })

  async function getAdminRecord() {
      const { data: admin, error } = await supabase
      .from('admin')
      .select('nom, email, code, université')
      .eq('nom', "test")
      setNom(admin[0].nom)
      setEmail(admin[0].email)
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
        {key: 'filière', name: 'Filière'},
        {key: 'email', name: 'Email'},
        {key: 'code', name: 'Code'}
      ];

      const rows = []

      students.map(student => rows.push(student))
      
     
    return (
        <div className="flex flex-row">
            <Sidebar_Admin nom={nom} email={email} université={université} bgEtudColor="bg-gray-100" />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5 relative">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Etudiants</h3>
                </div>
            </div>
            <DataGrid columns={columns} rows={rows} className="h-full w-full absolute" />
            </div>
            
        </div>
    )
}