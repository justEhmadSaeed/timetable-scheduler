# Pseudo Code
# Variables for the project -Activity Scheduling

```
tindex:  Teacher in the list t

cindex:  Class in the list t

period: Lecture assigned to a teacher

t_available: Teacher availability for the lecture

c_available: Class availability for the lecture 

t1,t2,t3....tn: Data Structure for teachers/ List of teachers

s1,s2,s3....sn: Data Structure for subjects/ List of subjects. 

c1,c2,c3...cn: Data Structure for classes

creditHr: It is based on the number of classroom hours per week . In activity sheduling project, each subject has assigned equal number of credit hours that is 3. 

lecture: The lecture distribution is as follows: 

   subject: s[0], lecture: [2, 1] },
   subject: s[1], lecture: [1, 1, 1] },
   subject: s[2], lecture: [1, 1, 1] },
   subject: s[3], lecture: [1, 1, 1] },
   subject: s[4], lecture: [1, 1, 1] },
   subject: s[5], lecture: [3] }

d: days (here d has assigned a value of 4)

p: periods (here p has assigned a vlaue of 7)

final_tt: The data structure to Final timetable and no changes are allowed in the Final Timetable.

tt: denoting timetable

row: Represneting lectures/periods 

col: Represneting days

lectureCount: variable that counts the lecture. Initially, it has assigned the value of 1 and then, its value changes according to the requirement.

remainingLectures: variable that counts the lecture remained in the schedule.


```