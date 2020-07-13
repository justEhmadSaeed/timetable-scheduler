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

const c = ["c1", "c2", "c3", "c4", "c5", "c6"];
const s = [
  { name: "s1", creditHr: 3 },
  { name: "s2", creditHr: 3 },
  { name: "s3", creditHr: 3 },
  { name: "s4", creditHr: 3 },
  { name: "s5", creditHr: 3 },
  { name: "s6", creditHr: 3 },
];
const t = [
  { name: "t1", subject: s[0], lecture: [2, 1] },
  { name: "t2", subject: s[1], lecture: [1, 1, 1] },
  { name: "t3", subject: s[2], lecture: [1, 1, 1] },
  { name: "t4", subject: s[3], lecture: [1, 1, 1] },
  { name: "t5", subject: s[4], lecture: [1, 1, 1] },
  { name: "t6", subject: s[5], lecture: [3] },
];
const teacherSubjectHrs = ["s1", "s2", "s3", "s4", "s5"];

const final_tt = ThreeDarray(c.length, period.d, period.p);

const t_available = ThreeDarray(t.length, period.d, period.p);

const c_available = ThreeDarray(c.length, period.d, period.p);

const remainingLectures = [];
for (let i = 0; i < c.length; i++) {
  remainingLectures[i] = [];
  for (let j = 0; j < t.length; j++)
    remainingLectures[i][j] = t[j].subject.creditHr;
}
const Scheduling = () => {
  for (let per = 0; per < period.p; per++) {
    c.forEach((clas, cIndex) => {
      for (let day = 0; day < period.d; day++) {
        t.forEach((teacher, tIndex) => {
          if (
            t_available[tIndex][day].find((e) => e === clas) ||
            remainingLectures[cIndex][tIndex] === 0
          )
            return;

          if (isSchedulePossible(tIndex, cIndex, { d: day, p: per })) {
            let lectureCount = 1;
            let longestLecture = t[tIndex].lecture[0];
            if (
              remainingLectures[cIndex][tIndex] > 1 &&
              longestLecture > 1 &&
              isSchedulePossible(tIndex, cIndex, { d: day, p: per + 1 })
            ) {
              lectureCount = 2;
              if (
                longestLecture > 2 &&
                isSchedulePossible(tIndex, cIndex, { d: day, p: per + 2 })
              )
                lectureCount = 3;
            }
            for (let i = 0; i < lectureCount; ++i) {
              final_tt[cIndex][day][per + i] = teacher.name;
              c_available[cIndex][day][per + i] = teacher;
              t_available[tIndex][day][per + i] = clas;
              remainingLectures[cIndex][tIndex]--;
            }
          }
        });
      }
    });
  }

  console.table(remainingLectures);
  final_tt.forEach((tt, i) => {
    console.log("Class: ", i + 1);

    console.table(tt);
  });
};
Scheduling();