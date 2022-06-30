import { useState, useEffect } from 'react' 
import { Sidebar_Etudiant } from '../components/Sidebar_Etudiant'
import { supabase } from '../lib/initSupabase'

export default function Fichiers() {

    useEffect(() => {
        getStudentRecord()
    })

    useEffect(() => {
        getFiles()
    })

    useEffect(() => {
        downloadFile()
    })

    const [ nomEtud, setNomEtud ] = useState('')
    const [ emailEtud, setEmailEtud ] = useState('')
    const [ files, setFiles ] = useState([])
    const [ file, setFile ] = useState()
    const [ url, setUrl ] = useState('')

    async function getStudentRecord() {
        const { data: etudiant, error } = await supabase
        .from('etudiant')
        .select('id, nom, email')
        .order('id', {ascending: false})
        .limit(1)
        setNomEtud(etudiant[0].nom)
        setEmailEtud(etudiant[0].email)
    }

    async function getFiles() {
        const { data, error } = await supabase 
        .storage
        .from('cours')
        .list()
        setFiles(data)
        console.log(data)
    }

        
    async function downloadFile() {
        const { data, error } = await supabase
        .storage
        .from('cours')
        .download('document.pdf')

        const url = URL.createObjectURL(data)
        setUrl(url)
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
                {files.map(file => <p key={file.id}>{file.name}</p>)}
                <button type="button" className="bg-green-400 rounded-lg px-3 py-2 font-bold text-Light">
                <a href={url} download>Telecharger</a>
                </button>
              </div>
            </div>
        </div>
    )
}