// src/components/RecommendationCard.js
import React from 'react';

const RecommendationCard = React.memo(({ recommendation }) => {
  // Separar o título, ano e descrição da recomendação
  const [titleWithYear, description] = recommendation.split(":");
  const [title, yearPart] = titleWithYear.split("(");

  // Extrair o ano, se estiver disponível
  const year = yearPart ? yearPart.replace(")", "").trim() : "";

  return (
    <div className="recommendation-card">
      {/* Exibir título e ano (se disponível) */}
      <h3>{title.trim()} {year && `(${year})`}</h3>
      {/* Exibir descrição */}
      <p>{description.trim()}</p>
    </div>
  );
});

export default RecommendationCard;
