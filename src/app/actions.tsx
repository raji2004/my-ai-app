'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { groq } from '@/groq';



export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: groq('llama3-70b-8192'),
    messages,
  });
  const data = { test: 'hello' };
  const stream = createStreamableValue(result.textStream);
  return { message: stream.value, data };
}