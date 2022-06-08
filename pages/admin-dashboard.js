import Router from 'next/router'
import { Sidebar } from '../components/Sidebar'

export default function AdminDashboard() {
    return (
        <div className="flex flex-row">
            <Sidebar />
        </div>
    )
}