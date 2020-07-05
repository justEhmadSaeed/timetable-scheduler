# Algorithm

## Variables

```

d: Working days in a week

p: periods per day

Periods(d,p): Data Strcuture for the whole week periods

t1,t2,t3,...tn: Data Structure for teachers

teacher_available: Data Structure to keep track of teacher availability i.e 0 for available & 1 for unavailable

c1,c2,c3,...cn: Data Structure for classes

class_available: Data Structure to keep track of class availability

s1,s2,s3, ...sn: Data Structure for subjects


creditHr: credit hours of each Subject

lectures: The lecture distribution can be as follows:

   class: ci, teacher: tj, subject: sk, lecturePattern: [1, 1, 1]
   class: ci, teacher: tj, subject: sk, lecturePattern: [2, 1]
   class: ci, teacher: tj, subject: sk, lecturePattern: [3]

final_tt(c, d, p): The data structure for Final timetable

remainingLectures(ti, cj): Data Structure to keep track of the lectures, not added in the final timetable

SP(teacher, class, Period): Function to check if passed combination has a slot available
```

## User Input

```

teachers: t1...tn
classes: c1...cn
subjects: s1...sn
credit Hours: creditHr
teacher, subjects & classes map: TSC1...TSCn
activeDays: d
lectures per Day: p

```

## Pseudo Code

```
// Suppose Inputs have been passed into the procedure
procedure generateTimeTable
    for period in Periods[p]:
        for day in Periods[d]:
            for class in c:
                for teacher in teachers:
                    if(TSC = 0 for day OR remainingLectures[teacher, class] = 0 )
                    Next Iteration

                    if SP(teacher, class, Period[d, p])
                        consecutiveLecture = longestLecture in lectures[i].lecturePattern
                        if(consecutiveLecture > 1)
                            if(Slots are availabe for next consecutiveLectures - 1 )
                                AssignLectureInFinal_tt(teacher, class, Periods) for consecutiveLectures;
                        else
                            AssignLectureInFinal_tt(teacher, class, Periods) for currentLecture
                    Next Iteration

    for rL in remainingLectures
        if( rL NOT 0)
            rl added to remaining
    if(remaining.length = 0)
        Successful
    else
        unsuccessful
End generateTimeTable

Procedure AssignLectureInFinal_tt
    final_tt[class, Period] = teacher
    class_available[Period] = teacher
    teacher_available[Period] = class
    remainingLectures[teacher, class]-=1

End AssignLectureInFinal_tt

Procedure SP
    if( teacher_available[period] AND class_available[period] )
        return true
    else
        return false
End SP

```
