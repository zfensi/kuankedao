export function splitComma(input: string): string[] {
  return input
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
}

