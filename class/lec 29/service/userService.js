const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {
    async addUser(email, name) {
        try {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name
                }
            });
            return { success: true, data: newUser, message: "User added successfully" };
        } catch (error) {
            throw new Error(`Failed to add user: ${error.message}`);
        }
    }

    async getUser(email) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                include: {
                    tweets: true
                }
            });
            return user;
        } catch (error) {
            throw new Error(`Failed to get user: ${error.message}`);
        }
    }

    async getAllUsers() {
        try {
            const users = await prisma.user.findMany({
                include: {
                    tweets: true
                }
            });
            return users;
        } catch (error) {
            throw new Error(`Failed to get users: ${error.message}`);
        }
    }

    async updateUser(id, email, name) {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    email: email,
                    name: name
                }
            });
            return { success: true, data: updatedUser, message: "User updated successfully" };
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            });
            return { success: true, message: "User deleted successfully" };
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }

    async addTweet(userId, body) {
        try {
            const newTweet = await prisma.tweet.create({
                data: {
                    userId: Number(userId),
                    body: body
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            return { success: true, data: newTweet, message: "Tweet added successfully" };
        } catch (error) {
            throw new Error(`Failed to add tweet: ${error.message}`);
        }
    }

    async updateTweet(id, userId, updatedBody) {
        try {
            const tweet = await prisma.tweet.findFirst({
                where: {
                    id: Number(id),
                    userId: Number(userId)
                }
            });
            
            if (!tweet) {
                throw new Error("Tweet not found or you don't have permission to update it");
            }

            const updatedTweet = await prisma.tweet.update({
                where: {
                    id: Number(id)
                },
                data: {
                    body: updatedBody
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            return { success: true, data: updatedTweet, message: "Tweet updated successfully" };
        } catch (error) {
            throw new Error(`Failed to update tweet: ${error.message}`);
        }
    }

    async getAllTweets() {
        try {
            const allTweets = await prisma.tweet.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            });
            return allTweets;
        } catch (error) {
            throw new Error(`Failed to get tweets: ${error.message}`);
        }
    }

    async deleteTweet(id, userId) {
        try {
            const tweet = await prisma.tweet.findFirst({
                where: {
                    id: Number(id),
                    userId: Number(userId)
                }
            });
            
            if (!tweet) {
                throw new Error("Tweet not found or you don't have permission to delete it");
            }

            await prisma.tweet.delete({
                where: {
                    id: Number(id)
                }
            });
            return { success: true, message: "Tweet deleted successfully" };
        } catch (error) {
            throw new Error(`Failed to delete tweet: ${error.message}`);
        }
    }
}

module.exports = new UserService();