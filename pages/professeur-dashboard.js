import { Sidebar } from '../components/Sidebar'
import { BoardProfesseur } from '../components/Board-Professeur'

export default function ProfesseurDashboard() {
    return (
        <div className="flex flex-row">
          <Sidebar />
          <BoardProfesseur />
        </div>
    )
}