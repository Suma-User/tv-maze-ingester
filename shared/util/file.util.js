module.exports = {
  getComponentFileName: (file, pattern) => {
    if (typeof file !== 'string') {
      return '';
    }
    const filePath = file.split('/');
    const fileName = filePath.length ? filePath[filePath.length - 1].replace(pattern, '') : '';
    return fileName.split('.')[0];
  },

  getComponentFolderName: (file) => {
    if (typeof file !== 'string') {
      return '';
    }
    const filePath = file.split('/');
    return filePath.length && filePath.length >= 2 ? filePath[filePath.length - 2] : '';
  },
};
