const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Feedback = require('./models/Feedback');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateSentimentScores = async () => {
  try {
    const feedbacks = await Feedback.find({});
    
    for (let feedback of feedbacks) {
      // If the sentiment is already a string, skip this feedback
      if (typeof feedback.sentiment === 'string') continue;
      
      let sentiment;
      if (feedback.sentimentScore > 0) {
        sentiment = 'positive';
      } else if (feedback.sentimentScore < 0) {
        sentiment = 'negative';
      } else {
        sentiment = 'neutral';
      }
      
      feedback.sentiment = sentiment;
      // Save only the sentiment field, leave sentimentScore as it is for reference if needed
      await feedback.save();
    }
    
    console.log('Sentiment scores updated successfully');
    process.exit();
  } catch (error) {
    console.error('Error updating sentiment scores:', error);
    process.exit(1);
  }
};

updateSentimentScores();
