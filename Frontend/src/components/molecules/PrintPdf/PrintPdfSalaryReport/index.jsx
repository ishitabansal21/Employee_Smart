import React, { useRef, useEffect, useState } from "react";
// import CompanyLogo from "../../../../assets/images/logo/logo-dark.svg";
import EmployeePayProLogo from "../../../../assets/images/logo/mysmart.png";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportSalaryByMonth,
  fetchReportSalaryByYear,
  getMe,
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfSalaryReport = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { isError, user } = useSelector((state) => state.auth);
  const { dataReportSalary } = useSelector((state) => state.reportSalary);

  const getDataByYear = async (selectedYear) => {
    dispatch(fetchReportSalaryByYear(selectedYear));
  };

  const getDataByMonth = async (selectedMonth) => {
    dispatch(fetchReportSalaryByMonth(selectedMonth));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Salary_Report",
  });

  useEffect(() => {
    getDataByYear(year);
    getDataByMonth(month);
  }, [year, month]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/login");
  //   }
  //   if (user && user.access_level !== "admin") {
  //     navigate("/dashboard");
  //   } else {
  //     handlePrint();
  //   }
  // }, [isError, user, navigate, handlePrint]);

  useEffect(() => {
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[today.getMonth()];
    const currentYear = today.getFullYear();
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
        <div>
          <ButtonOne onClick={handlePrint}>
            <span>Print</span>
          </ButtonOne>
        </div>
        <div>
          <ButtonTwo
            onClick={() => navigate(-1)}
          >
            <span>Back</span>
          </ButtonTwo>
        </div>
      </div>
      <div ref={componentRef} className="w-200% h-100% p-10 bg-white dark:bg-meta-4">
        <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
          {/* <img className="w-50"
            src={EmployeePayProLogo}
            title="EmployeePayPro Logo"
            alt="EmployeePayPro Logo" /> */}
          <h1 className="text-black text-2xl font-bold boder  dark:text-white">
            Employee Smart
          </h1>
          <img className="w-50"
            src={EmployeePayProLogo}
            title="EmployeePayPro Logo"
            alt="EmployeePayPro Logo" />
          {/* <img className="w-35"
            src={CompanyLogo}
            title="logo"
            alt="logo"
          /> */}
        </div>
        <h1 className="text-center text-black my-4 text-xl font-medium border py-2 dark:text-white">
          Employee Salary List
        </h1>
        <div className="w-full md:text-lg">
          <h2 className="font-medium mb-4 block text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Month</span>
            <span className="pl-[-8] md:pl-0"></span>
            <span className="inline-block w-7">:</span>
            {month}
          </h2>
          <h2 className="font-medium mb-4 block text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Year</span>
            <span className="inline-block w-7">:</span>
            {year}
            <span className="pl-[-8] md:pl-0"></span>
          </h2>
        </div>
        <div className="max-w-full overflow-x-auto py-4">
          <table className="w-full table-auto-full">
            <thead>
              <tr>
                <th className="font-medium text-black border-b border-t border-l  border-black dark:border-white dark:text-white">
                  No
                </th>
                {/* <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  ID
                </th> */}
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Employee <br /> Name
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Position
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Basic <br /> Salary
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Transportation <br /> Allowance
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Meal <br /> Allowance
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Deduction
                </th>
                <th className="font-medium text-black border-t border-l border-b border-r border-black dark:border-white dark:text-white">
                  Total <br /> Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {dataReportSalary.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    {/* <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{data.nik}</p>
                    </td> */}
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{data.employeeName}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{data.position}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rs. {data.baseSalary}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rs. {data.transportAllowance}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rs. {data.mealAllowance}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rs. {data.deduction}</p>
                    </td>
                    <td className="border-b border-l border-r border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rs. {data.totalSalary}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="py-6">
          <div className="font-medium text-black text-right dark:text-white">
            <span>Noida, {`${new Date().getDate()} ${selectedMonth} ${selectedYear}`}</span>
            <br />
            <span className="p-26">Finance</span>
            <br />
            <br />
            <span className="p-8 italic text-black dark:text-white">Signature</span>
          </div>
        </div>
        <div className="italic text-black dark:text-white mt-40">
          Printed On: {`${new Date().getDate()} ${selectedMonth} ${selectedYear}`}
        </div>
      </div>
    </>
  );
};

export default PrintPdfSalaryReport;

