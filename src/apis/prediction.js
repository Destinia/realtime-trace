import { fetchAPI } from './client';

export const createPrediction = timeInfo =>
  fetchAPI('/prediction', {
    method: 'POST',
    body: JSON.stringify(timeInfo),
  });
