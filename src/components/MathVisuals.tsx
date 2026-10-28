import React from 'react';
import {
  CoordinateDiagramConfig,
  LinearProgrammingDiagramConfig,
  NumberLineDiagramConfig,
  SurveyingDiagramConfig,
} from '../types/exam';

export const CoordinateRegionDiagram: React.FC<{
  config: CoordinateDiagramConfig;
}> = ({ config }) => {
  const { xIntercept, yIntercept, lineLabel } = config;
  // SVG coordinate mapping: origin O at (80, 175)
  // Scale: 1 unit = 32px
  const originX = 80;
  const originY = 175;
  const scale = 32;

  const ptX = originX + xIntercept * scale;
  const ptY = originY - yIntercept * scale;

  // Extended line endpoints
  // Line through (0, yIntercept) and (xIntercept, 0): y = yIntercept * (1 - x/xIntercept)
  const xStart = -0.8;
  const yStart = yIntercept * (1 - xStart / xIntercept);
  const xEnd = xIntercept + 1.1;
  const yEnd = yIntercept * (1 - xEnd / xIntercept);

  const lineX1 = originX + xStart * scale;
  const lineY1 = originY - yStart * scale;
  const lineX2 = originX + xEnd * scale;
  const lineY2 = originY - yEnd * scale;

  const patternId = `hatch-${xIntercept}-${yIntercept}`;

  return (
    <figure className="my-4 flex flex-col items-center bg-slate-50/80 border border-slate-200 rounded-lg p-4">
      <svg
        viewBox="0 0 300 230"
        className="w-full max-w-[320px] h-auto select-none"
        role="img"
        aria-label={config.caption}
      >
        <defs>
          <pattern
            id={patternId}
            width="6"
            height="6"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="#0284C7"
              strokeWidth="1.6"
              strokeOpacity="0.65"
            />
          </pattern>
        </defs>

        {/* Grid lines */}
        {[1, 2, 3, 4, 5].map((u) => (
          <React.Fragment key={u}>
            <line
              x1={originX + u * scale}
              y1={20}
              x2={originX + u * scale}
              y2={205}
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line
              x1={35}
              y1={originY - u * scale}
              x2={265}
              y2={originY - u * scale}
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </React.Fragment>
        ))}

        {/* Shaded / Hatched Triangle Region */}
        <polygon
          points={`${originX},${originY} ${ptX},${originY} ${originX},${ptY}`}
          fill="rgba(2, 132, 199, 0.14)"
        />
        <polygon
          points={`${originX},${originY} ${ptX},${originY} ${originX},${ptY}`}
          fill={`url(#${patternId})`}
          stroke="#0284C7"
          strokeWidth="1.5"
        />

        {/* Coordinate Axes Ox and Oy */}
        <line
          x1="30"
          y1={originY}
          x2="270"
          y2={originY}
          stroke="#0F172A"
          strokeWidth="1.8"
        />
        <polygon
          points={`272,${originY} 264,${originY - 4} 264,${originY + 4}`}
          fill="#0F172A"
        />
        <text
          x="265"
          y={originY + 16}
          className="text-xs font-math italic fill-slate-900 font-semibold"
        >
          x
        </text>

        <line
          x1={originX}
          y1="210"
          x2={originX}
          y2="18"
          stroke="#0F172A"
          strokeWidth="1.8"
        />
        <polygon
          points={`${originX},15 ${originX - 4},23 ${originX + 4},23`}
          fill="#0F172A"
        />
        <text
          x={originX - 16}
          y="26"
          className="text-xs font-math italic fill-slate-900 font-semibold"
        >
          y
        </text>

        {/* Line d */}
        <line
          x1={lineX1}
          y1={lineY1}
          x2={lineX2}
          y2={lineY2}
          stroke="#0F172A"
          strokeWidth="1.8"
        />
        <text
          x={lineX2 - 4}
          y={Math.min(lineY2 + 14, 218)}
          className="text-xs font-math italic fill-slate-900 font-semibold"
        >
          {lineLabel}
        </text>

        {/* Origin O and Intercept Labels */}
        <text
          x={originX - 15}
          y={originY + 15}
          className="text-xs font-semibold fill-slate-800"
        >
          O
        </text>
        <circle cx={ptX} cy={originY} r="3" fill="#0F172A" />
        <text
          x={ptX - 4}
          y={originY + 16}
          className="text-xs font-mono-tabular font-semibold fill-slate-900"
        >
          {xIntercept}
        </text>
        <circle cx={originX} cy={ptY} r="3" fill="#0F172A" />
        <text
          x={originX - 16}
          y={ptY + 4}
          className="text-xs font-mono-tabular font-semibold fill-slate-900"
        >
          {yIntercept}
        </text>
      </svg>
      <figcaption className="text-xs text-slate-600 mt-1 text-center">
        Hình biểu diễn miền nghiệm (phần gạch chéo kể cả biên) trên mặt phẳng Oxy
      </figcaption>
    </figure>
  );
};

export const NumberLineDiagram: React.FC<{
  config: NumberLineDiagramConfig;
  showResult?: boolean;
}> = ({ config, showResult = false }) => {
  // Range on number line: -4 to 7
  const minVal = -4;
  const maxVal = 7;
  const toX = (val: number) => 115 + ((val - minVal) / (maxVal - minVal)) * 350;
  const ticks = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  const renderAxis = (
    y: number,
    label: string,
    start: number,
    end: number,
    leftBracket: '(' | '[',
    rightBracket: ')' | ']',
    color: string
  ) => {
    const x1 = toX(start);
    const x2 = toX(end);
    return (
      <g key={label}>
        <text
          x="12"
          y={y + 4}
          className="text-xs font-mono-tabular font-semibold fill-slate-800"
        >
          {label}
        </text>
        {/* Base line */}
        <line x1="105" y1={y} x2="475" y2={y} stroke="#CBD5E1" strokeWidth="2" />
        <polygon points={`480,${y} 472,${y - 4} 472,${y + 4}`} fill="#64748B" />
        {/* Subtle integer ticks */}
        {ticks.map((t) => {
          const tx = toX(t);
          return (
            <line
              key={t}
              x1={tx}
              y1={y - 3}
              x2={tx}
              y2={y + 3}
              stroke="#94A3B8"
              strokeWidth="1"
            />
          );
        })}
        {/* Highlighted interval */}
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="4.5" />
        {/* Left bracket */}
        <text
          x={x1 - 4}
          y={y + 5}
          className="text-base font-mono-tabular font-bold"
          fill={color}
        >
          {leftBracket}
        </text>
        <text
          x={x1 - 5}
          y={y + 19}
          className="text-xs font-mono-tabular font-bold fill-slate-900"
        >
          {start}
        </text>
        {/* Right bracket */}
        <text
          x={x2 - 4}
          y={y + 5}
          className="text-base font-mono-tabular font-bold"
          fill={color}
        >
          {rightBracket}
        </text>
        <text
          x={x2 - 4}
          y={y + 19}
          className="text-xs font-mono-tabular font-bold fill-slate-900"
        >
          {end}
        </text>
      </g>
    );
  };

  const interStart = Math.max(config.setAStart, config.setBStart);
  const interEnd = Math.min(config.setAEnd, config.setBEnd);
  const unionStart = Math.min(config.setAStart, config.setBStart);
  const unionEnd = Math.max(config.setAEnd, config.setBEnd);

  return (
    <figure className="my-3 bg-slate-50/90 border border-slate-200 rounded-lg p-4">
      <svg
        viewBox={showResult ? '0 0 500 205' : '0 0 500 110'}
        className="w-full max-w-[560px] mx-auto h-auto select-none"
        role="img"
        aria-label="Biểu diễn tập hợp A và B trên trục số thực"
      >
        {renderAxis(
          28,
          config.setALabel,
          config.setAStart,
          config.setAEnd,
          config.setALeftBracket,
          config.setARightBracket,
          '#0284C7'
        )}
        {renderAxis(
          78,
          config.setBLabel,
          config.setBStart,
          config.setBEnd,
          config.setBLeftBracket,
          config.setBRightBracket,
          '#059669'
        )}
        {showResult && (
          <>
            {renderAxis(
              130,
              config.intersectionText,
              interStart,
              interEnd,
              '[',
              ')',
              '#D97706'
            )}
            {renderAxis(
              180,
              config.unionText,
              unionStart,
              unionEnd,
              '(',
              ')',
              '#7C3AED'
            )}
          </>
        )}
      </svg>
      <figcaption className="text-xs text-slate-600 text-center mt-1">
        {showResult
          ? 'Biểu diễn trực quan tập hợp A, B, giao A ∩ B và hợp A ∪ B trên trục số ℝ'
          : 'Biểu diễn hai tập hợp A và B trên trục số thực ℝ'}
      </figcaption>
    </figure>
  );
};

export const LinearProgrammingDiagram: React.FC<{
  config: LinearProgrammingDiagramConfig;
}> = ({ config }) => {
  const maxCoord = Math.max(
    ...config.vertices.map((v) => Math.max(v.x, v.y)),
    6
  );
  const originX = 55;
  const originY = 185;
  const scale = 135 / maxCoord;

  const toSvg = (x: number, y: number) => ({
    cx: originX + x * scale,
    cy: originY - y * scale,
  });

  const polyPoints = config.vertices
    .map((v) => {
      const p = toSvg(v.x, v.y);
      return `${p.cx},${p.cy}`;
    })
    .join(' ');

  return (
    <figure className="my-3 bg-slate-50/90 border border-slate-200 rounded-lg p-4">
      <svg
        viewBox="0 0 320 225"
        className="w-full max-w-[350px] mx-auto h-auto select-none"
        role="img"
        aria-label="Miền nghiệm đa giác OABC của bài toán tối ưu"
      >
        {/* Polygon feasible region */}
        <polygon
          points={polyPoints}
          fill="rgba(5, 150, 105, 0.14)"
          stroke="#059669"
          strokeWidth="2"
        />

        {/* Axes */}
        <line
          x1="30"
          y1={originY}
          x2="280"
          y2={originY}
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <polygon
          points={`284,${originY} 276,${originY - 4} 276,${originY + 4}`}
          fill="#0F172A"
        />
        <text x="272" y={originY + 15} className="text-xs font-math italic fill-slate-900">
          x
        </text>

        <line
          x1={originX}
          y1="205"
          x2={originX}
          y2="20"
          stroke="#0F172A"
          strokeWidth="1.6"
        />
        <polygon
          points={`${originX},16 ${originX - 4},24 ${originX + 4},24`}
          fill="#0F172A"
        />
        <text x={originX - 15} y="26" className="text-xs font-math italic fill-slate-900">
          y
        </text>

        {/* Vertices */}
        {config.vertices.map((v) => {
          const { cx, cy } = toSvg(v.x, v.y);
          const isOpt = v.label === config.optimalVertex;
          return (
            <g key={v.label}>
              <circle
                cx={cx}
                cy={cy}
                r={isOpt ? 4.5 : 3.5}
                fill={isOpt ? '#0284C7' : '#0F172A'}
              />
              <text
                x={cx + (v.x === 0 && v.y === 0 ? -28 : 6)}
                y={cy + (v.y === 0 ? 15 : -6)}
                className={`text-xs font-mono-tabular ${
                  isOpt ? 'font-bold fill-sky-700' : 'font-medium fill-slate-800'
                }`}
              >
                {v.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="text-xs text-slate-600 text-center mt-1">
        Miền nghiệm tứ giác OABC (Đỉnh tối ưu: {config.optimalVertex})
      </figcaption>
    </figure>
  );
};

export const SurveyingTowerDiagram: React.FC<{
  config: SurveyingDiagramConfig;
}> = ({ config }) => {
  // Matches the diagram on page 3 of the reference PDF:
  // Tower C (bottom-left) to D (top-left), height h
  // Ground line C --- A --- B
  const cX = 75;
  const cY = 175;
  const dX = 75;
  const dY = 32;
  const aX = 185;
  const aY = 175;
  const bX = 285;
  const bY = 175;

  return (
    <figure className="my-3 bg-slate-50/90 border border-slate-200 rounded-lg p-4">
      <svg
        viewBox="0 0 350 210"
        className="w-full max-w-[380px] mx-auto h-auto select-none"
        role="img"
        aria-label={`Hình minh họa đo chiều cao ${config.objectName} CD = h từ hai điểm A và B`}
      >
        {/* Ground line */}
        <line
          x1="35"
          y1={cY}
          x2="320"
          y2={cY}
          stroke="#0F172A"
          strokeWidth="1.8"
        />

        {/* Height dimension arrow on left */}
        <line
          x1="45"
          y1={dY}
          x2="45"
          y2={cY}
          stroke="#475569"
          strokeWidth="1.2"
          strokeDasharray="3 2"
        />
        <line x1="39" y1={dY} x2="51" y2={dY} stroke="#475569" strokeWidth="1.2" />
        <line x1="39" y1={cY} x2="51" y2={cY} stroke="#475569" strokeWidth="1.2" />
        <text
          x="32"
          y={(dY + cY) / 2 + 4}
          className="text-xs font-math italic font-semibold fill-slate-800"
        >
          h
        </text>

        {/* Architectural Tower silhouette CD */}
        <polygon
          points={`${cX - 12},${cY} ${cX + 12},${cY} ${dX + 5},${dY + 18} ${dX - 5},${dY + 18}`}
          fill="#CBD5E1"
          stroke="#334155"
          strokeWidth="1.4"
        />
        <rect
          x={dX - 6}
          y={dY + 10}
          width="12"
          height="8"
          fill="#94A3B8"
          stroke="#334155"
          strokeWidth="1.2"
        />
        <polygon
          points={`${dX - 7},${dY + 10} ${dX + 7},${dY + 10} ${dX},${dY}`}
          fill="#475569"
        />
        {/* Vertical centerline CD */}
        <line
          x1={cX}
          y1={cY}
          x2={dX}
          y2={dY}
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />

        {/* Sightlines DA and DB */}
        <line
          x1={dX}
          y1={dY}
          x2={aX}
          y2={aY}
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <line
          x1={dX}
          y1={dY}
          x2={bX}
          y2={bY}
          stroke="#0F172A"
          strokeWidth="1.5"
        />

        {/* Angle arc at A */}
        <path
          d={`M ${aX - 24} ${aY} A 24 24 0 0 1 ${aX - 15} ${aY - 19}`}
          fill="none"
          stroke="#0284C7"
          strokeWidth="1.5"
        />
        <text
          x={aX - 64}
          y={aY - 6}
          className="text-xs font-mono-tabular font-semibold fill-sky-800"
        >
          α={config.angleNearDeg}°
        </text>

        {/* Angle arc at B */}
        <path
          d={`M ${bX - 28} ${bY} A 28 28 0 0 1 ${bX - 20} ${bY - 19}`}
          fill="none"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text
          x={bX - 66}
          y={bY - 6}
          className="text-xs font-mono-tabular font-semibold fill-emerald-800"
        >
          β={config.angleFarDeg}°
        </text>

        {/* Distance AB label */}
        <text
          x={(aX + bX) / 2 - 14}
          y={aY + 16}
          className="text-xs font-mono-tabular font-semibold fill-slate-800"
        >
          {config.distanceAB} m
        </text>

        {/* Vertex Labels D, C, A, B */}
        <circle cx={dX} cy={dY} r="3" fill="#0F172A" />
        <text x={dX - 4} y={dY - 6} className="text-xs font-bold fill-slate-900">
          {config.topPoint}
        </text>
        <text x={cX - 4} y={cY + 16} className="text-xs font-bold fill-slate-900">
          {config.footPoint}
        </text>
        <circle cx={aX} cy={aY} r="3" fill="#0F172A" />
        <text x={aX - 4} y={aY + 16} className="text-xs font-bold fill-slate-900">
          {config.nearPoint}
        </text>
        <circle cx={bX} cy={bY} r="3" fill="#0F172A" />
        <text x={bX - 4} y={bY + 16} className="text-xs font-bold fill-slate-900">
          {config.farPoint}
        </text>
      </svg>
      <figcaption className="text-xs text-slate-600 text-center mt-1">
        Sơ đồ ngắm đo chiều cao {config.objectName} CD = h từ hai điểm A, B thẳng hàng với chân C
      </figcaption>
    </figure>
  );
};
