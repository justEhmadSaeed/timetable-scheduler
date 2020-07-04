# Pseudo Code

## Variables

```

d: Working days in a week

p: periods per day

Periods(d,p): Data Strcuture for the whole week periods

t1,t2,t3,...tn: Data Structure for teachers

t_available: Data Structure to keep track of teacher availability i.e 0 for available & 1 for unavailable

c1,c2,c3,...cn: Data Structure for classes

c_available: Data Structure to keep track of class availability

s1,s2,s3, ...sn: Data Structure for subjects


creditHr: credit hours of each Subject

lecture: The lecture distribution can be as follows:

   class: ci, teacher: tj, subject: sk, lecture: [1, 1, 1]
   class: ci, teacher: tj, subject: sk, lecture: [2, 1]
   class: ci, teacher: tj, subject: sk, lecture: [3]

final_tt: The data structure for Final timetable

remainingLectures: Data Structure to keep track of lectures, not added in the final timetable

```
