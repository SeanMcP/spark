import fs from 'fs'
import path from 'path'

export default function (files: (string| string[])): object {
    const filenames: string[] = typeof files === 'string' ? [ files ] : files
    for (let i = 0; i < filenames.length; i++) {
        try {
            const config = fs.readFileSync(path.join(process.cwd(), filenames[i]), 'utf-8')
            return JSON.parse(config)
        } catch {
            continue
        }
    }
    return {}
}