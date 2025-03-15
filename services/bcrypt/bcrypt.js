const { hashSync, compareSync, genSaltSync } = require('bcrypt');

module.exports = {
	hash: (data) => {
		return hashSync(data, genSaltSync(10));
	},
	compare: (data, hash) => {
		return compareSync(data, hash);
	},
};
