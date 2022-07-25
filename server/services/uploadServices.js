const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadServices = async file => {
    try {
        const uploadFiles = await cloudinary.uploader.upload(
            file.tempFilePath,
            {
                folder: 'post/id',
                resource_type: 'auto',
                chunk_size: 6000000,
                eager: [
                    { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
                    { width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec:'none'}
                ],
                eager_async: true,
            },
            (err, resuilt) => {
                if (err) throw err;
                removeTempt(file.tempFilePath);
            },
        );

        return {
            public_id: uploadFiles.public_id,
            url: uploadFiles.url
        }
    } catch (error) {
        return {
            status: 500,
            msg: err.message,
        };
    }
};

const removeTempt = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

module.exports = uploadServices;
