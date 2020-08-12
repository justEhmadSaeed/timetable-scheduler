import React from 'react';
import Timetable from './timetable';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
}));

export default function GenerateTimetable({ timetable }) {
  const classes = useStyles();
  return (
    <div className={classes.cardHolder}>
      {timetable ? (
        Object.keys(timetable)
          .sort()
          .map((sec, i) => (
            <Timetable timeTable={timetable[sec]} section={sec} key={sec} />
          ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
