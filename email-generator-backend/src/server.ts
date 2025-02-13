import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

// Helper function for OpenAI generation
async function generateWithOpenAI(prompt: string, model: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  console.log('OpenAI Full Response:', JSON.stringify(data, null, 2));
  return data.choices[0].message.content;
}

// Helper function for Anthropic generation
async function generateWithAnthropic(prompt: string, model: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Anthropic API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  console.log('Anthropic Full Response:', JSON.stringify(data, null, 2));
  return data.content[0].text;
}

app.post('/api/generate', async (req, res) => {
  const { prompt, model, provider } = req.body;

  try {
    let content: string;

    switch (provider) {
      case 'openai':
        content = await generateWithOpenAI(prompt, model);
        break;
      case 'anthropic':
        content = await generateWithAnthropic(prompt, model);
        break;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }

    res.json({ content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate response',
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
