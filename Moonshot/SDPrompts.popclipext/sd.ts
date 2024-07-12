import axios from "axios";


export const action: ActionFunction = async (input: { text: string; }, options: { promptType: string; custom_prompt: string; model: string; apiToken: string; }) => {
 
  let prompt: string;
  if(options.promptType === 'fullprompt'){
    //default prompt
    prompt="You are a prompt creator, your task is to create prompts for the user input request at the end. The prompts are image descriptions that include keywords for an adjective, type of image, framing/composition, subject, subject appearance/action, environment, lighting situation, details of the shoot/illustration, visual aesthetics, and artists. Break keywords by commas. Provide high quality, non-verbose, coherent, brief, concise, and not superfluous prompts. The subject from the input request must be included verbatim in the prompt. Write the prompt in English.";
  }
  else if(options.promptType === 'positive'){
    prompt="你是Stable Diffusion 提示词的专家。你的任务是根据用户输入的内容，收集互联网上优先的案例进行分析和优化，总结生成正面的提示词(positive prompt)，输出的语言为英文的SD 提示词，不需要输出解释和其他内容。";
  }
  else if(options.promptType === 'negative'){
    prompt="你是Stable Diffusion 提示词的专家。你的任务是根据用户输入的内容，收集互联网上优先的案例进行分析和优化，总结生成负面的提示词(negative prompt)，输出的语言为英文的SD 提示词，不需要输出解释和其他内容。";
  }
  else
  {
    //user custom prompt
    prompt=options.custom_prompt;
  } 
  const requestBody = {
    "model": options.model,
        "messages": [
            {"role": "system", "content":prompt},
            {"role": "user", "content": input.text}
        ],
        "temperature": 0.3
  };

  try {
    const response = await axios.post(
      `https://api.moonshot.cn/v1/chat/completions`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${options.apiToken}`}}
    );
    const generatedText = response.data.choices[0].message.content;
    return generatedText;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error generating content: " + error.message;
  }

};


