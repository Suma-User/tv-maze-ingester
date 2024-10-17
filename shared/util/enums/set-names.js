/* eslint-disable no-param-reassign */
const EMPTY_VALUE = '_empty_';

module.exports = (enums, propName) => {
  const keysA = Object.keys(enums);
  const len = keysA.length;
  let keysB;
  let i;
  let jlen;
  let item;

  const recursiveEnumsList = (objLen, keysC, nameProp, itemEnum, enumsList) => {
    for (let j = 0; j < objLen; j += 1) {
      const name = keysC[j];
      if (nameProp) {
        // if a property name is sent in, set that property to the name
        if (nameProp === '.') {
          enumsList[itemEnum][name] = itemEnum + nameProp + name;
        } else {
          if (!enumsList[itemEnum][nameProp]) {
            enumsList[itemEnum][nameProp] = itemEnum;
          }
          if (enumsList[itemEnum][name]) {
            const keysD =
              typeof enumsList[itemEnum][name] === 'object'
                ? Object.keys(enumsList[itemEnum][name])
                : [];
            recursiveEnumsList(keysD.length, keysD, nameProp, name, enumsList[itemEnum]);
          } else {
            enumsList[itemEnum][name] = name;
          }
        }
      } else if (!enumsList[itemEnum][name]) {
        // if enum property is defaulted to zero (0) - then set the value to the name
        enumsList[itemEnum][name] = name;
      } else if (enumsList[itemEnum][name] === EMPTY_VALUE) {
        enumsList[itemEnum][name] = '';
      }
    }
    return enumsList;
  };

  for (i = 0; i < len; i += 1) {
    item = keysA[i];
    keysB = typeof enums[item] === 'object' ? Object.keys(enums[item]) : [];
    jlen = keysB.length;
    if (jlen) {
      recursiveEnumsList(jlen, keysB, propName, item, enums);
    } else if (!enums[item]) {
      enums[item] = item;
    } else if (enums[item] === EMPTY_VALUE) {
      enums[item] = '';
    }
  }
  return enums;
};
