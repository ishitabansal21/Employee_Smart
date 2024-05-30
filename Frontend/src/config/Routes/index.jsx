import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import SocialMedia from '../../pages/SocialMedia';
import KanbanBoard from '../../pages/KanbanBoard';
import GroupChat from '../../pages/GroupChat';
import {
  FormAddJobData,
  FormEditJobData,
  FormAddAttendanceData,
  FormEditAttendanceData,
  FormAddEmployeeData,
  FormEditEmployeeData,
  FormAddDataDeduction,
  FormEditDataDeduction,
  PrintPdfSalaryReport,
  DetailSalaryData,
  PrintPdfSalarySlip,
  PrintPdfAbsenceReport,
  PrintPdfEmployeeSalaryData,
} from '../../components';
import {
  EmployeeData,
  JobData,
  AttendanceData,
  SalaryData,
  SalaryReport,
  AttendanceReport,
  SalarySlip,
  ChangeAdminPassword,
  EmployeeSalaryData,
  ChangeEmployeePassword,
  DeductionData,
} from '../../pages';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/community' element={<SocialMedia/>}/>
      <Route path='/kanban' element={<KanbanBoard/>}/>
      <Route path='/groupchat' element={<GroupChat/>}/>

      {/* Admin Routes */}
      {/* Admin Master Data */}
      <Route path='/employee-data' element={<EmployeeData />} />
      <Route path='/employee-data/form-data-employee/add' element={<FormAddEmployeeData />} />
      <Route path='/employee-data/form-data-employee/edit/:id' element={<FormEditEmployeeData />} />
      <Route path='/job-data' element={<JobData />} />
      <Route path='/job-data/add' element={<FormAddJobData />} />
      <Route path='/job-data/edit/:id' element={<FormEditJobData />} />

      {/* Admin Transactions */}
      <Route path='/attendance-data' element={<AttendanceData />} />
      <Route path='/attendance-data/add' element={<FormAddAttendanceData />} />
      
      <Route path='/attendance-data/edit/:id' element={<FormEditAttendanceData />} />

      <Route path='/deduction-data' element={<DeductionData />} />
      <Route path='/deduction-data/add' element={<FormAddDataDeduction />} />
      <Route path='/deduction-data/edit/:id' element={<FormEditDataDeduction />} />

      
      <Route path='/salary-data' element={<SalaryData />} />
      <Route path='/salary-data/name/:name' element={<DetailSalaryData />} />
      <Route path='/salary-data/print/salary-slip/name/:name' element={<PrintPdfSalarySlip />} />

      {/* Admin Reports */}
      <Route path='/reports/salary' element={<SalaryReport />} />
      <Route path='/reports/salary/print-page' element={<PrintPdfSalaryReport />} />
      {/* //working */}
      <Route path='/reports/attendance' element={<AttendanceReport />} />
      <Route path='/reports/attendance/print-page' element={<PrintPdfAbsenceReport />} />

      <Route path='/reports/pay-slip' element={<SalarySlip />} />
      {/* working */}
      <Route path='/reports/pay-slip/print-page' element={<PrintPdfSalarySlip />} />

      {/* Admin Settings */}
      <Route path='/change-password' element={<ChangeAdminPassword />} />

      {/* Employee Routes */}
      {/* Employee Salary Dashboard */}
      <Route path='/employee-salary-data' element={<EmployeeSalaryData />} />
      <Route path='/employee-salary-data/print-page' element={<PrintPdfEmployeeSalaryData />} />
      <Route path='/change-employee-password' element={<ChangeEmployeePassword />} />

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
