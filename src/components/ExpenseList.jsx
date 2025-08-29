const ExpenseList = () => {
  const dummy = [
    {
      Item: 'Hello world',
      Catergory: 'Food',
      Amount: 10,
    },
    {
      Item: 'Goodbye world',
      Catergory: 'Accomodation',
      Amount: 10,
    },
    {
      Item: 'Hello moon',
      Catergory: 'Food',
      Amount: 1000,
    },
  ];

  return (
    <>
      <table className='table bg-base-200 rounded rounded-box shadow-md w-[60%] m-auto mt-6'>
        <thead>
          <tr>
            <th></th>
            <th className='w-[60%]'>Item</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {dummy.map((each, index) => (
            <tr key={index} className='list-row'>
              <th>
                <input type='checkbox' className='checkbox w-4 h-4' />
              </th>
              <td className='w-[60%]'>{each.Item}</td>
              <td className=''>{each.Catergory}</td>
              <td className=''>{each.Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseList;
