export const formatName = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^[_\s]+|[_\s]+$/g, '') // Trim underscores and spaces from start/end
    .replace(/[_\s]+/g, ' ') // Replace multiple underscores/spaces with single space
    .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize first letter of each word
    .replace(/\B\w/g, c => c.toLowerCase()); // Lowercase rest of letters
}; 

export const secretName = (name: string): string => {
  return formatName(name).replace(/[^\s]/g, '_');
};