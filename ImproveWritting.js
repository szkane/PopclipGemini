// #popclip extension for Google Gemini
// name: Gemini Improve Writing
// icon: "square filled IW"
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey, label: API Key, type: string,
//   description: 'Obtain API key from Google Cloud Console'
// }, {
//   identifier: prompt, label: 'Improve Writing Prompt', type: string,
//   defaultValue: "You will rewrite the text and output a better version of my text. Keep the meaning the same. Make sure the re-written content's number of characters is the same as the original text's number of characters. Do not alter the original structure and formatting outlined in any way.  Now, using the concepts above, re-write the following text. Respond in the same language variety or dialect of the following text:{input}",
//   description: 'Enter the prompt template using {input} as a placeholder for the text'
// }]

const axios = require("axios");

async function generateContent(input, options) {
  options.prompt.replace('{input}', input.text);
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
      "maxOutputTokens": 800,
      "topP": 0.8,
      "topK": 10
    }
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${options.apikey}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const generatedText = response.data.candidates[0].content.parts.map(part => part.text).join('\n');
    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    print(error.message);
    return "Error generating content: " + error.message;
  }
}

exports.actions = [{
  title: "Generate with Google Gemini",
  after: "paste-result",
  code: async (input, options) => generateContent(input, options),
}];