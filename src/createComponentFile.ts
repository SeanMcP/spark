import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'

import { Config } from './getConfig'

export default function (content: string, config: Config): void {
    const dirpath = path.join(config.output, config.filepath, config.componentDirectory ? config.filename : '')
    mkdirp(dirpath, (err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        const fullFilename = `${config.filename}.${config.filetype}`
        fs.writeFileSync(
            path.join(dirpath, fullFilename),
            content
        )
        if (config.componentDirectory) {
            fs.writeFileSync(
                path.join(dirpath, `package.json`),
                `{\n\t"main": "./${fullFilename}"\n}`
            )
        }
    })
}