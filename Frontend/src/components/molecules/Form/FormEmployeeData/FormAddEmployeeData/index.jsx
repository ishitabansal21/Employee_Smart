import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Layout from '../../../../../layout';
import { createEmployee, getMe } from '../../../../../config/redux/action';
import Swal from 'sweetalert2';

const FormAddEmployeeData = () => {
    const [formData, setFormData] = useState({
        nik: '',
        employee_name: '',
        username: '',
        password: '',
        confPassword: '',
        email:'',
        gender: '',
        position: '',
        department:'',
        join_date: '',
        title: '',  
        file: '',  
        preview: '', 
        status: '',
        access_rights: '',
    });

    const {
        nik,
        employee_name,
        username,
        password,
        confPassword,
        email,
        gender,
        position,
        department,
        join_date,
        title,
        file,
        preview,
        status,
        access_rights,
    } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const onLoadImageUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            setFormData({
                ...formData,
                title: image.name,
                file: image,
                preview: URL.createObjectURL(image),
            });
        }
    };

    const imageCancel = () => {
        setFormData({
            ...formData,
            title: '',
            file: null,
            preview: null,
        });
    };

    const submitEmployeeData = (e) => {
        e.preventDefault();
        console.log("in submit employee data")
        const newFormData = new FormData();
        newFormData.append('photo', file);
        newFormData.append('title', title);
        newFormData.append('nik', nik);
        newFormData.append('employee_name', employee_name);
        newFormData.append('username', username);
        newFormData.append('password', password);
        newFormData.append('confPassword', confPassword);
        newFormData.append('gender', gender);
        newFormData.append('position', position);
        newFormData.append('department', department);
        newFormData.append('email', email);
        newFormData.append('join_date', join_date);
        newFormData.append('status', status);
        newFormData.append('access_rights', access_rights);

        dispatch(createEmployee(newFormData, navigate))
            .then((response) => {
                console.log("in then")
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.log(error)
                if (error.response && error.response.data && error.response.data.msg) {
                    console.log("in  error catch 1.2")
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: error.response.data.msg,
                        confirmButtonText: 'Ok',
                    });
                } else if (error.message) {
                    console.log("in  error catch 2")
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: error.message,
                        confirmButtonText: 'Ok',
                    });
                } else {
                    console.log("in  error catch 3")
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'An error occurred',
                        confirmButtonText: 'Ok',
                    });
                }
            });

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

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.access_rights !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Employee Data Form' />
            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Employee Data Form
                            </h3>
                        </div>
                        <form onSubmit={submitEmployeeData}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            ID <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='nik'
                                            name='nik'
                                            value={nik}
                                            onChange={handleChange}
                                            required
                                            placeholder='Enter ID number'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Full Name <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='employee_name'
                                            name='employee_name'
                                            value={employee_name}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter full name'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Username <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='username'
                                            id='username'
                                            name='username'
                                            value={username}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter username'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Password <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='password'
                                            id='password'
                                            name='password'
                                            value={password}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter password'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Confirm Password <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='password'
                                            id='confPassword'
                                            name='confPassword'
                                            value={confPassword}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Confirm password'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Gender <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='gender'
                                                name='gender'
                                                value={gender}
                                                onChange={handleChange}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Select gender</option>
                                                <option value='male'>Male</option>
                                                <option value='female'>Female</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Position <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='position'
                                            name='position'
                                            value={position}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter position'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Entry Date <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='date'
                                            id='join_date'
                                            name='join_date'
                                            value={join_date}
                                            onChange={handleChange}
                                            required={true}
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Status <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='status'
                                                name='status'
                                                value={status}
                                                onChange={handleChange}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Select status</option>
                                                <option value='permanent employee'>Permanent Employee</option>
                                                <option value='temporary employee'>Temporary Employee</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Access Level <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='access_rights'
                                                name='access_rights'
                                                value={access_rights}
                                                onChange={handleChange}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Select access level</option>
                                                <option value='admin'>Admin</option>
                                                <option value='employee'>Employee</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Department <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='department'
                                            name='department'
                                            value={department}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter department'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                           Email <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            value={email}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter Email..'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white ">
                                            Upload Photo (<span className='text-meta-1'> File format: png, jpg, jpeg, Max 2 MB </span>)
                                            <span className="text-meta-1"> *</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke dark:file:border-strokedark file:bg-[#EEEEEE] dark:file:bg-white/30 dark:file:text-white file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                                            onChange={onLoadImageUpload}
                                            required={true}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        {preview ? (
                                            <figure className="relative w-64 h-64 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 animate-fadeIn">
                                                <img
                                                    src={preview}
                                                    alt="People Image"
                                                    className="object-cover w-full h-full shadow-6 rounded-xl"
                                                />
                                                <button
                                                    onClick={imageCancel}
                                                    className="absolute top-2 right-2 bg-white dark:bg-black/30 rounded-full p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                                >
                                                    <AiOutlineClose className="h-5 w-5" />
                                                </button>
                                            </figure>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne>
                                            <span>Save</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/employee-data" >
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

export default FormAddEmployeeData;
