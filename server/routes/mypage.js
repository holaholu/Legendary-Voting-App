const express = require('express');
const router = express.Router();



/* GET my page */
router.get('/', (req, res) => {
  res.render("mypage");
});

// Get all posts


module.exports = router;