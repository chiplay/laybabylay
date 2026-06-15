import $ from 'jquery';
import URI from 'urijs';
if (typeof window === 'undefined') {
  global.window = {}
}
const isServer = (typeof __CLIENT__ !== 'undefined') ? false : true;

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

// Originals live in an R2 bucket served at this host; transformations are
// applied on the fly by Cloudflare Images via the `/cdn-cgi/image/` path.
// Every source we receive (API fields, post-body HTML) is keyed by basename,
// mirroring the flat namespace the old Cloudinary delivery relied on.
export const IMAGE_HOST = 'https://images.laybabylay.com';

// Map our transform intent onto a Cloudflare Image Resizing option string.
function imageOptions({ width, height, quality, format = 'auto', fit } = {}) {
  const opts = [];
  if (width) opts.push(`width=${width}`);
  if (height) opts.push(`height=${height}`);
  if (quality) opts.push(`quality=${quality}`);
  if (format) opts.push(`format=${format}`);
  if (fit) opts.push(`fit=${fit}`);
  return opts.join(',');
}

// Build a delivery URL from any source URL/path — only its basename matters.
export function imageUrl(src, options) {
  if (!src) return null;
  const filename = new URI(src).filename();
  return `${IMAGE_HOST}/cdn-cgi/image/${imageOptions(options)}/${filename}`;
}

// Retune the transform options of an already-built delivery URL. Post-body
// <img> tags arrive from WordPress already pointing at the delivery host, so
// we only swap the options segment. Pass `global` to rewrite every match in
// an HTML string.
export function reTransform(url, options, global = false) {
  const re = new RegExp('cdn-cgi/image/[^/]+/', global ? 'g' : '');
  return url.replace(re, `cdn-cgi/image/${imageOptions(options)}/`);
}

const metrics = {
  isPhone: (serverIsMobile) => window.innerWidth < 576 || serverIsMobile
};

export default {
  metrics
};
