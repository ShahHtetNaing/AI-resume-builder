
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

export const parseResumeText = async (rawText: string): Promise<ResumeData> => {
  // Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `ROLE: EXPERT RESUME PARSER.
    TASK: Extract EVERY SINGLE DETAIL from the provided resume text below. 
    STRICT RULES:
    1. DO NOT summarize. Extract all bullet points and descriptions fully.
    2. DO NOT omit any section (Work, Projects, Education, Volunteer, Honors, Langs, Refs).
    3. PRESERVE the original professional tone and formatting where possible.
    4. MAP every field accurately.
    5. Also look for Personal Info: Date of Birth, Gender, Race, Ethnicity if present.
    
    Raw Text to Parse:
    ---
    ${rawText}
    ---`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalInfo: {
            type: Type.OBJECT,
            properties: {
              fullName: { type: Type.STRING },
              email: { type: Type.STRING },
              phone: { type: Type.STRING },
              location: { type: Type.STRING },
              website: { type: Type.STRING },
              linkedin: { type: Type.STRING },
              summary: { type: Type.STRING },
              dob: { type: Type.STRING },
              nationality: { type: Type.STRING },
              gender: { type: Type.STRING },
              race: { type: Type.STRING },
              ethnicity: { type: Type.STRING }
            }
          },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                position: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                school: { type: Type.STRING },
                degree: { type: Type.STRING },
                year: { type: Type.STRING }
              }
            }
          },
          skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          certifications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                issuer: { type: Type.STRING },
                year: { type: Type.STRING }
              }
            }
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          interests: { type: Type.ARRAY, items: { type: Type.STRING } },
          volunteering: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                organization: { type: Type.STRING },
                role: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          honors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                issuer: { type: Type.STRING },
                date: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          languages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                proficiency: { type: Type.STRING }
              }
            }
          },
          publications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                publisher: { type: Type.STRING },
                date: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                title: { type: Type.STRING },
                text: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  const generateId = () => Math.random().toString(36).substr(2, 9);
  const addIds = (arr: any[]) => (arr || []).map(item => ({ ...item, id: item.id || generateId() }));

  parsed.experience = addIds(parsed.experience);
  parsed.education = addIds(parsed.education);
  parsed.projects = addIds(parsed.projects);
  parsed.certifications = addIds(parsed.certifications);
  parsed.volunteering = addIds(parsed.volunteering);
  parsed.honors = addIds(parsed.honors);
  parsed.languages = addIds(parsed.languages);
  parsed.publications = addIds(parsed.publications);
  parsed.recommendations = addIds(parsed.recommendations);
  
  if (!parsed.skills) parsed.skills = [];
  if (!parsed.interests) parsed.interests = [];
  
  return parsed;
};
