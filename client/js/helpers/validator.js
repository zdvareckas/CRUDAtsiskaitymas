const ONLY_LETTERS_REGEX = /^[A-ZĄČĘĖĮŠŲŪŽa-ząčęėįšųūž ]*$/;
const NUMBER_REGEX = /\d/;

class Validator {
  #value;
  #errors;

  constructor(value) {
    this.#value = value;
    this.#errors = [];
  }

  get value() {
    return this.#value;
  }

  get hasErrors() {
    return this.#errors.length > 0;
  }

  get errors() {
    return [...this.#errors];
  }

  get HTMLError() {
    return this.#errors.join('<br>');
  }

  required(errMessage) {
    const valueExists =
      this.#value !== undefined
      && this.#value !== null
      && this.#value !== '';

    if (!valueExists) {
      this.#errors.push(errMessage);
    }

    return this;
  }

  min(amount, errMessage) {
    if (this.#value.length < amount) {
      this.#errors.push(errMessage);
    }

    return this;
  }

  max(amount, errMessage) {
    if (this.#value.length > amount) {
      this.#errors.push(errMessage);
    }

    return this;
  }

  hasNumber(errMessage) {
    if (!NUMBER_REGEX.test(this.#value)) {
      this.#errors.push(errMessage);
    }

    return this;
  }

  onlyLetters(errMessage) {
    if (!ONLY_LETTERS_REGEX.test(this.#value)) {
      this.#errors.push(errMessage);
    }

    return this;
  }

  positive(errMessage) {
    if (this.#value[0] === '-') {
      this.#errors.push(errMessage);
    }

    return this;
  }

  aboveZero(errMessage) {
    if (Number(this.#value) === 0) {
      this.#errors.push(errMessage)
    }
    return this;
  }

}

export default Validator;
