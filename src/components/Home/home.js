import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryAppBar from "./Appbar";
import SubjectInput from "./InputCards/subjectInput";
import SectionInput from "./InputCards/sectionInput";
import TeacherInput from "./InputCards/teacherInput";
import SubjectTable from "./Tables/subjectTable";
import SectionTable from "./Tables/sectionTable";
import TeacherTable from "./Tables/teacherTable";
import LectureInput from "./lectures/lectureInput";
import LectureTable from "./lectures/lectureTable";
import WorkingtimeInput from "./InputCards/workingtimeInput";
import WorkingtimeTable from "./Tables/workingtimeTable";
import { Button } from "@material-ui/core";
import "./home.css";

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  genButton: {
    marginBottom: 25,
  },
}));

const Exsubjects = [
  ["DBMS", "CS101", 3, 3],
  ["AOA", "CS301", 3, 3],
  ["DBMS Lab", "CS101L", 2, 1],
];
const ExSections = [
  ["Section A 18", "CS18A"],
  ["Section B 18", "CS18B"],
  ["Section C 18", "CS18C"],
];
const worthyTeachers = [
  ["Dr. Fareed Jafri", "101"],
  ["Dr. Awais", "102"],
  ["Dr. Afzal", "103"],
];
const ExLectures = [
  ["Dr. Fareed Jafri", "CS18A", "CS101", "2 - 1", "Dr. Fareed JafriCS18A"],
  ["Dr. Awais", "CS18B", "CS301", "1 - 1 - 1", "Dr. AwaisCS18B"],
  ["Dr. Afzal", "CS18C", "CS101L", "1 - 1", "Dr. AfzalCS18C"],
];

const weekSchedule = { MON: 0, TUE: 0, WED: 0, THU: 0, FRI: 0, SAT: 0 };
const generateButton = () => {};

const Home = () => {
  const classes = useStyles();

  const [subjects, setSubjects] = React.useState(Exsubjects);
  const [sections, setSections] = React.useState(ExSections);
  const [teachers, setTeachers] = React.useState(worthyTeachers);
  const [lectures, setLectures] = React.useState(ExLectures);
  const [workingTime, setworkingTime] = React.useState(weekSchedule);

  console.log(subjects);
  console.log(sections);
  console.log(teachers);
  console.log(lectures);
  console.log(workingTime);
  return (
    <div>
      <PrimaryAppBar />
      <div className={classes.cardHolder}>
        <SubjectInput
          className={classes.card}
          subjects={subjects}
          setSubjects={setSubjects}
        />
        <SectionInput
          className={classes.card}
          sections={sections}
          setSections={setSections}
        />
        <TeacherInput
          className={classes.card}
          teachers={teachers}
          setTeachers={setTeachers}
        />
      </div>
      <div className={classes.cardHolder}>
        <SubjectTable subjects={subjects} setSubjects={setSubjects} />
        <SectionTable sections={sections} setSections={setSections} />
        <TeacherTable teachers={teachers} setTeachers={setTeachers} />
      </div>
      <div className={classes.cardHolder}>
        <LectureInput
          lectures={lectures}
          setLectures={setLectures}
          subjects={subjects}
          sections={sections}
          teachers={teachers}
        />
        <WorkingtimeInput
          workingTime={workingTime}
          setworkingTime={setworkingTime}
        />
      </div>
      <div className={classes.cardHolder}>
        <LectureTable lectures={lectures} setLectures={setLectures} />
        <WorkingtimeTable
          workingTime={workingTime}
          setworkingTime={setworkingTime}
        />
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.genButton}
        onClick={generateButton}
      >
        Generate Timetable
      </Button>
    </div>
  );
};

export default Home;
