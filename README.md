![Popclip Gemini AI Writing Extension](res/banner.png 'Banner')

# Popclip Gemini AI Writing Extension

Popclip Extension: AI writing extension by Google Gemini.

Inspired by Notion AI, Prompt Reference from [developnsolve](https://developnsolve.com/notion-ai-prompts-for-better-writing#heading-improve-writing)

# Demo

![DEMO](res/shot_demo.gif 'demo')

# Features

- We have introduced support for the large model API offered by MoonShot AI in China.
- We have developed a Popclip extension that facilitates the generation of prompt suggestions for Stable Diffusion, enhancing the efficiency of newcomers to the platform, leveraging the capabilities of MoonShot AI.
- We have also developed a Popclip extension featuring a translation agent powered by the expertise of Andrew Ng, utilizing MoonShot AI's technology.
- Our new plugins come with an easy-to-recognize "popclipext" suffix, allowing for straightforward installation. Users who wish to customize the plugins can easily do so by forking the repository.

1.  新增对 MoonShot AI （中国）的大模型 API 支持
2.  新增 Stable Diffusion 的 prompt 生成提示词生成的 Popclip 插件，新手玩 SD 效率工具，使用 moonshot AI
3.  新增 吴恩达大师 的翻译 agent 的 Popclip 插件，使用 moonshot AI
4.  新做插件打包成 popclipext 后缀，支持直接安装，需要修改代码可以自己 fork 来修改

# Installation method

First,install Popclip app on your Mac. then you can install extentions.

Open the extension file you need, select all content to install the plugin.

| File                                             | Description                                                                        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [SDPrompts.popclipext](SDPrompts.popclipext)     | Moonshot AI Stable Diffusion Prompt generation                                     |
| [translation.popclipext](translation.popclipext) | Moonshot AI translate agent Inspired by Andrew Ng translation agent and the X user |
| [ImproveWriting.js](ImproveWriting.js)           | Gemini AI help you to improve your writing                                         |
| [MakeLonger.js](MakeLonger.js)                   | Gemini AI help you make your writing longer                                        |
| [MakeShorter.js](MakeShorter.js)                 | Gemini AI help you make your writing shorter                                       |
| [SpellingGrammar.js](SpellingGrammar.js)         | Gemini AI help you to check your spelling and grammar                              |
| [Translate.js](Translate.js)                     | Gemini AI translate                                                                |

![Install extension](res/shot_installextension.png 'How to install')

You can rewrite the prompt in each extension setting when you installed.
![custom prompt](res/shot_prompt.png 'Rewrite prompt')

# Here to Get a Google Gemini key

Google Gemini api key [https://aistudio.google.com/app/apikey ](https://aistudio.google.com/app/apikey)

# Here to Get a Moonshot AI key （KIMI AI 月之暗面）

[https://platform.moonshot.cn/](https://platform.moonshot.cn/)

个人用户需要实名认证，送 15 元的使用额度

## Update

| Date   | Description                                                                |
| ------ | -------------------------------------------------------------------------- |
| 16 MAY | add model options, support Gemini gemini-1.5-flash-latest                  |
| 26 MAR | update icon and add language options for Gemini translate extension        |
| 22 MAR | try to make a popclip extension with Gemini AI by javascript               |
| 12 JUL | support for the large model API offered by MoonShot AI, two new extensions |
