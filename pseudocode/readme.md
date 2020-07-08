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

// Function to Check the Correctness of Algorithm

    for class in c
        for teacher in t
            if( remainingLectures[class][teacher] NOT 0)
                Add it to remaining

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

## Algorithm Analysis

```
// All constants have been ignored for the sake of simplicity and to focus more on the algebric time complexity

procedure generateTimeTable
    for period in Periods[p]: ----> (p)
        for day in Periods[d]: ----> (d)
            for class in c: ----> (c)
                for teacher in teachers: ---->(t)
                    if(TSC = 0 for day OR remainingLectures[teacher, class] = 0 ) ---->(p + 1)
                    Next Iteration

                    if SP(teacher, class, Period[d, p]) [total cost]---->(3)
                    // According to our output format, this condition will run at most of sum of credits hours of all lectures
                        consecutiveLecture = longestLecture in lectures[i].lecturePattern ---->(Si)

                        if(consecutiveLecture > 1) ---->(Si)
                            if(Slots are availabe for next consecutiveLectures - 1 ) ---->(CSi)
                                AssignLectureInFinal_tt(teacher, class, Periods) for consecutiveLectures; [total cost---->(4 * consecutiveLectures)]
                        else
                            AssignLectureInFinal_tt(teacher, class, Periods) for currentLecture [total cost---->(4)]
                    Next Iteration

    // Time Complexity for above loops
    1 + (p + 1) + (p - 1) + p[
        1 + (d + 1) + (d - 1)+ d[
            1 + (c + 1) + (c - 1) + c[
                1 + (t + 1) + (t - 1) + t[
                    (p + 1) + 3 + Si + Si + CSi
                ]
            ]
        ]
    ]
    =
    1 + 2p + p[
        1 + 2d + d[
            1 + 2c + c[
                1 + 2t + t[
                    // Dominating factor of p, as Si & CSi will have complexity of 0 or 1 inside the loop
                    p + 4 + 2Si + CSi
                ]
            ]
        ]
    ]
    =
    1 + 2p + p[
        1 + 2d + d[
            1 + 2c + c[
                2t + t.p + t.Ci
            ]
        ]
    ]
    = 2p + 4p.d + 2p.d.c + 2p.d.c.t + p^2.d.c.t + p.d.c.t.Ci
    // Here the factor that affects the algorithm complexity the most is p^2.d.c.t, so:
    = 𝚯(p^2.d.c.t)


// Function to Check the Correctness of Algorithm

    for class in c ---->(c)
        for teacher in t ---->(t)
            if( remainingLectures[class][teacher] NOT 0) ---->(1)
                Add it to remaining ---->(1)

    if(remaining.length = 0) ----> (1)
        Successful
    else
        unsuccessful
// For correctness block
    1 + 2c + (c - 1) + c[ 2(t) + t-1 + t+1 ]
    = 3c + c[3.t]
    = 3c + 3.t.c
    // As tc factor dominates, so average time compexity will be:
    = 𝚯(t.c)

End generateTimeTable

Procedure AssignLectureInFinal_tt [total cost ----> (4)]
    final_tt[class, Period] = teacher ---->(1)
    class_available[Period] = teacher ---->(1)
    teacher_available[Period] = class ---->(1)
    remainingLectures[teacher, class]-=1 ---->(1)

End AssignLectureInFinal_tt

Procedure SP [total cost ----> (3)]
    if( teacher_available[period] AND class_available[period] ) ---->(2)
        return true ---->(1)
    else
        return false ---->(1)
End SP


Total Time Complexity of this Algorithm can be summed up as follows:
 𝚯(p^2.d.c.t) + 𝚯(t.c)
 = 𝚯(p^2.d.c.t)

 where p is periods/day
 d is working days in a week
 c is the total number of classes 
 t is the total number of teachers

```
