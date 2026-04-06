import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import ViewEmployee from './ViewEmployee';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
import Views from './Views';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function Header(){
  return(
        <nav className="navbar navbar-expand-lg bg-info shadow">
      <div className="container">
        <Link className="navbar-brand fw-bolder" to="#"><img src="./icon.png" alt="logo" width="90" height="26" class="rounded me-1"/>Employee Project</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end me-auto" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/add">Add Employee</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/">View Employees</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/views">View Employee By Id/Email</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<ViewEmployee/>}/>
        <Route path="/add" element={<AddEmployee/>}/>
        <Route path="/update/:empId" element={<UpdateEmployee/>}/>
        <Route path="/views" element={<Views/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
