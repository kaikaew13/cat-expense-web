import { useState } from 'react';

import ExpenseList from './components/ExpenseList';
import Button from './components/Button';
import AddExpenseDialog from './components/AddExpenseDialog';

export const generateRandomId = () => {
  return Math.random()
    .toString(36)
    .substring(2, 10 + 2);
};

export let dummy = [
  {
    Id: generateRandomId(),
    Item: 'Hello world',
    Category: 'Food',
    Amount: 10,
    IsChecked: false,
  },
  {
    Id: generateRandomId(),
    Item: 'Goodbye world',
    Category: 'Accomodation',
    Amount: 10,
    IsChecked: false,
  },
  {
    Id: generateRandomId(),
    Item: 'Hello moon',
    Category: 'Food',
    Amount: 1000,
    IsChecked: false,
  },
];

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenseList, setExpenseList] = useState(dummy);

  const handleDelete = () => {
    const newExpenseList = expenseList.filter((each) => !each.IsChecked);

    dummy = [...newExpenseList];
    console.log(dummy);

    setExpenseList(newExpenseList);
  };

  return (
    <>
      <div className='m-auto mt-6 w-[60%] '>
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
      />
    </>
  );
}

export default App;
