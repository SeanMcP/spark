import formatComponent from './formatComponent'

export default function (config: any): string {
    const { filename: name } = config
    const lines: string[] = []
    function newline() {
        lines.push('\n')
    }
    const _return = `return <div className="${name}">${name}</div>`

    lines.push(`import React from "React"`)
    if (config.proptypes)
        lines.push(`import PropTypes from "prop-types"`)
    if (config.connect) {
        lines.push(`import { connect } from "react-redux"`)
    }

    newline()
    if (config.class) {
        lines.push(`class ${name} extends React.Component {render() {${_return}}}`)
    } else {
        lines.push(`function ${name} (props) {${_return}}`)
    }

    if (config.proptypes) {
        newline()
        lines.push(`${name}.propTypes = {}`)
    }

    if (config.connect) {
        newline()
        lines.push(`const mapStateToProps = (state, ownProps) => { return {} }`)
        newline()
        lines.push(`const mapDispatchToProps = {}`)
        newline()
        lines.push(`export default connect(mapStateToProps, mapDispatchToProps)(${name})`)
    } else {
        newline()
        lines.push(`export default ${name}`)
    }
    
    return formatComponent(lines.join('\n'))
}