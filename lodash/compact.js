function compact(array) {
  const result = [];
  let index = 0;

  if (array == null) {
    return result;
  }

  for(const value of array) {
    if (value) {
      result[index++] = value;
    }
  }
  return result;
}

export default compact;