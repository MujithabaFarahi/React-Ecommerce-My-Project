import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Mujithaba',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],
    products: [
        {
            // _id: '1',
            name: 'Adidas Laptop Backpack',
            slug: 'adidas-laptop-backpack',
            category: 'Backpack',
            image: '/images/bag1.jpg',
            price: 3150,
            countInStock: 10,
            brand: 'No brand',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality Backpack'
        },
        {
            // _id: '2',
            name: 'Lenovo Laptop Backpack',
            slug: 'lenovo-laptop-backpack',
            category: 'Backpack',
            image: '/images/bag2.jpg',
            price: 2990,
            countInStock: 0,
            brand: 'No brand',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality Backpack'
        },
        {
            // _id: '3',
            name: 'Columbia 55L Backpack',
            slug: 'columbia-55l-backpack',
            category: 'Backpack',
            image: '/images/bag3.jpg',
            price: 5950,
            countInStock: 10,
            brand: 'No brand',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality Backpack'
        },
        {
            // _id: '4',
            name: '70L Hiking Backpack',
            slug: '70l-hiking-backpack',
            category: 'Backpack',
            image: '/images/bag4.jpg',
            price: 4990,
            countInStock: 10,
            brand: 'No brand',
            rating: 2.5,
            numReviews: 9,
            description: 'High Quality Backpack'
        },
    ]
}

export default data;