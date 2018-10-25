const dtree = require('nls-directree')

const CONTENT_DIR = './src/app/_content'
const CONTENT_JSON = 'paths.json'

try {
  const paths = dtree.read(CONTENT_DIR)

  try {
    dtree.write(paths, [CONTENT_DIR, CONTENT_JSON].join('/'))
  } catch (err) {
    console.error(err)
  }
} catch (err) {
  console.error(err)
}
