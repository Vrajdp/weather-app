// src/app/pages/Maps.js

export default function maps() {
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-center mb-6">Maps</h1>
        <iframe
          title="OpenStreetMap"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7560577392578125%2C55.93129118077088%2C-3.7191925048828125%2C55.95138052725988&amp;layer=mapnik"
          style={{ width: '100%', height: '500px', border: '1px solid black' }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  }
  