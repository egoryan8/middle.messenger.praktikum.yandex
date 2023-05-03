interface IValidationInput {
  elementId: string;
  regexp: string;
}

interface IInputsValidationResults {
  inputName: string;
  inputValue: string;
  validationOK: boolean;
}
export const validateInput = (elementId: string, regexp: RegExp | string): IInputsValidationResults => {
  const input = document.getElementById(elementId) as HTMLInputElement;
  const reg = new RegExp(regexp);
  const validationOK = reg.test(input.value);

  if (validationOK) {
    input.classList.remove('input-error');
    input.classList.add('input-normal');
  } else {
    input.classList.remove('input-normal');
    input.classList.add('input-error');
  }

  return {
    validationOK,
    inputName: input.name,
    inputValue: input.value,
  };
};
export const validateInputs = (...items: IValidationInput[]) => {
  const inputsValidationResults = items.map((item) => validateInput(item.elementId, item.regexp));

  if (inputsValidationResults.every((item) => item.validationOK)) {
    // eslint-disable-next-line no-console
    console.log(inputsValidationResults.reduce((acc, cur) => Object.assign(acc, { [cur.inputName]: cur.inputValue }), {}));
  }
};
