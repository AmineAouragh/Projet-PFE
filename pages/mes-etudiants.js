import { Sidebar_Professeur } from '../components/Sidebar_Professeur'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

export default function TableEtudiantsP() {

  const [ students, setStudents ] = useState([])
  const [ nom, setNom ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ université, setUniversité ] = useState('')
  const [ mods, setMods ] = useState([])
  const [ mod, setMod ] = useState('')


  useEffect(() => {
    getStudentRecord()
  })

  useEffect(() => {
    getProfRecord()
  })

  async function getProfRecord() {
      const { data: professeur, error } = await supabase
      .from('professeur')
      .select('id, nom, email, code, université, module_enseigné')
      .order('id', {ascending: false})
      .limit(1)
      setNom(professeur[0].nom)
      setEmail(professeur[0].email)
      setUniversité(professeur[0].université)
      setMod(professeur[0].module_enseigné)

  }

  async function getStudentRecord() {
    const { data: etudiant, error } = await supabase
    .from('etudiant')
    .select('CNE, nom, email, filière, modules')
    setStudents(etudiant)
  }

    const columns = [
        { key: 'CNE', name: 'CNE' },
        {key: 'nom', name: 'Nom & Prénom'},
        {key: 'email', name: 'Email'},
        {key: 'filière', name: 'Filière'},
        {key: 'modules', name: 'Modules'}
      ];

      const rows = []

      students.map(student => { student.modules?.includes(mod) && rows.push(student)})
      
     
    return (
        <div className="flex flex-row">
            <Sidebar_Professeur nom={nom} email={email} université={université} />
            <div className="main-content flex-1 bg-orange-100 relative pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Etudiants</h3>
                </div>
            </div>
            <DataGrid columns={columns} rows={rows} className="w-full h-full absolute" />
            </div>
            
        </div>
    )
}