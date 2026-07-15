import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, userContext } = await req.json();

    // Ensure API key is configured
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(JSON.stringify({ error: 'Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const systemPrompt = `You are an elite, highly experienced AI Career Mentor and Senior Software Engineer. 
Your goal is to guide the user to become job-ready by answering their questions, debugging their code, and providing strategic roadmap advice.
Keep your responses concise, highly practical, and focused on modern best practices (React, Next.js, Node.js, AI, etc.).

Context about the user:
- Name: ${userContext?.name || 'User'}
- Goal Role: ${userContext?.careerGoal || 'Fullstack Developer'}
- Skills: ${(userContext?.skills || []).join(', ') || 'Beginner'}

Do NOT use markdown headers unnecessarily. Use bolding and code blocks where helpful. 
Respond directly to the user's latest query based on the conversation history.`;

    // Gemini strictly requires the first message to be from the user.
    // We strip out any leading 'assistant' messages from the conversation history.
    let validMessages = [...messages];
    while (validMessages.length > 0 && validMessages[0].role === 'assistant') {
      validMessages.shift();
    }

    const result = await streamText({
      model: google('gemini-flash-latest'),
      system: systemPrompt,
      messages: validMessages,
    });

    console.log('Sending text stream response...');
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return new Response(JSON.stringify({ error: error?.toString() || 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
