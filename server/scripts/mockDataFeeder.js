const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/userdb');
const Posts = require('../models/postsdb');

require('dotenv').config();
// console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 'majority' } 
    })
    .then(() => {
        console.log("Connected to MongoDB");
        insertMockData();
    })
    .catch(error => 
        console.log("Error connecting db",error)
);

const generateMockUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const user = new User({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(5)
        });
        users.push(user);
    }
    return users;
};

const generateMockPosts = (count, userIds) => {
    const posts = [];
    for (let i = 0; i < count; i++) {
        const post = new Posts({
            userId: userIds[Math.floor(Math.random() * userIds.length)],
            description: faker.lorem.paragraph(),
        });
        posts.push(post);
    }
    return posts;
};

const insertMockData = async () => {
    try {
        const mockUsers = generateMockUsers(10);
        const insertedUsers = await User.insertMany(mockUsers);

        const userIds = insertedUsers.map(user => user._id);

        const mockPosts = generateMockPosts(20, userIds);
        await Posts.insertMany(mockPosts);

        console.log("Mock data inserted successfully");
    } catch (error) {
        console.error("Error inserting mock data:", error);
    } finally {
        mongoose.connection.close();
    }
};