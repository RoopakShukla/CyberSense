import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro', 
  systemInstruction: "The system's primary task is to process unstructured cybersecurity audit reports and provide structured, summarized outputs containing actionable insights for decision-making. It should use advanced NLP techniques to interpret the report content, extracting key elements such as findings, issues, and recommendations. The system must offer chat-based, real-time answers to decision-related queries. It should output data in a structured format (e.g., JSON) or provide succinct summaries while maintaining conversational context if previous interactions are provided. In the case of incomplete or ambiguous inputs, the system should prompt for user clarification before proceeding"
});

export const getPrompt = async ({text , file}: {text:string , file:[]} ) => {
  const chat = await model.startChat()
  const result = await chat.sendMessage(text)
  console.log(result.response.text())
  return chat.getHistory();
};