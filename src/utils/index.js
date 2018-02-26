const crypto = require('crypto');

// eslint-disable-next-line
export const md5 = text =>
  crypto.createHash('md5').update(text, 'utf8').digest('hex');
