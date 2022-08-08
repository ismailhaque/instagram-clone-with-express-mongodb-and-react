import mongoose from 'mongoose';

// mongodb conection

const mongoDBconnect = async () => {

    try {

        const connection = await mongoose.connect(`mongodb+srv://admin:ismailhaque2956@cluster1.dmq14.mongodb.net/instagram?retryWrites=true&w=majority`);
        console.log('MongoDB connection successfully'.bgGreen.black);
        
    } catch (error) {
        console.log(`${error}`.bgRed.black);
    }

}

export default mongoDBconnect;