import * as path from 'path'
import * as prettier from 'prettier'
import getJson from './getJson'

function getPrettierConfig(): object {
    const fileOptions = {
        js: ['.prettierrc.js', '.prettier.config.js'],
        json: ['.prettierrc.json', '.prettierrc']
    }

    for (let i = 0; i < fileOptions.js.length; i++) {
        try {
            return require(path.join(process.cwd(), fileOptions.js[i]))
        } catch {
            continue
        }
    }
    return getJson(fileOptions.json)
}

export default function (component: string): string {
    const config = getPrettierConfig()
    return prettier.format(component, {
        // Removes console error
        parser: 'babel',
        ...config
    })
}