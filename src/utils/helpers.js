import moment from 'moment'

export const formatCarbonDate = (date) => {
  return moment.utc(date).format('MM/DD/YYYY HH:mm')
}
