const express = require('express');

const router = express.Router();

// GET all entries
router.get('/', (req, res) => {
    res.json({mssg: 'GET all entries'});
});

// GET one entry
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET one entry'});
});

// POST a new entry
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new entry'});
});

// Delete an entry
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE an entry'});
});

// Update an entry
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE an entry'});
});

module.exports = router;