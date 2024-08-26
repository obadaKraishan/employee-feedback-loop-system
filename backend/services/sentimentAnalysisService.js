const Sentiment = require('sentiment');

const sentiment = new Sentiment();

// @desc    Analyze sentiment of the feedback message
// @param   message: string
// @return  sentiment: string ("positive", "negative", "neutral")
const analyzeSentiment = (message) => {
  const result = sentiment.analyze(message);
  const sentimentScore = result.score;

  if (sentimentScore > 0) {
    return 'positive';
  } else if (sentimentScore < 0) {
    return 'negative';
  } else {
    return 'neutral';
  }
};

module.exports = {
  analyzeSentiment,
};
