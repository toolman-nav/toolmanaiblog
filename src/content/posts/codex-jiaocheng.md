---
title: "OpenAI Codex国内保姆级教程：从安装、手机验证到接入DeepSeek，一篇全搞定！"
seoTitle: "Codex 国内使用教程 2026"
slug: codex-china-guide-2026
published: 2026-09-08
dateModified: 2026-09-08
description: "2026最新Codex国内使用教程：从0开始安装（Win/Mac）、手机验证解决方案、Plus/Pro充值订阅、接入DeepSeek省钱方案、常见报错解决，一篇讲全，新手照做就能用。"
image: "../../assets/images/codex-jiaocheng/00.webp"
tags: ["Codex", "ChatGPT", "DeepSeek", "教程"]
category: "海外AI使用教程"
relatedTools: ["chatgpt"]
faq:
  - q: "不订阅ChatGPT Plus也能用Codex吗？"
    a: "可以。按本文方法把Codex接入DeepSeek等第三方模型即可使用，只需为API额度按量付费，成本比订阅Plus低不少。"
  - q: "手机验证一直收不到验证码怎么办？"
    a: "换英国或德国等其他地区的号码再试，同时错开高峰时段；短时间内高频重试可能触发拦截，换个时间段往往就过了。"
  - q: "Codex报503只能干等吗？"
    a: "503是服务器过载，等待是唯一解，但可以错峰：避开美国白天高峰，选北京时间早上使用，或高峰期切换到Terra、Luna等模型顶一顶。"
---

Codex有多火应该就不用我多废话了，今天这篇就从0开始，用一篇文章把Codex国内使用一次性讲全，全程保姆级，跟着做就行。

这篇文章解决5个问题：

1. 从0开始安装Codex（Win/Mac）
2. Codex手机验证解决方案
3. 充值订阅Plus/Pro版
4. 接入DeepSeek使用（省钱版）
5. 常见报错及解决方法

---

## 一、Codex是什么？值不值得装？

Codex是OpenAI的AI编程智能体，现在已经直接内置进了ChatGPT。

它能写代码、能接任务，还能自己规划步骤、跑代码、修Bug，一条龙服务。

简单说：以前的ChatGPT只会动嘴给建议，现在的Codex直接动手帮你干活。

那到底值不值得装？

如果你日常写代码、想搞办公自动化、或者经常要处理重复性的文件工作——**值得，放心装。**

---

## 二、从0开始安装Codex

### 1. Windows安装三步法

正常流程很简单：打开OpenAI官网，在Products里找到Codex，点击下载。

传送门：[https://openai.com/](https://openai.com/)

但这里就是小白的第一个天坑：不少人点了下载之后无限转圈，或者直接提示"你所在的地区无法使用"。

别慌，三步解决：

1. **换网络**：把魔法切到欧洲或美洲的节点再试。
2. **改时区**：把电脑系统时区改成美国或欧洲。
3. **用离线包绕过**：前两步还不行，就打开下面的网站，把微软商店里Codex的产品ID `9PLM9XGG6VKS` 粘贴进去，右侧通道选"Slow"，然后手动下载安装包安装。

传送门：[https://store.rg-adguard.net/](https://store.rg-adguard.net/)

或者直接下载我打包好了的离线包，链接放下方了：

传送门：[https://pan.quark.cn/s/84aed99a29e7](https://pan.quark.cn/s/84aed99a29e7)

### 2. Mac安装

Mac就丝滑多了：下载.dmg文件，拖进Applications，完事。

---

## 三、Codex手机验证解决方案

装好后首次打开Codex，会跳转到ChatGPT授权页登录。

然后你会撞上第二个天坑：**手机验证不支持中国大陆手机号。**

解决方案就是：

用虚拟号码平台接收验证码。

再说两个实战小技巧：

* 一个号码反复失败？**换英国或德国的号码**再试。
* 高频尝试容易被拦截，**换个时间段再试**，往往就能过了。

验证完成后进入ChatGPT桌面版，点击左上角的选择器，就能在Codex和ChatGPT之间自由切换了。

---

## 四、充值订阅Plus/Pro版

现实问题来了：**ChatGPT官方不支持国内支付。**

目前主流方案就三种：虚拟卡、苹果礼品卡、Google Pay。

嫌自己折腾麻烦的，直接选支持支付宝/微信的第三方平台。目前比较靠谱的有4个：

### 1. Wild AI

ChatGPT Plus约**22.99美元（约154元）**，支持Go和Pro 5x/20x套餐。

Claude、Gemini、xAI的订阅也能搞定，而且有售后支持。
传送门：[https://bewild.ai?code=TOOLMAN](https://bewild.ai?code=TOOLMAN)


### 2. 账号星球

ChatGPT Plus最低**149元**起，支持Pro 5x/20x套餐。

另外还提供Telegram账号、苹果礼品卡、Gmail账号。

传送门：[http://acceboyaibot.acceboy.com/](http://acceboyaibot.acceboy.com/)


### 3. 银河录像局

运营时间比较长的老牌平台，有群可售后。Plus升级**189元**起，支持Pro 5x/20x。

顺带Netflix、Spotify这类流媒体也能订。

传送门：[https://nf.video/ltV9P](https://nf.video/ltV9P)

### 4. 环球巴士

同样是群类平台，Plus **218元**起，不支持Pro。

另外还有Netflix、Spotify、Claude、POE等服务。

价格会随汇率浮动，以平台实时页面为准。

传送门：[https://universalbus.cn/?s=lTVZgwUD46](https://universalbus.cn/?s=lTVZgwUD46)

---

## 五、不想花GPT的钱？接入DeepSeek使用（简单版）

Codex是支持第三方模型的。不想为GPT-5.6的能力买单，可以接入DeepSeek，按API用量付费，便宜得多。

两种方法，推荐第一种。

### 方法1：用插件切换（新手友好）

借助开源工具CC Switch就能搞定：

传送门：[https://ccswitch.io/zh/](https://ccswitch.io/zh/)

1. 安装并打开工具，选中对应选项和GPT模型。
2. 点击加号，在列表里找到DeepSeek，添加。
3. 点击编辑按钮，跳转到DeepSeek API开放平台（没注册的先注册），创建一个API Key。

传送门：[https://platform.deepseek.com/](https://platform.deepseek.com/)

4. 把Key粘贴进去，保存，然后点击启用。
5. 重启Codex，DeepSeek就接上了。

**一个验证小技巧：**

给Codex发一张图片。

如果它报错说"无法识别图片"——恭喜，说明DeepSeek已经生效了。

因为GPT能看图，DeepSeek不能。一测一个准。

想换回原来的模型，重新启用默认设置，再重启一次就行。

### 方法2：直接改配置（不推荐小白）

进Codex目录，找到`config.toml`，把`base_url`改成DeepSeek的API地址，再填上自己的Key。

动手能力强可以试，但新手容易改出各种报错，量力而行。

---

## 六、常见报错及解决方法

Codex的报错大体分四类：**安装类、连接类、配置类、功能类**。

这里挑最常见的几种讲。

### 1. 安装类：提示"应用无法安装"（Win10/Win11）

一般是系统组件损坏导致的。

管理员身份打开PowerShell，依次执行下面两条修复命令：

```
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
```

修完重启电脑，再装一次。

### 2. 503：服务器过载

人太多把服务器挤爆了，这个真没别的办法，只能等。

但可以**有策略地等**：避开美国白天的使用高峰，选北京时间早上，基本秒进。

高峰期实在要用，可以切到Terra或Luna模型顶一顶——Sol用的人最多，最容易满载。

### 3. 403/405或提示"能力错误"

这是账号或IP触发风控了。

先自查账号有没有违规记录，然后换一个IP节点再试。

如果确实被拉黑了，只能等解封或联系官方支持。

### 4. 一直卡在"正在连接"

九成是魔法的问题。

全局模式和规则模式来回切一下试试，或者直接换个节点。

### 5. 登录失败/授权页打不开

先检查系统时间！**时间不同步是很多玄学问题的元凶。**

然后清一下浏览器缓存、换个浏览器再试，多半就解决了。

---

好了，今天的分享就到这。

从安装、验证、充值到报错排查，这一篇基本把Codex国内使用的坑都填完了。

至于怎么安装skills、有哪些好用的进阶技巧，内容太多没法一次讲完。想看的话，点赞告诉我，人多的话下期安排！

---

<blockquote class="affiliate-disclosure">本文部分链接含邀请码，注册可能为本站带来收益，不影响你的使用。</blockquote>
