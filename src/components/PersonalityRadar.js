import React from "react";

const dimensions = [
  "conscientiousness",
  "teamwork",
  "openness",
  "resilience",
  "communication",
];

const PersonalityRadar = ({ traits }) => {
  const values = dimensions.map((d) => traits?.[d] ?? 0);
  const size = 220;
  const center = size / 2;
  const radius = 80;

  const angleForIndex = (i) => (2 * Math.PI * i) / dimensions.length;

  const points = values.map((v, i) => {
    const angle = angleForIndex(i) - Math.PI / 2;
    const r = radius * v;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  });

  const gridCircles = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} role="img" aria-label="Personality radar">
      <g>
        {gridCircles.map((f) => (
          <circle
            key={f}
            cx={center}
            cy={center}
            r={radius * f}
            fill="none"
            stroke="rgba(31,59,77,0.2)"
            strokeWidth="1"
          />
        ))}
        {dimensions.map((_, i) => {
          const angle = angleForIndex(i) - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(31,59,77,0.2)"
              strokeWidth="1"
            />
          );
        })}
        <polygon
          points={points.join(" ")}
          fill="rgba(200,169,81,0.3)"
          stroke="#C8A951"
          strokeWidth="2"
        />
        {dimensions.map((name, i) => {
          const angle = angleForIndex(i) - Math.PI / 2;
          const x = center + (radius + 18) * Math.cos(angle);
          const y = center + (radius + 18) * Math.sin(angle);
          return (
            <text
              key={name}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="9"
              fill="#1F3B4D"
            >
              {name.charAt(0).toUpperCase() + name.slice(1, 3)}
            </text>
          );
        })}
      </g>
    </svg>
  );
};

export default PersonalityRadar;
