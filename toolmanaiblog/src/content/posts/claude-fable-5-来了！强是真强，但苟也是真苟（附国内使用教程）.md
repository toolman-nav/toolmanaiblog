---
title: Claude Fable 5 来了！强是真强，但苟也是真苟（附国内使用教程）
published: 2026-06-10
description: Claude Fable 5是当下你能摸到的最强模型，没有之一，附上国内使用教程，快来看看！
image: ""
category: 海外AI使用教程
tags:
  - Claude Fable 5
  - Claude
  - Claude Pro
  - 教程
draft: false
---

就在今天凌晨，**Anthropic放出了他们憋了很久的大招**——

Claude Fable 5。

你可能会问：

> 不是一直传要发 Mythos 吗？怎么来了个Fable？

简单说，**这俩是同一个底座的“双胞胎”**。Mythos 5是“完全体”，能力拉满但只给少数网络安全机构和特定研究者用；Fable 5就是给咱们普通人用的版本，套了一层厚实的“安全铠甲”。你可以理解为：同一台超级跑车，Mythos是赛道版拆了限速器，Fable 是民用版带全套辅助驾驶。

# 一、性能方面

那这辆“民用车”到底有多猛？一句话：

**当下你能摸到的最强模型，没有之一**。

**先看一个让我起鸡皮疙瘩的案例：**

Stripe拿Fable 5跑一个 5000 万行的巨型 Ruby 代码库，Fable 5一天就完成了全库迁移。同样的活，一整个工程师团队都要埋头干两个多月。

这已经不是“快”了，简直是把工作时间压缩成了压缩饼干。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NDFlNWVjNTIwM2E1Yzk0YmY0MWU1NDI5NDI5ZTEyMmJfNWdzNTRPQ3czRVFDZEN0TzB3b1VRa2paUWIwWHdDUHpfVG9rZW46WjhDZWJGTmlwb1hSZHR4clN3eWNxV1l3bnRZXzE3ODEwNzYzODA6MTc4MTA3OTk4MF9WNA&add_watermark=true&scene_type=CCM)

**视觉能力也离谱。**

前代 Claude 要接一堆外挂才能玩的宝可梦，Fable 5 只靠看游戏截图就直接通关了——像极了当年你盯着黑白屏掌机愣是无师自通。

它甚至能看着科学论文里复杂的图表，抠出精确数字，还能仅凭几张 App 截图反推出整个网页的源代码。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MTE3M2M3M2ZhNGQzNmFjZmY3NTAyMTY4NWM4YmE1MTRfWkFsN3lYWlhqVWZ6QThlZjdMWWcyVzRUZGduQ3czN2xfVG9rZW46R1hjTGI5YVNVbzJ5eVF4OHR1SmM3cEJJblFmXzE3ODEwNzYzODA6MTc4MTA3OTk4MF9WNA&add_watermark=true&scene_type=CCM)

**还有记忆。**

玩《杀戮尖塔》时给它一个文件当“外部记忆卡”，得分直接飙到 Opus 4.8 的三倍。感觉它就不是在玩，而是在“想”。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=MDI0Y2I4NmZkODU2OWU3MzM1YmYyNmE0MWMwYjg5OTRfUE5TYXk2ajZmT0hXcnBOREk1QktnZ2hqeG1rQzF1akhfVG9rZW46TVlzQWJGYUJJb0JkRDd4ZjVVaWNXd29abjRkXzE3ODEwNzYzODA6MTc4MTA3OTk4MF9WNA&add_watermark=true&scene_type=CCM)

**不过，真正让我破防的，是它背后的 Mythos 5 展现的科学能力。**

虽然咱们用不到，但透出的底牌太震撼：

> 在药物设计里把部分环节加速了约 10 倍，14 个蛋白靶点有 9 个产出了强候选；提的分子生物学假说，80% 的情况下科学家更信它而不是之前的顶配模型，其中一个关于大肠杆菌的假说，已经被独立实验室证实了。

这已经不是工具，是能跟你一起做科研的伙伴。

**可既然这么强，为什么我还要说“苟是真苟”？**

**问题就出在那层安全护栏上。**

官方说，Fable 5 只在约 5% 的对话里触发降级，遇到敏感问题就会切到 Opus 4.8 代答。

然而按照大家的实测体感，这 5% 仿佛是个“天选概率”。有生物学家想打个招呼说“Hi”，系统判定记忆里有生物信息，直接拒绝。复杂任务更是频频被拦，全程没一个完整由 Fable 跑完。Claude Code 里一碰红线就弹“Request was blocked”，感觉像在雷区里做任务。

这就是 Anthropic 的策略：

给能力套上分类器，网络安全、生物化学、模型蒸馏三类问题一律拦下。他们甚至明说，不能用 Fable 5 去开发新的大模型。这背后是对超强模型失控的警惕，也确实在大量红队测试下做到了几乎零越狱。**但这种“宁可错杀一千”的保守，让使用体验多了不少不配得感。**

# **二、价格方面**

Fable 5 输入每百万 token 10 美元，输出 50 美元，是 Opus 4.8 的两倍，完全可以说贵到飞起。

好消息是：**6 月 22 日前，Pro、Max 等订阅用户可以免费白嫖**，只是会消耗两倍于 Opus 的额度。6 月 23 日起就要花 usage credits 了，到时候随便一个长对话就能烧掉几十块，建议设好配额。

说到底，Claude Fable 5 是**一次配得上大版本号的跃迁**，它把“长程自主任务”的天花板猛地抬高了一截。但你要是想拿它随心所欲地干活，得先学会和护栏“斗智斗勇”。

# 三、国内如何使用

由于目前仅Pro、Max 等订阅用户，或者是直接调用API等途径可以使用，如果有想上手试试的话，可以通过以下几种方法：

## 方法1：第三方充值订阅

### **1. Wild AI**

原野卡团队提供的。优点是价格相对公道，而且支持Claude Max版的订阅。

**传送门：**[**https://bewild.ai?code=TOOLMAN**](https://bewild.ai?code=TOOLMAN)

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=NmI0NGRlYjlkMzQ4ZmQyZjU5NjhmMTJiZDcxZDI5ZmNfMmtGM3hCd2lIUHdkYkI4ODBNTWZhcEdjNHFLWEhFTWJfVG9rZW46TWpHR2JDcDAzb0IzQVd4TnNPNmM5TE1UbnFoXzE3ODEwNzYzODA6MTc4MTA3OTk4MF9WNA&add_watermark=true&scene_type=CCM)

### **2. 银河录像局**

这个平台有备案，且运营时间也比较长了，他们家还有Netflix、Spotify这些流媒体车。

**传送门：**[**https://nf.video/37h7sn**](https://nf.video/37h7sn)

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=YzA4MjY1YTg2YzdkOWVkNjMyN2MyNDEyZThjZDQwN2ZfeVJId1hYdllLeEZpUGZ2WFRuc3U5Q082RGs3cGFaQ0hfVG9rZW46T2c0UmJJYjJMb0JDclB4MThRNmNJWWtTbm1mXzE3ODEwNzYzODA6MTc4MTA3OTk4MF9WNA&add_watermark=true&scene_type=CCM)

### **3. 环球巴士**

也是个老牌子了，服务范围很广（包括 POE 等）。

传送门：[https://universalbus.cn/?s=lTVZgwUD46](https://universalbus.cn/?s=lTVZgwUD46)

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=YTljMWMwOGNlZjUwYTU0ZTcyMTkxMzI2MzM5NGY0NGVfSXU3cEM2OFpORXRid2VUTTM5OGt3V1U4WGlOZUk1Yk5fVG9rZW46VTg0NWJHR2RMb3NWMDh4VUtDMmNUTDRZbmRYXzE3ODEwNzYzODA6MTc4MTA3OTk4MF9WNA&add_watermark=true&scene_type=CCM)

## 方法2：苹果礼品卡订阅

### **1. 苹果礼品卡**

这个方法虽然步骤多一点，但胜在稳定，不用担心黑卡风险。

- **第一步：**打开Apple官网的 Gift Card 页面，选择`Email`发送。传送门：[https://www.apple.com/shop/buy-giftcard/giftcard](https://www.apple.com/shop/buy-giftcard/giftcard)
- **第二步：**下拉，然后选择或输入想要的金额（订阅ChatGPT Plus需至少20美刀），接着填写发送人和接收人的邮箱，这里可以填写同一个。最后按指引提交进入下一步。
- **第三步：**在`“check out”`页面，可以选择以访客身份继续，接着就跳转到绑卡页面。在绑卡页面，支付方式选择`“Credit or Debit Card”`，填入有银联支持的国内信用卡或借记卡信息完成支付就可以。亲测招行的信用卡可用。
- **第四步：**支付成功后，通常会在一小时内收到附有兑换代码的邮件。复制兑换代码，然后在App Store的个人账户页面中选择`“兑换充值卡或代码”`，即可将金额充值到你的`美区Apple ID`。之后打开ChatGPT应用即可完成订阅。

![](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=OWU0M2I1NzljZWIwMzAyMDRjNjIzMDRhZjExM2I0ZTVfSlpWZzdHWE1Ha2FXNVAwZTF1UHE4c1lLdk9OZ3NZWEpfVG9rZW46Tzk0aWJDUWZkb0tVbmJ4b2Z3NmNVZ2JabmdnXzE3ODEwNzYzODA6MTc4MTA3OTk4MF9WNA&add_watermark=true&scene_type=CCM)

## 方法3：API调用体验

目前很多中转站都支持直接调用Fable 5了，通过这种方式来调用体验也不失为一个好方式，而且成本可控，需要的可以看云雾家的：[https://yunwu.ai/register?aff=rAj4](https://yunwu.ai/register?aff=rAj4)

欢迎体验完之后回来分享你的感受！
