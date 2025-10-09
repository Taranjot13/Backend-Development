const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running successfully!',
        endpoints: {
            users: {
                'POST /api/users': 'Create a new user',
                'GET /api/users': 'Get all users',
                'GET /api/users/:email': 'Get user by email',
                'PUT /api/users/:id': 'Update user by ID',
                'DELETE /api/users/:id': 'Delete user by ID'
            },
            tweets: {
                'POST /api/tweets': 'Create a new tweet',
                'GET /api/tweets': 'Get all tweets',
                'PUT /api/tweets/:id': 'Update tweet by ID',
                'DELETE /api/tweets/:id': 'Delete tweet by ID'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} for API documentation`);
});
    let tweet= await prisma.tweet.findFirst({
        where:{
            id:Number(id),
            userId:Number(userId)
        }
    })
    if(!tweet){
        return "something went wrong"
    }

    await prisma.tweet.update({
        where:{
            id:Number(id)
        },
        data:{
            body:updatedBody
        }
    })
    return "tweet updated"

// updateTweet("1","1","update my tweet")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))

async function deleteUser(id){
    await prisma.user.delete({
        where:{
            id:Number(id)
        }
    })
    return "user deleted"
    
}
deleteUser("1")
.then((data)=>console.log(data))


async function readTweets(){
    // select,includes
    // read all tweets
    let alltweets= await prisma.tweet.findMany({
        // select:{
        //     user:{
        //         select:{
        //             name:true
        //     }
        // },
        // body:true,
        // date:true
        include:{
            user:{
                select:{
                    name:true
            }
        }
    }
    })
    return alltweets;
}
readTweets()

// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))