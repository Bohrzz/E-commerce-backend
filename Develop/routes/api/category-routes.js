const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
   try {
    const categoryData = await Category.findAll(req.params.id,{
      include: [{model:Product, through:Category, 
      as: "Categories"}]

    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
   try {
    const categoryId = await Category.findByPk(req.params.id, {
      
      include: [{ model: Category, through: Product, as: 'Product Categories' }]
    });

    if (!categoryId) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }

    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated tags from ProductTag
      return Category.findAll({ where: { category_id: req.params.id } });
    })
    .then((categoryId) => {
      // get list of current tag_ids
      const categoryId = categoryId.map(({ category_id }) => category_id);
      // create filtered list of new tag_ids
      const newCategoryId = req.body.categoryId
        .filter((category_id) => !newCategoryId.includes(category_id))
        .map((tag_id) => {
          return {
           categoryId: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const categoriesToRemove = categoryId
        .filter(({ category_id }) => !req.body.categoryId.includes(category_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        categoryId.destroy({ where: { id: categoriesToRemove } }),
        categoryId.bulkCreate(newCategory),
      ]);
    })
    .then((updatedCategory) => res.json(updatedCategory))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
   try {
    const removedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!removedCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(removedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
