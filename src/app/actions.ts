'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText, generateText } from 'ai';
import { groq } from '@/groq';


export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: groq('llama3-70b-8192'),
    prompt: question,
  });

  return { text, finishReason, usage };
}
export async function generate(input: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model:  groq('llama3-70b-8192'),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: groq('llama3-70b-8192'),
    messages,
  });
  const data = { test: 'hello' };
  const stream = createStreamableValue(result.textStream);
  return { message: stream.value, data };
}