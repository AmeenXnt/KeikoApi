const express = require('express');
const axios = require('axios');
const app = express();

// Function to extract the video URL from the Instagram page
const extractVideoUrl = async (instagramUrl) => {
    try {
        const response = await axios.get(instagramUrl);
        if (response.status !== 200) {
            return null;
        }

        const videoUrl = response.data.match(/"video_url":"(.*?)"/);
        if (videoUrl) {
            return videoUrl[1].replace(/\\u0026/g, '&');
        }
        
        return null;
    } catch (error) {
        console.error("Error extracting video URL:", error);
        return null;
    }
};

// API endpoint to download Instagram Reels
app.get('/AmeenInt/dl/insta', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Please provide a valid Instagram URL.' });
    }

    const videoUrl = await extractVideoUrl(url);
    
    if (videoUrl) {
        res.json({ media: [videoUrl] });
    } else {
        res.status(400).json({ error: 'Failed to retrieve video from the provided URL.' });
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
          
