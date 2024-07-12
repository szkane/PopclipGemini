// #popclip extension for Moonshot
// name: Moonshot Translate
// icon: "circle filled T"
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey, label: API Key, type: string,
//   description: 'Obtain API key from Google Cloud Console'
// },
// {
//    identifier: model, label: 'model', type: multiple,
//    values:['moonshot-v1-8k','moonshot-v1-32k','moonshot-v1-128k']
//  }, {
//   identifier: prompt, label: 'Translate Prompt', type: string,
//   defaultValue: "I will give you text content, you will rewrite it and translate the text into {lang} language. Keep the meaning the same. Do not alter the original structure and formatting outlined in any way. Only give me the output and nothing else.",
//   description: 'Enter the prompt template using {lang} as a placeholder for the text'
// },{
//    identifier: tolang, label: 'Language', type: multiple,
//    values:['English','Chinese','Russian','French','Português','Spanish'],
//    description: 'The language to be translated'
// }]


const axios = require("axios");

async function generateContent(input, options) {
  const prompt=options.prompt.replace('{lang}',options.tolang);
  const userinput=input.text;
  const requestBody = {
    "model": "moonshot-v1-8k",
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": userinput}
        ],
        "temperature": 0.3
  };

  try {
    const response = await axios.post(
      `https://api.moonshot.cn/v1/chat/completions`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${options.apikey}`}}
    );

    const generatedText = response.data.choices[0].message.content;
    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error generating content: " + error.message;
  }
}

exports.actions = [{
  title: "Moonshot Translate",
  after: "paste-result",
  code: async (input, options) => generateContent(input, options),
}];