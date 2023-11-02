import { timeFormat } from 'd3-time-format';
import _ from 'lodash';

/**
 * Format number as dollar amount.
 * @param {Number} number Original amount.
 * @returns {string} Formatted amount.
 */
export function formatDollar(number) {
    const floor = Math.floor(number);
    return `$${floor.toLocaleString('en-US')}`;
}

/**
 * Format date.
 * @param {string} generated Original date.
 * @returns {string} Formatted date.
 */
export function formatGenerated(generated) {
    const fmt = timeFormat('%B %d, %Y at %I:%M %p');
    const d = new Date(generated);
    return fmt(d);
}

/**
 * Format legislator anchor ID.
 * @param {string} str Original ID.
 * @returns {string} Formatted ID.
 */
export function formatLegislatorAnchorId(str) {
    return _.kebabCase(str.toLowerCase());
}
