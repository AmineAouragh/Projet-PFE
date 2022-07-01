import { useState, useEffect } from 'react' 
import { Sidebar_Etudiant } from '../components/Sidebar_Etudiant'
import { supabase } from '../lib/initSupabase'

export default function Fichiers() {

    useEffect(() => {
        getStudentRecord()
    })

    useEffect(() => {
        download()
    })

    useEffect(() => {
        downloadFile()
    })

    

    const [ nomEtud, setNomEtud ] = useState('')
    const [ emailEtud, setEmailEtud ] = useState('')
    const [ file, setFile ] = useState()
    const [ url, setUrl ] = useState('')
    const [ urlA, setUrlA ] = useState('')
    const [ lire, setLire ] = useState(false)
    const [ telecharger, setTelecharger ] = useState(false)
    const [ fileName, setFileName ] = useState('')

    async function getStudentRecord() {
        const { data: etudiant, error } = await supabase
        .from('etudiant')
        .select('id, nom, email')
        .order('id', {ascending: false})
        .limit(1)
        setNomEtud(etudiant[0].nom)
        setEmailEtud(etudiant[0].email)
    }


    async function download() {
        const { data: fichier, error } = await supabase
        .from('fichier')
        .select('id, nom, Lire, Telecharger')
        setFileName(fichier[0].nom)
        setTelecharger(fichier[0].Telecharger)
        setLire(fichier[0].Lire)
        setFile(fichier)
    }

        
    async function downloadFile() {
        const { data, error } = await supabase
        .storage
        .from('cours')
        .download(fileName)

        try {
            const url = URL.createObjectURL(data)
            setUrl(url)
        } catch (error) {
            console.log(error)
        } 
        console.clear()
        
    }


    return (
        <div className="flex flex-row relative">
            <Sidebar_Etudiant nom={nomEtud} email={emailEtud} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
              <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Cours et fichiers</h3>
                </div>
              </div>
              <div className="m-5">
                
                  
                      <div className="flex flex-row items-center">
                        <p className="mr-5">{fileName}</p>
                        <p className="mr-3">{
                          lire.toString() == "true"
                          ?
                          <button type="button" className="bg-amber-400 font-bold text-lg rounded-lg px-3 py-2 mr-4">
                          <a href={url} target="_blank" rel="noreferrer noopener">Lire fichier</a>
                          </button>
                          :
                            "Vous ne pouvez pas lire ce fichier"
                        }</p>
                        <p> {
                              telecharger.toString() == "true" 
                              ? 
                                <button type="button" className="bg-cyan-500 font-bold text-lg text-Light rounded-lg px-3 py-2">
                                  <a href={url} download>Telecharger</a>
                                </button> 
                              : "Vous ne pouvez pas télécharger"
                            }
                        </p>
                      </div>
                  
               
                
              </div>
            </div>
        </div>
    )
}