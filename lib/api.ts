import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

export const getPrompt = async ({text , file}: {text:string , file:[]} ) => {
  // return fetch('')
  //   .then(res => res.json())
  //   .then(res => {
  //     return res;
  //   });
  const result = await model.generateContent(text)
  return result.response.text()
};