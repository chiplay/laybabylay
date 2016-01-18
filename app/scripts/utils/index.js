import $ from 'jquery';

export function decodeHtml(html) {
  return $('<div>').html(html).text();
}