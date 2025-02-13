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
  id: string;
  name: string;
  email: string;
  debt_amount: string;
  ref_code: string; /*6 character code used for customer authentication*/
}
client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
}

Output: please provide your response using only React Email components, do not return raw HTML.  
Your response should use ONLY React Email components (like Body, Container, Section, Text, etc) in the exact following format: 

export default function EmailTemplate({ customer, client }) {
/* styling constants /
return (
<Html>
/* rest of the template */
</Html>
);}

Do not include any explanations, imports, or additional code - just the component definition itself.`;
}
