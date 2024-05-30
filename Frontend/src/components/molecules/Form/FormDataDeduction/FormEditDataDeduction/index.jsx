import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { getMe } from '../../../../../config/redux/action';

const FormEditDataDeduction = () => {
    const [deduction, setDeduction] = useState('');
    const [amount_deduction, setAmountDeduction] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector((state) => state.auth);

    const updateDataDeduction = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('deduction', deduction);
            formData.append('amount_deduction', amount_deduction);

            const response = await axios.patch(`http://localhost:5000/salary_deduction/update/${id}`, formData, {
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
            navigate('/deduction-data');
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
        const getDataById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/salary_deduction/${id}`);
                setDeduction(response.data.deduction);
                setAmountDeduction(response.data.amount_deduction);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getDataById();
    }, [id]);


    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    // useEffect(() => {
    //     if (isError) {
    //         navigate('/login');
    //     }
    //     if (user && user.accessLevel !== 'admin') {
    //         navigate('/dashboard');
    //     }
    // }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Edit Data Deduction Form' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Edit Data Deduction Form
                            </h3>
                        </div>
                        <form onSubmit={updateDataDeduction}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 '>
                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Deduction <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='deduction'
                                            name='deduction'
                                            value={deduction}
                                            onChange={(e) => setDeduction(e.target.value)}
                                            required={true}
                                            placeholder='Enter deduction'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Amount Deduction <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='amount_deduction'
                                            name='amount_deduction'
                                            value={amount_deduction}
                                            onChange={(e) => setAmountDeduction(e.target.value)}
                                            required
                                            placeholder='Enter amount deduction'
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
                                    <Link to="/deduction-data" >
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

export default FormEditDataDeduction;



