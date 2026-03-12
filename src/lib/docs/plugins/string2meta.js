export const string2meta = (/** @type {string} */ str) => {
  if (!str) return {};

  const nonStringValues = { 'true': true, 'false': false, 'null': null, undefined: 'undefined' }

  return str.replace(/="([^"]*?)"/g, (_, $1) => `="${encodeURIComponent($1)}"`).split(' ').reduce((result, item) => {
    const [key, value] = item.split('=')
    result[key] = nonStringValues[value] ?? decodeURIComponent(/^"[^"]*"$/.test(value) ? JSON.parse(value) : value)
    return result
  }, {});
}
