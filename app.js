(function (root, factory) {
  const core = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = core;
  }
  root.AIQihang = core;
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => core.init());
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  const categories = [
    {
      name: "AI 工具",
      subcategories: ["AI 对话助手", "AI 音乐生成", "AI 编程工具"],
    },
    { name: "海外数字服务", subcategories: ["流媒体娱乐"] },
  ];

  const tutorials = [
    {
      id: "deepseek-workflow",
      title: "DeepSeek 入门实战：从提示词到工作流",
      summary: "从基础使用到高级技巧，掌握 DeepSeek 的核心能力，通过提示词工程与工作流搭建，让 AI 真正为你所用。",
      category: "入门指南",
      date: "2025-05-28",
      reads: "12.6k",
      featured: true,
      coverType: "deep",
    },
    {
      id: "xiaohongshu-template",
      title: "用 AI 做小红书图文的 7 个模板",
      summary: "7 个即用即改的爆款模板，帮你轻松生产高质量小红书图文内容。",
      category: "AI办公",
      date: "2025-05-27",
      reads: "9.8k",
      featured: false,
      coverType: "red",
    },
    {
      id: "ai-coding-efficiency",
      title: "AI 编程助手如何提高研发效率",
      summary: "对比主流 AI 编程工具，结合真实场景，提升编码、测试与协作效率。",
      category: "AI编程",
      date: "2025-05-25",
      reads: "8.7k",
      featured: false,
      coverType: "code",
    },
    {
      id: "personal-knowledge-base",
      title: "一小时搭建个人知识库",
      summary: "利用 AI + 知识库工具，快速搭建专属知识库，提升信息管理能力。",
      category: "入门指南",
      date: "2025-05-24",
      reads: "7.1k",
      featured: false,
      coverType: "blue",
    },
    {
      id: "midjourney-cn-prompts",
      title: "Midjourney 中文提示词完整指南",
      summary: "结构化拆解提示词思路，从入门到进阶的系统化指南。",
      category: "AI绘画",
      date: "2025-05-23",
      reads: "6.3k",
      featured: false,
      coverType: "deep",
    },
    {
      id: "meeting-agent",
      title: "用智能体自动整理会议纪要",
      summary: "让智能体自动听会、整理、归档，高效输出重点与行动项。",
      category: "自动化工作流",
      date: "2025-05-22",
      reads: "5.9k",
      featured: false,
      coverType: "green",
    },
    {
      id: "ai-ppt",
      title: "AI PPT 从大纲到成稿",
      summary: "用 AI 快速生成演示文稿，从大纲到美化一站式搞定。",
      category: "AI办公",
      date: "2025-05-21",
      reads: "5.2k",
      featured: false,
      coverType: "blue",
    },
    {
      id: "rag-checklist",
      title: "RAG 知识库搭建避坑清单",
      summary: "总结常见坑点与优化策略，让你的知识库更准确、更稳定。",
      category: "入门指南",
      date: "2025-05-20",
      reads: "4.8k",
      featured: false,
      coverType: "green",
    },
    {
      id: "commerce-design",
      title: "用 AI 提升电商设计效率",
      summary: "AI 商品图、主图设计与背景生成，提升转化率的实用方法。",
      category: "行业案例",
      date: "2025-05-19",
      reads: "4.3k",
      featured: false,
      coverType: "red",
    },
    {
      id: "prompt-roles",
      title: "提示词角色设定的 12 个高频模板",
      summary: "整理常见角色、目标、约束和输出格式，让提示词更稳定可复用。",
      category: "提示词工程",
      date: "2025-05-18",
      reads: "4.1k",
      featured: false,
      coverType: "deep",
    },
    {
      id: "ai-doc-summary",
      title: "用 AI 快速总结长文档",
      summary: "从上传资料到提炼结论，建立适合学习和办公的文档总结流程。",
      category: "AI办公",
      date: "2025-05-17",
      reads: "3.9k",
      featured: false,
      coverType: "blue",
    },
    {
      id: "agent-workflow",
      title: "智能体工作流搭建入门",
      summary: "理解节点、变量、工具调用和条件分支，搭建可执行的自动化流程。",
      category: "自动化工作流",
      date: "2025-05-16",
      reads: "3.7k",
      featured: false,
      coverType: "green",
    },
    {
      id: "ai-image-product",
      title: "AI 商品图生成实战",
      summary: "用 AI 快速生成电商主图、背景图和场景图，提高素材生产效率。",
      category: "AI绘画",
      date: "2025-05-15",
      reads: "3.5k",
      featured: false,
      coverType: "red",
    },
    {
      id: "coding-review",
      title: "让 AI 帮你做代码 Review",
      summary: "把需求、上下文和检查清单交给 AI，提升代码评审质量和效率。",
      category: "AI编程",
      date: "2025-05-14",
      reads: "3.4k",
      featured: false,
      coverType: "code",
    },
    {
      id: "office-report",
      title: "AI 周报月报自动生成指南",
      summary: "把零散工作记录整理成结构化报告，减少重复写作时间。",
      category: "AI办公",
      date: "2025-05-13",
      reads: "3.2k",
      featured: false,
      coverType: "blue",
    },
    {
      id: "prompt-debug",
      title: "提示词调试的 5 个方法",
      summary: "从错误输出反推提示词问题，逐步优化上下文、示例和约束条件。",
      category: "提示词工程",
      date: "2025-05-12",
      reads: "3.1k",
      featured: false,
      coverType: "deep",
    },
    {
      id: "ai-search-research",
      title: "用 AI 搜索做资料调研",
      summary: "组合搜索、引用和笔记工具，快速完成主题调研与资料归档。",
      category: "入门指南",
      date: "2025-05-11",
      reads: "2.9k",
      featured: false,
      coverType: "green",
    },
    {
      id: "workflow-publish",
      title: "AI 内容发布工作流设计",
      summary: "从选题、生成、校对到排版发布，搭建适合个人创作者的流程。",
      category: "自动化工作流",
      date: "2025-05-10",
      reads: "2.7k",
      featured: false,
      coverType: "red",
    },
    {
      id: "model-choice",
      title: "不同 AI 模型该怎么选",
      summary: "按写作、编程、搜索、图像等场景比较模型能力和使用成本。",
      category: "入门指南",
      date: "2025-05-09",
      reads: "2.5k",
      featured: false,
      coverType: "blue",
    },
    {
      id: "ai-team-collab",
      title: "团队如何建立 AI 协作规范",
      summary: "沉淀提示词、工具权限和输出验收规范，让 AI 使用更可控。",
      category: "行业案例",
      date: "2025-05-08",
      reads: "2.4k",
      featured: false,
      coverType: "green",
    },
  ];

  const toolUrls = {
    youdao: "https://ai.codefather.cn/tool/1983423688002134094",
    spark: "https://ai.codefather.cn/tool/1983423688002134045",
    xinwen: "https://ai.codefather.cn/tool/1983423688002134032",
    paperpal: "https://ai.codefather.cn/tool/1983423688002134021",
    muset: "https://ai.codefather.cn/tool/1983423688002134019",
    "stable-copy": "https://ai.codefather.cn/tool/all/AI%E5%86%99%E4%BD%9C",
    xiaoin: "https://ai.codefather.cn/tool/1983423688002134016",
    biling: "https://ai.codefather.cn/tool/1983423688002134011",
    kuxuan: "https://ai.codefather.cn/tool/1983423688002134007",
    mohu: "https://ai.codefather.cn/tool/1983423688002134004",
    wancai: "https://ai.codefather.cn/tool/1983423688002134002",
    chengpian: "https://ai.codefather.cn/tool/1983423688002134001",
    wenxiaobai: "https://ai.codefather.cn/tool/1965402622974386192",
    wawa: "https://ai.codefather.cn/tool/1965402622974386191",
    "xunfei-doc": "https://ai.codefather.cn/tool/1965402622974386190",
    xieyi: "https://ai.codefather.cn/tool/1965402622974386188",
    aipaper: "https://ai.codefather.cn/tool/1965402622974386185",
    qianbi: "https://ai.codefather.cn/tool/1965402622974386184",
    "xunfei-write": "https://ai.codefather.cn/tool/1965402622974386180",
    maomao: "https://ai.codefather.cn/tool/1965402622974386179",
    paperfake: "https://ai.codefather.cn/tool/1965402622974386178",
    xiaoyu: "https://ai.codefather.cn/tool/1965402622974386177",
    "content-butler": "https://ai.codefather.cn/tool/1965402622970191895",
    huiyan: "https://ai.codefather.cn/tool/1965402622970191894",
    "doubao-write": "https://ai.codefather.cn/tool/1965402622970191893",
    chatgpt: "https://chatgpt.com/",
    midjourney: "https://ai.codefather.cn/tool/1965402623569977353",
    kimi: "https://kimi.moonshot.cn/",
    doubao: "https://www.doubao.com/chat/",
    qwen: "https://ai.codefather.cn/tool/1965402622898888722",
    miaohua: "https://ai.codefather.cn/tool/2044252788908691460",
    miaohui: "https://ai.codefather.cn/tool/2044252788908691459",
    vision: "https://ai.codefather.cn/tool/2044252788908691458",
    katu: "https://ai.codefather.cn/tool/2044252788904497154",
    miguo: "https://ai.codefather.cn/tool/2044252788900302851",
    wuli: "https://ai.codefather.cn/tool/2044252788900302850",
    kling: "https://ai.codefather.cn/tool/1965402623997796364",
    liblib: "https://ai.codefather.cn/tool/1965402623569977351",
    vivago: "https://ai.codefather.cn/tool/2044252788787056644",
    a2e: "https://ai.codefather.cn/tool/2044252788787056643",
    komiko: "https://ai.codefather.cn/tool/2044252788787056642",
    nextcut: "https://ai.codefather.cn/tool/2044252788782862344",
    huasheng: "https://ai.codefather.cn/tool/2044252788782862338",
    gamma: "https://ai.codefather.cn/tool/1965402623523840016",
    tome: "https://tome.app/",
    "xmind-ai": "https://xmind.ai/",
    "feishu-minutes": "https://www.feishu.cn/product/minutes",
    "excel-ai": "https://www.boloforms.com/sheetgod/",
    "claude-code": "https://claude.com/product/claude-code",
    cursor: "https://www.cursor.com/",
    "github-copilot": "https://ai.codefather.cn/tool/1965402622869528590",
    codeium: "https://codeium.com/",
    dify: "https://dify.ai/",
    coze: "https://www.coze.cn/",
    fastgpt: "https://fastgpt.cn/",
    flowith: "https://flowith.io/",
    poe: "https://poe.com/",
    claude: "https://claude.ai/",
    "perplexity-chat": "https://ai.codefather.cn/tool/1965402623586754568",
    suno: "https://suno.com/",
    udio: "https://www.udio.com/",
    elevenlabs: "https://ai.codefather.cn/tool/1965402623603531777",
    "canva-ai": "https://www.canva.com/ai/",
    chuangkit: "https://ai.codefather.cn/tool/1965402623616114696",
    "gaoding-design": "https://www.gaoding.com/",
    deepseek: "https://ai.codefather.cn/tool/1965402623628697612",
    zhipu: "https://ai.codefather.cn/tool/1965402623628697603",
    huggingface: "https://huggingface.co/",
    shengshu: "https://www.shengshu-ai.com/",
    "google-ai": "https://aistudio.google.com/",
    notebooklm: "https://notebooklm.google.com/",
    "openai-academy": "https://ai.codefather.cn/tool/1965402623578365960",
    perplexity: "https://www.perplexity.ai/",
    metaso: "https://metaso.cn/",
    consensus: "https://consensus.app/",
    gptzero: "https://ai.codefather.cn/tool/1965402623574171654",
    zerogpt: "https://www.zerogpt.com/",
    turnitin: "https://www.turnitin.com/",
    futurepedia: "https://www.futurepedia.io/",
    theresanaiforthat: "https://theresanaiforthat.com/",
    "notion-ai": "https://www.notion.com/product/ai",
    spotify: "https://www.spotify.com/",
  };

  const toolDetails = {
    claude: {
      tags: ["AI聊天对话"],
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/TrLNaZp7npstLcYd.png",
      externalUrl: "https://claude.ai/",
      viewCount: "1018",
      viewNum: 2464,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1965402623628697614",
      sourceId: "1965402623628697614",
      content: `## Claude：新一代智能AI助手

Claude是Anthropic公司倾力打造的智能对话系统，基于前沿的人工智能技术构建。这套先进的AI解决方案包含Claude 3 Haiku、Claude 3 Sonnet和Claude 3 Opus三大子模型，每个版本都针对特定使用场景进行了深度优化，为用户提供从轻量级到专业级的全方位AI服务。

## 核心优势

- **多模态处理能力**：不仅能理解文字内容，还能解读图片、图表等视觉信息，实现真正的立体交互体验
- **超长文本处理**：单次可处理15万词以上的文档，轻松应对长篇报告、复杂论文等专业需求
- **实时信息获取**：支持联网检索最新资讯，确保提供的知识和建议与时俱进
- **企业级集成应用**：与Google Workspace无缝对接，可智能管理邮件、文档和日程安排
- **安全可靠**：采用"宪法AI"设计理念，在功能强大的同时确保内容合规性

## 智能应用场景

**内容创作领域**  
助力自媒体创作者高效产出优质文案，从标题构思到全文撰写，提供全方位的创作支持

**企业办公助手**

- 智能客服系统：7×24小时响应客户咨询，保持对话连贯性
- 文档管理专家：快速定位企业知识库中的关键信息
- 会议纪要生成：自动总结讨论要点，提升工作效率

**教育科研应用**

- 个性化学习辅导：解答学科问题，提供针对性学习建议
- 研究资料分析：快速梳理文献要点，辅助学术写作
- 编程教学助手：解释代码逻辑，帮助调试程序错误

## 使用方式

**个人用户**

1. 访问官网完成注册
2. 根据需求选择合适的模型版本
3. 通过网页或移动端应用开始智能对话

**开发者接入**

- 获取API密钥实现系统集成
- 利用开发者工具进行二次开发
- 构建定制化AI解决方案

Claude持续进化的人工智能技术，正在重塑人机交互的未来。无论是个人用户还是企业客户，都能通过这套智能系统获得专业、高效的服务体验。`,
    },
    chatgpt: {
      tags: ["AI聊天对话"],
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/l0JUfg8D7vYACjA1.png",
      externalUrl: "https://chatgpt.com/",
      viewCount: "570",
      viewNum: 2006,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1965402623628697615",
      sourceId: "1965402623628697615",
      content: `## ChatGPT：您的智能对话助手

ChatGPT是OpenAI研发的一款革命性AI对话系统，基于前沿的Transformer神经网络架构打造。这款智能助手能够理解并生成接近人类水平的文本内容，实现自然流畅的对话交流，同时具备回答问题、创作文章、编写代码等多种语言处理能力。

## 技术原理

ChatGPT采用生成式预训练转换器(GPT)架构，通过两个关键阶段获得卓越表现：

- **海量数据预训练**：模型在包含各种主题的庞大文本库中学习语言规律
- **人类反馈强化学习(RLHF)**：通过专业训练师的数据标注和反馈优化对话质量

尽管功能强大，我们仍需注意其知识更新存在滞后性，部分回答可能存在误差，使用时建议结合其他信息来源进行验证。

## 核心特点

作为大型语言模型(LLM)的代表作，ChatGPT与传统聊天机器人的本质区别在于：

- 深层次的语义理解能力
- 上下文相关的多轮对话体验
- 创造性内容生成潜力
- 多领域知识应用广度

## 开发背景

OpenAI作为人工智能领域的开拓者，致力于推动通用人工智能(AGI)的安全发展。ChatGPT是其GPT系列模型在对话系统领域的重要应用成果，标志着人机交互的新里程碑。

## 功能概览

ChatGPT提供全方位的智能服务：

- **知识问答**：解答各类学科问题
- **创意写作**：生成文章、故事、诗歌等
- **语言服务**：支持多语种翻译与学习
- **编程辅助**：代码编写与调试
- **信息处理**：文本摘要与提炼
- **生活助手**：日程规划与建议

## 使用指南

开启智能对话只需简单几步：

- 访问官网创建账户
- 选择适合的使用场景
- 输入您的需求或问题
- 获取系统生成的响应
- 通过优化提问获得更精准结果

## 服务方案

我们提供多层级服务选择：

- **基础版**：免费体验核心功能
- **增强版**($20/月)：扩展使用权限
- **专业版**($200/月)：无限制访问高级功能

## 应用场景

ChatGPT已在多个领域展现价值：

- 客户服务自动化
- 市场营销内容创作
- 教育辅助与个性化学习
- 软件开发效率提升
- 商业分析与决策支持

## 价值与局限

**核心优势**

- 显著提升工作效率
- 促进教育资源共享
- 激发创意与创新思维
- 革新信息获取方式

**当前局限**

- 知识更新存在延迟
- 可能产生不准确信息
- 缺乏真正的情感理解

ChatGPT代表了人工智能技术的重要突破，不仅改变了人机交互方式，更为未来智能社会发展提供了无限可能。我们建议用户结合自身需求，合理利用这一强大工具，同时保持对生成内容的审慎态度。`,
    },
    poe: {
      tags: ["AI聊天对话"],
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/iDxGs0YbB5k1hs1H.png",
      externalUrl: "https://poe.com/",
      viewCount: "0",
      viewNum: 0,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1965402623624503315",
      sourceId: "1965402623624503315",
      content: `## Poe AI：智能对话体验新选择

作为Quora推出的创新AI平台，Poe AI重新定义了人机交互方式。在这里，用户可以自由提问、获取即时解答，并与不同性格的AI进行深度对话交流。

## 多元智能助手任您选择

我们精心整合了四款各具特色的智能机器人，满足您的多样化需求：

- **Claude** - 创意写作领域的专家，在文学创作、故事构思方面表现优异，但会保持严谨的态度筛选问题
- **Sage与ChatGPT** - 多语言处理能手，特别擅长编程和技术类问题解答
- **Dragonfly** - 简明高效的应答者，善于根据示例快速理解并执行指令

## 前沿技术支持

平台融合了目前最先进的自然语言处理技术：

- Sage和ChatGPT基于OpenAI的GPT-3.5 Turbo模型
- Dragonfly采用text-davinci-003引擎
- Claude则搭载Anthropic的尖端AI系统

特别值得一提的是，我们为每位用户提供每日一次的GPT-4体验机会，让您免费感受最强大的AI对话体验。

## 个性化交互体验

每个AI助手都拥有独特的"性格"特征，随着交流的深入，您会发现它们各具特色的对话风格。我们鼓励您尝试与不同AI互动，探索最适合您需求的智能伙伴。

无论是寻求知识解答、创意启发，还是简单的陪伴交流，Poe AI都能为您提供专业、贴心的智能服务。现在就开启您的AI对话之旅，体验科技带来的无限可能。`,
    },
    notebooklm: {
      tags: ["AI音频音乐"],
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/KKj2Jc4esMPVEsTR.png",
      externalUrl: "https://notebooklm.google.com/",
      viewCount: "0",
      viewNum: 0,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1965402623599337488",
      sourceId: "1965402623599337488",
      content: `## 智能笔记助手NotebookLM

NotebookLM是谷歌研发的一款革命性AI笔记工具，它运用前沿的大型语言模型技术，重新定义了信息管理方式。这款智能应用不仅能帮助用户高效整理各类文档，更能深度理解内容并生成有价值的见解。

## 核心功能亮点

**智能文档处理**

- 自动解析PDF、TXT、Google文档等多种格式
- 生成精准的内容摘要和关键点提炼
- 根据文档创建结构化的学习指南和时间线

**深度交互体验**

- 针对文档内容进行Q&A式智能问答
- 支持多轮对话深入探讨主题
- 提供可靠的引用来源确保信息准确性

**创意激发工具**

- 为写作和头脑风暴提供灵感启发
- 自动生成内容大纲和创作建议
- 将枯燥文档转化为生动的播客节目

**个性化知识管理**

- 构建专属的智能知识库
- 跨设备同步所有笔记内容
- 支持团队协作共享笔记本

## 使用指南

- **快速开始**：访问notebooklm.google官网，使用Google账号登录创建个人笔记本
- **内容导入**：上传研究论文、会议记录、读书笔记等各种文档资料
- **智能处理**：系统自动分析内容，生成可视化摘要和关键见解
- **深度交互**：向AI助手提问获取针对性回答，或要求生成创意方案
- **内容输出**：将处理结果导出为音频播客、视频简报或结构化文档

## 适用人群

**学术研究者**

- 快速消化大量文献资料
- 自动生成研究综述
- 辅助论文写作与修改

**内容创作者**

- 获取创作灵感和素材
- 自动生成内容框架
- 制作播客节目的脚本

**企业专业人士**

- 高效处理商业报告
- 智能分析市场数据
- 自动生成演示材料

**终身学习者**

- 构建个人知识体系
- 制作学习笔记卡片
- 生成复习测验题目

NotebookLM目前在全球200多个国家和地区提供服务，支持多种语言操作，让知识管理变得前所未有的简单高效。无论是个人学习还是团队协作，这款AI助手都能显著提升您的工作效率。`,
    },
    suno: {
      tags: ["AI音频音乐"],
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/yM14ZYMk2CtjmiLi.png",
      externalUrl: "https://suno.com/",
      viewCount: "0",
      viewNum: 0,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1965402623603531780",
      sourceId: "1965402623603531780",
      content: `## 音乐创作新纪元：Suno AI

Suno AI重新定义了音乐创作方式，这款革命性的AI音乐生成平台让每个人都能轻松成为音乐制作人。无需专业设备或乐理知识，只需输入想法，就能获得完整的人声歌曲作品。由Meta、TikTok等顶尖科技公司前成员打造，Suno已与微软达成战略合作，用户可直接通过Copilot调用其音乐生成功能。

## 核心优势

- **智能创作引擎**：基于自研Chirp v3模型，可生成长达2分钟的高质量音乐作品
- **全流程创作**：从歌词创作到编曲制作一站式完成，支持50+语言输入输出
- **风格多元化**：涵盖流行、电子、嘻哈、摇滚等主流音乐类型，满足不同创作需求
- **协作生态**：与微软Copilot深度整合，拓展创作场景和应用可能性

## 创作无限可能

- **灵感即刻变现**：简单描述你的音乐想法，AI自动生成完整作品
- **风格自由切换**：轻松尝试不同音乐流派，发现独特创作方向
- **全球语言支持**：突破语言障碍，用母语创作国际水准的音乐作品
- **专业级输出**：媲美录音室品质的人声和编曲效果

## 会员服务体系

- **入门体验**：免费用户每日可生成10首作品，适合个人兴趣创作
- **专业创作**：8美元/月起(年付)，每月500首商用授权作品，支持10个并发任务
- **商业级方案**：24美元/月起(年付)，每月2000首商用作品，满足专业音乐人需求

## 常见问题解答

**Q：Suno的音乐生成技术有何独特之处？**  
A：采用自主研发的Chirp v3模型，专注于音乐创作领域，在人声自然度和编曲质量上具有明显优势。

**Q：商业用途需要注意什么？**  
A：付费会员享有完整商用授权，免费版作品仅限个人使用。建议商业用户选择专业版或高级版。

**Q：能否模仿特定艺人风格？**  
A：出于版权保护考虑，Suno不支持特定艺人风格的模仿创作，但提供丰富的音乐类型选择。

Suno正在改变音乐创作的游戏规则，让创意不再受技术限制。无论你是音乐爱好者还是专业创作者，都能在这里找到属于自己的声音。立即体验，开启你的音乐创作之旅！`,
    },
    spark: {
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/E4fvFKAWN4mNj6au.webp",
      externalUrl: "https://xinghuo.xfyun.cn/desk",
      viewCount: "174",
      viewNum: 1041,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1983423688002134045",
      sourceId: "1965332724134727681",
      content: `## 讯飞星火：智能时代的全能AI助手

讯飞星火是由科大讯飞研发的新一代人工智能大模型平台，集成了先进的多模态处理能力，为用户提供全方位的智能服务体验。作为国内领先的AI解决方案，星火大模型现已推出桌面版本，带来更强大的本地化智能体验。

## 核心优势

- **多模态交互**：突破传统文本局限，支持图像识别、语音处理、视频生成等多元信息交互
- **智能创作引擎**：从文档处理到多媒体制作，一站式满足各类创作需求
- **跨平台支持**：覆盖iOS、Android、小程序及H5等多终端，随时随地享受AI服务
- **知识管理专家**：强大的文档解析与知识提炼能力，打造专属智能知识库

## 功能亮点

- **智能问答**：支持多种文件格式上传，快速提取关键信息，实现深度对话交互
- **创意工坊**：自动生成各类专业文档，包括学术论文、商业报告、创意文案等
- **办公助手**：一键完成PPT制作、多语言翻译等办公场景需求
- **内容优化**：提供文本润色、扩展改写等智能编辑功能，提升内容质量

## 应用场景

1. **教育科研**：辅助论文写作、知识梳理、研究资料分析
2. **商业办公**：自动生成商业文档、优化演示材料、提升工作效率
3. **创意产业**：支持小说创作、视频制作、音乐合成等创意工作
4. **智能服务**：应用于政务、金融、医疗等领域的智能化解决方案

## 技术价值

讯飞星火大模型采用先进的深度学习技术，具备超长文本处理、复杂信息解析等核心能力。平台支持个性化定制，可根据不同行业需求提供专属解决方案，助力企业数字化转型。通过持续的技术迭代，星火大模型正在推动AI技术在各领域的深度应用，为用户创造更智能、更便捷的数字生活体验。`,
    },
    xiaoin: {
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/JGwQNrkwCS7wJsp3.png",
      externalUrl: "https://xiaoin.com.cn/create",
      viewCount: "108",
      viewNum: 680,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1983423688002134016",
      sourceId: "1965332724159893506",
      content: `## 智能写作助手：万能小in

万能小in是新一代AI文档创作平台，专为需要高效写作解决方案的用户设计。这款智能工具将尖端人工智能技术与实用写作场景完美结合，帮助用户轻松应对各类文档创作挑战。

## 核心优势

1. **极速响应**：输入基础信息后，30秒内即可生成结构完整、内容详实的专业文档
2. **海量模板库**：覆盖学术论文、工作报告、实习总结等200+常见写作场景
3. **智能优化**：基于用户输入自动调整内容风格，确保每份文档都个性鲜明

## 特色功能

- **实习报告一键生成**：学生群体专属，自动整理实习经历并生成规范报告
- **多场景文档创作**：支持自定义内容需求，满足不同行业用户的写作要求
- **智能内容推荐**：AI算法分析用户需求，动态推荐最适合的写作模板和范例

## 使用场景

想象你是一位刚结束实习的大学生，面对空白的文档发愁如何总结这段经历。使用万能小in，只需简单填写实习单位、工作内容等基本信息，系统就能自动生成一份结构清晰、内容充实的实习报告初稿，再根据个人需求进行微调即可完成。

## 用户价值

万能小in重新定义了文档创作方式，让每个人都能轻松产出专业水准的文本内容。无论是缺乏写作经验的学生，还是工作繁忙的职场人士，都能通过这个智能平台快速获得高质量的文档支持，大幅提升写作效率。`,
    },
    muset: {
      cover: "https://pic.code-nav.cn/post_cover/1610518142000300034/XnfdHqZOzEPe88Bi.png",
      externalUrl: "https://www.muset.ai/",
      viewCount: "576",
      viewNum: 1968,
      thumbNum: 0,
      favourNum: 0,
      commentNum: 0,
      author: "编程导航",
      sourceUrl: "https://ai.codefather.cn/tool/1983423688002134019",
      sourceId: "1983408425542295554",
      content: `## 工具概览  
Muset是一款基于人工智能的智能创作工作空间，专为写作者、自媒体人、营销人员等深度创作者设计。它通过整合灵感捕捉、大纲编写、内容编辑及排版发布等全流程功能，帮助用户在单一界面中完成从构思到发布的创作闭环，旨在消除创作过程中的干扰，提升内容生产效率。  

## 核心功能  
**1. 上下文感知的共同创作代理**  
Muset能够读取用户的素材库（如笔记、文档），在创作过程中自动保持上下文连贯性，避免因切换工具导致的思路中断或内容断层。  

**2. 多格式输出支持**  
用户可将同一内容一键转化为博客文章、社交媒体文案、视频脚本等不同格式，适配多平台发布需求，减少重复编辑工作量。  

**3. 一体化创作工作流**  
从灵感记录到最终排版，所有环节均集成在统一界面中，无需在多标签页或工具间切换，显著降低操作复杂度，维持创作心流状态。  

**4. 智能模板与素材推荐**  
内置格式感知的模板库，根据用户创作类型自动推荐结构框架或补充素材，帮助快速启动项目并提升内容质量。  

## 应用场景与优势  
**典型场景示例：**  
- **自媒体运营者**：将核心观点快速生成适配微博、公众号、头条等平台的差异化内容版本。  
- **视频创作者**：利用连贯的AI辅助撰写YouTube脚本，同时自动提取关键点作为视频字幕或推广文案。  
- **营销团队**：协作撰写广告文案时，团队成员可基于统一上下文实时调整内容，避免信息偏差。  

**核心优势：**  
- **效率提升**：减少工具切换和重复操作，缩短从构思到发布的周期。  
- **流程简化**：通过一体化界面和AI辅助，降低多平台内容分发的操作门槛。  
- **创作连贯性**：上下文感知能力确保长期项目或系列内容的前后一致性，避免灵感碎片化。`,
    },
  };

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
    tool("claude", "Claude", "Anthropic公司推出的对话式AI智能助手", "AI 工具", "AI 对话助手", "C", "#d97706", true),
    tool("chatgpt", "ChatGPT", "OpenAI 推出的AI聊天机器人", "AI 工具", "AI 对话助手", "GPT", "#10a37f", true),
    tool("poe", "Poe", "问答社区Quora推出的问答机器人工具", "AI 工具", "AI 对话助手", "Poe", "#111827"),
    tool("google-ai", "Google AI Studio", "模型实验、提示词调试与多模态应用平台。", "AI 工具", "AI 对话助手", "G", "#4285f4"),
    tool("notebooklm", "NotebookLM", "谷歌推出的AI笔记应用，5分钟生成一段对话播客", "AI 工具", "AI 对话助手", "N", "#0f766e", true),
    tool("suno", "Suno", "高质量的AI音乐创作平台", "AI 工具", "AI 音乐生成", "S", "#f97316", true),
    tool("claude-code", "Claude Code", "面向开发者的命令行 AI 编程助手。", "AI 工具", "AI 编程工具", "CC", "#111827", true),
    tool("spotify", "Spotify", "海外流媒体音乐播放与 Premium 订阅服务。", "海外数字服务", "流媒体娱乐", "S", "#1db954", true),
  ];

  const tutorialCategories = ["全部", "入门指南", "提示词工程", "AI绘画", "AI办公", "AI编程", "自动化工作流", "行业案例"];
  const hotKeywords = ["AI 对话助手", "AI 音乐生成", "AI 编程工具", "流媒体娱乐"];

  const state = {
    tab: "home",
    toolCategory: "AI 工具",
    toolSubcategory: "AI 对话助手",
    expandedToolCategory: "AI 工具",
    toolQuery: "",
    tutorialCategory: "全部",
    tutorialQuery: "",
    selectedTutorialId: "",
    selectedToolId: "",
  };

  const sidebarIconPaths = {
    "AI 工具": '<path d="M12 3 4 7v10l8 4 8-4V7Z"/><path d="M12 3v18"/><path d="m4 7 8 4 8-4"/>',
    海外数字服务: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18"/><path d="M12 3a13 13 0 0 0 0 18"/>',
    default: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 3"/>',
  };

  function fallbackToolUrl(id) {
    return `https://ai.codefather.cn/tool?keyword=${encodeURIComponent(id)}`;
  }

  function defaultToolContent(item) {
    return [
      "## 工具概览",
      `${item.name} 是 ${item.category} 场景下的 AI 工具，主要用于${item.description}`,
      "## 使用建议",
      "- 先明确任务目标和输入材料，再选择合适模板或功能入口。",
      "- 小范围验证输出质量后，再沉淀为固定提示词或工作流。",
      "## 适用人群",
      `适合需要提升 ${item.subcategory} 效率的个人创作者、运营、学生或团队使用。`,
    ].join("\n");
  }

  function tool(id, name, description, category, subcategory, iconText, accent, featured = false) {
    const detail = toolDetails[id] || {};
    const base = {
      id,
      name,
      description,
      category,
      subcategory,
      featured,
      iconText,
      icon: toolIcons[id] || "",
      accent,
      url: toolUrls[id] || fallbackToolUrl(id),
    };
    return {
      ...base,
      tags: detail.tags || [subcategory, category],
      cover: detail.cover || "",
      externalUrl: detail.externalUrl || base.url,
      sourceUrl: detail.sourceUrl || base.url,
      viewCount: detail.viewCount || `${Math.max(100, 900 - id.length * 17)}`,
      viewNum: detail.viewNum || 0,
      thumbNum: detail.thumbNum || 0,
      favourNum: detail.favourNum || 0,
      commentNum: detail.commentNum || 0,
      author: detail.author || "工具人AI导航团队",
      content: detail.content || defaultToolContent(base),
    };
  }

  function renderBrandIcon(item, className) {
    const content = item.icon
      ? `<img src="${escapeHtml(item.icon)}" alt="" loading="lazy" aria-hidden="true" />`
      : escapeHtml(item.iconText);
    return `<div class="${className}" style="--accent:${item.accent}">${content}</div>`;
  }

  function compareTutorials(a, b) {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date) - new Date(a.date);
  }

  function getRecommendedTutorials(limit = 5) {
    return [...tutorials].sort(compareTutorials).slice(0, limit);
  }

  function getTutorialById(id) {
    return tutorials.find((item) => item.id === id);
  }

  function getToolById(id) {
    return tools.find((item) => item.id === id);
  }

  function getToolUrl(id) {
    return getToolById(id)?.url || fallbackToolUrl(id);
  }

  function getToolDetail(id) {
    return getToolById(id);
  }

  function searchEverywhere(query = "") {
    const matchedTools = filterTools({ query });
    const matchedTutorials = filterTutorials({ query });
    return {
      tools: matchedTools,
      tutorials: matchedTutorials,
      preferredTab: matchedTools.length || !matchedTutorials.length ? "tools" : "tutorials",
    };
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

  function filterTutorials({ category = "全部", query = "" } = {}) {
    return tutorials
      .filter((item) => {
        const categoryMatched = category === "全部" || item.category === category;
        const queryMatched = includesQuery([item.title, item.summary, item.category], query);
        return categoryMatched && queryMatched;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function articleVisual(article) {
    return `<div class="article-visual" data-cover="${escapeHtml(article.coverType)}"><span class="visual-label">${escapeHtml(article.title)}</span></div>`;
  }

  function articleMeta(article) {
    return `<div class="meta-row"><span>工具人AI导航团队</span><span>${escapeHtml(article.date)}</span><span>${escapeHtml(article.reads)} 阅读</span></div>`;
  }

  function articleTags(article) {
    const tagMap = {
      入门指南: ["AI入门", "实用教程"],
      AI办公: ["效率提升", "办公自动化"],
      AI编程: ["AI开发", "代码助手"],
      AI绘画: ["AI图像", "创意设计"],
      自动化工作流: ["智能体", "工作流"],
      行业案例: ["场景实战", "案例拆解"],
      提示词工程: ["提示词", "模型调优"],
    };
    return [...new Set([article.category, ...(tagMap[article.category] || ["AI工具", "实战教程"])])].slice(0, 3);
  }

  function articleReadingStats(article) {
    const length = `${article.title}${article.summary}`.replace(/\s+/g, "").length;
    const words = Math.max(860, Math.round(length * 14 + String(article.id).length * 3));
    return {
      words,
      minutes: Math.max(4, Math.ceil(words / 220)),
    };
  }

  function articleInfoPanel(article) {
    const tags = articleTags(article).join(", ");
    const stats = articleReadingStats(article);
    return `
      <div class="article-info-panel">
        <h3 class="article-info-title">${escapeHtml(article.title)}</h3>
        <div class="article-info-meta" aria-label="文章信息">
          <span class="article-info-chip">
            <span class="article-info-icon article-info-icon-calendar" aria-hidden="true"></span>
            ${escapeHtml(article.date)}
          </span>
          <span class="article-info-chip">
            <span class="article-info-icon article-info-icon-book" aria-hidden="true"></span>
            ${escapeHtml(article.category)}教程
          </span>
          <span class="article-info-chip">
            <span class="article-info-icon article-info-icon-hash" aria-hidden="true"></span>
            ${escapeHtml(tags)}
          </span>
        </div>
        <p class="article-info-summary">${escapeHtml(article.summary)}</p>
        <div class="article-info-stats">
          <span>${escapeHtml(stats.words)} 字</span>
          <span>|</span>
          <span>${escapeHtml(stats.minutes)}分钟</span>
        </div>
      </div>
    `;
  }

  function renderHome() {
    const homeArticles = getRecommendedTutorials(8);
    const popularTools = getPopularTools(8);
    return `
      <div class="home-layout">
        <section class="home-articles" aria-labelledby="homeArticlesTitle">
          <div class="section-head">
            <div>
              <h1 id="homeArticlesTitle" class="section-title">推荐文章</h1>
              <p class="section-copy">精选优质内容，掌握 AI 最新动态与实用技巧</p>
            </div>
            <button class="text-link" type="button" data-tab-target="tutorials">查看全部文章 ›</button>
          </div>
          <div class="recommend-list">
            ${homeArticles
              .map(
                (article) => `
                  <article class="panel article-row" data-tutorial-id="${escapeHtml(article.id)}" role="button" tabindex="0">
                    <div class="thumb" data-cover="${escapeHtml(article.coverType)}"><span class="visual-label">${escapeHtml(article.title)}</span></div>
                    ${articleInfoPanel(article)}
                  </article>
                `,
              )
              .join("")}
          </div>
          <div class="load-more-row">
            <button class="load-more-button" type="button" data-tab-target="tutorials">查看更多</button>
          </div>
        </section>

        <section class="home-tools" aria-labelledby="homeToolsTitle">
          <div class="section-head">
            <div>
          <h2 id="homeToolsTitle" class="section-title">推荐工具</h2>
              <p class="section-copy">先从这 8 个常用工具开始，提升效率与创造力</p>
            </div>
            <button class="text-link" type="button" data-tab-target="tools">查看全部工具 ›</button>
          </div>
          <div class="tool-rail">
            ${popularTools.map(renderToolCard).join("")}
          </div>
        </section>
      </div>
    `;
  }

  function renderToolCard(item) {
    return `
      <article class="panel tool-card" data-tool-id="${escapeHtml(item.id)}" role="button" tabindex="0" aria-label="查看 ${escapeHtml(item.name)} 详情">
        ${renderBrandIcon(item, "tool-icon")}
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <span class="small-button">查看详情</span>
      </article>
    `;
  }

  function renderToolTile(item) {
    return `
      <article class="panel tool-tile" data-tool-id="${escapeHtml(item.id)}" role="button" tabindex="0" aria-label="查看 ${escapeHtml(item.name)} 详情">
        ${renderBrandIcon(item, "tile-icon")}
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </div>
      </article>
    `;
  }

  function renderTools() {
    const selectedTool = getToolDetail(state.selectedToolId);
    if (selectedTool) {
      return renderToolDetail(selectedTool);
    }

    const toolSections = getToolSections({ query: state.toolQuery });

    return `
      <section class="directory-shell" aria-labelledby="toolsTitle">
        <div class="tool-directory-layout">
          ${renderToolSidebar()}
          <div class="tool-directory-main">
            <div class="category-strip" role="tablist" aria-label="AI工具分类">
              ${categories
                .map(
                  (category) => `
                    <button class="category-button ${category.name === state.toolCategory ? "is-active" : ""}" type="button" data-tool-category="${escapeHtml(category.name)}" data-scroll-target="${escapeHtml(sectionId(category.name))}">
                      ${escapeHtml(category.name)}
                    </button>
                  `,
                )
                .join("")}
            </div>
            <label class="search-field tool-search-field">
              <span class="field-search-icon" aria-hidden="true"></span>
              <input id="toolSearch" type="search" value="${escapeHtml(state.toolQuery)}" placeholder="在「AI工具」中搜索" />
            </label>
            <div class="chip-row">
              ${hotKeywords
                .map(
                  (keyword) => `
                    <button class="chip ${keyword === state.toolSubcategory ? "is-active" : ""}" type="button" data-tool-chip="${escapeHtml(keyword)}">
                      ${escapeHtml(keyword)}
                    </button>
                  `,
                )
                .join("")}
            </div>

            <div class="directory-sections">
              ${
                toolSections.length
                  ? toolSections.map((section) => renderDirectorySection(section)).join("")
                  : `<div class="empty-state panel">没有找到匹配的 AI 工具</div>`
              }
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderSidebarIcon(categoryName) {
    const iconPath = sidebarIconPaths[categoryName] || sidebarIconPaths.default;
    return `
      <span class="sidebar-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          ${iconPath}
        </svg>
      </span>
    `;
  }

  function renderToolSidebar() {
    return `
      <aside class="tool-sidebar" aria-label="AI工具侧边分类">
        ${categories
          .map((category) => {
            const isExpanded = category.name === state.expandedToolCategory;
            return `
              <section class="sidebar-category ${isExpanded ? "is-active" : ""}">
                <button class="sidebar-category-button" type="button" data-tool-category="${escapeHtml(category.name)}" data-scroll-target="${escapeHtml(sectionId(category.name))}" aria-expanded="${isExpanded}">
                  ${renderSidebarIcon(category.name)}
                  <span class="sidebar-category-label">${escapeHtml(category.name)}</span>
                  <span class="sidebar-arrow" aria-hidden="true"></span>
                </button>
                ${isExpanded ? `
                  <div class="sidebar-subcategories">
                    ${category.subcategories
                      .map(
                        (sub) => `
                          <button class="sidebar-subcategory ${category.name === state.toolCategory && sub === state.toolSubcategory ? "is-active" : ""}" type="button" data-tool-subcategory="${escapeHtml(sub)}" data-tool-category="${escapeHtml(category.name)}" data-scroll-target="${escapeHtml(sectionId(category.name))}">
                            ${escapeHtml(sub)}
                          </button>
                        `,
                      )
                      .join("")}
                  </div>
                ` : ""}
              </section>
            `;
          })
          .join("")}
      </aside>
    `;
  }

  function renderDirectorySection(section) {
    return `
      <section id="${escapeHtml(section.id)}" class="directory-section" aria-labelledby="${escapeHtml(section.id)}Title">
        <div class="section-head">
          <h2 id="${escapeHtml(section.id)}Title" class="section-title">${escapeHtml(section.name)}</h2>
        </div>
        <div class="subtab-row">
          ${section.subcategories
            .map(
              (sub) => `
                <button class="subtab ${section.name === state.toolCategory && sub === state.toolSubcategory ? "is-active" : ""}" type="button" data-tool-subcategory="${escapeHtml(sub)}" data-tool-category="${escapeHtml(section.name)}" data-scroll-target="${escapeHtml(section.id)}">
                  ${escapeHtml(sub)}
                </button>
              `,
            )
            .join("")}
        </div>
        <div class="tool-grid">
          ${section.tools.length ? section.tools.map(renderToolTile).join("") : `<div class="empty-state panel">没有找到匹配的 AI 工具</div>`}
        </div>
      </section>
    `;
  }

  function renderInlineMarkdown(value) {
    return escapeHtml(value).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  function renderToolContent(content) {
    const blocks = String(content || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return blocks
      .map((line) => {
        if (line.startsWith("## ")) {
          return `<h2>${escapeHtml(line.slice(3))}</h2>`;
        }
        if (line.startsWith("- ")) {
          return `<p class="tool-detail-bullet">${renderInlineMarkdown(line.slice(2))}</p>`;
        }
        if (/^\d+\.\s+/.test(line)) {
          const [, number, text] = line.match(/^(\d+)\.\s+(.+)$/);
          return `<p class="tool-detail-numbered"><span class="numbered-index">${escapeHtml(`${number}.`)}</span><span class="numbered-body">${renderInlineMarkdown(text)}</span></p>`;
        }
        return `<p>${renderInlineMarkdown(line)}</p>`;
      })
      .join("");
  }

  function renderToolDetail(tool) {
    const detailVisual = tool.icon || tool.cover;
    return `
      <section class="tool-detail-layout" aria-labelledby="toolDetailTitle">
        <article class="panel tool-detail-main">
          <button class="detail-back" type="button" data-tool-back>‹ 返回 AI导航</button>
          <div class="tool-detail-hero">
            <div class="tool-detail-cover${detailVisual ? " tool-detail-cover-icon" : ""}" style="--accent:${tool.accent}">
              ${
                detailVisual
                  ? `<img src="${escapeHtml(detailVisual)}" alt="${escapeHtml(tool.name)} 图标" loading="lazy" />`
                  : `<span>${escapeHtml(tool.iconText)}</span>`
              }
            </div>
            <div class="tool-detail-summary">
              <div class="tag-cloud tool-detail-tags">
                ${tool.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
              <h1 id="toolDetailTitle">${escapeHtml(tool.name)}</h1>
              <p>${escapeHtml(tool.description)}</p>
              <div class="tool-detail-actions">
                <a class="primary-link-button" href="${escapeHtml(tool.externalUrl)}" target="_blank" rel="noopener noreferrer">访问官网</a>
              </div>
            </div>
          </div>
          <div class="tool-detail-content">
            ${renderToolContent(tool.content)}
          </div>
        </article>
      </section>
    `;
  }

  function renderTutorials() {
    const selectedTutorial = getTutorialById(state.selectedTutorialId);
    if (selectedTutorial) {
      return renderTutorialDetail(selectedTutorial);
    }

    const matched = filterTutorials({ category: state.tutorialCategory, query: state.tutorialQuery });
    return `
      <section class="tutorial-page" aria-labelledby="tutorialTitle">
        <h1 id="tutorialTitle" class="section-title">AI 学习教程</h1>
        <label class="search-field tutorial-search-field">
          <span class="field-search-icon" aria-hidden="true"></span>
          <input id="tutorialSearch" type="search" value="${escapeHtml(state.tutorialQuery)}" placeholder="在「AI教程」中搜索" />
        </label>
        ${
          matched.length
            ? `<div class="tutorial-list">${matched.map(renderTutorialCard).join("")}</div>`
            : `<div class="empty-state panel">没有找到匹配的教程</div>`
        }
      </section>
    `;
  }

  function renderTutorialDetail(article) {
    const related = getRecommendedTutorials(4).filter((item) => item.id !== article.id).slice(0, 3);
    return `
      <section class="panel tutorial-detail" aria-labelledby="tutorialDetailTitle">
        <button class="detail-back" type="button" data-tutorial-back>‹ 返回教程列表</button>
        <div class="detail-hero">
          ${articleVisual(article)}
          <div>
            <span class="badge">${escapeHtml(article.category)}</span>
            <h1 id="tutorialDetailTitle">${escapeHtml(article.title)}</h1>
            <p>${escapeHtml(article.summary)}</p>
            ${articleMeta(article)}
          </div>
        </div>
        <div class="detail-body">
          <section class="detail-section">
            <h2>适合谁阅读</h2>
            <p>这篇教程适合正在把 AI 工具落到真实工作流里的用户。你可以把它当作一份实操清单，先理解关键概念，再按照自己的场景替换工具和素材。</p>
          </section>
          <section class="detail-section">
            <h2>核心步骤</h2>
            <ol>
              <li>明确任务目标、输入材料和最终交付物，先把 AI 要解决的问题说清楚。</li>
              <li>选择合适工具，给出角色、背景、约束和输出格式，减少反复沟通成本。</li>
              <li>用小样本验证结果，再沉淀成模板、清单或自动化流程。</li>
            </ol>
          </section>
          <section class="detail-section">
            <h2>实战建议</h2>
            <p>不要一次性追求完整自动化，先从一个高频、低风险、结果容易验收的环节开始。每次迭代只优化一个变量，记录提示词、工具配置和产出差异，后续才能稳定复用。</p>
          </section>
        </div>
        <div class="related-block">
          <div class="section-head">
            <h2 class="section-title">继续阅读</h2>
            <button class="text-link" type="button" data-tutorial-back>查看全部教程 ›</button>
          </div>
          <div class="related-grid">
            ${related.map(renderTutorialCard).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderTutorialCard(item) {
    return `
      <article class="panel tutorial-card" data-tutorial-id="${escapeHtml(item.id)}" role="button" tabindex="0">
        ${articleVisual(item)}
        ${articleInfoPanel(item)}
      </article>
    `;
  }

  function coverAccent(coverType) {
    return {
      deep: "#4f46e5",
      red: "#fb7185",
      code: "#14b8a6",
      green: "#10b981",
      blue: "#60a5fa",
    }[coverType] || "#1677ff";
  }

  function renderAbout() {
    return `
      <section class="panel about-hero" aria-labelledby="aboutTitle">
        <div>
          <h1 id="aboutTitle">关于 工具人AI导航</h1>
          <p>你好，欢迎来到 工具人AI导航。这里是我们沉淀 AI 工具、数字化效率方法和实战工作流的内容基地，帮助你把复杂技术转化为能上手、能复用、能产生结果的生产力。</p>
          <div class="about-points">
            <span>AI 实用教程</span>
            <span>严选工具导航</span>
            <span>工作流复盘</span>
          </div>
        </div>
      </section>
      <section class="about-grid" aria-label="关于我们详情">
        <article class="panel about-card">
          <h2>我们在做什么</h2>
          <ul>
            <li>把常用 AI 工具按真实场景整理成清晰目录</li>
            <li>用实操教程拆解工具选择、配置和落地步骤</li>
            <li>持续复盘高频工作流，减少从知道到会用的距离</li>
          </ul>
        </article>
        <article class="panel about-card">
          <h2>适合谁阅读</h2>
          <ul>
            <li>想用 AI 提升办公、创作、学习效率的个人用户</li>
            <li>正在寻找可靠工具和上手路径的团队与运营</li>
            <li>希望把 AI 能力转化为项目成果的新手和实践者</li>
          </ul>
        </article>
        <article class="panel about-card">
          <h2>内容原则</h2>
          <ul>
            <li>拒绝制造焦虑，更关注可验证的工具价值</li>
            <li>优先整理能复用的教程、清单和案例</li>
            <li>所有内容仅作学习参考，不构成专业建议</li>
          </ul>
        </article>
      </section>
      <footer class="site-footer">
        <span>© 2026 工具人AI导航 ｜ 让 AI 工具与知识触手可及</span>
      </footer>
    `;
  }

  function render() {
    const app = document.getElementById("app");
    if (!app) return;
    const views = {
      home: renderHome,
      tools: renderTools,
      tutorials: renderTutorials,
      about: renderAbout,
    };
    app.innerHTML = views[state.tab]();
    document.querySelectorAll(".nav-link").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tab === state.tab);
    });
  }

  function setTab(tab) {
    state.tab = tab;
    state.selectedTutorialId = "";
    state.selectedToolId = "";
    render();
    scrollToPageTop();
    document.getElementById("app")?.focus({ preventScroll: true });
  }

  function scrollToPageTop() {
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  function scrollToToolSection(targetId) {
    if (!targetId) return;
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function showToast(message) {
    let toast = document.querySelector(".site-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "site-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  const SCOPED_SEARCH_RENDER_DELAY = 90;
  let scopedSearchTimer = 0;

  function restoreSearchFocus(inputId, selectionStart, selectionEnd) {
    window.requestAnimationFrame(() => {
      const input = document.getElementById(inputId);
      if (!input) return;
      input.focus({ preventScroll: true });
      if (typeof input.setSelectionRange !== "function") return;
      const end = input.value.length;
      const startPosition = Math.min(selectionStart ?? end, end);
      const endPosition = Math.min(selectionEnd ?? startPosition, end);
      input.setSelectionRange(startPosition, endPosition);
    });
  }

  function scheduleScopedSearchRender(input) {
    const inputId = input.id;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    window.clearTimeout(scopedSearchTimer);
    scopedSearchTimer = window.setTimeout(() => {
      render();
      restoreSearchFocus(inputId, selectionStart, selectionEnd);
    }, SCOPED_SEARCH_RENDER_DELAY);
  }

  function applyGlobalSearch(query) {
    const value = String(query || "").trim();
    if (!value) {
      showToast("请输入关键词后搜索");
      return;
    }
    state.toolQuery = value;
    state.tutorialQuery = value;
    state.selectedTutorialId = "";
    state.selectedToolId = "";
    const result = searchEverywhere(value);
    state.tab = result.preferredTab;
    render();
    scrollToPageTop();
    showToast(value ? `已搜索「${value}」` : "请输入关键词后搜索");
  }

  function selectTutorialCategory(category) {
    state.tab = "tutorials";
    state.tutorialCategory = category;
    state.tutorialQuery = "";
    state.selectedTutorialId = "";
    render();
    scrollToPageTop();
  }

  function syncToolSubcategory() {
    const category = categories.find((item) => item.name === state.toolCategory);
    if (category && !category.subcategories.includes(state.toolSubcategory)) {
      state.toolSubcategory = category.subcategories[0];
    }
  }

  function init() {
    render();
    document.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-action]");
      if (actionButton) {
        const action = actionButton.dataset.action;
        if (action === "show-all-tutorials") {
          selectTutorialCategory("全部");
          return;
        }
        if (action === "show-all-routes") {
          showToast("更多教程路线将在后续版本开放");
          return;
        }
      }

      const tutorialBack = event.target.closest("[data-tutorial-back]");
      if (tutorialBack) {
        state.selectedTutorialId = "";
        state.tab = "tutorials";
        render();
        scrollToPageTop();
        return;
      }

      const toolBack = event.target.closest("[data-tool-back]");
      if (toolBack) {
        state.selectedToolId = "";
        state.tab = "tools";
        render();
        scrollToPageTop();
        return;
      }

      const tutorialCard = event.target.closest("[data-tutorial-id]");
      if (tutorialCard) {
        state.selectedTutorialId = tutorialCard.dataset.tutorialId;
        state.selectedToolId = "";
        state.tab = "tutorials";
        render();
        scrollToPageTop();
        return;
      }

      const toolCard = event.target.closest("[data-tool-id]");
      if (toolCard) {
        state.selectedToolId = toolCard.dataset.toolId;
        state.selectedTutorialId = "";
        state.tab = "tools";
        render();
        scrollToPageTop();
        return;
      }

      const tabButton = event.target.closest("[data-tab], [data-tab-target]");
      if (tabButton) {
        event.preventDefault();
        setTab(tabButton.dataset.tab || tabButton.dataset.tabTarget);
        return;
      }

      const subcategoryButton = event.target.closest("[data-tool-subcategory], [data-tool-chip]");
      if (subcategoryButton) {
        const value = subcategoryButton.dataset.toolSubcategory || subcategoryButton.dataset.toolChip;
        const category = categories.find((item) => item.subcategories.includes(value));
        if (category) {
          state.toolCategory = category.name;
          state.toolSubcategory = value;
          state.expandedToolCategory = category.name;
        }
        state.selectedToolId = "";
        render();
        scrollToToolSection(subcategoryButton.dataset.scrollTarget || sectionId(state.toolCategory));
        return;
      }

      const categoryButton = event.target.closest("[data-tool-category]");
      if (categoryButton) {
        const nextCategory = categoryButton.dataset.toolCategory;
        const isSidebarCategory = categoryButton.closest(".tool-sidebar");
        if (isSidebarCategory && state.expandedToolCategory === nextCategory) {
          state.expandedToolCategory = "";
          state.selectedToolId = "";
          render();
          return;
        }
        state.toolCategory = nextCategory;
        state.expandedToolCategory = nextCategory;
        state.selectedToolId = "";
        syncToolSubcategory();
        render();
        scrollToToolSection(categoryButton.dataset.scrollTarget);
        return;
      }

      const tutorialButton = event.target.closest("[data-tutorial-category]");
      if (tutorialButton) {
        selectTutorialCategory(tutorialButton.dataset.tutorialCategory);
        return;
      }

      const tutorialTag = event.target.closest("[data-tutorial-tag]");
      if (tutorialTag) {
        state.tab = "tutorials";
        state.tutorialCategory = "全部";
        state.tutorialQuery = tutorialTag.dataset.tutorialTag;
        state.selectedTutorialId = "";
        render();
        scrollToPageTop();
        return;
      }

      const routeButton = event.target.closest("[data-route-category]");
      if (routeButton) {
        selectTutorialCategory(routeButton.dataset.routeCategory);
        return;
      }

      const pageButton = event.target.closest("[data-page-action]");
      if (pageButton) {
        showToast("静态版分页为样式占位，更多文章可通过搜索和分类查看");
      }
    });

    document.addEventListener("submit", (event) => {
      const form = event.target.closest("[data-global-search]");
      if (!form) return;
      event.preventDefault();
      const input = form.querySelector("#globalSearch");
      applyGlobalSearch(input?.value);
    });

    document.addEventListener("input", (event) => {
      if (event.target.id === "toolSearch") {
        state.toolQuery = event.target.value;
        state.selectedToolId = "";
        scheduleScopedSearchRender(event.target);
      }
      if (event.target.id === "tutorialSearch") {
        state.tutorialQuery = event.target.value;
        state.selectedTutorialId = "";
        scheduleScopedSearchRender(event.target);
      }
      if (event.target.id === "globalSearch") {
        const value = event.target.value;
        state.toolQuery = value;
        state.tutorialQuery = value;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target.id === "globalSearch") {
        event.preventDefault();
        applyGlobalSearch(event.target.value);
        return;
      }

      if (event.key !== "Enter" && event.key !== " ") return;
      const tutorialCard = event.target.closest("[data-tutorial-id]");
      const toolCard = event.target.closest("[data-tool-id]");
      if (!tutorialCard && !toolCard) return;
      event.preventDefault();
      if (toolCard) {
        state.selectedToolId = toolCard.dataset.toolId;
        state.selectedTutorialId = "";
        state.tab = "tools";
        render();
        scrollToPageTop();
        return;
      }
      state.selectedTutorialId = tutorialCard.dataset.tutorialId;
      state.selectedToolId = "";
      state.tab = "tutorials";
      render();
      scrollToPageTop();
    });
  }

  return {
    categories,
    tutorials,
    tools,
    getRecommendedTutorials,
    getTutorialById,
    getToolById,
    getToolUrl,
    getToolDetail,
    searchEverywhere,
    getFeaturedTools,
    getPopularTools,
    filterTools,
    getToolSections,
    filterTutorials,
    init,
  };
});
