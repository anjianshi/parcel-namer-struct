const path = require('path')
const { Namer } = require('@parcel/plugin')


module.exports = new Namer({
  async loadConfig({ config }) {
    const { contents: packageJSON } = await config.getConfig(['package.json'])
    const raw = packageJSON['parcel-namer-struct'] || []
    return raw.map(item => ({
      type: item.type ? (
        typeof item.type === 'string' ? [item.type] : item.type
      ) : null,
      match: item.match ? new RegExp(item.match, 'i') : null,
      dest: item.dest,
    }))
  },

  async name({ bundle, logger, options, config }) {
    const mainEntry = bundle.getMainEntry()
    if (!mainEntry) return null

    const { type } = mainEntry
    const filePath = '/' + path.relative(options.projectRoot, mainEntry.filePath)

    for (const rule of config) {
      if (rule.type && !rule.type.includes(type)) continue
      if (rule.match && !filePath.match(rule.match)) continue

      const parsed = path.parse(filePath)
      let result = path.join(rule.dest, parsed.name)
      if (!bundle.needsStableName) result += "." + bundle.hashReference
      result += `.${type}`

      logger.info({
        message: `[${type}] ${filePath} → ${result}`,
        filePath,
        language: type,
      })
      return result
    }

    return null
  }
})
