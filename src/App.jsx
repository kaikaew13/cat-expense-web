import { useEffect, useState } from 'react';

import ExpenseList from './components/ExpenseList';
import Button from './components/Button';
import AddExpenseDialog from './components/AddExpenseDialog';
import { categoryTypes } from './constants';
import { generateRandomId } from './utils/helpers';

export let dummy = [
  {
    Id: generateRandomId(),
    Item: 'Hello world',
    Category: categoryTypes.FOOD,
    Amount: 10,
    IsChecked: false,
  },
  {
    Id: generateRandomId(),
    Item: 'Goodbye world',
    Category: categoryTypes.FOOD,
    Amount: 10,
    IsChecked: false,
  },
  {
    Id: generateRandomId(),
    Item: 'Hello moon',
    Category: categoryTypes.ACCESSORY,
    Amount: 1000,
    IsChecked: false,
  },
];

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenseList, setExpenseList] = useState([...dummy]);

  const handleDelete = () => {
    const newExpenseList = expenseList.filter((each) => !each.IsChecked);

    dummy = [...newExpenseList];
    setExpenseList(newExpenseList);
  };

  return (
    <>
      <div className='m-auto mt-6 w-[60%] '>
        <h1 className='font-bold mb-6 text-xl'>Cat Expense Web</h1>
        <Button
          onClick={() => {
            document.getElementById('addExpenseDialog').showModal();
            setIsDialogOpen(true);
          }}
          className='mr-4'>
          Add Expense
        </Button>
        <Button onClick={handleDelete}>Delete Expense</Button>
      </div>
      <ExpenseList expenseList={expenseList} setExpenseList={setExpenseList} />
      <AddExpenseDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setExpenseList={setExpenseList}
      />
    </>
  );
}

export default App;
