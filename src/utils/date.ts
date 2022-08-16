// date helpers

const today = new Date();
const todayLastYear = new Date(
  today.getFullYear() - 1,
  today.getMonth(),
  today.getDate(),
);

const twentyYearsAgo = new Date(
  today.getFullYear() - 26,
  today.getMonth(),
  today.getDate(),
);

const todayNextYear = new Date(
  today.getFullYear() + 1,
  today.getMonth(),
  today.getDate(),
);
const endOfThisYear = new Date(today.getFullYear(), 11, 31);

// check if date is in the future by 1+ day
const isFuture = (date: Date): boolean => {
  return date > today;
};

// check if date is at least 18 years old
const atLeast18 = (date: Date): boolean => {
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  return date >= eighteenYearsAgo;
};

const getAge = (date: Date): number => {
  const diff = today.getTime() - date.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export {
  today,
  todayLastYear,
  twentyYearsAgo,
  todayNextYear,
  endOfThisYear,
  isFuture,
  atLeast18,
  getAge,
};
