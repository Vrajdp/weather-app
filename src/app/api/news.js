const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNewsData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status !== 'ok') {
    throw new Error(data.message || 'Failed to fetch news data');
  }

  return data.articles;
};
