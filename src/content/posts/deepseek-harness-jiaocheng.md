---
title: "【2026最新】DeepSeek Harness保姆级安装教程：下载、桌面版、插件、模型接入，手把手教学！"
seoTitle: "DeepSeek Harness 安装教程 2026"
slug: deepseek-harness-install-guide
published: 2026-09-12
dateModified: 2026-09-10
description: "DeepSeek Harness小白保姆级教程：命令行安装、第三方桌面版下载、接入DeepSeek/Kimi/GLM等模型、装插件，一步步手把手教，附打不开的解决办法和插件推荐。"
image: "../../assets/images/deepseek-harness-install-guide/00.webp"
tags: ["DeepSeek", "DeepSeek Harness", "AI编程", "教程"]
category: "AI工具使用教程"
relatedTools: ["deepseek"]
faq:
  - q: "DeepSeek Harness 打不开怎么办？"
    a: "先检查Node.js版本、终端报错和服务是否仍在运行。下载失败检查网络，端口冲突关闭重复实例，模型报错检查Key与余额；具体按正文排错表处理。"
  - q: "DeepSeek Harness 有哪些插件推荐？"
    a: "先尝试正文附有仓库链接的插件管理器。桌面客户端是另一种使用入口，不等于插件；其他插件请核对作者、兼容版本和安装说明后再选择。"
---

之前给大家写过Codex教程，很多人私信最多的还是那句老话：**没有海外账号，玩不了。**

既然如此，那今天就来讲一个不用魔法的——DeepSeek官方开源的 **DeepSeek Harness**（简称dsh），采用MIT开源协议，支持接入不同模型。**软件本身免费，云端模型API通常另外计费**；能否直连取决于你选择的模型服务和下载源。

但它有个小问题：**对小白不太友好**。需要理解运行环境和模型配置，部分插件要用命令安装，很多朋友卡在第一步就放弃了。

今天这篇就是来救场的：从下载安装、模型接入到装插件，一步一步带你跑通，全程照做就行。

---

> 文档核对日期：2026-09-10。官方主分支当时的仓库版本为0.1.5-rc.1，不等于npm的latest版本。本文命令按官方README核对，未在所有操作系统逐一实装。项目仍是开发者预览版，升级可能带来不兼容变化。安装前可用下面命令查看实际发布版本及Node要求：

```shell
npm view @deepseek-ai/dsh version engines
```

来源：[官方仓库](https://github.com/deepseek-ai/deepseek-harness)、[版本与运行环境声明](https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json)。

## 一、怎么安装DeepSeek Harness？

### 路线A：命令行安装（官方原版）

先检查电脑有没有Node.js，**使用Node.js 22.19.0及以上的22.x，或24.0.0及以上版本；推荐24.x LTS，不要把23.x当成满足要求**：

```
node -v
```

没有或者版本不兼容，先到[Node.js官网](https://nodejs.org/)安装24.x LTS，然后关闭并重新打开终端。Windows可使用命令提示符；如果PowerShell提示脚本被禁止，可将下文的npm、npx分别写成npm.cmd、npx.cmd，无需关闭执行策略。命令逐块复制执行，不要把浏览器地址当成终端命令。

然后一条命令搞定：

```
npx @deepseek-ai/dsh web
```

第一次运行需要下载依赖，耗时取决于网络。若提示安装确认，核对包名为`@deepseek-ai/dsh`后按提示确认。若出现错误或长时间无进展，按下方排错步骤检查，不要把所有停顿都当作正常。

跑起来之后，浏览器打开：

```
http://127.0.0.1:3080
```

看到界面，说明Web服务已启动。使用期间保留这个终端；按Ctrl+C会停止服务。下次再次运行同一条启动命令即可。

想长期用的话，建议换成全局安装，以后不用每次npx：

```
npm install -g @deepseek-ai/dsh
```

安装成功后启动：

```shell
dsh web
```

后续启动只需执行`dsh web`。如果找不到dsh，重新打开终端；仍失败可继续用前面的npx方式，无需反复全局安装。

### 路线B：第三方桌面版（不想碰命令行的选这个）

有团队给dsh做了个**桌面客户端**（dsh-desktop），下载安装包双击装，跟装QQ一样。

传送门：[https://github.com/dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop)

在GitHub页面右侧Releases里下载对应系统的安装包（Windows选.exe），装完打开就能用。

**说清楚一点**：这个桌面版是第三方做的，不是DeepSeek官方出品，优点是省去了命令行，其版本和兼容性由第三方维护，安装前查看Release说明。

---

## 二、DeepSeek Harness如何接入模型？

装好打开，第一件事是**配模型**——Harness只是个"壳"，不填模型它干不了活。

路径：**设置 → 模型 → 添加提供方**，全程在网页里点点点，不用改配置文件。

### 接DeepSeek官方（最简单）

而且DeepSeek V4.1-Flash还专门优化了。

API费用与网页聊天、App会员并非同一回事。先查看服务商API定价及余额，不要假定创建Key后就有免费额度。Key只填写到你信任的本地客户端，不要贴到截图、群聊或公开仓库。

1. 到[DeepSeek开放平台](https://platform.deepseek.com/)注册并创建一个API Key；
2. 回到Harness，模型提供方选DeepSeek，把Key粘进去保存。

保存后，在模型选择器中选择实际可用模型，发送一句“请回复连接成功”验证。若提示401，检查Key；余额不足则检查API账单；模型不存在时核对模型ID与服务地址。界面名称可能随版本不同，以当前设置页为准。

### 接Kimi、GLM等其他模型

想用别家模型，选**"自定义提供方"**，填这么几项：

| 表单项 | 填什么 |
| --- | --- |
| Provider ID | 随便起个小写英文名，如 kimi，后续修改可能影响已有引用 |
| 基础URL | 各家的API地址（下面给了） |
| API协议 | 使用支持的OpenAI兼容协议时选 openai-completions |
| API Key | 去对应平台申请 |
| 模型ID | 点"获取可用模型"自动拉取，拉不到就手动填 |

以下是常见普通API地址，仍需核对所购服务的官方文档；Coding Plan等订阅可能使用专用地址，不能直接套用：

* **Kimi（月之暗面）**：`https://api.moonshot.cn/v1`
* **智谱GLM**：`https://open.bigmodel.cn/api/paas/v4`
* **本地Ollama**：`http://127.0.0.1:11434/v1`（本地模型不用Key，随便填个占位符）

接本地模型有个坑提前说：**上下文窗口不要超过本地服务实际配置的上下文上限**，用默认值的话，会话一长就报"exceeds context size"。本地服务也要先启动并下载对应模型；能处理多长的会话取决于模型、上下文配置和硬件，不能仅按本地或云端区分。

---

## 三、装插件：给AI装上外挂

社区提供插件管理、界面增强等扩展。这里不使用无法复核的插件总数或Star数，先从有明确来源的插件入手。

### 安装插件管理器：不用全局安装也能执行

先在运行Web服务的终端按Ctrl+C停止服务。下面这条命令已填好插件来源，可以直接复制；首次安装仍须按终端提示确认：

```shell
npx @deepseek-ai/dsh plugin --profile web add "github:zhu1090093659/dsh-web#path:/packages/dsh-plugin-manager"
```

安装成功后重新启动：

```shell
npx @deepseek-ai/dsh web
```

刷新浏览器，在设置中查找插件管理入口。这里使用与启动方式一致的web配置，不代表第三方桌面版会自动读取同一配置。

如果已经全局安装，也可以将上面命令开头的`npx @deepseek-ai/dsh`换成`dsh`，两种写法选一种即可。

插件来源：[zhu1090093659/dsh-web](https://github.com/zhu1090093659/dsh-web)。插件安装可能执行第三方构建代码；若提示allowBuilds或构建脚本被阻止，先核对来源和仓库说明，仅授权明确需要的包，不要全局放开所有构建脚本。

### 新手从哪里选插件？

| 项目 | 用途 | 来源 |
| --- | --- | --- |
| dsh-plugin-manager | 管理插件安装和启停 | [维护者仓库](https://github.com/zhu1090093659/dsh-web) |
| dsh-web扩展集合 | 按README选择界面扩展，不必全装 | [扩展清单](https://github.com/zhu1090093659/dsh-web#readme) |
| dsh-desktop | 第三方桌面客户端，不是普通插件 | [下载与说明](https://github.com/dataelement/dsh-desktop/releases) |

我们做了一个[DSH插件导航站](https://dshpluginlist.com/)，方便查找候选项目。导航收录不代表已验证兼容，安装前仍须打开作者仓库核对说明。记忆、看板或QQ机器人等功能有不同实现；未核对具体项目之前，不提供含糊的推荐名称或安装命令。

## 四、打不开或安装失败：按报错排查

| 现象 | 先检查什么 | 处理方法 |
| --- | --- | --- |
| node或npm找不到 | 是否安装Node、是否重新打开终端 | 安装24.x LTS后重开终端 |
| parseEnv相关错误 | Node版本和实际执行路径 | 升级兼容版本，检查是否仍调用旧Node；若继续报错，记录完整堆栈和dsh版本 |
| 下载超时、ENOTFOUND、ECONNRESET | npm源和网络 | 执行下方诊断，先修复网络，不要无限重装 |
| EACCES或EPERM | 写入目录权限、文件占用 | 关闭占用进程，优先尝试npx；不要给整个磁盘放宽权限 |
| EADDRINUSE | 是否已经启动一个实例 | 使用已运行的实例，或在旧终端Ctrl+C后重新启动 |
| 浏览器连接被拒绝 | Web服务是否已退出 | 查看终端最后一条报错，修复后重新运行启动命令 |
| API返回401、余额不足、模型不存在 | Key、余额、模型ID及地址 | 在相应服务商平台核对，勿把不同套餐的地址混用 |
| exceeds context size | 服务端上下文上限 | 调低配置到实际支持值，缩短输入或新开会话 |

以下命令只检查环境和npm连接，可逐条复制：

```shell
node -v
npm -v
node -p "process.execPath"
npm config get registry
npm ping
npm view @deepseek-ai/dsh version engines
```

npm连通不代表GitHub插件下载也连通。求助时提供系统、Node版本、dsh版本及去除密钥的报错文本；不要发送API Key。插件Star数只说明关注度，不是安全或兼容性保证。

---

好了，今天的分享就到这。

从安装、配模型到装插件，这篇走完，你的Harness就算正式上岗了。

至于插件深度玩法、让它帮你干活实战案例，我们后续也会更新，别忘了收藏！

---

> 本文部分链接含邀请或推广性质，不影响你的正常使用；文中命令以官方文档为准，文档核对日期为2026年9月10日，发布日期不代表完成了新版本实测。
