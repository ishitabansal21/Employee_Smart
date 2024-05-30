import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo, ButtonThree } from '../../../..';
import { getMe } from '../../../../../config/redux/action';

const FormEditAttendanceData = () => {
    const [nik, setNik] = useState('');
    const [employee_name, setEmployeeName] = useState('');
    const [position, setPosition] = useState('');
    const [present, setPresent] = useState('');
    const [sick, setSick] = useState('');
    const [absent, setAbsent] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/attendance_data/${id}`);
                setEmployeeName(response.data.employee_name);
                setNik(response.data.nik);
                setPosition(response.data.position);
                setPresent(response.data.present);
                setSick(response.data.sick);
                setAbsent(response.data.absent);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getUserById();
    }, [id]);

    const updateAttendanceData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('employee_name', employee_name);
            formData.append('nik', nik);
            formData.append('position', position);
            formData.append('present', present);
            formData.append('sick', sick);
            formData.append('absent', absent);

            const response = await axios.patch(`http://localhost:5000/attendance_data/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg(response.data.msg);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                timer: 1500,
                text: response.data.msg
            });
            navigate('/attendance-data');
        } catch (error) {
            setMsg(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.msg
            });
        }
    };

    // useEffect(() => {
    //     dispatch(getMe());
    // }, [dispatch]);

    // useEffect(() => {
    //     if (isError) {
    //         navigate('/login');
    //     }
    //     if (user && user.hak_akses !== 'admin') {
    //         navigate('/dashboard');
    //     }
    // }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Employee Attendance Edit Data Form' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                            Employee Attendance Edit Data Form
                            </h3>
                        </div>
                        <form onSubmit={updateAttendanceData}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Employee Name <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='employee_name'
                                            name='employee_name'
                                            value={employee_name}
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                            disabled
                                            placeholder='Enter Nama'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            ID <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='nik'
                                            name='nik'
                                            value={nik}
                                            onChange={(e) => setNik(e.target.value)}
                                            required
                                            disabled
                                            placeholder='Enter ID'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-10">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Position <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='position'
                                            name='position'
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)}
                                            required={true}
                                            disabled
                                            placeholder='Enter jabatan'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Present <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='present'
                                            name='present'
                                            value={present}
                                            onChange={(e) => setPresent(e.target.value)}
                                            required
                                            placeholder='Enter present'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-10">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Sick <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='sick'
                                            name='sick'
                                            value={sick}
                                            onChange={(e) => setSick(e.target.value)}
                                            required
                                            placeholder='Enter sick'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Absent <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='absent'
                                            name='absent'
                                            value={absent}
                                            onChange={(e) => setAbsent(e.target.value)}
                                            required
                                            placeholder='Enter absent'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Save</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/attendance-data" >
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

export default FormEditAttendanceData;
