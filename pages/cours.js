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
    const [ telecharger, setTelecharger ] = useState(false)
    const [ lire, setLire ] = useState(false)

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

      async function setDroits () {
        const { data, error } = await supabase
        .from('fichier')
        .insert([
          {'Telecharger': telecharger, 'Lire': lire, 'nom': file.name}
        ])
      }

      function handleChange(ev) {
        if (ev.target.checked) {
          if (ev.target.value == "Lire") {
            setLire(true)
            console.log("Peut lire: " +lire)
          } else if (ev.target.value == "Telecharger") {
            setTelecharger(true)
            console.log("Peut telecharger: " +telecharger)
          }
        } else {
          if (ev.target.value == 'Lire') {
            setLire(false)
            console.log("Peut lire: " +lire)
          } else if (ev.target.value == "Telecharger") {
            setTelecharger(false)
            console.log("Peut telecharger: " +telecharger)
          }
        }
      }

      const handleSubmit = async (e) => {
          e.preventDefault()

            const filePath = file.name

          if (file) {
            
              const { data, error } = await supabase.storage.from('cours').upload(filePath, file)

          }

          setDroits()
          
          const { data, error } = await supabase
        .storage
        .from('cours')
        .download(filePath)
        console.log(filePath)

        try {
          const url = URL.createObjectURL(data)
        setUrl(url)
        } catch(err) {
          console.log(err)
        }
        

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
              <form onSubmit={handleSubmit} className="ml-8 my-10 flex flex-col">
              <label htmlFor="cours" className="font-Secular text-xl font-bold">Ajouter un cours</label>
              <br />
              <input onChange={e => setFile(e.target.files[0])} type="file" id="cours" className="my-5" accept=".pdf" name="cours" />
              <div className="flex flex-row items-center mr-3">
              <input type="checkbox" name="droit" value="Lire" onChange={handleChange} className="mr-3 rounded-lg text-green-400" /><label className="text-lg font-bold">Etudiant peut lire</label>
              </div>
              <div className="flex flex-row items-center mr-3 mb-5">
              <input type="checkbox" name="droit" value="Telecharger" onChange={handleChange} className="mr-3 rounded-lg text-green-400"/><label className="text-lg font-bold">Etudiant peut telecharger</label>
              </div>
              <button type="submit" className="bg-orange-400 rounded-xl w-40 font-bold text-lg text-Light px-5 py-2">Envoyer</button>
              </form>

              {
                  url && (
                    <>
                    <button type="button" className="bg-green-500 px-5 py-3 rounded-xl ml-8 shadow-lg">
                    <a href={url} download>
                       <span className="font-Bangers text-Light text-lg font-bold">Télécharger</span> 
                    </a>
                    </button>
                    </>
                  )
                  }
              
            </div>
        </div>
    )
}