function formatDate(dateInput) {
  if (!dateInput || dateInput === 'null') return '';

  const date = new Date(dateInput);
  const weekday = date.toLocaleDateString('en-GB', {weekday: 'long'});
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', {month: 'long'});
  const year = date.getFullYear();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
          ? 'rd'
          : 'th';

  return `${weekday} ${day}${suffix} ${month} ${year}`;
}

export default formatDate;
