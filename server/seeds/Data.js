const { ObjectId } = require('mongodb'); 

const categories = [
  { _id: new ObjectId(), name: "Tech" },
  { _id: new ObjectId(), name: "Science" },
  { _id: new ObjectId(), name: "Health" },
  { _id: new ObjectId(), name: "Travel" },
  { _id: new ObjectId(), name: "Food" },
  { _id: new ObjectId(), name: "Sports" },
  { _id: new ObjectId(), name: "Entertainment" },
  { _id: new ObjectId(), name: "Fashion" },
  { _id: new ObjectId(), name: "Music" },
  { _id: new ObjectId(), name: "Finance" },
];

const users = [
  {
    _id: new ObjectId(),
    username: "StarGazer23",
    email: "StarGazer23@email.com",
    password: "Pa$$w0rd123",
  },
  {
    _id: new ObjectId(),
    username: "TechNinja007",
    email: "TechNinja007@email.com",
    password: "Secur1ty!Time",
  },
  {
    _id: new ObjectId(),
    username: "ForumExplorer",
    email: "ForumExplorer@email.com",
    password: "P@ssw0rdForUm",
  },
  {
    _id: new ObjectId(),
    username: "PixelPirate42",
    email: "PixelPirate42@email.com",
    password: "8Bit#Adventur3",
  },
  {
    _id: new ObjectId(),
    username: "MusicMystic88",
    email: "MusicMystic88@email.com",
    password: "M1xMel0dy$",
  },
  {
    _id: new ObjectId(),
    username: "AdventureSeeker99",
    email: "AdventureSeeker99@email.com",
    password: "Qu3st#Tim3!",
  },
  {
    _id: new ObjectId(),
    username: "GameGuruX",
    email: "GameGuruX@email.com",
    password: "G@meM@st3r12",
  },
  {
    _id: new ObjectId(),
    username: "ArtisticDreamer76",
    email: "ArtisticDreamer76@email.com",
    password: "Paint$0ulCr3@tion",
  },
];

const posts = [
  {
    title: "Introducing the Latest Smartphone Tech",
    content:
      "We're thrilled to introduce the latest advancements in smartphone technology. Our team has been working tirelessly to bring you the most cutting-edge features, including a stunning display, improved battery life, and a powerful camera. Stay tuned for an exciting journey into the future of mobile technology.",
    author: users[1]._id,
    categories: [categories[0]._id],
    comments: [
      {
        content: "This tech innovation is mind-blowing!",
        author: users[4]._id,
      },
    ],
  },
  {
    title: "Exploring the Wonders of Space",
    content:
      "Take a journey with us as we explore the mysteries of the universe. From distant galaxies to black holes, there's so much to discover beyond our planet. Join us on this cosmic adventure and expand your knowledge of the cosmos.",
    author: users[0]._id,
    categories: [categories[1]._id],
    comments: [
      {
        content: "I've always been fascinated by space exploration.",
        author: users[5]._id,
      },
    ],
  },
  {
    title: "Healthy Lifestyle Tips for Everyone",
    content:
      "Maintaining a healthy lifestyle is crucial for your overall well-being. In this post, we'll provide you with practical tips on nutrition, exercise, and mental health. Let's embark on a journey towards a healthier and happier life together.",
    author: users[2]._id,
    categories: [categories[2]._id],
    comments: [
      {
        content: "Thanks for sharing these valuable health tips!",
        author: users[6]._id,
      },
    ],
  },
  {
    title: "Travel Diary: Exploring Beautiful Destinations",
    content:
      "Join me on my travel adventures as I explore some of the most stunning destinations around the world. From pristine beaches to breathtaking mountains, you'll get a glimpse of the beauty our planet has to offer. Let's start this incredible journey together!",
    author: users[3]._id,
    categories: [categories[3]._id],
    comments: [
      {
        content: "Your travel diaries inspire me to explore new places!",
        author: users[7]._id,
      },
    ],
  },
];

module.exports = {
  category: categories,

  user: users,

  post: posts,
};