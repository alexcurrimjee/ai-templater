export interface ModelConfig {
  provider: string;
  model: string;
  displayName: string;
}

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  'gpt-4o': {
    provider: 'openai',
    model: 'gpt-4o',
    displayName: 'GPT-4o',
  },
  'gpt-4o-mini': {
    provider: 'openai',
    model: 'gpt-4o-mini',
    displayName: 'GPT-4o mini',
  },
  'claude-3-5-sonnet': {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    displayName: 'Claude 3.5 Sonnet',
  },
};

/* Export models list for UI */
export const MODELS = Object.entries(MODEL_CONFIGS).map(([id, config]) => ({
  id,
  name: config.displayName,
}));
