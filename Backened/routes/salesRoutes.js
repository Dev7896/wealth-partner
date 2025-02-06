const { getAllSales } = require('../controllers/salesController');

const router = require('express').Router() ;

router.post('/' , getAllSales) ;

module.exports = router ;