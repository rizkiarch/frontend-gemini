// require('dotenv').config();
import { useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const API_BACKEND_URL = "http://localhost:3000"
  const generateResponse = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BACKEND_URL}/api/generate`,{prompt})
      console.log(res)
      const data = res.data
      setResponse(data.text)
    } catch (error) {
      console.error("Error:", error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">CV Review Assistant</h1>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Paste your CV/Resume content here:
        </label>
        <textarea
          className="w-full p-4 border rounded-lg mb-4 min-h-[300px] font-mono text-sm"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste your CV content here for review..."
          rows="12"
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          onClick={generateResponse}
          disabled={loading}
        >
          {loading ? 'Analyzing CV...' : 'Get CV Review'}
        </button>
      </div>
      
      {response && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">CV Review Feedback:</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {response}
            </pre>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default App
