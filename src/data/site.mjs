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
  claude: "/tool-icons/claude.ico",
  chatgpt: "/tool-icons/chatgpt.svg",
  poe: "/tool-icons/poe.ico",
  "google-ai": "/tool-icons/google-ai-studio.svg",
  notebooklm: "/tool-icons/notebooklm.svg",
  suno: "/tool-icons/suno.ico",
  "claude-code": "/tool-icons/claude-code.ico",
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
      "- ⚠️ 需人工核实：当前可用模型、价格、地区限制与订阅权益变化较快，发布前请复查官方页面。",
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
      "- ⚠️ 需人工核实：套餐权益、模型名称与价格请以 OpenAI 官方页面为准。",
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
      "- ⚠️ 需人工核实：可用模型列表与额度规则变化较快，请发布前复查。",
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
      "- ⚠️ 需人工核实：可用模型、免费额度和地区访问限制请以官方为准。",
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
      "- ⚠️ 需人工核实：支持格式、地区可用性和额度请以官方为准。",
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
      "- ⚠️ 需人工核实：商用授权、套餐额度和模型版本请以官方为准。",
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
      "- ⚠️ 需人工核实：当前版本号、订阅权益和第三方兼容服务稳定性请发布前复查。",
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
      "- ⚠️ 需人工核实：地区套餐、礼品卡和订阅权益请以官方页面为准。",
      "## 官网入口",
      "访问 Spotify 官网注册或登录；国内订阅方式见相关教程。",
    ].join("\n"),
  },
];

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
