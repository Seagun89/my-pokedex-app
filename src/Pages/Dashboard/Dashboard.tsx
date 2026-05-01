import { Link } from 'react-router-dom'
import './Dashboard.css';
 
const Dashboard: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
      <div
      className="dashboard"
      style={{
        backgroundImage: `url(https://media.goboard.io/contentItem-8545720-74919945-8vet1w1woor6m-or.png)`,
      }}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Pokedex</h2>
        <Link to="/dashboard/home">My Pokemon</Link>
        <Link to="/dashboard/add">Add Pokemon</Link>
      </div>

      {/* Main */}
      <div className="main">
        <div className="topbar">
          <h3>Dashboard</h3>
          <Link to="/"><button>Logout</button></Link>
        </div>
        {children}
      </div>
    </div>
    );
}

export default Dashboard