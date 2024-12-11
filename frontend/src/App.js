
import React from 'react';
import Employees from './Components/Employee/Employees';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import AddEmployeeForm from './Components/Employee/AddEmployeeForm';
import UpdateEmployee from './Components/Employee/UpdateEmployee';
import Complains from './Components/Complain/Complains';
import UpdateComplain from './Components/Complain/UpdateComplain';
import AddComplain from './Components/Complain/AddComplain';
import Login from './Components/SignUpandLogin/Login';
import SignUp from './Components/SignUpandLogin/SignUp';
import UserHome from './Components/Dashboard/UserHome';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import Chart from './Components/Chart/Chart';

//Asela
import Incidents from './Components/Incident Details/Incidents';
import AddIncident from './Components/AddIncident/AddIncident';
import UpdateIncident from './Components/Update Incident/UpdateIncident';


import ViewComplains from './Components/Complain/ViewComplains';
import FeedBack from './Components/FeedBack/FeedBack';



function App() {
  return (
    <div>
      
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/complains' element={<Complains/>}/>
          <Route path='/addComplain' element={<AddComplain/>}/>
          <Route path='/complains/:comp_id' element={<UpdateComplain/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/addEmployee' element={<AddEmployeeForm/>}/>
          <Route path='/employees/:emp_id' element={<UpdateEmployee/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/userHome' element={<UserHome/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/chart' element={<Chart/>}/>

          <Route path='/addincident' element={<AddIncident />} />
          <Route path='/incidentDetails' element={<Incidents />} />
          <Route path='/incidentDetails/:id' element={<UpdateIncident />} />

          <Route path='/viewComplain' element={<ViewComplains/>}/>
          <Route path='/feedback' element={<FeedBack/>}/>
        </Routes>
      
    </div>
  );
}

export default App;
