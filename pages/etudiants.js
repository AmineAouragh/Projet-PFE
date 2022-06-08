import { Sidebar } from '../components/Sidebar'
import DataGrid from 'react-data-grid'
import { supabase } from '../lib/initSupabase'

export default function TableEtudiants() {
    const columns = [
        { key: 'code', name: 'CNE' },
        { key: 'prénom', name: 'Prénom' },
        {key: 'nom', name: 'Nom'},
        { key: 'email', name: 'Email'},
        {key: 'filière', name: 'Filière'}
      ];
      
      const rows = [
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
      ];
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <DataGrid columns={columns} rows={rows} />
            </div>
            
        </div>
    )
}