import React from 'react';
import { Pie, PieChart, Cell } from 'recharts';

class CustomPieChart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      data,
      dataKey,
      nameKey,
      cx,
      cy,
      width,
      height,
      innerRadius,
      outerRadius } = this.props;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    return (
      <React.Fragment>
        <PieChart
          width={width}
          height={height}
        >
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            animationDuration={300}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index, value }) => {
              const radius = outerRadius + 30;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text x={x} y={y}>
                  {data[index][nameKey]} : {value}
                </text>
              );
            }}
          >
            {
              data.map((entry, index) => {
                return <Cell fill={COLORS[index]} key={entry} />
              })
            }
          </Pie>
        </PieChart>
      </React.Fragment>
    );
  }
}

export default CustomPieChart;