function removeTime(date: string): string {
    return date.split('T')[0];
}

function formatDate(locale: Intl.LocalesArgument, date?: string): string {
    if (!date) return '';
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString(locale, options);
}

export { formatDate, removeTime };