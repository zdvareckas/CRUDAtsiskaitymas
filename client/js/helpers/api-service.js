const fetchShoppingListItems = async () => {
  const response = await fetch('http://localhost:3000/items'); // GET
  const items = await response.json();

  return items;
}

const addItem = async ({ title, price, qty }) => {
  const response = await fetch(
    'http://localhost:3000/items',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, price, qty })
    }
  );

  const reponseData = await response.json();

  return reponseData;
};

const deleteItem = async (id) => {
  await fetch(`http://localhost:3000/items/${id}`, { method: 'DELETE' });
};

const editItem = async ({ id, ...props }) => {
  const response = await fetch(
    `http://localhost:3000/items/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
  );

  const reponseData = await response.json();

  return reponseData;
}



const ApiService = {
  fetchShoppingListItems,
  addItem,
  deleteItem,
  editItem
}

export default ApiService;
