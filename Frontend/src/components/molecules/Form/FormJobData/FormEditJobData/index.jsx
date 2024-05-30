import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
import { getMe } from '../../../../../config/redux/action';

const FormEditJobData = () => {
    const [position, setPositionName] = useState('');
    const [base_salary, setBaseSalary] = useState('');
    const [transport_allowance, setTransportAllowance] = useState('');
    const [meal_allowance, setMealAllowance] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getJobById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/job_data/${id}`);
                setPositionName(response.data.position);
                setBaseSalary(response.data.base_salary);
                setTransportAllowance(response.data.transport_allowance);
                setMealAllowance(response.data.meal_allowance);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getJobById();
    }, [id]);

    const updateJobData = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                position: position,
                base_salary: base_salary,
                transport_allowance: transport_allowance,
                meal_allowance: meal_allowance
            };
    
            const response = await axios.patch(`http://localhost:5000/job_data/${id}`, updatedData);
            
            console.log("edited data", response.data.msg);
            setMsg(response.data.msg);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                timer: 1500,
                text: response.data.msg
            });
            navigate('/job-data');
        } catch (error) {
            setMsg(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response.data.msg
            });
        }
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

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
            <Breadcrumb pageName='Edit Job Form' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Edit Job Data Form
                            </h3>
                        </div>
                        <form onSubmit={updateJobData}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Job Name <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='position'
                                            name='position'
                                            value={position}
                                            onChange={(e) => setPositionName(e.target.value)}
                                            required={true}
                                            placeholder='Enter job name'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Basic Salary <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='base_salary'
                                            name='base_salary'
                                            value={base_salary}
                                            onChange={(e) => setBaseSalary(e.target.value)}
                                            required
                                            placeholder='Enter basic salary'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-10">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Transport Allowance <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='transport_allowance'
                                            name='transport_allowance'
                                            value={transport_allowance}
                                            onChange={(e) => setTransportAllowance(e.target.value)}
                                            required
                                            placeholder='Enter transport allowance'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Meal Allowance <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='meal_allowance'
                                            name='meal_allowance'
                                            value={meal_allowance}
                                            onChange={(e) => setMealAllowance(e.target.value)}
                                            required
                                            placeholder='Enter meal allowance'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Update</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/job-data" >
                                        <ButtonTwo  >
                                            <span>Back</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormEditJobData;

