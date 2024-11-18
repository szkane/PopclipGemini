// #popclip extension for Google Gemini
// name: Gemini Spelling&Grammar
// icon: "iconify:ic:round-fact-check"
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey, label: API Key, type: string,
//   description: 'Obtain API key from Google Cloud Console'
// },
// {
//    identifier: model, label: 'model', type: multiple,
//    values:['gemini-1.5-flash-latest','gemini-1.5-pro-latest','gemini-1.0-pro']
//  }, {
//   identifier: prompt, label: 'Spelling and Grammar Prompt', type: string,
//   defaultValue: "",
//   description: 'Enter the prompt template using {input} as a placeholder for the text'
// }]

const axios = require("axios");

async function generateContent(input, options) {
  
  let prompt;
  if(options.prompt.length === 0){
     prompt="I will give you text content, you will correct the spelling, syntax and grammar of this text. Correct any spelling, syntax, or grammar mistakes in the text I give you without making any improvements or changes to the original meaning or style. In other words, only correct spelling, syntax, or grammar mistakes, do not make improvements. If the original text has no mistake,just output the original text and nothing else. Keep the meaning the same. Make sure the re-written content's number of words is the same as the original text's number of characters. Do not alter the original structure and formatting outlined in any way. Only give me the output and nothing else.Now, using the concepts above, re-write the following text. Respond in the same language variety or dialect of the following text:{input}";
  } 
  else{
     prompt=options.prompt;
  }
  prompt=options.prompt.replace('{input}', input.text);
  const requestBody = {
    "contents": [{
      "parts": [
        {"text": prompt}
      ]
    }],
    "safetySettings": [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_ONLY_HIGH"
      }
    ],
    "generationConfig": {
      "stopSequences": [
        "Title"
      ],
     "temperature": 1.0,
      "maxOutputTokens": 8192,
      "topP": 0.95,
      "topK": 64
    }
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${options.model}:generateContent?key=${options.apikey}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const generatedText = response.data.candidates[0].content.parts.map(part => part.text).join('\n');
    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error generating content: " + error.message;
  }
}

exports.actions = [{
  title: "Gemini Spelling&Grammar",
  after: "paste-result",
  code: async (input, options) => generateContent(input, options),
}];