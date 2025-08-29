import { useEffect, useState } from 'react';

import Button from './Button';
import { categoryTypes } from '../constants';
import { generateRandomId } from '../utils/helpers';

const AddExpenseDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  expenseList,
  setExpenseList,
  initData,
  setInitData,
}) => {
  const [catFact, setCatFact] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemAmount, setItemAmount] = useState('');

  const handleClose = () => {
    document.getElementById('expenseDialog').close();
    setIsDialogOpen(false);
    setCatFact('');
    setItemName('');
    setItemCategory('');
    setItemAmount('');
    setInitData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!initData) {
      const newExpense = {
        Id: generateRandomId(),
        Item: itemName,
        Category: itemCategory,
        Amount: parseFloat(itemAmount),
        IsChecked: false,
      };

      const newExpenseList = [...expenseList, newExpense];
      localStorage.setItem('expenseList', JSON.stringify(newExpenseList));
      setExpenseList(newExpenseList);
    } else {
      const updatedExpenseList = expenseList.map((each) => {
        if (each.Id === initData.Id) {
          return {
            ...each,
            Item: itemName,
            Category: itemCategory,
            Amount: parseFloat(itemAmount),
          };
        } else return each;
      });

      localStorage.setItem('expenseList', JSON.stringify(updatedExpenseList));
      setExpenseList(updatedExpenseList);
    }

    handleClose();
  };

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

  useEffect(() => {
    if (initData) {
      setItemName(initData.Item);
      setItemCategory(initData.Category);
      setItemAmount(initData.Amount);
    }
  }, [initData]);

  return (
    <dialog id='expenseDialog' className='modal'>
      <div className='modal-box max-w-full w-[65%]'>
        <form method='dialog'>
          <button
            onClick={() => handleClose()}
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <div className='flex items-center justify-evenly '>
          <div className='w-[50%] mx-4 mr-2'>
            {!initData ? (
              <h3 className='font-bold mb-6'>Add New Expense</h3>
            ) : (
              <h3 className='font-bold mb-6'>Update Expense</h3>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
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
                    value={itemName}
                    onChange={(e) => {
                      setItemName(e.target.value);
                    }}
                  />
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <label htmlFor='category' className='font-bold text-sm'>
                    Category:
                  </label>
                  <select
                    id='category'
                    required
                    className='select text-sm w-[75%]'
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}>
                    <option disabled value='' className='opacity-60'>
                      Category
                    </option>
                    <option value='Food'>{categoryTypes.FOOD}</option>
                    <option value='Furniture'>{categoryTypes.FURNITURE}</option>
                    <option value='Accessory'>{categoryTypes.ACCESSORY}</option>
                  </select>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <label htmlFor='amount' className='font-bold text-sm'>
                    Amount:
                  </label>
                  <input
                    type='number'
                    min={0}
                    step={0.01}
                    id='amount'
                    required
                    placeholder='Item Amount'
                    className='input text-sm w-[75%]'
                    value={itemAmount}
                    onChange={(e) => setItemAmount(e.target.value)}
                  />
                </div>
                <div className='flex justify-end items-center'>
                  <Button>Submit</Button>
                </div>
              </fieldset>
            </form>
          </div>
          <div className='w-[40%] mx-4 ml-2'>
            <h3 className='font-bold mb-6 text-primary italic'>
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
        <button onClick={() => handleClose()}>close</button>
      </form>
    </dialog>
  );
};

export default AddExpenseDialog;
