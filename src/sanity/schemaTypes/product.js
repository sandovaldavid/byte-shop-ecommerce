const productSchema = {
name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            required: true,
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            },
            required: true,
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'oldPrice',
            title: 'Old Price',
            type: 'number',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'number',
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
        },
        {
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
        },
        {
            name: 'specs',
            title: 'Specifications',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{type: 'image'}]
        }
    ]
};

export default productSchema;