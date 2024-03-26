// creation du tableau datachart qui regroupe ls trois tableaux : allcourses, allinstructors, allstudents
export const mergeDataByIndex = (data1, data2, data3) => {
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



export const processStudentData2  = (data) => {
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




 export  const getStudentPercentage = (data) => {
    // Calculer le nombre total d'étudiants
    const totalStudents = data.reduce((acc, month) => acc + month.StudentsTotal3, 0);
   //console.log('totalStudents', totalStudents);
    // Créer un objet pour stocker les pourcentages
    const percentages = {};
  
    // Parcourir chaque mois
    data.forEach((month) => {
      // Calculer le pourcentage d'étudiants pour le mois
      const percentage = (month.StudentsTotal3 / totalStudents) * 100;
  
      // Arrondir le pourcentage à deux chiffres après la virgule
      const formattedPercentage = percentage;
  
      // Ajouter le pourcentage à l'objet
      //percentages[month.name] = `${formattedPercentage}%`;
      percentages[month.name] = formattedPercentage;
    });
  
    // Retourner l'objet des pourcentages
    return percentages;
  }


 export  const getInstructorsPercentage = (data) => {
    // Calculer le nombre total d'étudiants
    const totalInstructors = data.reduce((acc, month) => acc + month.InstructorsTotal2, 0);
   console.log('totalInstructors', totalInstructors);
    // Créer un objet pour stocker les pourcentages
    const percentages = {};
  
    // Parcourir chaque mois
    data.forEach((month) => {
      // Calculer le pourcentage d'étudiants pour le mois
      const percentage = (month.InstructorsTotal2 / totalInstructors) * 100;
  
      // Arrondir le pourcentage à deux chiffres après la virgule
      const formattedPercentage = percentage;
  
      // Ajouter le pourcentage à l'objet
      //percentages[month.name] = `${formattedPercentage}%`;
      percentages[month.name] = formattedPercentage;
    });
  
    // Retourner l'objet des pourcentages
    return percentages;
  }

  export const getCoursesPercentage = (data) => {
    // Calculer le nombre total d'étudiants
    const totalCourses = data.reduce((acc, month) => acc + month.CoursesTotal1, 0);
   console.log('totalCourses', totalCourses);
    // Créer un objet pour stocker les pourcentages
    const percentages = {};
  
    // Parcourir chaque mois
    data.forEach((month) => {
      // Calculer le pourcentage d'étudiants pour le mois
      const percentage = (month.CoursesTotal1 / totalCourses) * 100;
  
      // Arrondir le pourcentage à deux chiffres après la virgule
      const formattedPercentage = percentage;
  
      // Ajouter le pourcentage à l'objet
      //percentages[month.name] = `${formattedPercentage}%`;
      percentages[month.name] = formattedPercentage;
    });
  
    // Retourner l'objet des pourcentages
    return percentages;
  }


  export const  sumPositivePercentages = (percentages) => {
    // Créer une variable pour stocker la somme
    let sum = 0;
  
    // Parcourir chaque mois
    for (const month in percentages) {
      // Obtenir le pourcentage du mois
      const percentage = percentages[month];
  
      // Si le pourcentage est supérieur à 0, ajouter à la somme
      if (percentage > 0) {
        sum += percentage;
      }
    }
  
    // Retourner la somme
    return sum;
  }