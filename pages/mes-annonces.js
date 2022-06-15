import { Sidebar_Professeur } from '../components/Sidebar_Professeur'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

export default function TableEtudiantsA() {

  const [ annonces, setAnnonces ] = useState([])
  const [ nom, setNom ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ université, setUniversité ] = useState('')
  const [ textarea, openTextarea ] = useState(false)
  const [ message, setMessage ] = useState('')


  useEffect(() => {
    getProfRecord()
  })

  useEffect(() => {
    getAnnonceRecord()
  })

  async function getProfRecord() {
      const { data: professeur, error } = await supabase
      .from('professeur')
      .select('nom, email, code, université')
      .eq('nom', "test")
      setNom(professeur[0].nom)
      setEmail(professeur[0].email)
      setUniversité(professeur[0].université)

  }

  async function sendMessage() {
    openTextarea(false)
    const { data, error } = await supabase
    .from('annonce')
    .insert([
        {'message': message, 'emetteur': nom}
    ])
    setTimeout(() => getAnnonceRecord(), 1500)
  }

  async function getAnnonceRecord() {
    const { data: annonce, error } = await supabase
    .from('annonce')
    .select('*')
    setAnnonces(annonce)
  }

    const columns = [
        { key: 'message', name: 'Message' },
        { key: 'emetteur', name: 'Emetteur'},
        { key: 'created_at', name: 'Envoyé le'}
    ]

    const rows = []

    annonces.map(message => rows.push(message))
      
     
    return (
        <div className="flex flex-row relative">
            <Sidebar_Professeur nom={nom} email={email} université={université} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Annonces</h3>
                    
                    <button type="button" onClick={() => openTextarea(true)} className={`${textarea ? 'hidden' : 'visible'} rounded-md mt-4 px-3 py-2 bg-green-400 font-bold`}>Nouvelle annonce</button>
                    <div className={`${textarea == true ? 'visible' : 'hidden'} flex flex-row mt-4 items-center`}>
                        <input type="text" value={message} onChange={e => setMessage(e.target.value)} className="border-0 bg-transparent font-bold w-128 rounded-lg" placeholder="Tapez votre annonce ou message ici" />
                        <button type="button" onClick={() => openTextarea(false)} className="rounded-md px-3 py-2 bg-red-400 hover:bg-red-500 font-bold ml-4">Annuler</button>
                        <button type="button" onClick={sendMessage} className="rounded-md px-3 py-2 bg-green-400 hover:bg-green-500 font-bold ml-4">Envoyer</button>
                    </div>
                </div>
            </div>
            
            <DataGrid columns={columns} rows={rows} />
            </div>
            
        </div>
    )
}