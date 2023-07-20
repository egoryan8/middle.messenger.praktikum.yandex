export const getParentDataSetParam = (element: HTMLElement, className: string, dataSetParam: string): string | undefined => {
  let copyElement = element;

  while (copyElement.className !== className) {
    if (copyElement.parentElement !== null) {
      copyElement = copyElement.parentElement;
    } else {
      return undefined;
    }
  }

  return copyElement.dataset[dataSetParam];
};
