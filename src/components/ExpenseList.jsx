import { useEffect, useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortTypes } from '../constants';

const ExpenseList = ({
  unsortedList,
  expenseList,
  setExpenseList,
  setInitData,
  toggleDialog,
}) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [itemSort, setItemSort] = useState(sortTypes.NO_SORT);
  const [amountSort, setAmountSort] = useState(sortTypes.NO_SORT);

  let maxAmount = 0;
  expenseList.forEach((each) => {
    if (each.Amount > maxAmount) {
      maxAmount = each.Amount;
    }
  });

  const sortByItem = () => {
    const next = (itemSort + 1) % 3;
    setItemSort(next);
    if (next === sortTypes.NO_SORT) {
      setExpenseList([...unsortedList]);
    } else if (next === sortTypes.ASC) {
      const newExpenseList = [...expenseList];
      newExpenseList.sort((a, b) => a.Item.localeCompare(b.Item));
      setExpenseList(newExpenseList);
    } else {
      const newExpenseList = [...expenseList];
      newExpenseList.sort((a, b) => -1 * a.Item.localeCompare(b.Item));
      setExpenseList(newExpenseList);
    }

    setAmountSort(sortTypes.NO_SORT);
  };

  const sortByAmount = () => {
    const next = (amountSort + 1) % 3;
    setAmountSort(next);
    if (next === sortTypes.NO_SORT) {
      setExpenseList([...unsortedList]);
    } else if (next === sortTypes.ASC) {
      const newExpenseList = [...expenseList];
      newExpenseList.sort((a, b) => a.Amount - b.Amount);
      setExpenseList(newExpenseList);
    } else {
      const newExpenseList = [...expenseList];
      newExpenseList.sort((a, b) => -1 * (a.Amount - b.Amount));
      setExpenseList(newExpenseList);
    }

    setItemSort(sortTypes.NO_SORT);
  };

  useEffect(() => {
    if (expenseList.length === 0) {
      setIsCheckedAll(false);
    }
  }, [expenseList]);

  useEffect(() => {
    setItemSort(sortTypes.NO_SORT);
    setAmountSort(sortTypes.NO_SORT);
    setExpenseList([...unsortedList]);
  }, [unsortedList]);

  return (
    <>
      <table className='table bg-base-200 rounded rounded-box shadow-md w-[60%] m-auto mt-6 overflow-hidden'>
        <thead className='text-base-content'>
          <tr>
            <th>
              <input
                type='checkbox'
                disabled={expenseList.length === 0}
                checked={isCheckedAll}
                onChange={(e) => {
                  const newExpenseList = [...expenseList];
                  if (isCheckedAll) {
                    newExpenseList.forEach((each) => (each.IsChecked = false));
                  } else {
                    newExpenseList.forEach((each) => (each.IsChecked = true));
                  }

                  setExpenseList(newExpenseList);
                  setIsCheckedAll((prev) => !prev);
                }}
                className='checkbox w-4 h-4'
              />
            </th>
            <th className='w-[60%] flex'>
              <p className='mr-2'>Item</p>
              <button
                className='hover:cursor-pointer opacity-60'
                onClick={() => sortByItem()}>
                <FontAwesomeIcon
                  icon={
                    itemSort === sortTypes.NO_SORT
                      ? faSort
                      : itemSort === sortTypes.ASC
                      ? faSortUp
                      : faSortDown
                  }
                />
              </button>
            </th>
            <th className=''>Category</th>
            <th className='flex'>
              <p className='mr-2'>Amount</p>
              <button
                className='hover:cursor-pointer opacity-60'
                onClick={() => sortByAmount()}>
                <FontAwesomeIcon
                  icon={
                    amountSort === sortTypes.NO_SORT
                      ? faSort
                      : amountSort === sortTypes.ASC
                      ? faSortUp
                      : faSortDown
                  }
                />
              </button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className='text-base-content w-full'>
          {expenseList.length === 0 ? (
            <tr className='w-full'>
              <td colSpan={4} className='opacity-60 text-sm text-center'>
                No Expense
              </td>
            </tr>
          ) : (
            expenseList.map((each) => (
              <tr
                key={each.Id}
                className={`list-row 
                  ${
                    maxAmount.toFixed(2) === each.Amount.toFixed(2) &&
                    'bg-base-300'
                  }
                `}>
                <th>
                  <input
                    type='checkbox'
                    checked={each.IsChecked}
                    onChange={() => {
                      const newExpenseList = [...expenseList];
                      let checkedAll = true;
                      newExpenseList.forEach((e) => {
                        if (e.Id === each.Id) {
                          e.IsChecked = !e.IsChecked;
                        }

                        if (!e.IsChecked) {
                          checkedAll = false;
                        }
                      });

                      setExpenseList(newExpenseList);
                      if (checkedAll) {
                        setIsCheckedAll(true);
                      } else {
                        setIsCheckedAll(false);
                      }
                    }}
                    className='checkbox w-4 h-4'
                  />
                </th>
                <td className='w-[60%] opacity-60'>{each.Item}</td>
                <td className='opacity-60'>{each.Category}</td>
                <td className='opacity-60'>{`${each.Amount.toFixed(2)}$`}</td>
                <td>
                  <button
                    className='hover:cursor-pointer opacity-60'
                    onClick={() => {
                      setInitData(each);
                      toggleDialog();
                    }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseList;
