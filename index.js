// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const pool = require('./db');
const cors = require('cors');

app.use(cors());

app.use(express.json());

// Get all banners
app.get('/banner/all', async (req, res) => {
    try {
        const [rows] = await pool.query('select * from banner order by created_at desc');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

// Get only visible banners
app.get('/banner', async (req, res) => {
    try {
        const [rows] = await pool.query('select * from banner where visible=1 order by created_at desc');
        res.json(rows);
    } catch (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

// POST method to add a new banner
app.post('/banner', async (req, res) => {
    const { title, description, target_datetime, banner_link, visible } = req.body;

    // Validate input
    if (!title || !description || !target_datetime || !banner_link || typeof visible !== 'boolean') {
        return res.status(400).send({'error': 'Invalid input'});
    }

    try {
        // Insert the new banner into the database
        const query = 'INSERT INTO banner (title, description, target_datetime, banner_link, visible) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [title, description, target_datetime, banner_link, visible]);

        // Fetch the newly inserted banner including the created_at timestamp
        const [newBanner] = await pool.query('SELECT * FROM banner WHERE id = ?', [result.insertId]);

        res.status(201).json(newBanner[0]); // Return the newly created banner with the created_at field
    } catch (err) {
        console.error('Error inserting data:', err.stack);
        res.status(500).send('Failed to add new banner');
    }
});

// PUT method to update a banner
app.put('/banner/:id', async (req, res) => {
    const bannerId = parseInt(req.params.id, 10);
    const { description, target_datetime, banner_link, visible } = req.body;

    if (isNaN(bannerId)) {
        return res.status(400).send({'error': 'Invalid input'});
    }

    try {
        const bannerGetQuery = 'SELECT * FROM banner where id = ?';
        const [banners] = await pool.query(bannerGetQuery, [bannerId]);
        const visible = banners[0].visible;
        console.log(visible)

        const query = 'UPDATE banner SET visible = ? WHERE id = ?';
        const [result] = await pool.query(query, [!visible, bannerId]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Banner not found');
        }

        res.json({ id: bannerId, description, target_datetime, banner_link, visible });
    } catch (err) {
        console.error('Error updating data:', err.stack);
        res.status(500).send('Failed to update banner');
    }
});

// DELETE method to delete a banner
app.delete('/banner/:id', async (req, res) => {
    const bannerId = parseInt(req.params.id, 10);

    if (isNaN(bannerId)) {
        return res.status(400).send({'error': 'Invalid banner ID'});
    }

    try {
        const query = 'DELETE FROM banner WHERE id = ?';
        const [result] = await pool.query(query, [bannerId]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Banner not found');
        }

        res.status(200).json({"success": "Item deleted"});
    } catch (err) {
        console.error('Error deleting data:', err.stack);
        res.status(500).send('Failed to delete banner');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
