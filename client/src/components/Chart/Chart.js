import React from 'react';
import './Chart.css';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";




function processStudentData2(data) {
  const monthCounts = {};

  for (const student of data) {
    // Iterate through all three createdAt fields
    for (let i = 1; i <= 3; i++) {
      const createdAtField = `createdAt${i}`;
      if (student[createdAtField] !== "0") {
        const signupDate = new Date(student[createdAtField]);
        const month = signupDate.getMonth(); // Get the month (0-indexed)

        if (!monthCounts.hasOwnProperty(month)) {
          monthCounts[month] = { Total1: 0, Total2: 0, Total3: 0 };
        }

        monthCounts[month][`Total${i}`] += 1;
      }
    }
  }

  const chartData = [];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (let month = 0; month < 12; month++) {
    const countData = monthCounts[month] || { Total1: 0, Total2: 0, Total3: 0 };
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
    if (!monthCounts.hasOwnProperty(month)) { // !monthCounts.hasOwnProperty(month) vérifie si  la clé month n'existe pas dans le monthCountsobjet. 
      monthCounts[month] = 0;
    }
    monthCounts[month]+=1;
   // monthCounts[month] = (monthCounts[month] || 0) + 1; // Increment count for the month
                                                        //donc  ceci c7 pr determiner le nombre
    // total de courses qui ont le même moi , cela equivaut donc au nbre d courses total creer dns ce mois
    // on check l'objet 'monthCounts' si la clé month n'existe pas , on l'a créer et on l'attribut la valeur '0'
    // ensuite , on l'incremente de '1' de cette facon, chaque clé se verra 'augmenté de 1' si on l'a trouve
    // on a obtiens bien donc le nombre de fois total qu'elle existe (ou nbre de fois qu'on l'a creer dns le site) 
    // ici on aura comme resultat {2:6} pour le mois de mars(2 car on est avc l'index ds tableaux) et une course 'lambda' qui a ete creer 6 fois 
    // car si aucune courses n'est creer dns les autres mois leur clés n seront pas enregistrées                                                    
  }
  console.log(monthCounts);

  // Convert monthCounts object to desired array format
  const chartData = [];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Assuming you have month names
  for (let month = 0; month < 12; month++) { // Iterate through all months
    const count = monthCounts[month] || 0; // ici on s'assure que si on a un truc comme ceci :monthCounts = {2:6}
                                           // on l transforme a un truc comme ceci : monthCounts = {0:0, 1:0, 2:6, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0}
                                           // chaque mois dois avoir une valeur pr eviter les erreurs
                                           
    chartData.push({ name: monthNames[month], Total: count });
  }
  return chartData;
}

//const chartData = processStudentData(allStudentData);



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
];



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
 
  //console.log('++allCourses', allCourses);
  const data1 = processStudentData(allCourses);
//  console.log('++chartData', data1);
  const data2 = processStudentData(allStudents);
 // console.log('++chartData', data2);

  const datachart = mergeDataByIndex(allCourses, allStudents, allInstructors);

   console.log('datachart', datachart)

   const data25 = processStudentData2(datachart);
   console.log('++data25', data25);
  

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
              <stop offset="5%" stopColor="#d4380d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#d4380d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total1"
            stroke="#1d9187"
            fillOpacity={1}
            fill="url(#total1)"
          />
          <Area
            type="monotone"
            dataKey="Total2"
            stroke="#1d0dd4"
            fillOpacity={1}
            fill="url(#total2)"
          />
          <Area
            type="monotone"
            dataKey="Total3"
            stroke="#d4380d"
            fillOpacity={1}
            fill="url(#total3)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};



export default Chart;
