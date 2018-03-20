export const GetScheduleGroups = schedules => {
  if (schedules.length === 0) return

  let groups = []
  for (let i = 0; i < 48; i++) {
    const group = []
    for (let j = 0; j < schedules.length; j++) {
      if (schedules[j].top <= i * 15 && i * 15 < schedules[j].top + schedules[j].height) {
        group.push(schedules[j])
      }
    }
    groups.push(group)
  }
  let scheduleGroups = []
  let isGroup = false
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].length === 0) {
      isGroup = false
    } else {
      if (isGroup === false) {
        scheduleGroups.push(groups[i])
        isGroup = true
      } else {
        for (let j = 0; j < groups[i].length; j++) {
          scheduleGroups[scheduleGroups.length - 1].push(groups[i][j])
        }
      }
      scheduleGroups[scheduleGroups.length - 1] = scheduleGroups[scheduleGroups.length - 1].filter((x, i, self) => {
        return self.indexOf(x) === i
      })
    }
  }
  return scheduleGroups
}
