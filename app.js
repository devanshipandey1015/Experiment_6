const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');  // Set EJS as the view engine


// Middleware for JSON body parsing
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/exp6db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Define MongoDB Schema & Model for users
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const User = mongoose.model('User', userSchema);

// ➕ CREATE new user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({ message: 'User created!', user });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', err });
  }
});

// 📄 READ all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching users', err });
  }
});

// ✏️ UPDATE user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'User updated!', updatedUser });
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', err });
  }
});

// 🗑️ DELETE user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted!' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting user', err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/users-list', async (req, res) => {
  try {
    const users = await User.find();
    res.render('index', { users });  // Render the EJS template with the users data
  } catch (err) {
    res.status(400).send("Error fetching users!");
  }
});
