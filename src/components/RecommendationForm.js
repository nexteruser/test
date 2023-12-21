// src/components/RecommendationForm.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRecommendations } from '../services/apiService';
import { useSettings } from '../context/SettingsContext';
import ErrorComponent from './ErrorComponent';
import RecommendationCard from './RecommendationCard';
import { IoSettingsOutline } from "react-icons/io5";

const RecommendationForm = ({ onSettingsClick }) => {

  const { openaiApiKey } = useSettings();

  const [query, setQuery] = useState("");
  const [recommendationCount, setRecommendationCount] = useState(1);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateRecommendations = async () => {
    if (!query) {
      toast.error("Please enter a movie or series of interest.");
      return;
    }

    setLoading(true);
    try {
      const generatedRecommendations = await fetchRecommendations(query, recommendationCount, openaiApiKey);
      setRecommendations(generatedRecommendations.filter(rec => rec.trim() !== ''));
      toast.success("Recommendations successfully generated!");
    } catch (err) {
      setError(err.toString());
      toast.error(`Error: ${err.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="form-container">
        {/* Título e ícone de configurações */}
        <h1>Movie & Series Recommender</h1>
        <div className="settings" onClick={onSettingsClick}>
        <IoSettingsOutline />
      </div>

        {/* Entrada para a consulta */}
        <div className="input-group">
          <label htmlFor="fav">Write any other specifications here. Be as picky as you'd like.</label>
          <input
            type="text"
            id="fav"
            placeholder="Tell us more about..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>

        {/* Seleção para o número de recomendações */}
        <div className="input-group">
          <label htmlFor="num">Number of recommendations (up to 10):</label>
          <select
            id="num"
            value={recommendationCount}
            onChange={(e) => setRecommendationCount(Number(e.target.value))}
            required
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
        </div>

        {/* Botão para gerar recomendações */}
        <button 
          onClick={handleGenerateRecommendations} 
          className={loading ? 'active' : ''}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate Recommendations'}
        </button>

        {/* Lista de recomendações */}
        {recommendations.length > 0 && (
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <RecommendationCard key={index} recommendation={rec} />
            ))}
          </div>
        )}

        {/* Exibir erro, se houver */}
        {error && <ErrorComponent message={error} />}
      </div>
    </>
  );
};

export default RecommendationForm;
