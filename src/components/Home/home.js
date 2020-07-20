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
import docs from "../../constants/docs";
import firebase from "firebase";

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

const weekSchedule = { MON: 0, TUE: 0, WED: 0, THU: 0, FRI: 0, SAT: 0 };

const generateButton = () => {};

const Home = () => {
  const db = firebase.firestore();
  const userRef = db.collection(firebase.auth().currentUser.uid);
  const classes = useStyles();

  const [subjects, setSubjects] = React.useState([]);
  const [sections, setSections] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [lectures, setLectures] = React.useState([]);
  const [workingTime, setworkingTime] = React.useState(weekSchedule);

  const updateSubjects = (sub, docType) => {
    switch (docType) {
      case "subjects":
        setSubjects(sub);
        break;
      case "sections":
        setSections(sub);
        break;
      case "teachers":
        setTeachers(sub);
        break;
      case "lectures":
        setLectures(sub);
        break;
      case "workingTime":
        setworkingTime(sub);
        break;
      default:
        console.error("Wrong Document");
    }
    userRef
      .doc(docType)
      .set(docType === docs.workingTime ? sub : { ...Object(sub) })
      .then((e) => console.log("saved"))
      .catch((e) => console.error("error", e));
  };
  const fetchRecords = async () => {
    userRef
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          // console.log(doc.data(), doc.id);
          const records =
            doc.id === docs.workingTime
              ? doc.data()
              : Object.values(doc.data());
          // console.log(records);

          switch (doc.id) {
            case docs.subjects:
              setSubjects(records);
              break;
            case docs.sections:
              setSections(records);
              break;
            case docs.teachers:
              setTeachers(records);
              break;
            case docs.lectures:
              setLectures(records);
              break;
            case docs.workingTime:
              setworkingTime(records);
              break;
            default:
              console.error("Wrong Document");
          }
        });
      })
      .catch((e) => console.log("err", e));
  };

  React.useEffect(() => {
    fetchRecords();
  }, []);

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
          setSubjects={updateSubjects}
          docs={docs}
        />
        <SectionInput
          className={classes.card}
          sections={sections}
          setSections={updateSubjects}
          docs={docs}
        />
        <TeacherInput
          className={classes.card}
          teachers={teachers}
          setTeachers={updateSubjects}
          docs={docs}
        />
      </div>
      <div className={classes.cardHolder}>
        <SubjectTable
          subjects={subjects}
          setSubjects={updateSubjects}
          docType={docs}
        />
        <SectionTable
          sections={sections}
          setSections={updateSubjects}
          docs={docs}
        />
        <TeacherTable
          teachers={teachers}
          setTeachers={updateSubjects}
          docs={docs}
        />
      </div>
      <div className={classes.cardHolder}>
        <LectureInput
          lectures={lectures}
          setLectures={updateSubjects}
          docs={docs}
          subjects={subjects}
          sections={sections}
          teachers={teachers}
        />
        <WorkingtimeInput
          workingTime={workingTime}
          setworkingTime={updateSubjects}
          docs={docs}
        />
      </div>
      <div className={classes.cardHolder}>
        <LectureTable
          lectures={lectures}
          setLectures={updateSubjects}
          docs={docs}
        />
        <WorkingtimeTable
          workingTime={workingTime}
          setworkingTime={updateSubjects}
          docs={docs}
        />
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.genButton}
        onClick={generateButton}
        disabled={!lectures.length}
      >
        Generate Timetable
      </Button>
    </div>
  );
};

export default Home;
