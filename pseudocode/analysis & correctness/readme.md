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

## Correctness

### Loop Invariant

- remainingLectures = totalLectures - assignedLectures

### Base Case

- Before the first iteration, we say that no lecture was assigned, so remaining lectures is unaltered.
- After first iteration, first lecture will be assigned & it will be decremented from the remaining lectures

      remainingLectures[teacher, class]-=1

### Inductive Case

- Suppose we say that algorithm is true when k assigned lectures have been assigned, so remaining lectures are total lectures - k
- In k + 1 lectures assigned, one lecture will be decremented from remaining lectures according to base case, so:

```
remainingLectures[k] = totalLectures - k

for k + 1 assigned lecture
remainingLectures[k + 1] = totalLectures - (k + 1)
remainingLectures[k + 1] = (totalLectures - k) - 1
remainingLectures[k + 1] = remainingLectures[k] - 1
```

- So for every assigned lecture, it will be deducted from the remainingLectures array

### Termination

- After the last iteration, it is necessary for our algorthim to assign all the lectures in the remaining lectures, there should be no lectures in the remainingLectures array