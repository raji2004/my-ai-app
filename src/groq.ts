import { createOpenAI } from '@ai-sdk/openai'


export const groq = createOpenAI({ 
    apiKey: process.env.GROQ_API_KEY!,
    baseURL: 'https://api.groq.com/openai/v1'
  })
  