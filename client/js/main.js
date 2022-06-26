import FormComponent from "./components/form-component.js";
import shoppingListValidator from "./helpers/validators/shopping-list-form-validator.js";
import ApiService from "./helpers/api-service.js";

const shoppingListContainer = document.querySelector('.js-shooping-cart');
const updateFormModal = new bootstrap.Modal('#update-form-modal');
const updateTitleField = document.querySelector('#update-title-input');
const updatePriceField = document.querySelector('#update-price-input');
const updateQtyField = document.querySelector('#update-qty-input');
const btnUpdateItem = document.querySelector('#btn-update-item');

let editableItemId = null;
let editableItemTitle = null;
let editableItemPrice = null;
let editableItemQty = null;

const editItem = async () => {
  const { title, price, qty } = await ApiService.editItem({
    id: editableItemId,
    title: updateTitleField.value,
    price: updatePriceField.value,
    qty: updateQtyField.value
  });

  editableItemTitle.innerText = title;
  editableItemPrice.innerText = `${price} €`;
  editableItemQty.innerText = qty;

  editableItemTitle = null;
  editableItemPrice = null;
  editableItemQty = null;
};

const displayItem = ({ id, title, price, qty }) => {

  const shoppingListItem = document.createElement('div');
  shoppingListItem.className = 'shopping-cart-item d-flex flex-column gap-2';

  const itemTitle = document.createElement('p');
  itemTitle.className = 'text-center';
  itemTitle.innerText = title;

  const itemInfo = document.createElement('div');
  itemInfo.classList = 'd-flex p-2 flex-column gap-3';

  const itemPrice = document.createElement('div');
  itemPrice.innerText = 'Kaina (€/vnt): ';
  const itemPriceDisplay = document.createElement('span')
  itemPriceDisplay.innerText = `${price} €`;
  itemPrice.append(itemPriceDisplay)

  const itemQty = document.createElement('div');
  itemQty.innerText = 'Kiekis (vnt): ';
  const itemQtyDisplay = document.createElement('span')
  itemQtyDisplay.innerText = qty;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'shopping-cart-item__buttons';

  const delButton = document.createElement('button');
  delButton.className = 'btn btn-danger';
  delButton.innerHTML = '<i class="bi bi-trash"></i>';

  const editButton = document.createElement('button');
  editButton.className = 'btn btn-primary';
  editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';

  editButton.addEventListener('click', () => {
    updateTitleField.value = itemTitle.innerText;
    updatePriceField.value = itemPriceDisplay.innerText.split(' ')[0];
    updateQtyField.value = itemQtyDisplay.innerText;

    editableItemId = id;
    editableItemTitle = itemTitle;
    editableItemPrice = itemPriceDisplay;
    editableItemQty = itemQtyDisplay;

    updateFormModal.show();
  });

  delButton.addEventListener('click', async () => {
    await ApiService.deleteItem(id);
    shoppingListItem.remove();
  });

  itemQty.append(itemQtyDisplay);
  itemInfo.append(itemPrice, itemQty);
  buttonContainer.append(delButton, editButton);
  shoppingListItem.append(
    itemTitle,
    itemInfo,
    buttonContainer
  );
  shoppingListContainer.append(shoppingListItem);
};

const formShopList = new FormComponent(
  '.js-shopping-list-form',
  shoppingListValidator,
  async ({ title, price, qty }) => {
    const addItem = await ApiService.addItem({ title, price, qty })
    displayItem(addItem);
  }
);

(async () => {
  const shoppingListItems = await ApiService.fetchShoppingListItems();
  shoppingListItems.forEach(displayItem);
})();

btnUpdateItem.addEventListener('click', () => {
  editItem();
  updateFormModal.hide();
});
