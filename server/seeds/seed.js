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

  const posts = await Post.insertMany(post);
  console.log('posts seeded');

  // const postIds = [];
  // posts.map((post) => postIds.push(post._id));
  // console.log('postIds: ' + postIds);
  // console.log('posts: ' + posts);

  // posts.map(async ({ _id, author }) => {
  // console.log('this post: ' + index + post._id);
  // const users = await User.findOneAndUpdate({ _id: author }, { $addToSet: { posts: _id } });
  // console.log('user updated ' + post._id);
  // });

  process.exit();
});