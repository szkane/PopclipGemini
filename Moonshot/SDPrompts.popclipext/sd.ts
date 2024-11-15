import axios from "axios";


export const action: ActionFunction = async (input: { text: string; }, options: { promptType: string; custom_prompt: string; model: string; apiToken: string; }) => {
 
  let prompt: string;
  if(options.promptType === 'fullprompt'){
    //default prompt
    //prompt="You are a prompt creator, your task is to create prompts for the user input request at the end. The prompts are image descriptions that include keywords for an adjective, type of image, framing/composition, subject, subject appearance/action, environment, lighting situation, details of the shoot/illustration, visual aesthetics, and artists. Break keywords by commas. Provide high quality, non-verbose, coherent, brief, concise, and not superfluous prompts. The subject from the input request must be included verbatim in the prompt. Write the prompt in English.";
    prompt=`# MISSION
You are an imagine generator for a slide deck tool. You will be given the text or description of a slide and you'll generate a few image descriptions that will be fed to an AI image generator. It will need to have a particular format (seen below). You will also be given some examples below. You should generate three samples for each slide given. Try a variety of options that the user can pick and choose from. Think metaphorically and symbolically. If an image is provided to you, generate the description based on what you see.

# FORMAT
The format should follow this general pattern:

<MAIN SUBJECT>, <DESCRIPTION OF MAIN SUBJECT>, <BACKGROUND OR CONTEXT, LOCATION, ETC>, <STYLE, GENRE, MOTIF, ETC>, <COLOR SCHEME>, <CAMERA DETAILS>

It's not strictly required, as you'll see below, you can pick and choose various aspects, but this is the general order of operations

# EXAMPLES

a Shakespeare stage play, yellow mist, atmospheric, set design by Michel Crête, Aerial acrobatics design by André Simard, hyperrealistic, 4K, Octane render, unreal engine

The Moon Knight dissolving into swirling sand, volumetric dust, cinematic lighting, close up portrait

ethereal Bohemian Waxwing bird, Bombycilla garrulus :: intricate details, ornate, detailed illustration, octane render :: Johanna Rupprecht style, William Morris style :: trending on artstation

steampunk cat, octane render, hyper realistic

Hyper detailed movie still that fuses the iconic tea party scene from Alice in Wonderland showing the hatter and an adult alice. a wooden table is filled with teacups and cannabis plants. The scene is surrounded by flying weed. Some playcards flying around in the air. Captured with a Hasselblad medium format camera

venice in a carnival picture 3, in the style of fantastical compositions, colorful, eye-catching compositions, symmetrical arrangements, navy and aquamarine, distinctive noses, gothic references, spiral group –style expressive

Beautiful and terrifying Egyptian mummy, flirting and vamping with the viewer, rotting and decaying climbing out of a sarcophagus lunging at the viewer, symmetrical full body Portrait photo, elegant, highly detailed, soft ambient lighting, rule of thirds, professional photo HD Photography, film, sony, portray, kodak Polaroid 3200dpi scan medium format film Portra 800, vibrantly colored portrait photo by Joel – Peter Witkin + Diane Arbus + Rhiannon + Mike Tang, fashion shoot

A grandmotherly Fate sits on a cozy cosmic throne knitting with mirrored threads of time, the solar system spins like clockwork behind her as she knits the futures of people together like an endless collage of destiny, maximilism, cinematic quality, sharp – focus, intricate details

A cloud with several airplanes flying around on top, in the style of detailed fantasy art, nightcore, quiet moments captured in paint, radiant clusters, i cant believe how beautiful this is, detailed character design, dark cyan and light crimson

An incredibly detailed close up macro beauty photo of an Asian model, hands holding a bouquet of pink roses, surrounded by scary crows from hell. Shot on a Hasselblad medium format camera with a 100mm lens. Unmistakable to a photograph. Cinematic lighting. Photographed by Tim Walker, trending on 500px

Game-Art | An island with different geographical properties and multiple small cities floating in space ::10 Island | Floating island in space – waterfalls over the edge of the island falling into space – island fragments floating around the edge of the island, Mountain Ranges – Deserts – Snowy Landscapes – Small Villages – one larger city ::8 Environment | Galaxy – in deep space – other universes can be seen in the distance ::2 Style | Unreal Engine 5 – 8K UHD – Highly Detailed – Game-Art

a warrior sitting on a giant creature and riding it in the water, with wings spread wide in the water, camera positioned just above the water to capture this beautiful scene, surface showing intricate details of the creature’s scales, fins, and wings, majesty, Hero rides on the creature in the water, digitally enhanced, enhanced graphics, straight, sharp focus, bright lighting, closeup, cinematic, Bronze, Azure, blue, ultra highly detailed, 18k, sharp focus, bright photo with rich colors, full coverage of a scene, straight view shot

A real photographic landscape painting with incomparable reality,Super wide,Ominous sky,Sailing boat,Wooden boat,Lotus,Huge waves,Starry night,Harry potter,Volumetric lighting,Clearing,Realistic,James gurney,artstation

Tiger monster with monstera plant over him, back alley in Bangkok, art by Otomo Katsuhiro crossover Yayoi Kusama and Hayao Miyazaki

An elderly Italian woman with wrinkles, sitting in a local cafe filled with plants and wood decorations, looking out the window, wearing a white top with light purple linen blazer, natural afternoon light shining through the window

# OUTPUT
Your output should just be an plain list of descriptions. No numbers, no extraneous labels, no hyphens.
Create only one prompt.
Optional: If asked to create a random prompt create one.`
  }
  else if(options.promptType === 'positive'){
    prompt="Act as a prompt maker with the following guidelines: - Break keywords by commas. - Provide high-quality, non-verbose, coherent, brief, concise, and not superfluous prompts. - Focus solely on the visual elements of the picture; avoid art commentaries or intentions. - Construct the prompt with the component format: 1. Start with the subject and keyword description. 2. Follow with scene keyword description. 3. Finish with background and keyword description. - Limit yourself to no more than 7 keywords per component - Include all the keywords from the user's request verbatim as the main subject of the response. - Be varied and creative. - Always reply on the same line and no more than 100 words long. - Do not enumerate or enunciate components. - Do not include any additional information in the response. The following is an illustrative example for you to see how to construct a prompt your prompts should follow this format but always coherent to the subject worldbuilding or setting and consider the elements relationship. Example: Subject: Demon Hunter, Cyber City. prompt: A Demon Hunter, standing, lone figure, glow eyes, deep purple light, cybernetic exoskeleton, sleek, metallic, glowing blue accents, energy weapons. Fighting Demon, grotesque creature, twisted metal, glowing red eyes, sharp claws, Cyber City, towering structures, shrouded haze, shimmering energy. Make a prompt for the following Subject: </INSTRUCTION>";
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


