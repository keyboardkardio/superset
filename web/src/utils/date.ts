let dayOfWeek;

const today = new Date();
const dd = today.getDate();
const mm = today.toLocaleString('default', { month: 'long' });
const date = `${mm} ${dd}, ${new Date().getFullYear()}`

let dayOfWeekIndex = today.getDay();
switch (dayOfWeekIndex) {
    case 1:
        dayOfWeek = 'Monday';
        break;
    case 2:
        dayOfWeek = 'Tuesday';
        break;
    case 3:
        dayOfWeek = 'Wednesday';
        break;
    case 4:
        dayOfWeek = 'Thursday';
        break;
    case 5:
        dayOfWeek = 'Friday';
        break;
    case 6:
        dayOfWeek = 'Saturday';
        break;
    case 7:
        dayOfWeek = 'Sunday';
        break;
    default:
        dayOfWeek;
        break;
}

const longForm = `${dayOfWeek}, ${mm} ${dd}, ${new Date().getFullYear()}`;

export { dayOfWeek, date, longForm }
