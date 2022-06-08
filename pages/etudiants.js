import { Sidebar } from '../components/Sidebar'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

export default function TableEtudiants() {

  const [ students, setStudents ] = useState([])


  useEffect(() => {
    getStudentRecord()
  })

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
            <Sidebar />
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