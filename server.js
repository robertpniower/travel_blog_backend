const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const pictureRoutes = require('./routes/pictureRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/postRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require('./routes/categoryRoutes');
const countryRoutes = require('./routes/countryRoutes')
const cityRoutes = require('./routes/cityRoutes')
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/categories', categoryRoutes);
app.use('/countries', countryRoutes);
app.use('/cities', cityRoutes);
app.use('/images', pictureRoutes);



app.get('/', (req, res) => {
  res.send('Hello from Server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
