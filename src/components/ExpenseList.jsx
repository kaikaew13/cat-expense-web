const ExpenseList = ({ expenseList, setExpenseList }) => {
  let maxAmount = 0;
  expenseList.forEach((each) => {
    if (each.Amount > maxAmount) {
      maxAmount = each.Amount;
    }
  });

  return (
    <>
      <table className='table bg-base-200 rounded rounded-box shadow-md w-[60%] m-auto mt-6'>
        <thead>
          <tr>
            <th></th>
            <th className='w-[60%] text-white'>Item</th>
            <th className='text-white'>Category</th>
            <th className='text-white'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((each, index) => (
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
                  value={each.IsChecked}
                  onChange={(e) => {
                    const newExpenseList = [...expenseList];
                    newExpenseList[index].IsChecked =
                      !newExpenseList[index].IsChecked;
                    setExpenseList(newExpenseList);
                  }}
                  className='checkbox w-4 h-4'
                />
              </th>
              <td className='w-[60%]'>{each.Item}</td>
              <td className=''>{each.Category}</td>
              <td className=''>{`${each.Amount.toFixed(2)}$`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseList;
