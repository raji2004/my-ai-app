// app/api/chat/route.ts

import { streamText,StreamData } from 'ai'
import { groq } from '@/groq';


export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Get a language model
  const model = groq('llama3-70b-8192')

  const data = new StreamData();
  data.append({test: 'value'});

  // Call the language model with the prompt
  const result = await streamText({
    model,
    messages,
    maxTokens: 1000,
    temperature: 0.5,
    topP: 1,
    frequencyPenalty: 1,
    onFinish(){
      data.close();
    }
  })

  // Respond with a streaming response
  return result.toDataStreamResponse({data});
}
