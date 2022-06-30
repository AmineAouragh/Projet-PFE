import { useState, useEffect } from 'react' 
import { Sidebar_Etudiant } from '../components/Sidebar_Etudiant'
import { supabase } from '../lib/initSupabase'

export default function MesInfos() {

    useEffect(() => {
        getStudentRecord()
    })

    const [ nomEtud, setNomEtud ] = useState('')
    const [ emailEtud, setEmailEtud ] = useState('')
    const [ filiereEtud, setFiliereEtud ] = useState('')
    const [ codeEtud, setCodeEtud ] = useState('')
    const [ cniEtud, setCniEtud ] = useState('')
    const [ cneEtud, setCneEtud ] = useState('')
    const [ ageEtud, setAgeEtud ] = useState('')
    const [ modules, setModules ] = useState([])

    async function getStudentRecord() {
        const { data: etudiant, error } = await supabase
        .from('etudiant')
        .select('id, nom, email, CNI, CNE, code, filière, age, modules')
        .order('id', {ascending: false})
        .limit(1)
        setNomEtud(etudiant[0].nom)
        setEmailEtud(etudiant[0].email)
        setFiliereEtud(etudiant[0].filière)
        setCodeEtud(etudiant[0].code)
        setCniEtud(etudiant[0].CNI)
        setCneEtud(etudiant[0].CNE)
        setAgeEtud(etudiant[0].age)
        setModules(etudiant[0].modules)
      }

    return (
        <div className="flex flex-row relative">
            <Sidebar_Etudiant nom={nomEtud} email={emailEtud} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
              <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Mes informations personelles</h3>
                </div>
              </div>
              <div className="m-5">
                <p className="font-extrabold text-xl">Nom et Prénom: </p> {nomEtud}
                <p className="font-extrabold text-xl">CNE: </p> {cneEtud}
                <p className="font-extrabold text-xl">CNI: </p> {cniEtud}
                <p className="font-extrabold text-xl">Age: </p> {ageEtud}
                <p className="font-extrabold text-xl">Filière: </p> {filiereEtud}
                <ul>
                  <p className="font-extrabold text-xl">Modules</p>
                {modules.map(mod => <li key={mod} className="ml-4">- {mod}</li>)}
                </ul>
                <p className="font-extrabold text-xl">Email </p> {emailEtud}
                <p className="font-extrabold text-xl">Code: </p> {codeEtud}
              </div>
            </div>
        </div>
    )
}