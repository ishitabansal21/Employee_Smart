import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getMe } from '../../../config/redux/action';
import Layout from '../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../..';
import { TfiPrinter } from 'react-icons/tfi';

const DetailSalaryData = () => {
    const [data, setData] = useState({
        year: '',
        month: '',
        nik: '',
        employee_name: '',
        department: '',
        basic_salary: '',
        transport_allowance: '',
        meal_allowance: '',
        deductions: '',
        total: '',
    });
    const { name } = useParams();
    const [index] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const { isError, user } = useSelector((state) => state.auth);

    const onSubmitPrint = () => {
        navigate(`/reports/pay-slip/print-page?month=${data.month}&year=${data.year}&name=${name}`);
    };

    useEffect(() => {
        const getDataEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/employee_salary_data/name/${name}`);
                //i have chnaged it was response.data[0]
                console.log(response.data[0]);
            const salaryData = response.data[0];

                setData(salaryData);
            } catch (error) {
                console.log(error);
            }
        };

        getDataEmployee();
    }, [name]);


   

    // useEffect(() => {
    //     dispatch(getMe());
    // }, [dispatch]);

    // useEffect(() => {
    //     if (isError) {
    //         navigate('/login');
    //     }
    //     if (user && user.access_level !== 'admin') {
    //         navigate('/dashboard');
    //     }
    // }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Detail Salary Data' />
            <Link to='/salary-data'>
                <ButtonTwo>
                    <span>Back</span>
                </ButtonTwo>
            </Link>
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className='flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between'>
                </div>

                <div className='max-w-full overflow-x-auto'>
                    <div className='md:w-2/3'>
                        <div className='w-full md:text-lg'>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Name</span>
                                <span className='inline-block w-7'>:</span>
                                {data.employeeName}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>ID</span>
                                <span className='inline-block w-6'>:</span>{' '}
                                <span className='pl-[-10] md:pl-0'></span>
                                {data.nik}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Department</span>
                                <span className='inline-block w-7'>:</span>
                                {data.department}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Month</span>
                                <span className='pl-[-8] md:pl-0'></span>
                                <span className='inline-block w-7'>:</span>
                                {data.month}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Year</span>
                                <span className='inline-block w-7'>:</span>
                                {data.year}
                                <span className='pl-[-8] md:pl-0'></span>
                            </h2>
                        </div>
                    </div>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    No
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Description
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 1}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Basic Salary
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Rs. {data.baseSalary}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 2}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Transport Allowance
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Rs. {data.transportAllowance}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 3}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Meal Allowance
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Rs. {data.mealAllowance}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 4}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Deductions
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Rs. {data.deduction}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                </td>
                                <td className='font-medium border-b  border-[#eee] dark:border-strokedark py-5 text-right text-black dark:text-white'>
                                    Total Salary:
                                </td>
                                <td className='font-medium border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Rs. {data.total}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='w-full md:w-1/2 md:justify-end py-6'>
                        <div className='w-full md:w-auto'>
                            <ButtonOne
                                onClick={onSubmitPrint}
                            >
                                <span>Print Employee Salary</span>
                                <span>
                                    <TfiPrinter />
                                </span>
                            </ButtonOne>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DetailSalaryData;
