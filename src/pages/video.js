// src/app/pages/Video.js
export default function Video() {
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-center mb-6">Video</h1>
        <div className="flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/results?search_query=weather+update+today"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }
  