import React, { useState } from 'react';
import axios from 'axios';

const AITextBox: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/chat/fetch-coin',
        { prompt: inputText },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('🚀 ~ handleSubmit ~ response:', response);

      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult('Failed to get response from AI backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white mx-auto shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            AI Prompt Input
          </h3>
          <div>
            <label
              htmlFor="prompt"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Enter your prompt
            </label>
            <textarea
              name="prompt"
              id="prompt"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your prompt here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
              rows={5} // Adjust the number of rows as needed
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
          {result && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                AI Response
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{result}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AITextBox;
