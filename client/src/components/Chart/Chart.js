import React from 'react';
import './Chart.css';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mergeDataByIndex, processStudentData2 } from '../../statistics/statistics';





const Chart = ({ aspect, title, allCourses, allStudents, allInstructors }) => {
 
  const datachart = mergeDataByIndex(allCourses, allInstructors, allStudents);
  const data25 = processStudentData2(datachart);
  

  return (
    <div className="Chart">
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
            <linearGradient id="total2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d0dd4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1d0dd4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="total3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f79623" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f79623" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Area
            type="monotone"
            dataKey="CoursesTotal1"
            stroke="#1d9187"
            fillOpacity={1}
            fill="url(#total1)"
          />
          <Area
            type="monotone"
            dataKey="InstructorsTotal2"
            stroke="#1d0dd4"
            fillOpacity={1}
            fill="url(#total2)"
          />
          <Area
            type="monotone"
            dataKey="StudentsTotal3"
            stroke="#f79623"
            fillOpacity={1}
            fill="url(#total3)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};



export default Chart;
