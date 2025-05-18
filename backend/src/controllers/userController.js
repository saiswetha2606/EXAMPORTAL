const db = require('../config/db');

exports.getUserProfile = (req, res) => {
  const { id } = req.params;
  const query = `SELECT full_name, email, phone, college_name, college_id, profile_picture FROM users WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });

    res.status(200).send(results[0]);
  });
};

exports.updateUserProfile = (req, res) => {
  const { id } = req.params;
  const { fullName, phone, collegeName } = req.body;

  const query = `UPDATE users SET full_name = ?, phone = ?, college_name = ? WHERE id = ?`;
  const values = [fullName, phone, collegeName, id];

  db.query(query, values, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: 'Profile updated successfully' });
  });
};
