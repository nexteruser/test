// src/services/apiService.js
import axios from 'axios';
import { OPENAI_API_URL } from '../utils/constants';

export const fetchRecommendations = async (query, recommendationCount, apiKey) => {
  try {
    const payload = {
      model: "text-davinci-003",
      prompt: `Generate a list of up to ${recommendationCount} movies that align with the interest in ${query}. Provide each movie with a number in sequence, such as "1.", "2.", and so on. For each movie, include a brief description and its release year in this format: [#. Movie Title (Release Year): Brief Description]`,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 500,
      n: 1,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const response = await axios.post(OPENAI_API_URL, payload, { headers });

    if (response.status === 200 && response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.split('\n').filter(choice => choice.trim() !== '');
    } else {
      throw new Error("Failed to fetch recommendations from OpenAI.");
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Failed to fetch recommendations. Please try again later.");
  }
};
