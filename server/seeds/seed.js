const db = require('../config/connection');
const { User, Post, Category } = require('../models');
const cleanDB = require('./cleanDB');
const { category, user, post } = require('./Data');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('User', 'users');
  await cleanDB('Post', 'posts');

  const categories = await Category.insertMany(category);
  console.log(categories);
  console.log('categories seeded');

  const users = await User.insertMany(user);
  console.log(users);
  console.log('users seeded');

  const posts = await Post.insertMany(post);
  console.log(posts);
  console.log('posts seeded');

  // const postIds = [];
  // posts.map((post) => postIds.push(post._id));
  // console.log(postIds);

  posts.map(async (post) => {
    users = await User.findOneAndUpdate({ _id: post.author }, { $addToSet: { posts: post._id } });
    console.log('user updated');
  });
  // console.log(users);

  process.exit();
});