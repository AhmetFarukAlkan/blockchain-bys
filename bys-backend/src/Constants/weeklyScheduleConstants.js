let baseDailySchedule = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
};

const baseWeeklySchedule = [
    { time: '09:30 - 11:20', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '10:30 - 12:20', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '11:30 - 12:20', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '13:00 - 13:50', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '14:00 - 14:50', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '15:00 - 15:50', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '16:00 - 16:50', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '17:00 - 17:50', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '18:00 - 18:50', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
    { time: '19:00 - 19:50', ...JSON.parse(JSON.stringify(baseDailySchedule)) },
];

module.exports = {
    baseWeeklySchedule,
};
