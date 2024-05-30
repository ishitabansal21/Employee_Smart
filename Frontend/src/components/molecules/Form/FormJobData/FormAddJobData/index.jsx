import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
import { createDataPosition, getMe } from '../../../../../config/redux/action';

const FormAddJobData = () => {
    const [formData, setFormData] = useState({
        department: '',
        base_salary: '',
        transport_allowance: '',
        meal_allowance: '',
    });

    const {
        department,
        base_salary,
        transport_allowance,
        meal_allowance,
    } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const submitJobData = (e) => {
        e.preventDefault();
console.log(formData);
    dispatch(createDataPosition(formData))
        .then((response) => {
            // Handle success
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.message,
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/job-data');
        })
        .catch((error) => {
            // Handle error
            if (error.response && error.response.data && error.response.data.msg) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: error.response.data.msg,
                    confirmButtonText: 'Ok',
                });
            } else if (error.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: error.message,
                    confirmButtonText: 'Ok',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'An error occurred',
                    confirmButtonText: 'Ok',
                });
            }
        });
        // e.preventDefault();
        // const newFormData = new FormData();
        // newFormData.append('department', department);
        // newFormData.append('base_salary', base_salary);
        // newFormData.append('transport_allowance', transport_allowance);
        // newFormData.append('meal_allowance', meal_allowance);

        // dispatch(createDataPosition(newFormData, navigate))
        //     .then((response) => {
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Success',
        //             text: response.message,
        //             showConfirmButton: false,
        //             timer: 1500,
        //         });
        //     })
        //     .catch((error) => {
        //         if (error.response && error.response.data && error.response.data.msg) {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Failed',
        //                 text: error.response.data.msg,
        //                 confirmButtonText: 'Ok',
        //             });
        //         } else if (error.message) {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Failed',
        //                 text: error.message,
        //                 confirmButtonText: 'Ok',
        //             });
        //         } else {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Failed',
        //                 text: 'An error occurred',
        //                 confirmButtonText: 'Ok',
        //             });
        //         }
        //     });

    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
            <Breadcrumb pageName='Department Data Form' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Department Data Form
                            </h3>
                        </div>
                        <form onSubmit={submitJobData}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Department Name <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='department'
                                            name='department'
                                            value={department}
                                            onChange={handleChange}
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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
                                            required
                                            placeholder='Enter meal allowance'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne>
                                            <span>Save</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/job-data" >
                                        <ButtonTwo>
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

export default FormAddJobData;
