import { supabase } from '../lib/initSupabase'
import { Sidebar_Admin } from '../components/Sidebar_Admin'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ajouter from '../public/plus.png'
import modifier from '../public/setting.png'
import supprimer from '../public/delete.png'
import Image from 'next/image'

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
    const [ addClicked, setAddClicked ] = useState(false)
    const [ updateClicked, setUpdateClicked ] = useState(false)
    const [ deleteClicked, setDeleteClicked ] = useState(false)
    const [ groupe, setGroupe ] = useState([])

    const router = useRouter()

    useEffect(() => {
        getAdminRecord()
      })

      useEffect(() => {
        getClasseRecord()
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

      const addStudent = async () => {
        const { data, error } = await supabase
        .from("etudiant")
        .insert([
            {'CNE': cne, 'CNI': cni, "nom": nom, "age": age, "email": email, "filière": filiere, "code": code}
        ])
        setTimeout(() => router.push('/etudiants'), 800)
      }

      const updateStudent = async () => {
        const { data, error } = await supabase
        .from('etudiant')
        .update({ "CNE": cne, "CNI": cni, "age": age, "email": email, "filière": filiere, "code": code })
        .match({ "nom": nom })
        setTimeout(() => router.push('/etudiants'), 800)
      }

      const deleteStudent = async () => {
        const { data, error } = await supabase
        .from('etudiant')
        .delete()
        .match({ "nom": nom, "CNE": cne })
        setTimeout(() => router.push('/etudiants'), 800)
        
      }

      const getClasse = async () => {
        const { data: etudiant, error } = await supabase
        .from('etudiant')
        .select(`
          nom,
          classe (
            name
          )
        `)
        .eq('nom', nom)
        console.log(etudiant[0].classe.name)
      }

      const getClasseRecord = async () => {
        const { data: filiere, error } = await supabase
        .from('filiere')
        .select('name')
        setGroupe(filiere)
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
            {
              (addClicked == false && updateClicked == false && deleteClicked == false) && 
              <div className="m-5">
                <ul className="mb-10">
                    <li className="text-lg">- Pour créer un nouveau compte étudiant, cliquez sur "Ajouter" puis remplissez le formulaire avec les infos convenables.</li>
                    <li className="text-lg">- Pour modifier un compte étudiant déjà créé, cliquez d'abord sur "Modifier", saisissez le nom de l'étudiant que vous voulez modifier et puis remplissez le formulaire</li>
                    <li className="text-lg">- Pour supprimer un compte étudiant, cliquez sur "Supprimer"</li>
                </ul>
                <div className="flex flex-col">
                <button type="submit" onClick={() => setAddClicked(true)} className="flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-400 px-3 py-3 w-60 text-Light font-extrabold text-lg mb-3">
                    <Image src={ajouter} width={20} height={20} alt="" />
                    <span className="ml-3">Ajouter</span>
                </button>
                <button type="submit" onClick={() => setUpdateClicked(true)} className="flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-3 w-60 text-Light font-extrabold text-lg mb-3">
                    <Image src={modifier} alt="" height={20} width={20} />
                    <span className="ml-3">Modifier</span>
                </button>
                <button type="submit" onClick={() => setDeleteClicked(true)} className="flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-400 px-3 py-3 w-60 text-Light font-extrabold text-lg">
                    <Image src={supprimer} width={20} height={20} alt="" />
                    <span className="ml-3">Supprimer</span>
                </button>
                <input type="text" name="name" value={nom} onChange={(e) => setNom(e.target.value)} />
                <button className="rounded-lg bg-gray-500 px-3 py-3" onClick={getClasse}>Classe</button>
                <select>
                    {
                        groupe.map(grp => <option id={grp.id} name={grp.name}>{grp.name}</option>)
                    }
                </select>
                </div>
            </div>
            }
            
            {
              addClicked &&
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
                    <option name="sma s3/s4" value="SMA S3/S4">SMA S3/S4</option>
                    <option name="sma s5/s6" value="SMA S5/S6">SMA S5/S6</option>
                    <option name="smpc s1/s2" value="SMPC S1/S2">SMPC S1/S2</option>
                    <option name="smp s3/s4" value="SMP S3/S4">SMP S3/S4</option>
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
                <button type="submit" onClick={addStudent} className="rounded-lg bg-green-500 px-3 py-2 w-40 text-Light font-extrabold text-lg mr-3">Ajouter</button>
            </form>
            }
            {
              updateClicked &&
              <form className="m-5 flex flex-col">
                <label htmlFor="name" className="mr-3 mb-2 text-lg font-bold">
                    Nom & Prénom de l'étudiant à modifier:
                </label>
                <input type="text" id="name" name="name" value={nom} onChange={e => setNom(e.target.value)} required className="w-128 mb-4" />
                <p className="text-lg my-5 font-bold">Maintenant remplissez les informations pour cet étudiant</p>
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
                    <option name="sma s3/s4" value="SMA S3/S4">SMA S3/S4</option>
                    <option name="sma s5/s6" value="SMA S5/S6">SMA S5/S6</option>
                    <option name="smpc s1/s2" value="SMPC S1/S2">SMPC S1/S2</option>
                    <option name="smp s3/s4" value="SMP S3/S4">SMP S3/S4</option>
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
                <button type="submit" onClick={updateStudent} className="rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-2 w-40 text-Light font-extrabold text-lg mr-3">Modifier</button>
            </form> 
            }
            {
                deleteClicked &&
                <form className="m-5 flex flex-col">
                <label htmlFor="name" className="mr-3 mb-2 text-lg font-bold">
                    Nom & Prénom de l'étudiant à supprimer:
                </label>
                <input type="text" id="name" name="name" value={nom} onChange={e => setNom(e.target.value)} required className="w-128 mb-4" />
               
                <label htmlFor="cne" className="mr-3 text-lg font-bold">
                    CNE de l'étudiant à supprimer:
                </label>
                <input type="text" id="cne" name="cne" value={cne} onChange={e => setCne(e.target.value)} required className="w-128 mb-4" />
                
                <button type="submit" onClick={deleteStudent} className="rounded-lg bg-red-500 hover:bg-red-400 px-3 py-2 w-40 text-Light font-extrabold text-lg mr-3">Supprimer</button>
            </form> 
            }
            </div>
        </div>
    )
}