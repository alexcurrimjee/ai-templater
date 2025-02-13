import creativeLicenseData from '@/data/creativeLicense.json';
import toneData from '@/data/tone.json';

interface PromptParams {
  template: string;
  tone: number;
  creativeLicense: number;
  customPrompt?: string;
}

export function generatePrompt({ tone, template, creativeLicense, customPrompt = '' }: PromptParams): string {
  const creativeInstruction = `Your creative license: ${creativeLicenseData.levels[creativeLicense - 1].instruction}`;
  const toneInstruction = `The tone to use: ${toneData.levels[tone - 1].instruction}`;

  return `We are Ophelos, an empathetic debt collection company. We are tasked by clients to help our customers pay off debts that they owe to the company. You are tasked with generating email templates that will maximise the chances of customer engaging.

${creativeInstruction}

${toneInstruction}
${customPrompt ? `\nAdditional instructions:\n${customPrompt}\n` : ''}
Template (existing template that we consider as good):
\`\`\`jsx
${template}
\`\`\`

Data: You have the following data at your disposal, you are not allowed to use anything else: 
customer {
  name - string
  email - string
  debt_amount - string
  ref_code - string (6 character code used for customer authentication)
}
client {
  name - string
  logo - string
  industry - string
  website - string
}

Output: Please provide a simple React Email template. Use ONLY React Email components (Html, Head, Preview, Body, Container, Section, Text, Button, etc). Return ONLY the component definition in this exact format:

({ customer, client }) => {
  const main = {
    // style object
  };
  // other style objects
  
  return (
  <Tailwind>
    <Html>
    // template content
    </Html>
  </Tailwind>
  );
}

Important:
- Do not use TypeScript syntax or types
- Do not include any imports or additional code
- Do not use any external libraries
- Do not include character escape sequences
- Return only the component definition

- You are required to display the footer content exactly as it is
- You must always use the Ophelos Logo somewhere in the header
- You are not allowed to use the colour red or uppercase text

- Your <Body> & <Container> components must follow the same styling as the template
- You should try to make this as visually appealing as possible
`;
}
