// src/app/pages/News.js
import { useState, useEffect } from 'react';

export default function news() {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '309e4a13919449779f6b4494fd8cae33';  // Use your API key
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNewsArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsArticles.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold">{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
