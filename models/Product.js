var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Product.add({
	name: { type: String, required: true },
	state: { type: Types.Select, options: 'new, sale-off, outlet, normal', default: 'new', index: true },
	price: { type: Types.Money, format: '0,0.00 VND' },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: true }
});

Product.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Product.defaultColumns = 'name, state|20%, categories|20%';
Product.register();
