export function isEqual(a: any, b: any): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length === 0 && keysB.length === 0 && a === b) {
    return true;
  }
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i += 1) {
    const keyA = keysA[i];
    const keyB = keysB[i];

    if (keyA !== keyB) {
      return false;
    }

    // Если один из объектов null, а второй нет - то false
    if ((a[keyA] === null && b[keyB] !== null) || (a[keyA] !== null && b[keyB] === null)) {
      return false;
    }

    if (typeof a[keyA] === 'object' && a[keyA] !== null) {
      if (typeof b[keyB] !== 'object' && b[keyB] !== null) {
        return false;
      }

      return isEqual(a[keyA], b[keyA]);
    }
    if (a[keyA] !== b[keyB]) {
      return false;
    }
  }

  return true;
}
