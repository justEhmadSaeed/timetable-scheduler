import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  table: {
    minWidth: 360,
  },
}));

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Timetable({ timeTable, section }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell key={"sec" + section}>
              Section {section}
            </StyledTableCell>
            {timeTable ? (
              timeTable[0].map((day, i) => (
                <StyledTableCell key={"lectures" + section + i} align="right">
                  Lecture {i + 1}
                </StyledTableCell>
              ))
            ) : (
              <StyledTableCell key={"lectures" + section}></StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeTable.map((row, i) => (
            <StyledTableRow key={i + section}>
              <StyledTableCell
                key={weekDays[i] + section}
                component="th"
                scope="column"
              >
                {weekDays[i]}
              </StyledTableCell>
              {row.map((r, j) => (
                <StyledTableCell key={r + j + section} align="right">
                  {r ? r : "FREE"}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
