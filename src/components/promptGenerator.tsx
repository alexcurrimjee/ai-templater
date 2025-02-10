import { renderToString } from 'react-dom/server';
import creativeLicenseData from '@/templates/creativeLicense.json';

interface PromptParams {
  template: React.ReactNode;
  creativeLicense: number;
  customPrompt?: string;
}

export function generatePrompt({ template, creativeLicense, customPrompt = '' }: PromptParams): string {
  const instruction = creativeLicenseData.levels[creativeLicense - 1].instruction;

  // Convert template to string representation of React components
  const templateString = template ? renderToString(template) : '';

  return `You are tasked with creating an email using React Email components. Your response should use ONLY React Email components (like Body, Container, Section, Text, etc).

${instruction}

Template structure (in React Email components):
\`\`\`jsx
${templateString}
\`\`\`

Please provide your response using only React Email components. Do not return raw HTML. Your response should be in the format:

import { Body, Container, Section, Text ... } from '@react-email/components';

export default function Email() {
  return (
    // Your React Email components here
  );
}

${customPrompt ? `\nAdditional Instructions:\n${customPrompt}` : ''}`;
}
