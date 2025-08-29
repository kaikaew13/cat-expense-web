import { useEffect, useState } from 'react';
import Button from './Button';

const AddExpenseDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const [catFact, setCatFact] = useState('');

  useEffect(() => {
    if (isDialogOpen) {
      (async () => {
        try {
          const res = await fetch('https://catfact.ninja/fact');
          const data = await res.json();
          setCatFact(data.fact);
        } catch (err) {
          setCatFact('Cats are cool!');
        }
      })();
    }
  }, [isDialogOpen]);

  return (
    <dialog id='addExpenseDialog' className='modal'>
      <div className='modal-box max-w-full w-[75%]'>
        <form method='dialog'>
          <button
            onClick={() => {
              setIsDialogOpen(false);
              setCatFact('');
            }}
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <div className='flex items-center justify-evenly '>
          <div className='w-[50%] m-4 mr-2'>
            <h3 className='font-bold mb-6'>Add New Expense!</h3>
            <fieldset className='fieldset'>
              <div className='flex justify-between items-center mb-2'>
                <label htmlFor='item' className='font-bold text-sm'>
                  Item:
                </label>
                <input
                  type='text'
                  id='item'
                  required
                  placeholder='Item Name'
                  className='input text-sm w-[75%]'
                />
              </div>
              <div className='flex justify-between items-center mb-2'>
                <label htmlFor='category' className='font-bold text-sm'>
                  Category:
                </label>
                <select
                  id='category'
                  defaultValue='Category'
                  required
                  className='select text-sm w-[75%]'>
                  <option disabled={true}>Category</option>
                  <option>Food</option>
                  <option>Furniture</option>
                  <option>Accessory</option>
                </select>
              </div>
              <div className='flex justify-between items-center mb-2'>
                <label htmlFor='amount' className='font-bold text-sm'>
                  Amount:
                </label>
                <input
                  type='text'
                  id='amount'
                  required
                  placeholder='Item Amount'
                  className='input text-sm w-[75%]'
                />
              </div>
              <div className='flex justify-end items-center'>
                <Button onClick={() => {}}>Submit</Button>
              </div>
            </fieldset>
          </div>
          <div className='w-[40%] m-4 ml-2'>
            <h3 className='font-bold text-base mb-6 text-primary italic'>
              Random cat facts:
            </h3>
            {catFact === '' ? (
              <span className='loading loading-dots loading-md text-primary' />
            ) : (
              <p className='text-base text-primary italic'>{catFact}</p>
            )}
          </div>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button
          onClick={() => {
            setIsDialogOpen(false);
            setCatFact('');
          }}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default AddExpenseDialog;
