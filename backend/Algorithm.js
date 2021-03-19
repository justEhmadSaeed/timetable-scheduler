const Scheduling = (teacherLec, sections, period) => {
	const final_tt = ThreeDarray(sections.length, period.d, period.p)

	const t_available = ThreeDarray(teacherLec.length, period.d, period.p)

	const c_available = ThreeDarray(sections.length, period.d, period.p)

	const remainingLectures = []
	for (let i = 0; i < sections.length; i++) {
		remainingLectures[i] = []
		for (let j = 0; j < teacherLec.length; j++) {
			let valid = teacherLec[j].assigned.findIndex(
				(e) => e.class === sections[i]
			)
			remainingLectures[i][j] =
				valid !== -1 ? teacherLec[j].assigned[valid].subject.contactHrs : 0
		}
	}
	console.table(remainingLectures)

	for (let per = 0; per < period.p; per++) {
		for (let day = 0; day < period.d; day++) {
			sections.forEach((clas, cIndex) => {
				if (final_tt[cIndex][day][per] === 0)
					for (let teacher = 0; teacher < teacherLec.length; teacher++) {
						let valid = teacherLec[teacher].assigned.findIndex(
							(e) => e.class === clas
						)
						if (
							valid === -1 ||
							t_available[teacher][day].some((e) => e === clas) ||
							remainingLectures[cIndex][teacher] === 0
						) {
							continue
						}

						if (
							isSchedulePossible(t_available, c_available, teacher, cIndex, {
								d: day,
								p: per
							})
						) {
							let lectureCount = 1
							let longestLecture = parseInt(
								teacherLec[teacher].assigned[valid].lecture[0],
								10
							)
							if (
								remainingLectures[cIndex][teacher] > 1 &&
								longestLecture > 1 &&
								isSchedulePossible(t_available, c_available, teacher, cIndex, {
									d: day,
									p: per + 1
								})
							) {
								lectureCount = 2
								if (
									longestLecture > 2 &&
									isSchedulePossible(
										t_available,
										c_available,
										teacher,
										cIndex,
										{ d: day, p: per + 2 }
									)
								)
									lectureCount = 3
							}
							for (let i = 0; i < lectureCount; ++i) {
								final_tt[cIndex][day][per + i] =
									teacherLec[teacher].name +
									'(' +
									teacherLec[teacher].assigned[valid].subject.code +
									')'
								c_available[cIndex][day][per + i] = teacherLec[teacher].name
								t_available[teacher][day][per + i] = clas
								remainingLectures[cIndex][teacher]--
							}
							break
						}
					}
			})
		}
	}
	console.table(remainingLectures)

	return final_tt
}

// let remaining = [];
// remainingLectures.forEach((lecture, i) => {
//   lecture.forEach((value, j) => {
//     if (value > 0) {
//       remaining.push({ Class: i, teacher: j });
//     }
//   });
// });
// console.log("Remaining Lectures: " + remaining);

// console.table(remainingLectures);

function isSchedulePossible(t_available, c_available, tIndex, cIndex, period) {
	if (
		!(
			t_available[tIndex][period.d][period.p] ||
			c_available[cIndex][period.d][period.p]
		)
	) {
		return true
	} else return false
}

function ThreeDarray(x, y, z) {
	let array = []
	for (let i = 0; i < x; i++) {
		array[i] = []
		for (let j = 0; j < y; j++) {
			array[i][j] = []
			for (let k = 0; k < z; k++) {
				array[i][j][k] = 0
			}
		}
	}
	return array
}
const addSubjects = (subs) => {
	const temp = []
	subs.forEach((s) => temp.push({ code: s[1], contactHrs: s[2] }))
	return temp
}
module.exports.Scheduling = Scheduling
module.exports.addSubjects = addSubjects
