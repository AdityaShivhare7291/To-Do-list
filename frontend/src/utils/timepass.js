function createDateObjects(year, month) {
    const firstDay = new Date(year, month - 1, 1); // First day of the month
    const lastDay = new Date(year, month, 0); // Last day of the month

    return { firstDay, lastDay };
}

function calculateDate(year, month, week) {
    const { firstDay, lastDay } = createDateObjects(year, month);
    let firstDayOfWeek = firstDay.getDay();
    console.log("firstdayofweek", firstDayOfWeek)
    let totaldays = lastDay.getDate();
    let remainingDays = lastDay.getDate();
    console.log("remaining days", remainingDays)

    let startDate = 1;
    for (let i = 0; i < week; i++) {

        if (remainingDays < 7) {
            remainingDays = -1;
            continue;
        }

        if (firstDayOfWeek !== 0) {
            // Days to the next Sunday
            remainingDays = remainingDays - (7 - firstDayOfWeek);
            startDate = startDate + (7 - firstDayOfWeek);
            firstDayOfWeek = 0;

        } else {
            remainingDays -= 7;
            startDate = startDate + 7;

        }
        console.log("startDate", startDate)
    }

    console.log("remaining days", { remainingDays, startDate, firstDayOfWeek })



    if (week === 1) {
        return { startDate: 1, enddate: startDate - 1 };
    }
    else if (remainingDays > 0) {
        return { startDate: startDate - 7, enddate: startDate - 1 };
    }

    return { startDate: startDate, enddate: totaldays };
}

function calculateWeeksInMonth(year, month) {
    const { firstDay, lastDay } = createDateObjects(year, month);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    let weeks = 0;
    let remainingDays = lastDay.getDate();
    console.log("remaining days", remainingDays)
    // Check if the first day is not a Sunday
    if (firstDayOfWeek !== 0) {
        // Days to the next Sunday
        remainingDays = remainingDays - (7 - firstDayOfWeek);
        weeks++; // Increment the week count for the partial week

    }

    weeks += Math.ceil(remainingDays / 7) + ((remainingDays % 7) ? 0 : 1);
    console.log(weeks);
    return weeks;
}
export default { calculateDate, calculateWeeksInMonth }
