const mapKeys = arrayOfObjects => {
  const objectOfObjects = arrayOfObjects.reduce((newObject, item) => {
    newObject[item.id] = item;
    return newObject;
  }, {});

  return objectOfObjects;
};

export default mapKeys