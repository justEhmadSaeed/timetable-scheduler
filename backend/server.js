const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./constants/serviceAccountKey.json");
const docs = require("./constants/docs");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const app = express();
app.use(express.json());
app.use(cors());

const db = admin.firestore();

app.post("/generate", async (req, res) => {
  const userID = req.body["userID"];
  const s = [
    ["DMBS", "DBMS", 3, 3],
    ["AOA", "AOA", 3, 3],
    ["DMBS Lab", "DBMS(Lab)", 3, 1],
  ];
  // const c = [
  //   ["2018 CS A", "CS18A"],
  //   ["2018 CS B", "CS18B"],
  //   ["2018 CS C", "CS18C"],
  // ];
  // const t = [
  //   ["Samyan", "samyanw"],
  //   ["Awais", "awaish"],
  //   ["Fareed", "fareedj"],
  // ];
  const l = [
    ["Samyan", "CS18A", "AOA", "2-1"],
    ["Awais", "CS18A", "DBMS", "2-1"],
    ["Laeeq", "CS18A", "DBMS(L)", "2-1"],
  ];
  const t = l
    .map((e) => e[0])
    .filter((value, index, self) => self.indexOf(value) === index);

  const c = l
    .map((e) => e[1])
    .filter((value, index, self) => self.indexOf(value) === index);
  const sub = l
    .map((e) => e[2])
    .filter((value, index, self) => self.indexOf(value) === index);
    
    const lectures = t.map((teacher) => {
      return {
        name: teacher,
        assigned: [],
      };
    });
    lectures.forEach((lac) => {
      l.forEach((lec) => {
        if (lec[0] === lac.name)
        lac.assigned.push({ class: lec[1], subject: lec[2], lecture: lec[3] });
      });
    });
    console.log(t);
    console.log(c);
    console.log(sub);
    console.log(l);
  console.log(lectures);
    // console.log(lectures[0].assigned);
    // await db
    //   .collection(userID)
  //   .doc(docs.subs)
  //   .get()
  //   .then((res) => (subs = res.data()));

  // const subs = addSubjects(body);
  // console.log(subs);

  res.send(["timetable"]);
});
const addSubjects = (subs) => {
  // subs = Object.values(subs);
  const temp = [];
  subs.forEach((s) => temp.push({ code: s[1], contactHrs: s[2] }));
  return temp;
};
app.listen(3001);
const period = {
  d: 4,
  p: 7,
};
const sections = ["c1", "c2", "c3"];
const subjects = [
  { code: "s1", contactHrs: 3 },
  { code: "s2", contactHrs: 3 },
  { code: "s3", contactHrs: 3 },
  { code: "s4", contactHrs: 3 },
  { code: "s5", contactHrs: 3 },
  { code: "s6", contactHrs: 2 },
];
const teachers = [
  {
    name: "t0",
    assigned: [
      { class: sections[0], subject: subjects[0], lecture: [1, 1, 1] },
      { class: sections[1], subject: subjects[0], lecture: [1, 1, 1] },
      { class: sections[2], subject: subjects[0], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t1",
    assigned: [
      { class: sections[0], subject: subjects[1], lecture: [1, 1, 1] },
      { class: sections[1], subject: subjects[1], lecture: [1, 1, 1] },
      { class: sections[2], subject: subjects[1], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t2",
    assigned: [
      { class: sections[0], subject: subjects[2], lecture: [2, 1] },
      { class: sections[1], subject: subjects[2], lecture: [2, 1] },
      { class: sections[2], subject: subjects[2], lecture: [2, 1] },
    ],
  },
  {
    name: "t3",
    assigned: [
      { class: sections[0], subject: subjects[3], lecture: [1, 1, 1] },
      { class: sections[1], subject: subjects[3], lecture: [1, 1, 1] },
      { class: sections[2], subject: subjects[3], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t4",
    assigned: [
      { class: sections[0], subject: subjects[4], lecture: [1, 1, 1] },
      { class: sections[1], subject: subjects[4], lecture: [1, 1, 1] },
      { class: sections[2], subject: subjects[4], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t5",
    assigned: [
      { class: sections[0], subject: subjects[5], lecture: [1, 1] },
      { class: sections[1], subject: subjects[5], lecture: [2] },
      { class: sections[2], subject: subjects[5], lecture: [2] },
    ],
  },
];

const isSchedulePossible = (tIndex, cIndex, period) => {
  if (
    !(
      t_available[tIndex][period.d][period.p] ||
      c_available[cIndex][period.d][period.p]
    )
  ) {
    return true;
  } else return false;
};

const TwoDarray = (row, col) => {
  let array = [];
  for (let r = 0; r < row; r++) {
    array[r] = [];
    for (let sections = 0; sections < col; sections++) array[r][sections] = 0;
  }
  return array;
};
const ThreeDarray = (x, y, z) => {
  let array = [];
  for (let i = 0; i < x; i++) {
    array[i] = [];
    for (let j = 0; j < y; j++) {
      array[i][j] = [];
      for (let k = 0; k < z; k++) {
        array[i][j][k] = 0;
      }
    }
  }
  return array;
};

const final_tt = ThreeDarray(sections.length, period.d, period.p);

const t_available = ThreeDarray(teachers.length, period.d, period.p);

const c_available = ThreeDarray(sections.length, period.d, period.p);

const remainingLectures = [];
for (let i = 0; i < sections.length; i++) {
  remainingLectures[i] = [];
  for (let j = 0; j < teachers.length; j++) {
    let valid = teachers[j].assigned.findIndex((e) => e.class === sections[i]);
    remainingLectures[i][j] =
      valid !== -1 ? teachers[j].assigned[valid].subject.contactHrs : 0;
  }
}
// console.table(remainingLectures);

const Scheduling = () => {
  for (let per = 0; per < period.p; per++) {
    for (let day = 0; day < period.d; day++) {
      sections.forEach((clas, cIndex) => {
        if (final_tt[cIndex][day][per] === 0)
          for (let teacher = 0; teacher < teachers.length; teacher++) {
            let valid = teachers[teacher].assigned.findIndex(
              (e) => e.class === clas
            );
            if (
              valid === -1 ||
              t_available[teacher][day].some((e) => e === clas) ||
              remainingLectures[cIndex][teacher] === 0
            ) {
              continue;
            }

            if (isSchedulePossible(teacher, cIndex, { d: day, p: per })) {
              let lectureCount = 1;
              let longestLecture = teachers[teacher].assigned[valid].lecture[0];
              if (
                remainingLectures[cIndex][teacher] > 1 &&
                longestLecture > 1 &&
                isSchedulePossible(teacher, cIndex, { d: day, p: per + 1 })
              ) {
                lectureCount = 2;
                if (
                  longestLecture > 2 &&
                  isSchedulePossible(teacher, cIndex, { d: day, p: per + 2 })
                )
                  lectureCount = 3;
              }
              for (let i = 0; i < lectureCount; ++i) {
                final_tt[cIndex][day][per + i] = teachers[teacher].name;
                c_available[cIndex][day][per + i] = teachers[teacher].name;
                t_available[teacher][day][per + i] = clas;
                remainingLectures[cIndex][teacher]--;
              }
              break;
            }
          }
      });
    }
  }
  return final_tt;
};

Scheduling();
// final_tt.forEach((tt, i) => {
//   console.log("Class: ", i + 1);

//   console.table(tt);
// });

// let remaining = [];
// remainingLectures.forEach((lecture, i) => {
//   lecture.forEach((value, j) => {
//     if (value > 0) {
//       remaining.push({ Class: i, teacher: j });
//     }
//   });
// });
// console.log("Remaining Lectures: " + remaining);

// console.table(remainingLectures);
