import { useState } from 'react';
import Statistics from './Feedback/Statistics';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Section from './Feedback/Section';
import Notification from './Feedback/Notification';
import { Box } from './Box';
import { GlobalStyle } from './GlobalStyle';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = type => {
    switch (type) {
      case 'good':
        return setGood(good + 1);
      case 'bad':
        return setBad(bad + 1);
      case 'neutral':
        return setNeutral(neutral + 1);
      default:
        throw new Error('Unexpected value of option');
    }
  };

  const countTotalFeedback = () => {
    const values = Object.values([good, bad, neutral]);
    return values.reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = (total, good) => {
    const percentage = Math.round((good / total) * 100);
    return percentage;
  };

  const options = ['good', 'neutral', 'bad'];
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage(total, good);

  return (
    <>
      <Section title="Please leave feedback">
        <Box display="flex" gridGap="10px">
          <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
        </Box>
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
      <GlobalStyle />
    </>
  );
};

export default App;