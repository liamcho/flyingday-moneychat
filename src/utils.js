import moment from 'moment';

export const timestampToDateString = timestamp => {
  return moment.unix(timestamp.toString().length === 13 ? timestamp / 1000 : timestamp).format('LL');
};

export const isImage = fileType => {
  const regex = /^image\/.+$/;
  return regex.test(fileType);
};

export const isEmpty = value => {
  return value === null || value === undefined || value.length === 0;
};

export const isNull = value => {
  try {
    return value === null;
  } catch (e) {
    return false;
  }
};

export const setCookie = (key, value) => {
  document.cookie = `${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

export const addClass = (target, className) => {
  if (target.classList) {
    if (!(className in target.classList)) {
      target.classList.add(className);
    }
  } else {
    if (target.className.indexOf(className) < 0) {
      target.className += ` ${className}`;
    }
  }
};

export const removeClass = (target, className) => {
  if (target.classList) {
    target.classList.remove(className);
  } else {
    target.className = target.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ''
    );
  }
};

export const protectFromXSS = text => {
  return typeof text === 'string'
    ? text
        .replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&apos;')
    : text;
};
