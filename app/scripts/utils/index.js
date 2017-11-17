import $ from 'jquery';

export function decodeHtml(html) {
  return $('<div>').html(html).text();
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export function windowOptions(inputOptions) {
  const defaults = {
    width: '850',
    height: '650',
    toolbar: 0,
    scrollbars: 1,
    location: 0,
    statusbar: 0,
    menubar: 0,
    resizable: 1
  };
  const options = Object.assign({}, defaults, inputOptions);
  const data = [];
  Object.keys(options)
    .forEach((key) => data.push(`${key}=${encodeURIComponent(options[key])}`));
  return data;
}

export function popup(url, inputOptions, callback) {
  const data = windowOptions(inputOptions);
  const { name } = inputOptions;
  const x = window.open(url, name, data.join(','));

  if (typeof callback === 'function') {
    const popUpInt = setInterval(() => {
      if (!x || x.closed) {
        callback();
        clearInterval(popUpInt);
      }
    }, 300);
  }
  return x;
}

const metrics = {
  isPhone: window.innerWidth < 576
};

export default {
  metrics
};
