import coreData from './fixedData'
export const Status  = {
  read: 'READ',
  unread: 'UNREAD',
}

export const allGradesForFilter = coreData.gradeList.map(item => item.id)

export const allStatusForFilter = [Status.read, Status.unread]
