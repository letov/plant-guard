export const leadingZero = (value: number | string | null | undefined) => value ? value.toString().padStart(2, '0') : '00';

export const dateFormat = (dateTime: Date) => (`
    ${leadingZero(dateTime.getDate())}.${leadingZero(dateTime.getMonth())}.${dateTime.getFullYear() % 100}
`);

export const timeFormat = (dateTime: Date) => (`
    ${leadingZero(dateTime.getHours())}:${leadingZero(dateTime.getMinutes())}
`);

export const dateTimeFormat = (dateTime: Date) => (`
    ${dateFormat(dateTime)} ${timeFormat(dateTime)} 
`);