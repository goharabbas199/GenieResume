import type { Express } from "express";
import { type Server } from "http";
import { z } from "zod";
import { improveText, type ToneType } from "./openai";

const improveTextSchema = z.object({
  text: z.string().min(1, "Text is required"),
  tone: z.enum(['professional', 'ats-friendly', 'concise', 'expanded', 'creative']),
  fieldType: z.string().default('general'),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post('/api/improve-text', async (req, res) => {
    try {
      const parsed = improveTextSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: 'Invalid request', 
          details: parsed.error.errors 
        });
      }

      const { text, tone, fieldType } = parsed.data;
      
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
          error: 'OpenAI API key not configured' 
        });
      }

      const improvedText = await improveText(text, tone as ToneType, fieldType);
      
      res.json({ improvedText });
    } catch (error) {
      console.error('Error improving text:', error);
      res.status(500).json({ 
        error: 'Failed to improve text. Please try again.' 
      });
    }
  });

  return httpServer;
}
