const categories = [
  {
    name: "AI 工具",
    slug: "ai-tools",
    subcategories: ["AI 对话助手", "AI 音乐生成", "AI 编程工具"],
    subcategorySlugs: {
      "AI 对话助手": "ai-chat",
      "AI 音乐生成": "ai-music",
      "AI 编程工具": "ai-coding",
    },
  },
  {
    name: "海外数字服务",
    slug: "overseas-services",
    subcategories: ["流媒体娱乐"],
    subcategorySlugs: {
      流媒体娱乐: "streaming",
    },
  },
];

const toolIcons = {
  claude: "/tool-icons/claude.png",
  chatgpt: "/tool-icons/chatgpt.svg",
  poe: "/tool-icons/poe.ico",
  "google-ai": "/tool-icons/google-ai-studio.svg",
  notebooklm: "/tool-icons/notebooklm.svg",
  suno: "/tool-icons/suno.ico",
  "claude-code": "/tool-icons/claude.png",
  spotify: "/tool-icons/spotify.ico",
};

const tools = [
  {
    id: "claude",
    slug: "claude",
    name: "Claude",
    description: "Anthropic 推出的对话式 AI 助手，适合长文本理解、写作、分析和代码协作。",
    category: "AI 工具",
    subcategory: "AI 对话助手",
    featured: true,
    iconText: "C",
    icon: toolIcons.claude,
    accent: "#d97706",
    tags: ["AI 对话助手", "长文本分析", "代码协作"],
    externalUrl: "https://claude.ai/",
    url: "https://claude.ai/",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "Claude 是 Anthropic 推出的对话式 AI 助手，适合长文本阅读、写作润色、资料分析和代码协作。站内已有教程主要覆盖国内注册、订阅与替代访问方式。",
      "## 核心功能",
      "- 长文本阅读与摘要：可用于梳理文档、提炼要点和生成结构化输出。",
      "- 写作与改写：支持中文内容润色、提纲生成和多轮修改。",
      "- 编程辅助：可解释代码、生成脚本、协助排查错误。",
      "- 多模态理解：支持图片和文档等输入能力，具体入口与额度以官网为准。",
      "## 官网入口",
      "访问 Claude 官网注册或登录；国内使用细节请优先参考下方相关教程。",
    ].join("\n"),
  },
  {
    id: "chatgpt",
    slug: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI 推出的通用 AI 助手，适合问答、写作、代码、数据分析和多模态任务。",
    category: "AI 工具",
    subcategory: "AI 对话助手",
    featured: true,
    iconText: "GPT",
    icon: toolIcons.chatgpt,
    accent: "#10a37f",
    tags: ["AI 对话助手", "写作", "代码"],
    externalUrl: "https://chatgpt.com/",
    url: "https://chatgpt.com/",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "ChatGPT 是 OpenAI 推出的通用 AI 助手，可用于问答、写作、代码、学习和多模态任务。国内用户通常更关注账号、订阅和稳定访问方式。",
      "## 核心功能",
      "- 内容生成：生成文章、提纲、邮件、脚本和营销文案。",
      "- 编程辅助：解释代码、生成示例、辅助调试和测试思路。",
      "- 学习问答：围绕概念、资料和题目进行多轮解释。",
      "- 文件与多模态：部分版本支持文件、图片或语音相关能力，具体以官方入口为准。",
      "## 官网入口",
      "访问 ChatGPT 官网开始使用；订阅与支付方案请结合站内教程核对。",
    ].join("\n"),
  },
  {
    id: "poe",
    slug: "poe",
    name: "Poe",
    description: "Quora 推出的多模型 AI 对话平台，可在一个入口体验多种主流模型。",
    category: "AI 工具",
    subcategory: "AI 对话助手",
    featured: false,
    iconText: "Poe",
    icon: toolIcons.poe,
    accent: "#111827",
    tags: ["多模型", "AI 对话助手"],
    externalUrl: "https://poe.com/",
    url: "https://poe.com/",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "Poe 是 Quora 推出的多模型对话平台，适合在一个界面中切换不同 AI 助手。站内教程覆盖国内订阅、API Key 和替代访问思路。",
      "## 核心功能",
      "- 多模型聚合：在同一平台访问不同厂商的对话模型。",
      "- Bot 创建：按任务配置自定义机器人和提示词。",
      "- API Key：面向部分开发和自动化场景提供接口能力。",
      "- 订阅管理：通过统一账户管理额度和高级能力。",
      "## 官网入口",
      "访问 Poe 官网注册或登录；国内订阅方式见相关教程。",
    ].join("\n"),
  },
  {
    id: "google-ai",
    slug: "google-ai-studio",
    name: "Google AI Studio",
    description: "Google 的模型实验与提示词调试平台，适合体验 Gemini 与构建原型。",
    category: "AI 工具",
    subcategory: "AI 对话助手",
    featured: false,
    iconText: "G",
    icon: toolIcons["google-ai"],
    accent: "#4285f4",
    tags: ["Gemini", "提示词调试", "原型开发"],
    externalUrl: "https://aistudio.google.com/",
    url: "https://aistudio.google.com/",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "Google AI Studio 是 Google 面向开发者和创作者的模型实验平台，适合调试提示词、测试多模态输入和快速搭建原型。",
      "## 核心功能",
      "- 模型测试：在网页中快速比较提示词效果。",
      "- 多模态输入：围绕文本、图片等材料进行实验。",
      "- API 原型：生成可复制的调用示例，便于接入应用。",
      "- 应用草稿：适合把简单想法快速验证成可运行 demo。",
      "## 官网入口",
      "访问 Google AI Studio 官网，结合站内教程完成登录和基础使用。",
    ].join("\n"),
  },
  {
    id: "notebooklm",
    slug: "notebooklm",
    name: "NotebookLM",
    description: "Google 的 AI 笔记与资料理解工具，适合基于文档做问答、摘要和音频概览。",
    category: "AI 工具",
    subcategory: "AI 对话助手",
    featured: true,
    iconText: "N",
    icon: toolIcons.notebooklm,
    accent: "#0f766e",
    tags: ["知识管理", "文档问答", "音频概览"],
    externalUrl: "https://notebooklm.google.com/",
    url: "https://notebooklm.google.com/",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "NotebookLM 是 Google 的 AI 笔记工具，适合把资料导入后进行问答、摘要和学习整理。站内教程重点介绍国内访问和常见使用流程。",
      "## 核心功能",
      "- 资料问答：围绕上传或导入的材料进行针对性提问。",
      "- 摘要整理：从长文档中提炼要点、时间线和学习指南。",
      "- 音频概览：可把资料整理成便于收听的讲解内容。",
      "- 引用追踪：回答通常会关联来源片段，便于复核。",
      "## 官网入口",
      "访问 NotebookLM 官网，结合站内教程导入资料并开始使用。",
    ].join("\n"),
  },
  {
    id: "suno",
    slug: "suno",
    name: "Suno",
    description: "AI 音乐生成工具，可根据歌词、风格和描述生成歌曲草稿。",
    category: "AI 工具",
    subcategory: "AI 音乐生成",
    featured: true,
    iconText: "S",
    icon: toolIcons.suno,
    accent: "#f97316",
    tags: ["AI 音乐生成", "歌曲创作"],
    externalUrl: "https://suno.com/",
    url: "https://suno.com/",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "Suno 是 AI 音乐生成工具，适合用文本描述、歌词和风格提示快速生成歌曲草稿。站内教程覆盖注册、基础创作和进阶提示词。",
      "## 核心功能",
      "- 文本生成歌曲：输入主题、风格或歌词生成音乐。",
      "- 自定义歌词：按段落组织歌词并控制歌曲方向。",
      "- 风格提示：通过类型、情绪和乐器描述调整结果。",
      "- 创作迭代：对已有结果继续延展或重新生成。",
      "- 商用授权与套餐额度：以 Suno 官方订阅页面的最新说明为准。",
      "## 官网入口",
      "访问 Suno 官网开始创作；国内订阅与使用注意事项见相关教程。",
    ].join("\n"),
  },
  {
    id: "claude-code",
    slug: "claude-code",
    name: "Claude Code",
    description: "面向开发者的命令行 AI 编程助手，可在终端中理解项目并协助修改代码。",
    category: "AI 工具",
    subcategory: "AI 编程工具",
    featured: true,
    iconText: "CC",
    icon: toolIcons["claude-code"],
    accent: "#111827",
    tags: ["AI 编程", "命令行", "代码协作"],
    externalUrl: "https://claude.com/product/claude-code",
    url: "https://claude.com/product/claude-code",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "Claude Code 是面向开发者的命令行 AI 编程助手，可在终端中读取项目上下文、解释代码并协助修改文件。站内教程介绍安装、启动和国产模型接入思路。",
      "## 核心功能",
      "- 项目理解：围绕仓库文件、命令输出和需求进行多轮协作。",
      "- 代码修改：按任务编辑文件并配合测试验证结果。",
      "- 终端工作流：在命令行中完成安装、运行、调试和复盘。",
      "- 模型接入：可结合兼容 Anthropic API 的服务进行实验。",
      "## 官网入口",
      "访问 Claude Code 官网了解官方安装方式；国内替代接入请参考相关教程。",
    ].join("\n"),
  },
  {
    id: "spotify",
    slug: "spotify",
    name: "Spotify",
    description: "海外流媒体音乐服务，提供曲库播放、歌单管理和 Premium 订阅。",
    category: "海外数字服务",
    subcategory: "流媒体娱乐",
    featured: true,
    iconText: "S",
    icon: toolIcons.spotify,
    accent: "#1db954",
    tags: ["流媒体娱乐", "音乐订阅"],
    externalUrl: "https://www.spotify.com/",
    url: "https://www.spotify.com/",
    lastReviewed: "2026-07-06",
    content: [
      "## 简介",
      "Spotify 是海外流媒体音乐服务，适合听歌、管理歌单和订阅 Premium。站内教程重点整理国内注册、订阅和常见支付方案。",
      "## 核心功能",
      "- 曲库播放：按歌手、专辑、歌单和推荐算法发现音乐。",
      "- 歌单管理：收藏、创建和分享个人歌单。",
      "- Premium 订阅：去广告、离线播放等权益以官方说明为准。",
      "- 多端同步：网页、移动端和桌面端可同步账户内容。",
      "- 地区套餐与礼品卡价格：以 Spotify 官方页面的当地信息为准。",
      "## 官网入口",
      "访问 Spotify 官网注册或登录；国内订阅方式见相关教程。",
    ].join("\n"),
  },
];

// Additional tools covered by published tutorials. Existing entries and slugs stay unchanged.
for (const [name, slug] of Object.entries({
  "AI 开发辅助": "ai-dev-tools",
  "AI 办公工具": "ai-office",
  "模型 API": "model-api",
  "图表与可视化": "visualization",
  "思维导图": "mind-mapping",
  "通讯服务": "communication",
  "邮箱与账号服务": "email-accounts",
  "应用商店": "app-stores"
})) {
  const category = categories.find((item) => item.name === (["通讯服务","邮箱与账号服务","应用商店"].includes(name) ? "海外数字服务" : "AI 工具"));
  category.subcategories.push(name);
  category.subcategorySlugs[name] = slug;
}
tools.push(...[
  {
    "id": "codex",
    "slug": "codex",
    "name": "OpenAI Codex",
    "description": "AI 编程助手，用于理解项目、编写代码和协助完成开发任务。",
    "category": "AI 工具",
    "subcategory": "AI 编程工具",
    "featured": false,
    "iconText": "CX",
    "accent": "#1677ff",
    "tags": [
      "代码生成",
      "项目开发"
    ],
    "externalUrl": "https://openai.com/codex/",
    "url": "https://openai.com/codex/",
    "content": "## 简介\nAI 编程助手，用于理解项目、编写代码和协助完成开发任务。\n## 适用场景\n- 代码生成\n- 项目开发\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "deepseek-harness",
    "slug": "deepseek-harness",
    "name": "DeepSeek Harness",
    "description": "可接入模型服务的开发工具，站内教程覆盖安装、模型配置与扩展使用。",
    "category": "AI 工具",
    "subcategory": "AI 编程工具",
    "featured": false,
    "iconText": "DSH",
    "accent": "#1677ff",
    "tags": [
      "模型接入",
      "开发工作流"
    ],
    "externalUrl": "https://github.com/deepseek-ai/deepseek-harness",
    "url": "https://github.com/deepseek-ai/deepseek-harness",
    "content": "## 简介\n可接入模型服务的开发工具，站内教程覆盖安装、模型配置与扩展使用。\n## 适用场景\n- 模型接入\n- 开发工作流\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "cc-switch",
    "slug": "cc-switch",
    "name": "CC Switch",
    "description": "用于管理 AI 编程工具的模型服务配置，减少手动切换配置的操作。",
    "category": "AI 工具",
    "subcategory": "AI 开发辅助",
    "featured": false,
    "iconText": "CC",
    "accent": "#1677ff",
    "tags": [
      "配置管理",
      "模型切换"
    ],
    "externalUrl": "https://ccswitch.io/zh/",
    "url": "https://ccswitch.io/zh/",
    "content": "## 简介\n用于管理 AI 编程工具的模型服务配置，减少手动切换配置的操作。\n## 适用场景\n- 配置管理\n- 模型切换\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "deepseek",
    "slug": "deepseek",
    "name": "DeepSeek",
    "description": "用于问答、内容整理与代码任务的 AI 服务，也提供模型 API 接入。",
    "category": "AI 工具",
    "subcategory": "AI 对话助手",
    "featured": false,
    "iconText": "DE",
    "accent": "#1677ff",
    "tags": [
      "资料整理",
      "模型 API"
    ],
    "externalUrl": "https://www.deepseek.com/",
    "url": "https://www.deepseek.com/",
    "content": "## 简介\n用于问答、内容整理与代码任务的 AI 服务，也提供模型 API 接入。\n## 适用场景\n- 资料整理\n- 模型 API\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "kimi",
    "slug": "kimi",
    "name": "Kimi",
    "description": "用于问答、资料阅读和内容创作的 AI 助手，站内教程包含演示文稿制作。",
    "category": "AI 工具",
    "subcategory": "AI 对话助手",
    "featured": false,
    "iconText": "KI",
    "accent": "#1677ff",
    "tags": [
      "资料阅读",
      "演示文稿"
    ],
    "externalUrl": "https://www.kimi.com/",
    "url": "https://www.kimi.com/",
    "content": "## 简介\n用于问答、资料阅读和内容创作的 AI 助手，站内教程包含演示文稿制作。\n## 适用场景\n- 资料阅读\n- 演示文稿\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "z-ai",
    "slug": "z-ai",
    "name": "Z.ai",
    "description": "面向问答和内容创作的 AI 应用，站内教程介绍演示文稿的生成与编辑。",
    "category": "AI 工具",
    "subcategory": "AI 办公工具",
    "featured": false,
    "iconText": "Z.",
    "accent": "#1677ff",
    "tags": [
      "演示文稿",
      "内容创作"
    ],
    "externalUrl": "https://chat.z.ai/",
    "url": "https://chat.z.ai/",
    "content": "## 简介\n面向问答和内容创作的 AI 应用，站内教程介绍演示文稿的生成与编辑。\n## 适用场景\n- 演示文稿\n- 内容创作\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "bigmodel",
    "slug": "bigmodel",
    "name": "智谱开放平台 BigModel",
    "description": "面向开发者的模型服务平台，可为编程助手和应用提供模型 API。",
    "category": "AI 工具",
    "subcategory": "模型 API",
    "featured": false,
    "iconText": "智谱",
    "accent": "#1677ff",
    "tags": [
      "GLM",
      "开发接入"
    ],
    "externalUrl": "https://www.bigmodel.cn/",
    "url": "https://www.bigmodel.cn/",
    "content": "## 简介\n面向开发者的模型服务平台，可为编程助手和应用提供模型 API。\n## 适用场景\n- GLM\n- 开发接入\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "napkin-ai",
    "slug": "napkin-ai",
    "name": "Napkin AI",
    "description": "将文字内容转为可视化图示，适合演示文稿中的概念说明与流程表达。",
    "category": "AI 工具",
    "subcategory": "图表与可视化",
    "featured": false,
    "iconText": "NA",
    "accent": "#1677ff",
    "tags": [
      "信息图",
      "图表制作"
    ],
    "externalUrl": "https://www.napkin.ai/",
    "url": "https://www.napkin.ai/",
    "content": "## 简介\n将文字内容转为可视化图示，适合演示文稿中的概念说明与流程表达。\n## 适用场景\n- 信息图\n- 图表制作\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "markmap",
    "slug": "markmap",
    "name": "Markmap",
    "description": "将 Markdown 层级大纲渲染成可交互的思维导图，适合整理 AI 生成的笔记。",
    "category": "AI 工具",
    "subcategory": "思维导图",
    "featured": false,
    "iconText": "MA",
    "accent": "#1677ff",
    "tags": [
      "Markdown",
      "大纲可视化"
    ],
    "externalUrl": "https://markmap.js.org/",
    "url": "https://markmap.js.org/",
    "content": "## 简介\n将 Markdown 层级大纲渲染成可交互的思维导图，适合整理 AI 生成的笔记。\n## 适用场景\n- Markdown\n- 大纲可视化\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "xmind",
    "slug": "xmind",
    "name": "XMind / XMind AI",
    "description": "用于制作和编辑思维导图，站内教程介绍导入 Markdown 大纲的工作流。",
    "category": "AI 工具",
    "subcategory": "思维导图",
    "featured": false,
    "iconText": "XM",
    "accent": "#1677ff",
    "tags": [
      "大纲整理",
      "知识管理"
    ],
    "externalUrl": "https://xmind.app/",
    "url": "https://xmind.app/",
    "content": "## 简介\n用于制作和编辑思维导图，站内教程介绍导入 Markdown 大纲的工作流。\n## 适用场景\n- 大纲整理\n- 知识管理\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "mapify",
    "slug": "mapify",
    "name": "Mapify",
    "description": "将资料整理为思维导图，适合快速梳理文档结构和学习重点。",
    "category": "AI 工具",
    "subcategory": "思维导图",
    "featured": false,
    "iconText": "MA",
    "accent": "#1677ff",
    "tags": [
      "资料总结",
      "学习笔记"
    ],
    "externalUrl": "https://mapify.so/",
    "url": "https://mapify.so/",
    "content": "## 简介\n将资料整理为思维导图，适合快速梳理文档结构和学习重点。\n## 适用场景\n- 资料总结\n- 学习笔记\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "gitmind",
    "slug": "gitmind",
    "name": "GitMind",
    "description": "用于创建、编辑和整理思维导图，适合中文资料梳理与头脑风暴。",
    "category": "AI 工具",
    "subcategory": "思维导图",
    "featured": false,
    "iconText": "GI",
    "accent": "#1677ff",
    "tags": [
      "头脑风暴",
      "知识整理"
    ],
    "externalUrl": "https://gitmind.cn/",
    "url": "https://gitmind.cn/",
    "content": "## 简介\n用于创建、编辑和整理思维导图，适合中文资料梳理与头脑风暴。\n## 适用场景\n- 头脑风暴\n- 知识整理\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "wps-ai",
    "slug": "wps-ai",
    "name": "WPS AI",
    "description": "WPS 办公场景中的 AI 助手，用于辅助处理文档、整理内容和生成大纲。",
    "category": "AI 工具",
    "subcategory": "AI 办公工具",
    "featured": false,
    "iconText": "WP",
    "accent": "#1677ff",
    "tags": [
      "文档处理",
      "办公效率"
    ],
    "externalUrl": "https://ai.wps.cn/",
    "url": "https://ai.wps.cn/",
    "content": "## 简介\nWPS 办公场景中的 AI 助手，用于辅助处理文档、整理内容和生成大纲。\n## 适用场景\n- 文档处理\n- 办公效率\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "openrouter",
    "slug": "openrouter",
    "name": "OpenRouter",
    "description": "提供多家模型的聚合 API，适合为兼容客户端和应用配置模型服务。",
    "category": "AI 工具",
    "subcategory": "模型 API",
    "featured": false,
    "iconText": "OP",
    "accent": "#1677ff",
    "tags": [
      "多模型",
      "API 聚合"
    ],
    "externalUrl": "https://openrouter.ai/",
    "url": "https://openrouter.ai/",
    "content": "## 简介\n提供多家模型的聚合 API，适合为兼容客户端和应用配置模型服务。\n## 适用场景\n- 多模型\n- API 聚合\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "cursor",
    "slug": "cursor",
    "name": "Cursor",
    "description": "集成 AI 辅助能力的代码编辑器，用于代码理解、编写与项目修改。",
    "category": "AI 工具",
    "subcategory": "AI 编程工具",
    "featured": false,
    "iconText": "CU",
    "accent": "#1677ff",
    "tags": [
      "代码编辑器",
      "开发效率"
    ],
    "externalUrl": "https://cursor.com/",
    "url": "https://cursor.com/",
    "content": "## 简介\n集成 AI 辅助能力的代码编辑器，用于代码理解、编写与项目修改。\n## 适用场景\n- 代码编辑器\n- 开发效率\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "telegram",
    "slug": "telegram",
    "name": "Telegram",
    "description": "支持聊天、群组和频道的通讯服务，站内教程介绍注册与账号设置。",
    "category": "海外数字服务",
    "subcategory": "通讯服务",
    "featured": false,
    "iconText": "TE",
    "accent": "#1677ff",
    "tags": [
      "即时通讯",
      "频道"
    ],
    "externalUrl": "https://telegram.org/",
    "url": "https://telegram.org/",
    "content": "## 简介\n支持聊天、群组和频道的通讯服务，站内教程介绍注册与账号设置。\n## 适用场景\n- 即时通讯\n- 频道\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "proton-mail",
    "slug": "proton-mail",
    "name": "Proton Mail",
    "description": "提供电子邮件收发与账号管理，站内教程包含邮箱注册步骤。",
    "category": "海外数字服务",
    "subcategory": "邮箱与账号服务",
    "featured": false,
    "iconText": "PM",
    "accent": "#1677ff",
    "tags": [
      "电子邮箱",
      "邮件管理"
    ],
    "externalUrl": "https://proton.me/mail",
    "url": "https://proton.me/mail",
    "content": "## 简介\n提供电子邮件收发与账号管理，站内教程包含邮箱注册步骤。\n## 适用场景\n- 电子邮箱\n- 邮件管理\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "tuta-mail",
    "slug": "tuta-mail",
    "name": "Tuta Mail",
    "description": "电子邮箱服务，是站内海外邮箱教程列出的候选邮箱之一。",
    "category": "海外数字服务",
    "subcategory": "邮箱与账号服务",
    "featured": false,
    "iconText": "T",
    "accent": "#1677ff",
    "tags": [
      "电子邮箱",
      "邮件管理"
    ],
    "externalUrl": "https://tuta.com/secure-email",
    "url": "https://tuta.com/secure-email",
    "content": "## 简介\n电子邮箱服务，是站内海外邮箱教程列出的候选邮箱之一。\n## 适用场景\n- 电子邮箱\n- 邮件管理\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "icloud-mail",
    "slug": "icloud-mail",
    "name": "iCloud Mail",
    "description": "Apple 的电子邮箱服务，适合已有 Apple 账号的用户管理邮件。",
    "category": "海外数字服务",
    "subcategory": "邮箱与账号服务",
    "featured": false,
    "iconText": "iC",
    "accent": "#1677ff",
    "tags": [
      "电子邮箱",
      "Apple 生态"
    ],
    "externalUrl": "https://www.icloud.com/mail/",
    "url": "https://www.icloud.com/mail/",
    "content": "## 简介\nApple 的电子邮箱服务，适合已有 Apple 账号的用户管理邮件。\n## 适用场景\n- 电子邮箱\n- Apple 生态\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "gmail",
    "slug": "gmail",
    "name": "Gmail / Google 账号",
    "description": "Google 的电子邮箱服务，可配合 Google 账号使用相关应用。",
    "category": "海外数字服务",
    "subcategory": "邮箱与账号服务",
    "featured": false,
    "iconText": "G",
    "accent": "#1677ff",
    "tags": [
      "电子邮箱",
      "Google 账号"
    ],
    "externalUrl": "https://mail.google.com/",
    "url": "https://mail.google.com/",
    "content": "## 简介\nGoogle 的电子邮箱服务，可配合 Google 账号使用相关应用。\n## 适用场景\n- 电子邮箱\n- Google 账号\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "google-play",
    "slug": "google-play",
    "name": "Google Play",
    "description": "Google 的应用商店，站内教程介绍安卓设备的安装准备与使用入口。",
    "category": "海外数字服务",
    "subcategory": "应用商店",
    "featured": false,
    "iconText": "GO",
    "accent": "#1677ff",
    "tags": [
      "安卓应用",
      "应用下载"
    ],
    "externalUrl": "https://play.google.com/store",
    "url": "https://play.google.com/store",
    "content": "## 简介\nGoogle 的应用商店，站内教程介绍安卓设备的安装准备与使用入口。\n## 适用场景\n- 安卓应用\n- 应用下载\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  },
  {
    "id": "apple-account",
    "slug": "apple-account",
    "name": "Apple Account（Apple ID）",
    "description": "用于管理 Apple 服务的账号，站内教程覆盖注册、地区设置与充值流程。",
    "category": "海外数字服务",
    "subcategory": "邮箱与账号服务",
    "featured": false,
    "iconText": "ID",
    "accent": "#1677ff",
    "tags": [
      "Apple 账号",
      "账号管理"
    ],
    "externalUrl": "https://account.apple.com/",
    "url": "https://account.apple.com/",
    "content": "## 简介\n用于管理 Apple 服务的账号，站内教程覆盖注册、地区设置与充值流程。\n## 适用场景\n- Apple 账号\n- 账号管理\n## 上手方式\n从下方相关教程查看站内操作说明，再通过官网入口开始使用。不同版本、地区和套餐的功能可能不同，请以产品页面为准。"
  }
]);

const environmentCategory = categories.find((category) => category.name === "海外数字服务");
environmentCategory.subcategories.push("网络与环境检测");
environmentCategory.subcategorySlugs["网络与环境检测"] = "network-checks";
tools.push(...[
  {
    "id": "ollama",
    "slug": "ollama",
    "name": "Ollama",
    "category": "AI 工具",
    "subcategory": "AI 开发辅助",
    "description": "本地模型运行与接入工具，站内 Harness 教程列有本地接口配置示例。",
    "featured": false,
    "iconText": "OL",
    "accent": "#1677ff",
    "tags": [
      "本地模型",
      "模型接入"
    ],
    "externalUrl": "https://ollama.com/",
    "url": "https://ollama.com/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n本地模型运行与接入工具，站内 Harness 教程列有本地接口配置示例。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "dsh-desktop",
    "slug": "dsh-desktop",
    "name": "dsh-desktop（第三方）",
    "category": "AI 工具",
    "subcategory": "AI 开发辅助",
    "description": "第三方维护的 DeepSeek Harness 桌面客户端，并非 DeepSeek 官方桌面应用。",
    "featured": false,
    "iconText": "DSH",
    "accent": "#1677ff",
    "tags": [
      "第三方客户端",
      "桌面应用"
    ],
    "externalUrl": "https://github.com/dataelement/dsh-desktop",
    "url": "https://github.com/dataelement/dsh-desktop",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n第三方维护的 DeepSeek Harness 桌面客户端，并非 DeepSeek 官方桌面应用。\n## 使用说明\n请通过项目仓库的 Releases 查看第三方桌面版的安装说明、版本与兼容性。"
  },
  {
    "id": "dsh-plugin-list",
    "slug": "dsh-plugin-list",
    "name": "DSH 插件导航站",
    "category": "AI 工具",
    "subcategory": "AI 开发辅助",
    "description": "查找 DeepSeek Harness 扩展项目的导航入口，安装前需核对作者与兼容版本。",
    "featured": false,
    "iconText": "DSH",
    "accent": "#1677ff",
    "tags": [
      "扩展资源",
      "插件目录"
    ],
    "externalUrl": "https://dshpluginlist.com/",
    "url": "https://dshpluginlist.com/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n查找 DeepSeek Harness 扩展项目的导航入口，安装前需核对作者与兼容版本。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "cherry-studio",
    "slug": "cherry-studio",
    "name": "Cherry Studio",
    "category": "AI 工具",
    "subcategory": "AI 对话助手",
    "description": "多模型 AI 客户端，站内 Claude 教程将其列为模型 API 的使用场景。",
    "featured": false,
    "iconText": "CS",
    "accent": "#1677ff",
    "tags": [
      "多模型客户端",
      "API 接入"
    ],
    "externalUrl": "https://www.cherry-ai.com/",
    "url": "https://www.cherry-ai.com/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n多模型 AI 客户端，站内 Claude 教程将其列为模型 API 的使用场景。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "nextchat",
    "slug": "nextchat",
    "name": "NextChat",
    "category": "AI 工具",
    "subcategory": "AI 对话助手",
    "description": "开源 AI 对话客户端，站内 Claude 教程中作为 API 客户端举例。",
    "featured": false,
    "iconText": "NC",
    "accent": "#1677ff",
    "tags": [
      "开源客户端",
      "API 接入"
    ],
    "externalUrl": "https://github.com/ChatGPTNextWeb/NextChat",
    "url": "https://github.com/ChatGPTNextWeb/NextChat",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n开源 AI 对话客户端，站内 Claude 教程中作为 API 客户端举例。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "lobechat",
    "slug": "lobechat",
    "name": "LobeChat",
    "category": "AI 工具",
    "subcategory": "AI 对话助手",
    "description": "开源 AI 对话项目，站内 Claude 教程中作为模型 API 的客户端举例。",
    "featured": false,
    "iconText": "LC",
    "accent": "#1677ff",
    "tags": [
      "开源客户端",
      "多模型"
    ],
    "externalUrl": "https://github.com/lobehub/lobe-chat",
    "url": "https://github.com/lobehub/lobe-chat",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n开源 AI 对话项目，站内 Claude 教程中作为模型 API 的客户端举例。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "doubao",
    "slug": "doubao",
    "name": "豆包",
    "category": "AI 工具",
    "subcategory": "AI 对话助手",
    "description": "AI 对话与内容创作助手，站内 Suno 教程介绍了借助它构思歌词的方法。",
    "featured": false,
    "iconText": "豆",
    "accent": "#1677ff",
    "tags": [
      "内容创作",
      "歌词构思"
    ],
    "externalUrl": "https://www.doubao.com/",
    "url": "https://www.doubao.com/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\nAI 对话与内容创作助手，站内 Suno 教程介绍了借助它构思歌词的方法。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "gemini",
    "slug": "gemini",
    "name": "Gemini",
    "category": "AI 工具",
    "subcategory": "AI 对话助手",
    "description": "Google 的 AI 助手应用；与面向模型实验的 Google AI Studio 分别提供使用入口。",
    "featured": false,
    "iconText": "G",
    "accent": "#1677ff",
    "tags": [
      "AI 助手",
      "Google 生态"
    ],
    "externalUrl": "https://gemini.google.com/",
    "url": "https://gemini.google.com/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\nGoogle 的 AI 助手应用；与面向模型实验的 Google AI Studio 分别提供使用入口。\n## 使用说明\n下方文章介绍 Google AI Studio 中的 Gemini 模型用法，并非 Gemini 应用的完整教程。"
  },
  {
    "id": "apkmirror",
    "slug": "apkmirror",
    "name": "APKMirror",
    "category": "海外数字服务",
    "subcategory": "应用商店",
    "description": "第三方安卓安装包下载网站，站内 Google Play 教程介绍了通过它查找安装包的方法。",
    "featured": false,
    "iconText": "APK",
    "accent": "#1677ff",
    "tags": [
      "安卓安装包",
      "第三方下载"
    ],
    "externalUrl": "https://www.apkmirror.com/",
    "url": "https://www.apkmirror.com/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n第三方安卓安装包下载网站，站内 Google Play 教程介绍了通过它查找安装包的方法。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "ping0",
    "slug": "ping0",
    "name": "Ping0",
    "category": "海外数字服务",
    "subcategory": "网络与环境检测",
    "description": "IP 信息查询与网络环境检查入口，站内 Claude 教程中有提及。",
    "featured": false,
    "iconText": "IP",
    "accent": "#1677ff",
    "tags": [
      "IP 查询",
      "网络检查"
    ],
    "externalUrl": "https://ping0.cc/",
    "url": "https://ping0.cc/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\nIP 信息查询与网络环境检查入口，站内 Claude 教程中有提及。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  },
  {
    "id": "checkcc",
    "slug": "checkcc",
    "name": "CheckCC",
    "category": "海外数字服务",
    "subcategory": "网络与环境检测",
    "description": "站内 Claude 教程提及的环境检查入口，检测结果不代表账号使用保证。",
    "featured": false,
    "iconText": "CC",
    "accent": "#1677ff",
    "tags": [
      "环境检查",
      "账号辅助"
    ],
    "externalUrl": "https://checkcc.org/",
    "url": "https://checkcc.org/",
    "guideLabel": "查看相关文章",
    "content": "## 简介\n站内 Claude 教程提及的环境检查入口，检测结果不代表账号使用保证。\n## 使用说明\n下方文章提供相关使用场景或操作参考。具体安装方式、支持范围和使用要求请查看项目说明。"
  }
]);

const servicesCategory = categories.find((category) => category.name === "海外数字服务");
servicesCategory.subcategories.push("订阅与辅助服务");
servicesCategory.subcategorySlugs["订阅与辅助服务"] = "subscription-support";
tools.push(...[
  {
    "id": "wild-ai",
    "slug": "wild-ai",
    "name": "Wild AI",
    "description": "第三方 AI 产品订阅服务，站内教程介绍了其订阅入口。",
    "category": "海外数字服务",
    "subcategory": "订阅与辅助服务",
    "featured": false,
    "iconText": "W",
    "accent": "#b7791f",
    "tags": [
      "第三方服务",
      "推广链接"
    ],
    "externalUrl": "https://bewild.ai?code=TOOLMAN",
    "url": "https://bewild.ai?code=TOOLMAN",
    "affiliate": true,
    "serviceType": "third-party",
    "guideLabel": "查看相关文章",
    "content": "## 服务简介\n第三方 AI 产品订阅服务，站内教程介绍了其订阅入口。\n## 使用前了解\n这是第三方服务，不代表相关模型或产品厂商的官方渠道。购买前请核对服务范围、交付方式、费用和售后条款。\n本文入口包含推广标识，通过链接注册或购买可能为本站带来收益。\n## 相关文章\n下方提供本站已有教程，可结合服务页面了解具体流程。"
  },
  {
    "id": "nf-video",
    "slug": "nf-video",
    "name": "银河录像局",
    "description": "第三方数字产品订阅服务，涉及 AI 产品与流媒体服务。",
    "category": "海外数字服务",
    "subcategory": "订阅与辅助服务",
    "featured": false,
    "iconText": "银河",
    "accent": "#b7791f",
    "tags": [
      "第三方服务",
      "推广链接"
    ],
    "externalUrl": "https://nf.video/37h7sn",
    "url": "https://nf.video/37h7sn",
    "affiliate": true,
    "serviceType": "third-party",
    "guideLabel": "查看相关文章",
    "content": "## 服务简介\n第三方数字产品订阅服务，涉及 AI 产品与流媒体服务。\n## 使用前了解\n这是第三方服务，不代表相关模型或产品厂商的官方渠道。购买前请核对服务范围、交付方式、费用和售后条款。\n本文入口包含推广标识，通过链接注册或购买可能为本站带来收益。\n## 相关文章\n下方提供本站已有教程，可结合服务页面了解具体流程。"
  },
  {
    "id": "universalbus",
    "slug": "universalbus",
    "name": "环球巴士",
    "description": "第三方数字订阅平台，站内教程列有相关订阅方式。",
    "category": "海外数字服务",
    "subcategory": "订阅与辅助服务",
    "featured": false,
    "iconText": "巴士",
    "accent": "#b7791f",
    "tags": [
      "第三方服务",
      "推广链接"
    ],
    "externalUrl": "https://universalbus.cn/?s=lTVZgwUD46",
    "url": "https://universalbus.cn/?s=lTVZgwUD46",
    "affiliate": true,
    "serviceType": "third-party",
    "guideLabel": "查看相关文章",
    "content": "## 服务简介\n第三方数字订阅平台，站内教程列有相关订阅方式。\n## 使用前了解\n这是第三方服务，不代表相关模型或产品厂商的官方渠道。购买前请核对服务范围、交付方式、费用和售后条款。\n本文入口包含推广标识，通过链接注册或购买可能为本站带来收益。\n## 相关文章\n下方提供本站已有教程，可结合服务页面了解具体流程。"
  },
  {
    "id": "account-planet",
    "slug": "account-planet",
    "name": "账号星球",
    "description": "第三方账号与订阅服务，站内教程涉及 AI、通讯与数字服务账号。",
    "category": "海外数字服务",
    "subcategory": "订阅与辅助服务",
    "featured": false,
    "iconText": "账号",
    "accent": "#b7791f",
    "tags": [
      "第三方服务",
      "订阅与辅助"
    ],
    "externalUrl": "https://acceboyaibot.acceboy.com/",
    "url": "https://acceboyaibot.acceboy.com/",
    "affiliate": false,
    "serviceType": "third-party",
    "guideLabel": "查看相关文章",
    "content": "## 服务简介\n第三方账号与订阅服务，站内教程涉及 AI、通讯与数字服务账号。\n## 使用前了解\n这是第三方服务，不代表相关模型或产品厂商的官方渠道。购买前请核对服务范围、交付方式、费用和售后条款。\n## 相关文章\n下方提供本站已有教程，可结合服务页面了解具体流程。"
  },
  {
    "id": "2233-ai",
    "slug": "2233-ai",
    "name": "2233 AI",
    "description": "站内教程提及的第三方 AI 访问入口，不是模型厂商的官方服务。",
    "category": "海外数字服务",
    "subcategory": "订阅与辅助服务",
    "featured": false,
    "iconText": "23",
    "accent": "#b7791f",
    "tags": [
      "第三方服务",
      "推广链接"
    ],
    "externalUrl": "https://2233.ai/i/TOOLMAN",
    "url": "https://2233.ai/i/TOOLMAN",
    "affiliate": true,
    "serviceType": "third-party",
    "guideLabel": "查看相关文章",
    "content": "## 服务简介\n站内教程提及的第三方 AI 访问入口，不是模型厂商的官方服务。\n## 使用前了解\n这是第三方服务，不代表相关模型或产品厂商的官方渠道。购买前请核对服务范围、交付方式、费用和售后条款。\n本文入口包含推广标识，通过链接注册或购买可能为本站带来收益。\n此处按独立服务入口收录；不据教程中的混用名称推断其与 Wild AI 的运营关系。\n## 相关文章\n下方提供本站已有教程，可结合服务页面了解具体流程。"
  },
  {
    "id": "sms-man",
    "slug": "sms-man",
    "name": "SMS-Man",
    "description": "第三方短信接收服务，站内注册教程中有相关使用说明。",
    "category": "海外数字服务",
    "subcategory": "订阅与辅助服务",
    "featured": false,
    "iconText": "SMS",
    "accent": "#b7791f",
    "tags": [
      "第三方服务",
      "推广链接"
    ],
    "externalUrl": "https://sms-man.com/cn?ref=RglYX-3PpMaE",
    "url": "https://sms-man.com/cn?ref=RglYX-3PpMaE",
    "affiliate": true,
    "serviceType": "third-party",
    "guideLabel": "查看相关文章",
    "content": "## 服务简介\n第三方短信接收服务，站内注册教程中有相关使用说明。\n## 使用前了解\n这是第三方服务，不代表相关模型或产品厂商的官方渠道。购买前请核对服务范围、交付方式、费用和售后条款。\n本文入口包含推广标识，通过链接注册或购买可能为本站带来收益。\n## 相关文章\n下方提供本站已有教程，可结合服务页面了解具体流程。"
  }
]);

const additionalToolIcons = {
  "deepseek": "/tool-icons/deepseek.ico",
  "bigmodel": "/tool-icons/bigmodel.png",
  "kimi": "/tool-icons/kimi.png",
  "z-ai": "/tool-icons/z-ai.png",
  "napkin-ai": "/tool-icons/napkin-ai.ico",
  "gitmind": "/tool-icons/gitmind.png",
  "mapify": "/tool-icons/mapify.png",
  "wps-ai": "/tool-icons/wps-ai.ico",
  "deepseek-harness": "/tool-icons/deepseek-harness.png",
  "cursor": "/tool-icons/cursor.png",
  "markmap": "/tool-icons/markmap.png",
  "openrouter": "/tool-icons/openrouter.png",
  "icloud-mail": "/tool-icons/icloud-mail.ico",
  "cc-switch": "/tool-icons/cc-switch.png",
  "xmind": "/tool-icons/xmind.png",
  "apple-account": "/tool-icons/apple-account.png",
  "ollama": "/tool-icons/ollama.png",
  "dsh-desktop": "/tool-icons/dsh-desktop.png",
  "dsh-plugin-list": "/tool-icons/dsh-plugin-list.png",
  "cherry-studio": "/tool-icons/cherry-studio.png",
  "nextchat": "/tool-icons/nextchat.png",
  "telegram": "/tool-icons/telegram.png",
  "gmail": "/tool-icons/gmail.png",
  "doubao": "/tool-icons/doubao.png",
  "ping0": "/tool-icons/ping0.png",
  "checkcc": "/tool-icons/checkcc.png",
  "nf-video": "/tool-icons/nf-video.ico",
  "wild-ai": "/tool-icons/wild-ai.png",
  "universalbus": "/tool-icons/universalbus.png",
  "account-planet": "/tool-icons/account-planet.png",
  "sms-man": "/tool-icons/sms-man.ico",
  "2233-ai": "/tool-icons/2233-ai.png",
  "gemini": "/tool-icons/gemini.png",
  "google-play": "/tool-icons/google-play.png",
  "proton-mail": "/tool-icons/proton-mail.png",
  "tuta-mail": "/tool-icons/tuta-mail.png",
  "lobechat": "/tool-icons/lobechat.png",
  "codex": "/tool-icons/codex.svg"
};
for (const tool of tools) {
  if (additionalToolIcons[tool.id]) tool.icon = additionalToolIcons[tool.id];
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function includesQuery(fields, query) {
  const needle = normalize(query);
  if (!needle) return true;
  return fields.some((field) => normalize(field).includes(needle));
}

function filterTools({ category = "", subcategory = "", query = "" } = {}) {
  return tools.filter((item) => {
    const categoryMatched = !category || category === "全部" || item.category === category;
    const subcategoryMatched = !subcategory || subcategory === "全部" || item.subcategory === subcategory;
    const queryMatched = includesQuery([item.name, item.description, item.category, item.subcategory], query);
    return categoryMatched && subcategoryMatched && queryMatched;
  });
}

function getToolById(id) {
  return tools.find((item) => item.id === id || item.slug === id);
}

function getToolUrl(id) {
  return getToolById(id)?.url || "";
}

function getFeaturedTools() {
  return tools.filter((item) => item.featured);
}

function getPopularTools(limit = 50) {
  return tools
    .map((item, index) => ({ item, index }))
    .sort((a, b) => Number(b.item.featured) - Number(a.item.featured) || a.index - b.index)
    .slice(0, limit)
    .map(({ item }) => item);
}

function sectionId(categoryName) {
  return `tool-section-${categories.findIndex((item) => item.name === categoryName)}`;
}

function getToolSections({ query = "" } = {}) {
  return categories
    .map((category) => ({
      ...category,
      id: sectionId(category.name),
      tools: filterTools({ category: category.name, query }),
    }))
    .filter((section) => !query || section.tools.length > 0);
}

export default {
  categories,
  tools,
  filterTools,
  getFeaturedTools,
  getPopularTools,
  getToolById,
  getToolUrl,
  getToolSections,
};
