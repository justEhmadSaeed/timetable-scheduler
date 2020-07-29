const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./constants/serviceAccountKey.json");
const docs = require("./constants/docs");
const cors = require("cors");
const { sections } = require("./constants/docs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const app = express();
app.use(express.json());
app.use(cors());

const db = admin.firestore();

app.post("/generate", async (req, res) => {
  const userID = req.body["userID"];
  const collection = db.collection(userID);
  const snapshot = await collection.get();

  let l;
  let subjects;
  let workingTime;

  if (!snapshot.empty)
    snapshot.forEach((snap) => {
      if (snap.id === docs.lectures) l = Object.values(snap.data());
      else if (snap.id === docs.subjects) subjects = Object.values(snap.data());
      else if (snap.id === docs.workingTime) workingTime = snap.data();
    });

  const t = l
    .map((e) => e[0])
    .filter((value, index, self) => self.indexOf(value) === index);

  const sections = l
    .map((e) => e[1])
    .filter((value, index, self) => self.indexOf(value) === index);

  subjects = addSubjects(subjects);

  const teacherLec = t.map((teacher) => {
    return {
      name: teacher,
      assigned: [],
    };
  });
  teacherLec.forEach((lac) => {
    l.forEach((lec) => {
      if (lec[0] === lac.name)
        lac.assigned.push({
          class: lec[1],
          subject: subjects[subjects.findIndex((s) => s.code === lec[2])],
          lecture: lec[3],
        });
    });
  });
  const days = Object.values(workingTime).filter((wt) => wt !== 0);

  const period = {
    d: days.length,
    p: days.reduce((a, b) => Math.max(a, b)),
  };
  // console.log("teacher", t);
  // console.log("sections", sections);
  // console.log("subjects", subjects);
  // console.log("l", l);
  // console.log("teacherLec", teacherLec);
  // console.log("first lecture", teacherLec[0].assigned[0].subject);
  const finalized = Scheduling(teacherLec, sections, period);

  finalized.forEach(async (tt, i) => {
    await collection
      .doc(docs.timeTable)
      .collection(docs.timeTable)
      .doc(sections[i])
      .set({ ...Object(tt.map((e) => Object(e))) })
      .then(() => console.log("done", i + 1))
      .catch((e) => console.log(e));
    console.log(sections[i]);
    console.table(tt);
  });

  res.send(sections);
});

app.listen(3001);

const Scheduling = (teacherLec, sections, period) => {
  const final_tt = ThreeDarray(sections.length, period.d, period.p);

  const t_available = ThreeDarray(teacherLec.length, period.d, period.p);

  const c_available = ThreeDarray(sections.length, period.d, period.p);

  const remainingLectures = [];
  for (let i = 0; i < sections.length; i++) {
    remainingLectures[i] = [];
    for (let j = 0; j < teacherLec.length; j++) {
      let valid = teacherLec[j].assigned.findIndex(
        (e) => e.class === sections[i]
      );
      remainingLectures[i][j] =
        valid !== -1 ? teacherLec[j].assigned[valid].subject.contactHrs : 0;
    }
  }
  console.table(remainingLectures);

  for (let per = 0; per < period.p; per++) {
    for (let day = 0; day < period.d; day++) {
      sections.forEach((clas, cIndex) => {
        if (final_tt[cIndex][day][per] === 0)
          for (let teacher = 0; teacher < teacherLec.length; teacher++) {
            let valid = teacherLec[teacher].assigned.findIndex(
              (e) => e.class === clas
            );
            if (
              valid === -1 ||
              t_available[teacher][day].some((e) => e === clas) ||
              remainingLectures[cIndex][teacher] === 0
            ) {
              continue;
            }

            if (
              isSchedulePossible(t_available, c_available, teacher, cIndex, {
                d: day,
                p: per,
              })
            ) {
              let lectureCount = 1;
              let longestLecture = parseInt(
                teacherLec[teacher].assigned[valid].lecture[0],
                10
              );
              if (
                remainingLectures[cIndex][teacher] > 1 &&
                longestLecture > 1 &&
                isSchedulePossible(t_available, c_available, teacher, cIndex, {
                  d: day,
                  p: per + 1,
                })
              ) {
                lectureCount = 2;
                if (
                  longestLecture > 2 &&
                  isSchedulePossible(
                    t_available,
                    c_available,
                    teacher,
                    cIndex,
                    { d: day, p: per + 2 }
                  )
                )
                  lectureCount = 3;
              }
              for (let i = 0; i < lectureCount; ++i) {
                final_tt[cIndex][day][per + i] =
                  teacherLec[teacher].name +
                  "(" +
                  teacherLec[teacher].assigned[valid].subject.code +
                  ")";
                c_available[cIndex][day][per + i] = teacherLec[teacher].name;
                t_available[teacher][day][per + i] = clas;
                remainingLectures[cIndex][teacher]--;
              }
              break;
            }
          }
      });
    }
  }
  console.table(remainingLectures);

  return final_tt;
};

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

const addSubjects = (subs) => {
  const temp = [];
  subs.forEach((s) => temp.push({ code: s[1], contactHrs: s[2] }));
  return temp;
};

function isSchedulePossible(t_available, c_available, tIndex, cIndex, period) {
  if (
    !(
      t_available[tIndex][period.d][period.p] ||
      c_available[cIndex][period.d][period.p]
    )
  ) {
    return true;
  } else return false;
}

function TwoDarray(row, col) {
  let array = [];
  for (let r = 0; r < row; r++) {
    array[r] = [];
    for (let sections = 0; sections < col; sections++) array[r][sections] = 0;
  }
  return array;
}
function ThreeDarray(x, y, z) {
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
}
