import { Sidebar_Professeur } from '../components/Sidebar_Professeur'
import { BoardProfesseur } from '../components/Board-Professeur'
import { supabase } from '../lib/initSupabase'
import { useState, useEffect } from 'react'

export default function ProfesseurDashboard() {

  const [ nom, setNom ] = useState('')
  const [ email, setEmail] = useState('')
  const [ université, setUniversité ] = useState('')

  useEffect(() => {
    getProfRecord()
  })

  async function getProfRecord() {
      const { data: professeur, error } = await supabase
      .from('professeur')
      .select('id, nom, email, code, université')
      .order('id', {ascending: false})
      .limit(1)
      setNom(professeur[0].nom)
      setEmail(professeur[0].email)
      setUniversité(professeur[0].université)

  }

    return (
        <div className="flex flex-row">
          <Sidebar_Professeur nom={nom} email={email} université={université} url="/professeur-dashboard" />
          <BoardProfesseur />
        </div>
    )
}