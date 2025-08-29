import { useState } from 'react';

import ExpenseList from './components/ExpenseList';
import Button from './components/Button';
import ExpenseDialog from './components/ExpenseDialog';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenseList, setExpenseList] = useState(() => {
    const list = localStorage.getItem('expenseList');
    return list ? JSON.parse(list) : [];
  });
  const [initData, setInitData] = useState(null);

  const handleDelete = () => {
    const newExpenseList = expenseList.filter((each) => !each.IsChecked);

    localStorage.setItem('expenseList', JSON.stringify(newExpenseList));
    setExpenseList(newExpenseList);
  };

  const toggleDialog = () => {
    document.getElementById('expenseDialog').showModal();
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className='m-auto mt-6 w-[60%] '>
        <h1 className='font-bold mb-6 text-xl'>Cat Expense Web</h1>
        <Button onClick={toggleDialog} className='mr-4'>
          Add Expense
        </Button>
        <Button onClick={handleDelete}>Delete Expense</Button>
      </div>
      <ExpenseList
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        setInitData={setInitData}
        toggleDialog={toggleDialog}
      />
      <ExpenseDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        initData={initData}
        setInitData={setInitData}
      />
    </>
  );
}

export default App;
