require('moment/locale/uk');
const moment = require('moment-business-days');

moment.locale('uk');

const publicHolidays = [
  '01-01', // New years day
  '03-08', // Women's day
  //  '03-31', // Daylight saving day (Sunday)
  '04-19', // Good friday
  '04-22', // Easter monday
  '05-01', // Labour day
  //  '05-12', // Mother's day (Sunday)
  '05-30', // Fathers day / Ascension day
  '06-10', // Whit Monday
  '10-03', // German Unity day
  //  '10-27', // Daylight Saving Time ends (Sunday)
  '12-24', // Christmas eve
  '12-25', // Christmas day
  '12-26', // Boxing day
];

moment.updateLocale('uk', {
  holidays: publicHolidays,
  holidayFormat: 'MM-DD',
});

exports.getTotalDays = (startMoment, endMoment) =>
  endMoment.diff(startMoment, 'days');

exports.getVacationDays = (startMoment, endMoment) =>
  startMoment.businessDiff(endMoment);

const MOMENT_DATE_FORMAT = 'YYYY-MM-DD';
exports.momentDate = dateStr => moment(dateStr, MOMENT_DATE_FORMAT);
exports.momentToDateString = date => moment(date).format(MOMENT_DATE_FORMAT);
exports.moment = moment;
