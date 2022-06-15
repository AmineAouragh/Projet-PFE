import { supabase } from '../lib/initSupabase'
import { Sidebar_Admin } from '../components/Sidebar_Admin'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AjouterEtudiant() {

    const [ nomA, setNomA ] = useState('')
    const [ emailA, setEmailA ] = useState('')
    const [ universitéA, setUniversitéA ] = useState('')
    const [ nom, setNom ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ cni, setCni ] = useState('')
    const [ age, setAge ] = useState('')
    const [ cne, setCne ] = useState('')
    const [ code, setCode ] = useState('')
    const [ filiere, setFiliere ] = useState('')

    const router = useRouter()

    useEffect(() => {
        getAdminRecord()
      })
    
      async function getAdminRecord() {
          const { data: admin, error } = await supabase
          .from('admin')
          .select('nom, email, code, université')
          .eq('nom', "test")
          setNomA(admin[0].nom)
          setEmailA(admin[0].email)
          setUniversitéA(admin[0].université)
    
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase
        .from("etudiant")
        .insert([
            {'CNE': cne, 'CNI': cni, "nom": nom, "age": age, "email": email, "filière": filiere, "code": code}
        ])
        setTimeout(() => router.push('/etudiants'), 1500)
      }

    return (
        <div className="flex flex-row relative">
            <Sidebar_Admin nom={nomA} email={emailA} université={universitéA} bgNewColor="bg-gray-100" />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Ajouter un étudiant</h3>
                </div>
            </div>
            <form className="m-5 flex flex-col">
                <label htmlFor="name" className="mr-3">
                    Nom & Prénom:
                </label>
                <input type="text" id="name" name="name" value={nom} onChange={e => setNom(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="cni" className="mr-3">
                    CNI:
                </label>
                <input type="text" id="cni" name="cni" value={cni} onChange={e => setCni(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="cne" className="mr-3">
                    CNE:
                </label>
                <input type="text" id="cne" name="cne" value={cne} onChange={e => setCne(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="filiere" className="mr-3">
                    Filière:
                </label>
                <select className="w-128 mb-4" name="filiere" id="filiere" value={filiere} onChange={e=> setFiliere(e.target.value)}>
                    <option name="smia s1/s2" value="SMIA S1/S2">SMIA S1/S2</option>
                    <option name="smi s3/s4" value="SMI S3/S4">SMI S3/S4</option>
                    <option name="smi s5/s6 bd" value="SMI S6 BD">SMI S5/S6 (BD)</option>
                    <option name="smi s5/s6 reseaux" value="SMI S6 RESEAUX">SMI S5/S6 (Reseaux)</option>
                </select>
                <label htmlFor="age" className="mr-3">
                    Age:
                </label>
                <input type="number" id="age" name="age" value={age} onChange={e => setAge(e.target.value)} min="17" required className="w-128 mb-4" />
                <label htmlFor="email" className="mr-3">
                    Email:
                </label>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="code" className="mr-3">
                    Code:
                </label>
                <input type="text" id="code" name="code" value={code} onChange={e => setCode(e.target.value)} required className="w-128 mb-4" />
                <button type="submit" onClick={handleSubmit} className="rounded-lg bg-green-500 px-3 py-2 w-40 text-Light font-extrabold text-lg">Ajouter</button>
            </form>
            </div>
        </div>
    )
}