import Validator from '../validator.js';

const shoppingListValidator = ({ title, qty, price }) => {
  const errors = {};

  const titleValidator = new Validator(title)
    .required('Pavadinimas privalomas')
    .onlyLetters('Tik raidinis pavadinimas')
    .min(4, 'Mažiausiai 4 simboliai')
    .max(32, 'Daugiausiai 32 simboliai')
  if (titleValidator.hasErrors) errors.title = titleValidator.HTMLError;

  const qtyValidator = new Validator(qty)
    .required('Privalomas')
    .positive('Turi būti teigiamas')
    .aboveZero('Negali būti 0')
  if (qtyValidator.hasErrors) errors.qty = qtyValidator.HTMLError;

  const priceValidator = new Validator(price)
    .required('Privaloma')
    .positive('Turi būti teigiamas')
    .aboveZero('Negali būti 0')
  if (priceValidator.hasErrors) errors.price = priceValidator.HTMLError;

  return errors;
}

export default shoppingListValidator;
