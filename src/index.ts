import getConfig, { Config } from './getConfig'
import buildComponent from './buildComponent'
import createComponentFile from './createComponentFile'

module.exports = function () {
    const config: Config = getConfig()
    // console.log(config)
    const component = buildComponent(config)
    createComponentFile(component, config)
    // console.log(buildComponent(config))
}