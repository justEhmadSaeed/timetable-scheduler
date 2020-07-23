const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./constants/serviceAccountKey.json");
const docs = require("./constants/docs");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/gen", async (req, res) => {
  console.log(req.body);
  const userID = req.body["userID"];
  let subjects;
  // await db
  //   .collection(userID)
  //   .doc(docs.subjects)
  //   .get()
  //   .then((res) => (subjects = res.data()));

  // subjects = Object.values(subjects);
  // let temp = [].concat(...subjects);
  console.log("timetable");
  res.send(["timetable"]);
});

app.listen(3001);

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
    for (let c = 0; c < col; c++) array[r][c] = 0;
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
const period = {
  d: 4,
  p: 7,
};

const c = ["c1", "c2", "c3"];
const s = [
  { name: "s1", creditHr: 3 },
  { name: "s2", creditHr: 3 },
  { name: "s3", creditHr: 3 },
  { name: "s4", creditHr: 3 },
  { name: "s5", creditHr: 3 },
  { name: "s6", creditHr: 2 },
];
const t = [
  {
    name: "t0",
    assigned: [
      { class: c[0], subject: s[0], lecture: [1, 1, 1] },
      { class: c[1], subject: s[0], lecture: [1, 1, 1] },
      { class: c[2], subject: s[0], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t1",
    assigned: [
      { class: c[0], subject: s[1], lecture: [1, 1, 1] },
      { class: c[1], subject: s[1], lecture: [1, 1, 1] },
      { class: c[2], subject: s[1], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t2",
    assigned: [
      { class: c[0], subject: s[2], lecture: [2, 1] },
      { class: c[1], subject: s[2], lecture: [2, 1] },
      { class: c[2], subject: s[2], lecture: [2, 1] },
    ],
  },
  {
    name: "t3",
    assigned: [
      { class: c[0], subject: s[3], lecture: [1, 1, 1] },
      { class: c[1], subject: s[3], lecture: [1, 1, 1] },
      { class: c[2], subject: s[3], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t4",
    assigned: [
      { class: c[0], subject: s[4], lecture: [1, 1, 1] },
      { class: c[1], subject: s[4], lecture: [1, 1, 1] },
      { class: c[2], subject: s[4], lecture: [1, 1, 1] },
    ],
  },
  {
    name: "t5",
    assigned: [
      { class: c[0], subject: s[5], lecture: [1, 1] },
      { class: c[1], subject: s[5], lecture: [2] },
      { class: c[2], subject: s[5], lecture: [2] },
    ],
  },
];
// const teacherSubjectHrs = ["s1", "s2", "s3", "s4", "s5"];

const final_tt = ThreeDarray(c.length, period.d, period.p);

const t_available = ThreeDarray(t.length, period.d, period.p);

const c_available = ThreeDarray(c.length, period.d, period.p);

const remainingLectures = [];
for (let i = 0; i < c.length; i++) {
  remainingLectures[i] = [];
  for (let j = 0; j < t.length; j++) {
    let valid = t[j].assigned.findIndex((e) => e.class === c[i]);
    remainingLectures[i][j] =
      valid !== -1 ? t[j].assigned[valid].subject.creditHr : 0;
  }
}
// console.table(remainingLectures);

const Scheduling = () => {
  for (let per = 0; per < period.p; per++) {
    for (let day = 0; day < period.d; day++) {
      c.forEach((clas, cIndex) => {
        if (final_tt[cIndex][day][per] === 0)
          for (let teacher = 0; teacher < t.length; teacher++) {
            let valid = t[teacher].assigned.findIndex((e) => e.class === clas);
            if (
              valid === -1 ||
              t_available[teacher][day].some((e) => e === clas) ||
              remainingLectures[cIndex][teacher] === 0
            ) {
              continue;
            }

            if (isSchedulePossible(teacher, cIndex, { d: day, p: per })) {
              let lectureCount = 1;
              let longestLecture = t[teacher].assigned[valid].lecture[0];
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
                final_tt[cIndex][day][per + i] = t[teacher].name;
                c_available[cIndex][day][per + i] = t[teacher].name;
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

// Scheduling();
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
