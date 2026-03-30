import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }
  
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  
  return openaiClient;
}

export type ToneType = 'professional' | 'ats-friendly' | 'concise' | 'expanded' | 'creative';

const tonePrompts: Record<ToneType, string> = {
  'professional': 'Rewrite the following text in a professional, formal business tone. Use industry-standard terminology and maintain a confident, authoritative voice.',
  'ats-friendly': 'Rewrite the following text to be optimized for Applicant Tracking Systems (ATS). Use clear keywords, avoid complex formatting, and include action verbs and quantifiable achievements where possible.',
  'concise': 'Rewrite the following text to be more concise and impactful. Remove unnecessary words while preserving the key message and achievements.',
  'expanded': 'Expand the following text with more detail and context. Add relevant specifics, metrics, and accomplishments while maintaining professionalism.',
  'creative': 'Rewrite the following text with a more creative and memorable approach while keeping it professional. Make it stand out while highlighting key strengths.',
};

export async function improveText(text: string, tone: ToneType, fieldType: string): Promise<string> {
  const openai = getOpenAIClient();
  
  const systemPrompt = `You are an expert resume writer and career coach. Your task is to improve resume content to help job seekers land their dream jobs. 

${tonePrompts[tone]}

Field type being improved: ${fieldType}

Guidelines:
- Keep the improved text roughly similar in length unless the tone is "expanded" or "concise"
- Maintain factual accuracy - don't invent details
- Use active voice and strong action verbs
- For job descriptions, focus on achievements and impact
- For summaries, highlight unique value propositions
- Return ONLY the improved text, no explanations or additional commentary`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text }
    ],
    max_completion_tokens: 1024,
  });

  return response.choices[0].message.content || text;
}
