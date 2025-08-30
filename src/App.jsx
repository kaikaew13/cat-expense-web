import { useState } from 'react';

import ExpenseList from './components/ExpenseList';
import Button from './components/Button';
import ExpenseDialog from './components/ExpenseDialog';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [unsortedList, setUnsortedList] = useState(() => {
    const list = localStorage.getItem('expenseList');
    return list ? JSON.parse(list) : [];
  });
  const [expenseList, setExpenseList] = useState(unsortedList);
  const [initData, setInitData] = useState(null);

  const handleDelete = () => {
    const tmpList = expenseList.filter((each) => !each.IsChecked);
    if (tmpList.length === expenseList.length) return;

    const newUnsortedList = unsortedList.filter((each) =>
      tmpList.includes(each)
    );

    localStorage.setItem('expenseList', JSON.stringify(newUnsortedList));
    setUnsortedList(newUnsortedList);
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
        unsortedList={unsortedList}
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        setInitData={setInitData}
        toggleDialog={toggleDialog}
      />
      <ExpenseDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        unsortedList={unsortedList}
        setUnsortedList={setUnsortedList}
        initData={initData}
        setInitData={setInitData}
      />
    </>
  );
}

export default App;
