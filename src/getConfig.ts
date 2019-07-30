import program from 'commander'

import getJson from './getJson'

type SparkConfig = {
    filetype: string,
    output: string,
    proptypes: boolean,
    componentDirectory: boolean
}

type Args = {
    class: boolean,
    connect: boolean
}

type NameAndPath = {
    filename: string,
    filepath: string
}

type Default = Args & SparkConfig;
export type Config = Default & NameAndPath;

const defaultConfig: Default = {
    class: false,
    connect: false,
    filetype: 'jsx',
    output: 'src',
    proptypes: true,
    componentDirectory: false
}

function getFileAndPath(path: string): NameAndPath {
    const output: NameAndPath = {
        filename: path,
        filepath: '/'
    }
    if (path.includes('/')) {
        const slashIndex = path.lastIndexOf('/')
        output.filename = path.slice(slashIndex + 1)
        output.filepath = path.slice(0, slashIndex)
    }
    return output
}

export default function (): Config {
    program
        .version(require('../package.json').version)
        .option('-C, --class', `create class component`, defaultConfig.class)
        .option('-c, --connect', 'connect to Redux', defaultConfig.connect)
        .parse(process.argv)
    // console.log('program', program)

    return {
        ...defaultConfig,
        ...getJson('.sparkrc.json'),
        class: program.class,
        connect: program.connect,
        ...getFileAndPath(program.args[0])
    }
}