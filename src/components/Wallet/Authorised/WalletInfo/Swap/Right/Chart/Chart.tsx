import { LineChart, Line } from 'recharts';

export default function Chart() {
  return (
    <LineChart width={375} height={210}>
      <Line
        dataKey="value"
        stroke="#B35BCE"
        data={[
          { category: 'A', value: 0.11 },
          { category: 'B', value: 0.29 },
          { category: 'C', value: 0.35 },
          { category: 'D', value: 0.56 },
          { category: 'E', value: 0.78 },
          { category: 'F', value: 0.8 },
          { category: 'G', value: 0.98 },
        ]}
      />
    </LineChart>
  );
}
