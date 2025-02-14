import { MODEL_CONFIGS } from './modelConfigs';
import { API_URL } from '@/utils/api';

interface GenerateTemplateResponse {
  content: string;
  error?: string;
}

export async function generateTemplate(prompt: string, modelId: string): Promise<GenerateTemplateResponse> {
  const config = MODEL_CONFIGS[modelId];

  if (!config) {
    return { content: '', error: 'Invalid model selected' };
  }

  try {
    const response = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: config.model,
        provider: config.provider,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate response');
    }

    const data = await response.json();
    return { content: data.content };
  } catch (error) {
    console.error('Generation error:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Failed to generate response',
    };
  }
}
