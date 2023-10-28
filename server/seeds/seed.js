const db = require('../config/connection');
const { User, Post, Category } = require('../models');
const cleanDB = require('./cleanDB');
const { category, user, post } = require('./Data');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('User', 'users');
  await cleanDB('Post', 'posts');

  const categories = await Category.insertMany(category);

  console.log('categories seeded');

  const users = await User.insertMany(user);

  console.log('users seeded');

  const userIds = [];
  users.map((user) => userIds.push(user._id));
  console.log(userIds);

  post.map(async (apost) => {
    apost.author = userIds[0];
    console.log(apost);
  })
  
  await Post.insertMany(post);

  console.log('posts seeded');

  process.exit();
});