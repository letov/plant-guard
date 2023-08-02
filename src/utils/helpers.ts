export const dateFormat = (dateTime: Date) => (`
    ${dateTime.getDate().toString().padStart(2, '0')}.${dateTime.getMonth().toString().padStart(2, '0')}.${dateTime.getFullYear() % 100}
`);

export const timeFormat = (dateTime: Date) => (`
    ${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}
`);

export const dateTimeFormat = (dateTime: Date) => (`
    ${dateFormat(dateTime)} ${timeFormat(dateTime)} 
`);