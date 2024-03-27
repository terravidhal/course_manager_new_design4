import React from 'react';
import './ChartInstructor.css';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { processStudentData } from '../../statistics/statistics';





const ChartInstructor = ({ aspect, title, allCourses }) => {
 
  const data25 = processStudentData(allCourses);
  

  return (
    <div className="ChartInstructor">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data25}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d9187" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1d9187" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#1d9187"
            fillOpacity={1}
            fill="url(#total1)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};



export default ChartInstructor;

