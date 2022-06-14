import { supabase } from '../lib/initSupabase'
import { Sidebar_Admin } from '../components/Sidebar_Admin'
import { useState, useEffect } from 'react'

export default function AjouterEtudiant() {

    const [ nomA, setNomA ] = useState('')
    const [ emailA, setEmailA ] = useState('')
    const [ categorieA, setCategorieA ] = useState('')
    const [ universitéA, setUniversitéA ] = useState('')

    useEffect(() => {
        getAdminRecord()
      })
    
      async function getAdminRecord() {
          const { data: admin, error } = await supabase
          .from('admin')
          .select('nom, email, code, université, categorie')
          .eq('nom', "test")
          setNomA(admin[0].nom)
          setEmailA(admin[0].email)
          setCategorieA(admin[0].categorie)
          setUniversitéA(admin[0].université)
    
      }

    return (
        <div className="flex flex-row relative">
            <Sidebar_Admin nom={nomA} email={emailA} category={categorieA} université={universitéA} />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Ajouter un étudiant</h3>
                </div>
            </div>
            <form className="m-5 flex flex-col">
                <label htmlfor="name" className="mr-3">
                    Nom & Prénom:
                </label>
                <input type="text" id="name" name="name" required className="w-128 mb-4" />
                <label htmlfor="cni" className="mr-3">
                    CNI:
                </label>
                <input type="text" id="cni" name="cni" required className="w-128 mb-4" />
                <label htmlfor="cne" className="mr-3">
                    CNE:
                </label>
                <input type="text" id="cne" name="cne" required className="w-128 mb-4" />
                <label htmlfor="email" className="mr-3">
                    Email:
                </label>
                <input type="email" id="email" name="email" required className="w-128 mb-4" />
                <label htmlfor="filiere" className="mr-3">
                    Filière:
                </label>
                <select className="w-128 mb-4" name="filiere" id="filiere">
                    <option name="smia s1/s2" value="SMIA S1/S2">SMIA S1/S2</option>
                    <option name="smi s3/s4" value="SMI S3/S4">SMI S3/S4</option>
                    <option name="smi s5/s6 bd" value="SMI S6 BD">SMI S5/S6 (BD)</option>
                    <option name="smi s5/s6 reseaux" value="SMI S6 RESEAUX">SMI S5/S6 (Reseaux)</option>
                </select>
                <label htmlfor="age" className="mr-3">
                    Age:
                </label>
                <input type="number" id="age" name="age" min="17" required className="w-128 mb-4" />
            </form>
            </div>
        </div>
    )
}