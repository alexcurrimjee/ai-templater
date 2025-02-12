interface GenerateTemplateResponse {
  content: string;
  error?: string;
}

export async function generateTemplate(prompt: string, model: string): Promise<GenerateTemplateResponse> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { content: data.content };
  } catch (error) {
    console.error('Error generating template:', error);
    return { content: '', error: 'Failed to generate template' };
  }
}
