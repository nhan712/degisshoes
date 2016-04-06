var keystone = require('keystone');
/**
 * ProductCategory Model
 * ==================
 */

var ProductCategory = new keystone.List('ProductCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

ProductCategory.add({
	name: { type: String, required: true }
});

ProductCategory.register();
