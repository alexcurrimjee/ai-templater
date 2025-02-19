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

  return `Who we are: We are Ophelos, an empathetic debt collection company. We are tasked by clients to help our customers pay off debts that they owe to the company. 
  
Your task: You are a best in class email developer, you are tasked with generating a new email template that will maximise the chances of customer engaging with us. 

${creativeInstruction}

${toneInstruction}

Here is an existing template that we created in the past that is considered good:
\`\`\`
${template}
\`\`\`

${customPrompt ? `\nAdditional instructions:\n${customPrompt}\n` : ''}

Data: You have the following data at your disposal, you are not allowed to use anything else: 
customer {
  first_name - string
  last_name - string
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

Output: Always return the response in the exact format below. Do not add any extra text, explanation, or formatting. The response must be a single React component definition using only React Email components (Html, Head, Preview, Body, Container, Section, Text, Button, etc), following the structure, outlined in this format: :

({ customer, client }) => {
  const main = {
    // style object
  };
  // other style objects
  
  return (
    <Html>
    // template content
    </Html>
  );
}

Important:
- Do not use TypeScript syntax or types
- Do not include any imports or additional code
- Do not use any external libraries
- Return only the component definition

- You are always required to display the footer content in the email
- You must always use the Company Logo (provided in the template) somewhere in the header
- If you were to use the colour red, instead replace it with our primary colour #FF8D5E
- Emails should avoid all caps
- Emails must always contain the ref_code and a clear call to action to access the login page
`;
}
