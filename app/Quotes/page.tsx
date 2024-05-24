'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

// export interface myQuotes {

// }

export default function Quotes() {
  const [quote, setQuote] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  // https://github.com/lukePeavey/quotable
  const getQuotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://api.quotable.io/random');
      const quote = response.data;
      if (quote) setQuote(quote);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getQuotes();
  }, []);

  if (isLoading) return <div>loading....</div>;
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="card w-1/2 bg-white shadow-xl">
          <div className="card-body">
            <p className="card-title justify-center items-center text-center mb-5 text-sm md:text-3xl text-black">{`"${quote.content}"`}</p>
            <p className="justify-center items-center text-center text-sm md:text-xl">{`-${quote.author}-`}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => {
                  getQuotes();
                }}
                className="btn btn-md mt-2"
              >
                new quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
