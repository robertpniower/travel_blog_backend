const express = require('express');
const CategoryController = require('../controllers/categoryController');
const router = express.Router();


router.get('/categories', CategoryController.getCategories);


router.post('/create', async (req, res) => {
    const { title, content } = req.body; 
    try {
        const categoryId = await CategoryController.createCategory(title, content);
        res.status(201).json({ message: 'Category created successfully', categoryId });
    } catch (err) {
        console.error('Error creating Category:', err);
        res.status(500).json({ error: 'Error creating Category' });
    }
});

module.exports = router;
