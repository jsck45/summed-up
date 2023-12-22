const { ObjectId } = require('mongodb');

const categories = [
  { _id: new ObjectId(), name: "🚀 Tech" },
  { _id: new ObjectId(), name: "🔬 Science" },
  { _id: new ObjectId(), name: "🌿 Health" },
  { _id: new ObjectId(), name: "✈️ Travel" },
  { _id: new ObjectId(), name: "🍔 Food" },
  { _id: new ObjectId(), name: "⚽ Sports" },
  { _id: new ObjectId(), name: "🎬 Entertainment" },
  { _id: new ObjectId(), name: "👗 Fashion" },
  { _id: new ObjectId(), name: "🎶 Music" },
  { _id: new ObjectId(), name: "💰 Finance" },
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
      "Introducing our latest smartphone, a true masterpiece of modern technology. This device has been meticulously crafted to enhance your mobile experience in every way. One of its standout features is its brilliant display, which delivers stunning visuals with vibrant colors and exceptional clarity. Whether you're watching videos, browsing photos, or reading, the display offers an immersive and captivating experience. Additionally, we've prioritized your convenience by extending the battery life, so you can stay connected and productive throughout the day without constantly worrying about recharging. The high-performance camera is another highlight, providing you with the ability to capture stunning photos and videos with ease.\nUnder the hood, this smartphone is powered by a robust processor that ensures smooth multitasking and quick app launches. Its elegant design not only looks great but also feels comfortable in your hand. Your data and privacy are safeguarded with advanced security features such as facial recognition and fingerprint scanning.\nWith this smartphone, we're redefining your mobile lifestyle, offering you the future of technology at your fingertips. Welcome to a world of innovation and convenience.",
    author: users[1]._id,
    categories: [categories[0]._id],
    comments: [
      {
        content: "This tech innovation is mind-blowing!",
        author: users[4]._id,
      },
    ],
    summary: 
    "This post outlines the latest smartphone's remarkable features: a brilliant display, extended battery life, and a high-performance camera. It redefines the mobile lifestyle with innovation and convenience."
  },
  {
    title: "Exploring the Wonders of Space",
    content:
      "Take an awe-inspiring voyage with us as we venture into the enigmatic depths of the universe in this new doco. Beyond the confines of our home planet lies a cosmos teeming with wonders waiting to be unveiled. From the mesmerizing beauty of distant galaxies to the mind-boggling mysteries of black holes, there is a tapestry of celestial marvels that beckons us to explore. Join us on this cosmic odyssey, a journey that promises to expand your horizons and deepen your appreciation for the boundless expanse of the cosmos, where every star is a story and every planet a puzzle. Together, we'll traverse the vastness of space and time, igniting the flame of curiosity and understanding, and shedding light on the celestial enigmas that have captivated humanity's imagination for centuries.",
    author: users[0]._id,
    categories: [categories[1]._id],
    comments: [
      {
        content: "I've always been fascinated by space exploration.",
        author: users[5]._id,
      },
    ],
    summary: "This post embarks on an awe-inspiring cosmic voyage, unveiling the mesmerizing beauty of distant galaxies and the mysteries of black holes. Join us to explore the cosmos, igniting curiosity and understanding."
  },
  {
    title: "Healthy Lifestyle Tips for Everyone",
    content:
      "Ensuring a healthy and fulfilling life is of utmost importance. In the following discussion, we'll share valuable insights on nutrition, exercise, and mental well-being. So, let's take the first step together on this path to an improved and joyous existence.\nFirst and foremost, nutrition plays a vital role in sustaining a healthy lifestyle. By making mindful choices about what we consume, we can provide our bodies with the essential nutrients they need to thrive. We'll explore the significance of balanced diets and the positive impact they can have on our well-being.\nPhysical activity is another key aspect of maintaining a healthy lifestyle. Regular exercise not only strengthens our bodies but also boosts our energy and mood. We'll delve into effective workout routines and simple strategies to incorporate more physical activity into our daily lives.\nLastly, we'll focus on nurturing our mental health, a cornerstone of overall wellness. Discover relaxation techniques, stress management, and mindfulness practices to foster a positive state of mind.\nTogether, let's embark on this transformative journey toward a healthier, happier life.",
    author: users[2]._id,
    categories: [categories[2]._id],
    comments: [
      {
        content: "Thanks for sharing these valuable health tips!",
        author: users[6]._id,
      },
    ],
    summary: "This post emphasizes the importance of a healthy life and offers insights on nutrition, exercise, and mental well-being. Let's start the journey towards a healthier, happier life by making mindful choices, engaging in regular physical activity, and nurturing our mental health."
  },
  {
    title: "Travel Diary: Exploring Beautiful Destinations",
    content:
      "Embark on an exhilarating journey with me as I traverse the globe's enchanting landscapes. From the unspoiled shores of idyllic beaches to the awe-inspiring heights of majestic mountains, I invite you to peer through the window of my adventures and witness the sheer magnificence our planet boasts. Let's forge ahead together and start this incredible odyssey!\nUncover hidden gems in far-off places, absorb the vibrant cultures that adorn our world, and bask in the diversity of our natural wonders. Whether it's a peaceful escape by the azure waters, an adrenaline-filled mountain hike, or a leisurely stroll through charming streets, you'll experience it all as if you were right there.\nPrepare to be transported to remarkable destinations, each with its own unique allure. So fasten your seatbelts, as we embark on this incredible journey to explore the breathtaking beauty that our extraordinary world has to offer.",
    author: users[3]._id,
    categories: [categories[3]._id],
    comments: [
      {
        content: "Your travel diaries inspire me to explore new places!",
        author: users[7]._id,
      },
    ],
    summary: "Embark on a thrilling journey through captivating landscapes worldwide. Explore pristine shores, towering mountains, and diverse cultures. Whether it's tranquil beaches, adventurous hikes, or leisurely strolls, experience it all. Prepare for remarkable destinations and extraordinary adventures in our beautiful world."
  },
];

module.exports = {
  category: categories,
  user: users,
  post: posts,
};
