// src/utils/cleanResponse.ts
export function cleanGeneratedCode(response: string): string {
  return response
    .replace(/```jsx\n/, '') // Remove opening jsx fence
    .replace(/```\n?$/, '') // Remove closing fence
    .replace(/\\n/g, '\n') // Replace literal \n with actual newlines
    .replace(/\\"/g, '"')
    .replace(/export default /, '')
    .replace(/const EmailTemplate = /, '')
    .trim(); // Clean up any extra whitespace
}
