import React, { useState } from 'react';
import styles from './Tokenomics.module.scss';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

interface ILabel {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const Tokenomics = () => {
  const data = [
    { name: 'Presale #1', value: 12 },
    { name: 'Presale#2', value: 18 },
    { name: 'Liquidity', value: 15 },
    { name: 'Marketing', value: 15 },
    { name: 'Development', value: 11.5 },
    { name: 'Team', value: 12 },
    { name: 'Reserve', value: 6.5 },
    { name: 'Treasury', value: 10 },
  ];

  const RADIAN = Math.PI / 180;
  const values = [
    'Presale #1',
    'Presale#2',
    'Liquidity',
    'Marketing',
    'Development',
    'Team',
    'Reserve',
    'Treasury',
  ];

  const colors = [
    'url(#presale1)',
    'url(#presale2)',
    'url(#liquidity)',
    'url(#marketing)',
    'url(#development)',
    'url(#team)',
    'url(#reserve)',
    'url(#treasury)',
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: ILabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.9;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        <tspan x={x} y={y - 5} fill="white">
          {values[index]}
        </tspan>
        <br />
        <tspan x={x} y={y + 16} fill="url(#font)" fontSize="28px">{`${percent * 100}%`}</tspan>
      </text>
    );
  };

  return (
    <div className={styles.chart} style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer>
        <PieChart>
          <defs>
            <linearGradient id="presale1" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#4646F6" />
              <stop offset="100%" stopColor="#584AEF" />
            </linearGradient>
            <linearGradient id="presale2" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#584AEF" />
              <stop offset="100%" stopColor="#674CEA" />
            </linearGradient>
            <linearGradient id="liquidity" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#674CEA" />
              <stop offset="100%" stopColor="#7A50E2" />
            </linearGradient>
            <linearGradient id="marketing" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#7A50E2" />
              <stop offset="100%" stopColor="#9655D8" />
            </linearGradient>
            <linearGradient id="development" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#9655D8" />
              <stop offset="100%" stopColor="#CA60C4" />
            </linearGradient>
            <linearGradient id="team" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#CA60C4" />
              <stop offset="100%" stopColor="#AF5ACF" />
            </linearGradient>
            <linearGradient id="reserve" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#AF5ACF" />
              <stop offset="100%" stopColor="#E064BC" />
            </linearGradient>
            <linearGradient id="treasury" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#E064BC" />
              <stop offset="100%" stopColor="#FB69B2" />
            </linearGradient>

            <linearGradient id="font" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#FB69B2" />
              <stop offset="100%" stopColor="#4646F6" />
            </linearGradient>
          </defs>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            label={renderCustomizedLabel}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Tokenomics;
