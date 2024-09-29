export function formatString(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/^[a-z]/, (match) => match.toUpperCase());
}
