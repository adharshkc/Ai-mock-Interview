// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
  
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
// //   const safetySettings = [
// //     {
// //       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
// //       threshold: HarmBlockThreshold.BLOCK_HIGH_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_SELF_HARM,
// //       threshold: HarmBlockThreshold.BLOCK_HIGH_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_VIOLENCE,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_ADULT_CONTENT,
// //       threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_SPAM,
// //       threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_MISINFORMATION,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_ILLEGAL_ACTIVITY,
// //       threshold: HarmBlockThreshold.BLOCK_HIGH_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_PHISHING,
// //       threshold: HarmBlockThreshold.BLOCK_HIGH_AND_ABOVE,
// //     },
// //   ];
  
//  export const chatSession = model.startChat({
//       generationConfig,
//     //   safetySettings,
//     });


    const {
      GoogleGenerativeAI,
    } = require("@google/generative-ai");
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
    
    export const chatSession = model.startChat({
        generationConfig,
       
      });
    
  
  

  
