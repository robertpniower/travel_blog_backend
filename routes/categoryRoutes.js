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

router.put('/update:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const affectedRows = await CategoryController.updateCategory(id, title, content);

        if (affectedRows > 0) {
            res.status(200).json({ message: 'Category updated successfully.'});
        } else {
            res.status(404).json({ message: 'Category not found.'})
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updaqting Category.', err})
    }
});

module.exports = router;
