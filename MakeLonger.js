// #popclip extension for Google Gemini
// name: Gemini Make Longer
// icon: "iconify:mdi:file-plus"
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey, label: API Key, type: string,
//   description: 'Obtain API key from Google Cloud Console'
// }, {
//   identifier: prompt, label: 'Make Longer Prompt', type: string,
//   defaultValue: "I'll give you text. You'll rewrite it and output it longer Keep the meaning the same as well as the language. Only give me the output and nothing else. Now, using the concepts above, re-write the following text. Respond in the same language variety or dialect of the following text:{input}",
//   description: 'Enter the prompt template using {input} as a placeholder for the text'
// }]

const axios = require("axios");

async function generateContent(input, options) {
  const prompt=options.prompt.replace('{input}', input.text);
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
    return "Error generating content: " + error.message;
  }
}

exports.actions = [{
  title: "Gemini Make Longer",
  after: "paste-result",
  code: async (input, options) => generateContent(input, options),
}];