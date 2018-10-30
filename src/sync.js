const dtree = require('nls-directree')

const CONTENT_DIR = './src/content'
const CONTENT_JSON = 'sitemap.json'

try {
  const sitemap = dtree.read(CONTENT_DIR)

  try {
    dtree.write(sitemap, [CONTENT_DIR, CONTENT_JSON].join('/'))
  } catch (err) {
    console.error(err)
  }
} catch (err) {
  console.error(err)
}
