const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
//http://localhost:3001/api/categories
router.get('/', async (req, res) => {
  
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
//http://localhost:3001/api/categories/:id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    }
    );
    if (!categoryData) {
      res.status(404).json({message: "No category found with that ID!"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a new category
//http://localhost:3001/api/categories
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

// update a category by its `id` value
//http://localhost:3001/api/categories/:id
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
//http://localhost:3001/api/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    const currentCategory = await Category.findByPk(req.params.id);
    //setProducts is resetting the associations to nothing 
    await currentCategory.setProducts([])
    const categoryData = await currentCategory.destroy();
    if (!categoryData) {
      res.status(404).json({message: "There is no category with this ID."})
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
