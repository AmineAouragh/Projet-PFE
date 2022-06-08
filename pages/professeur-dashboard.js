import { Sidebar } from '../components/Sidebar'
import { Board } from '../components/Board'

export default function ProfesseurDashboard() {
    return (
        <div className="flex flex-row">
          <Sidebar />
          <Board />
        </div>
    )
}