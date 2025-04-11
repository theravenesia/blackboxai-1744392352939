const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('fids.db');

// Create flights table
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS flights`);
  
  db.run(`CREATE TABLE IF NOT EXISTS flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_number TEXT,
    airline TEXT,
    direction TEXT,
    airport TEXT,
    airport_code TEXT,
    bay TEXT,
    belt TEXT,
    belt_open TEXT,
    belt_close TEXT,
    iata TEXT,
    gate TEXT,
    gate_open TEXT,
    gate_close TEXT,
    scheduled_time TEXT,
    estimated_time TEXT,
    status TEXT,
    remarks TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    closed INTEGER DEFAULT 0,
    delay_reason TEXT
  )`);

  // Insert sample data based on the image
  db.run(`INSERT INTO flights (
    flight_number, airline, direction, airport, scheduled_time, status, bay, gate, estimated_time, remarks
  ) VALUES 
    ('JT-707', 'A', 'D', 'UPG', 'Jum 11/14:30', 'Landed', '010', null, '11/17:32', 'Landed'),
    ('JT-919', 'A', 'D', 'DPS', 'Jum 11/14:40', 'Estimate', '012', null, '11/18:15', 'Estimate'),
    ('JT-642', 'D', 'D', 'LOP', 'Jum 11/15:20', 'DELAY OPERATIONAL', '012', 'G12', '11/18:20', 'DELAY OPERATIONAL'),
    ('IU-637', 'A', 'D', 'BDJ', 'Jum 11/15:30', 'Delayed Opr', null, null, null, 'Delayed Opr'),
    ('JT-920', 'D', 'D', 'DPS', 'Jum 11/15:35', 'DELAY OPERATIONAL', '018', 'G18', '11/18:00', 'DELAY OPERATIONAL'),
    ('JT-681', 'A', 'D', 'PKY', 'Jum 11/15:40', 'Landed', '016', null, '11/17:39', 'Landed')`);
});

module.exports = db;
