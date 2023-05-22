"use client"

import { decrement, increment } from '@/redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetUsersQuery } from '@/redux/services/userApi';

const HomePage = () => {
  const count = useAppSelector(state => state.counterSlice.counter);
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  const dispatch = useAppDispatch();

  if (isLoading || isFetching) return <p>Loading...</p>
  if (error) return <p>Some Error...</p>

  return (
    <div className='p-4'>
      <h1 className='text-center text-2xl mb-4 font-bold'>COUNT TOTAL: <span className='text-yellow-500 font-bold'>{count}</span></h1>
      <div className='flex justify-center gap-x-2 mb-4'>
        <button onClick={() => {dispatch(increment())}} className='bg-blue-500 text-zinc-900 font-bold px-3 py-2 rounded-md'>Increment</button>
        <br />
        <button onClick={() => dispatch(decrement())} className='bg-red-500 text-zinc-900 font-bold px-3 py-2 rounded-md'>Decrement</button>
      </div>
      <h1 className='text-center text-2xl mb-4 font-bold'><span className='text-green-500 font-bold'>EXAMPLE API REACT REDUX TOOLKIT</span></h1>
      <div className='lg:grid grid-cols-3 gap-3 md:flex-col md:flex-1'>
        {
          data?.map(user => (
            <div key={user.id} className='lg:my-auto my-4 bg-zinc-800 p-4 rounded-lg'>
              <p className='font-bold'>Name: <span className='text-zinc-500'>{user.name}</span></p>
              <p className='font-bold'>Username: <span className='text-gray-500'>{user.username}</span></p>
              <p className='font-bold'>Email: <span className='text-blue-700'>{user.email}</span></p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HomePage;