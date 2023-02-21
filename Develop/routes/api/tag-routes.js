const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: Product, through: ProductTag, }]
    });

    if (!tagId) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/',async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body,{where: {id:req.params.id}});
    res.status(200).json(updatedTag);

    
  } catch (err) {
    res.status(400).json(err);
    
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
   try {
    const removedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!removedTag) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(removedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
