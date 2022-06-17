import Link from 'next/link'
import { Sidebar_Professeur } from '../components/Sidebar_Professeur'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'

export default function Cours() {

    const [ nom, setNom ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ université, setUniversité ] = useState('')
    const [ file, setFile ] = useState()
    const [ url, setUrl ] = useState('')

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

      

      const handleSubmit = async (e) => {
          e.preventDefault()

            const fileName = file.name
            const filePath = fileName

          if (file) {
            
              const { data, error } = await supabase.storage.from('cours').upload(filePath, file)

          }
          
          const { data, error } = await supabase
        .storage
        .from('cours')
        .download(filePath)

        const url = URL.createObjectURL(data)
        setUrl(url)

      }

    return (
        <div className="flex flex-row">
            <Sidebar_Professeur nom={nom} email={email} université={université} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
              <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Cours</h3>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="ml-8 my-10">
              <label htmlFor="cours" className="font-Secular text-xl mb-10 font-bold">Ajouter un cours</label>
              <br />
              <input onChange={e => setFile(e.target.files[0])} type="file" id="cours" accept=".pdf" name="cours" />
              
              <button type="submit" className="bg-orange-400 rounded-xl px-5 py-2">Envoyer</button>
              </form>

              {/*
                  url && (
                    <>
                    <button type="button" className="bg-green-500 px-5 py-3 rounded-xl ml-8 shadow-lg">
                    <a href={url} download>
                       <span className="font-Bangers text-Light text-lg font-bold">Télécharger</span> 
                    </a>
                    </button>
                    </>
                  )
                  */}
              
            </div>
        </div>
    )
}