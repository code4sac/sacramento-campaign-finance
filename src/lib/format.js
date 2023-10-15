import _ from 'lodash'
import { timeFormat } from 'd3-time-format'

export function formatDollar(number) {
    const floor = Math.floor(number)
    return `$${floor.toLocaleString('en-US')}`
}

export function formatGenerated(generated) {
    const fmt = timeFormat('%B %d, %Y at %I:%M %p')
    const d = new Date(generated)
    return fmt(d)
}

export function formatLegislatorAnchorId(str) {
    return _.kebabCase(str.toLowerCase())
}