const express = require('express');
const db = require('./database');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('Root route accessed'); // Log statement added
  db.all('SELECT * FROM flights ORDER BY scheduled_time', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.render('index', { flights: rows });
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Serving static files from the public directory.');
});
