import ExpenseList from './components/ExpenseList';
import Button from './components/Button';
import AddExpenseDialog from './components/AddExpenseDialog';
import { useState } from 'react';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(isDialogOpen);

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
        <Button>Delete Expense</Button>
      </div>
      <ExpenseList />
      <AddExpenseDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
}

export default App;
