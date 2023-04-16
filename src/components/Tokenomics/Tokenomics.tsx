import React, { useState } from 'react';
import styles from './Tokenomics.module.scss';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
  const [index, setIndex] = useState(0);
  const data = [
    { name: 'Token Sale', value: 35 },
    { name: 'Liquidity', value: 25 },
    { name: 'Marketing', value: 10 },
    { name: 'Team', value: 10 },
    { name: 'Development', value: 12.5 },
    { name: 'Treasury', value: 7.5 },
  ];

  const RADIAN = Math.PI / 180;
  const values = ['Token Sale', 'Liquidity', 'Marketing', 'Team', 'Development', 'Treasury'];

  const colors = [
    'url(#tokenSale)',
    'url(#liquidity)',
    'url(#marketing)',
    'url(#team)',
    'url(#development)',
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
        <tspan x={x} y={y-5} fill="white">{values[index]}</tspan><br />
        <tspan x={x} y={y+16} fill='url(#font)' font-size="28px">{`${percent*100}%`}</tspan>
      </text>
    );
  };

  return (
    <div style={{ width: 320, height: 324 }}>
    <ResponsiveContainer>
    <PieChart>
      <defs>
        <linearGradient id="tokenSale" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FB69B2" />
          <stop offset="100%" stopColor="#BC5DCA" />
        </linearGradient>
        <linearGradient id="liquidity" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#BC5DCA" />
          <stop offset="100%" stopColor="#8E54DB" />
        </linearGradient>
        <linearGradient id="marketing" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8E54DB" />
          <stop offset="100%" stopColor="#7C51E2" />
        </linearGradient>
        <linearGradient id="team" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C51E2" />
          <stop offset="100%" stopColor="#6A4DE8" />
        </linearGradient>
        <linearGradient id="development" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#6A4DE8" />
          <stop offset="100%" stopColor="#5348F1" />
        </linearGradient>
        <linearGradient id="treasury" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#5348F1" />
          <stop offset="100%" stopColor="#4646F6" />
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
