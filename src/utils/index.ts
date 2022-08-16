export const isValidEmail = (email?: string) => {
  if (!email) return false;
  const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return regex.test(email.trim().toLowerCase());
};

export const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // add space between +1 and parenthesis around the area code
  const formattedPhoneNumber = phoneNumber.replace(
    /^(\+\d{1})(\d{3})(\d{3})(\d{4})$/,
    '$1 ($2) $3-$4',
  );
  return formattedPhoneNumber;
};
