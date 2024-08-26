const Sentiment = require('sentiment');

const sentiment = new Sentiment();

// @desc    Analyze sentiment of the feedback message
// @param   message: string
// @return  sentimentScore: number
const analyzeSentiment = (message) => {
  const result = sentiment.analyze(message);
  return result.score;
};

module.exports = {
  analyzeSentiment,
};
