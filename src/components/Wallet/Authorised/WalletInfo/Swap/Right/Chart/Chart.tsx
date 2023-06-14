import { LineChart, Line } from 'recharts';
import useResize from '../../../../../../../hooks/use-resize';

export default function Chart() {
  const width = useResize();
  const height = 210;

  return (
    <LineChart width={width > 540 ? 375 : 252} height={width > 540 ? 210 : 165}>
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
