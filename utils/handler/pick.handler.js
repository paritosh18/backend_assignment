/**
 * Create an object composed of the picked object properties.
 * @function pick
 *
 * @param {Object} object - The source object to pick properties from.
 * @param {string[]} keys - The array of property names to pick from the source object.
 * @returns {Object} New object with only the picked properties.
 */
const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			obj[key] = object[key]; 
		}
		return obj; 
	}, {}); 
};

module.exports = pick;
