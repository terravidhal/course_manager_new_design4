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




function processStudentData2(data) {
  const monthCounts = {};
  const nameData = {1:'Courses', 2:'Instructors', 3:'Students'}

  for (const elt of data) {
    // Iterate through all three createdAt fields
    for (let i = 1; i <= 3; i++) {
      const createdAtField = `createdAt${i}`;
      if (elt[createdAtField] !== "0") {
        const RegisterDate = new Date(elt[createdAtField]);
        const month = RegisterDate.getMonth(); // Get the month (0-indexed)

        if (!monthCounts.hasOwnProperty(month)) {
          monthCounts[month] = { CoursesTotal1: 0, InstructorsTotal2: 0, StudentsTotal3: 0 };
        }

        monthCounts[month][`${nameData[i]}Total${i}`] += 1;
        //console.log('monthCounts55', monthCounts);
      }
    }
  }

  const chartData = [];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (let month = 0; month < 12; month++) {
    const countData = monthCounts[month] || { CoursesTotal1: 0, InstructorsTotal2: 0, StudentsTotal3: 0 };
    chartData.push({ name: monthNames[month], ...countData });
  }

  return chartData;
}


//
function processStudentData(data) {
  const monthCounts = {};
  for (const student of data) {
    const signupDate = new Date(student.createdAt);
    const month = signupDate.getMonth(); // Get the month (0-indexed)
    if (!monthCounts.hasOwnProperty(month)) { 
      monthCounts[month] = 0;
    }
    monthCounts[month]+=1;                                              
  }
  console.log(monthCounts);

  // Convert monthCounts object to desired array format
  const chartData = [];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Assuming you have month names
  for (let month = 0; month < 12; month++) { // Iterate through all months
    const count = monthCounts[month] || 0;
                                           
    chartData.push({ name: monthNames[month], Total: count });
  }
  return chartData;
}

//const chartData = processStudentData(allStudentData);


/*
const data1 = [
  { _id: "65fab57f969947beea0143a5", createdAt: "2024-03-20T10:07:59.934Z" },
  { _id: "65fab57f969947beea0153a5", createdAt: "2024-03-20T10:17:59.934Z" },
  { _id: "65fab57f969947be45a0153a5", createdAt: "2024-03-20T10:08:59.934Z" },
];

const data2 = [
  { _id: "65fab57f969947beea0143a5", createdAt: "2024-03-20T10:07:59.934Z" },
  { _id: "65fab57f961247beea0143a5", createdAt: "2024-03-20T10:04:59.934Z" },
];

const data3 = [
  { _id: "65fab57f969947beea0143a5", createdAt: "2024-03-20T10:07:59.934Z" },
  { _id: "65fab57f969947beea0144a5", createdAt: "2024-03-20T10:12:59.934Z" },
]; */


// creation du tableau datachart qui regroupe ls trois tableaux : allcourses, allinstructors, allstudents
function mergeDataByIndex(data1, data2, data3) {
 // Trouvons la longueur maximale des trois tableaux
const maxLength = Math.max(data1.length, data2.length, data3.length);

// Créons le tableau datachart
const datachart = [];
for (let i = 0; i < maxLength; i++) {
  const obj = {
    _id: i,
    createdAt1: data1[i]?.createdAt || "0",
    createdAt2: data2[i]?.createdAt || "0",
    createdAt3: data3[i]?.createdAt || "0",
  };
  datachart.push(obj);
}

  return datachart;
}

/*
modele donnee de base : 
const result = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 0 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
  { name: "July", Total: 0 },
  { name: "August", Total: 1700 },
  { name: "September", Total: 100 },
  { name: "October", Total: 0 },
  { name: "September", Total: 100 },
  { name: "November", Total: 80 },
  { name: "December", Total: 0 },
];  */





const Chart = ({ aspect, title, allCourses, allStudents, allInstructors }) => {
 
  const datachart = mergeDataByIndex(allCourses, allInstructors, allStudents);
  // console.log('datachart', datachart)
   const data25 = processStudentData2(datachart);
  // console.log('++data25', data25);
  

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
