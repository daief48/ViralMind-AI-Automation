# 🚀 VIRALMIND

## AI-Powered Autonomous Facebook Growth & Management Platform

You are a senior full-stack architect, AI engineer, automation engineer, and SaaS product developer.

Build a production-ready AI SaaS platform called:

# VIRALMIND

**Tagline:**

> Your Autonomous Social Media Growth Agent

ViralMind is an AI-powered Facebook Page management and organic growth platform.

The platform allows an admin to connect a Facebook Page and let AI continuously:

* Research current trends
* Analyze news and market data
* Identify high-potential topics
* Generate original Facebook content
* Generate relevant images
* Schedule and publish posts
* Monitor comments
* Generate appropriate replies
* Analyze post performance
* Learn from audience behavior
* Improve future content strategy

The goal is NOT to build a simple Facebook auto-poster.

The goal is to build:

> **An Autonomous AI Social Media Growth Agent**

---

# 1. CORE VIRALMIND LOOP

ViralMind should operate using this continuous loop:

```text
Research
   ↓
Trend Detection
   ↓
Trend Analysis
   ↓
Opportunity Scoring
   ↓
Content Strategy
   ↓
Content Generation
   ↓
Image Generation
   ↓
Quality & Safety Check
   ↓
Scheduling
   ↓
Facebook Publishing
   ↓
Comment Management
   ↓
Analytics
   ↓
AI Learning
   ↓
Strategy Improvement
   ↓
Next Cycle
```

The AI should continuously improve based on actual page performance.

Important:

ViralMind must NOT guarantee virality.

It should optimize for legitimate organic growth.

Do NOT implement:

* Fake followers
* Fake likes
* Fake comments
* Fake accounts
* Artificial engagement
* Spam
* Mass unsolicited messaging
* Misleading content
* Fake news
* Guaranteed financial profit claims

---

# 2. TECHNOLOGY STACK

## Frontend

Use:

* Next.js
* TypeScript
* React
* Tailwind CSS
* shadcn/ui
* Recharts
* Responsive design

Create a premium SaaS dashboard.

---

# Backend

Use:

* Node.js
* TypeScript
* Fastify or NestJS
* REST API

---

# Database

Use:

* PostgreSQL
* Prisma ORM

---

# Queue System

Use:

* Redis
* BullMQ

Long-running AI/API operations must run through background workers.

---

# AI

Primary AI:

**Gemini**

Gemini is the main AI brain/orchestrator.

Use structured JSON output whenever possible.

Validate AI output with Zod.

Never directly trust raw LLM output.

---

# Research

Use appropriate Google/Gemini search capabilities for:

* Current news
* Financial news
* Current events
* Web research
* Regional trends

Do NOT assume Gemini itself is a live market-data feed.

---

# Market Data

Create a provider abstraction for market data.

The system should support:

* Crypto
* Forex
* Stocks
* Gold
* Other assets

Examples:

```text
BTC
ETH
Gold
USD
EUR
Stocks
```

The market provider must be replaceable.

---

# Facebook

Use:

**Meta Graph API**

Implement:

* Facebook OAuth
* Page connection
* Page information
* Token management
* Publishing
* Comments
* Supported insights
* Webhooks

Never expose Facebook access tokens to the frontend.

---

# Image Generation

Create an abstraction:

```text
ImageProvider
```

This allows different image-generation providers to be used later.

---

# 3. VIRALMIND ARCHITECTURE

Use this architecture:

```text
                  ┌────────────────────────┐
                  │   VIRALMIND DASHBOARD  │
                  │        Next.js         │
                  └────────────┬───────────┘
                               │
                               ↓
                  ┌────────────────────────┐
                  │       NODE.JS API      │
                  │     AI ORCHESTRATOR    │
                  └────────────┬───────────┘
                               │
            ┌──────────────────┼──────────────────┐
            ↓                  ↓                  ↓
         Gemini             Research          Market API
            │                  │                  │
            └──────────────────┼──────────────────┘
                               ↓
                       TREND ENGINE
                               ↓
                     OPPORTUNITY SCORE
                               ↓
                      CONTENT AGENT
                               ↓
                       IMAGE AGENT
                               ↓
                      QUALITY AGENT
                               ↓
                       META GRAPH API
                               ↓
                         FACEBOOK
                               │
               ┌───────────────┼───────────────┐
               ↓               ↓               ↓
           Comments         Reactions        Shares
               └───────────────┼───────────────┘
                               ↓
                        ANALYTICS ENGINE
                               ↓
                         AI LEARNING
                               ↓
                     STRATEGY IMPROVEMENT
                               ↓
                         NEXT VIRALMIND
                            CYCLE
```

---

# 4. IMPORTANT ARCHITECTURAL PRINCIPLE

Do NOT make Gemini responsible for everything.

Use specialized components.

```text
Gemini
= AI Brain

Search
= Research Eyes

Trend Data
= Trend Signals

Market API
= Real-Time Market Eyes

Meta Graph API
= Facebook Hands

Image Provider
= Visual Creator

Node.js
= Orchestrator

Next.js
= Control Center

PostgreSQL
= Memory

Redis/BullMQ
= Nervous System
```

---

# 5. ADMIN ONBOARDING

Create a multi-step onboarding wizard.

## Step 1 — Connect Facebook Page

```text
Connect Facebook Page
        ↓
Facebook OAuth
        ↓
Select Page
        ↓
Save Page
```

---

## Step 2 — Select Niche

Examples:

```text
Trading
Crypto
Finance
Technology
News
Education
Fitness
Food
Fashion
Business
Entertainment
```

Allow custom niche.

---

## Step 3 — Target Region

Support:

```text
Bangladesh
India
Pakistan
USA
UK
Canada
Australia
Global
```

Allow multiple regions.

---

## Step 4 — Language

Support:

```text
Bangla
English
Hindi
Urdu
```

Allow multiple languages.

---

## Step 5 — Growth Goal

Options:

```text
Followers
Engagement
Reach
Brand Awareness
Leads
Traffic
```

---

## Step 6 — Target

Example:

```text
Current Followers:
12,450

Target Followers:
100,000
```

---

## Step 7 — Automation Mode

```text
FULL AUTO
SEMI AUTO
MANUAL
```

---

# 6. REGION ENGINE

Region must affect AI strategy.

Example:

## Bangladesh

```text
Language:
Bangla

Timezone:
Asia/Dhaka

Audience:
Bangladesh

Trend:
Bangladesh-specific
```

## India

```text
Language:
English/Hindi

Timezone:
Asia/Kolkata

Audience:
India

Trend:
India-specific
```

## Global

```text
Language:
English

Audience:
International

Trend:
Global
```

Do NOT simply translate content.

Adapt:

* Hook
* Tone
* Examples
* Cultural context
* Currency
* Audience interests
* Posting time
* Regional events

---

# 7. AI ORCHESTRATOR

Create:

```text
src/modules/ai/
```

Files:

```text
ai.service.ts
ai-orchestrator.service.ts
ai-prompts.ts
ai-schema.ts
ai-provider.interface.ts
```

The AI orchestrator decides:

1. What should be researched?
2. Which trends matter?
3. Which trend has the highest opportunity?
4. What content format should be used?
5. Should an image be generated?
6. Should admin approval be required?
7. When should it be published?
8. How should comments be handled?
9. What should change based on historical performance?

---

# 8. TREND RESEARCH AGENT

Create:

```text
src/modules/trends/
src/modules/research/
```

Research:

* Latest news
* Financial news
* Crypto news
* Economic events
* Regional news
* Search trends
* Market movement
* Emerging topics
* Relevant public discussions

For trading pages monitor:

```text
BTC
ETH
Gold
Forex
Stocks
Volume
Price Movement
Volatility
Technical Indicators
```

Store research sources.

Every trend should contain:

```text
title
summary
source
sourceUrl
discoveredAt
region
niche
category
freshness
confidence
```

Never fabricate sources.

---

# 9. TREND SCORING ENGINE

Every discovered trend receives:

```text
Trend Score
Regional Relevance
Audience Interest
Freshness
Market Momentum
Competition
Content Potential
```

Example:

```text
Trend Score:          91
Regional Relevance:   94
Audience Interest:    89
Freshness:            96
Market Momentum:      92
Competition:          64
Content Potential:    90
```

Initial formula:

```text
30% Search Trend
20% News Momentum
20% Market Movement
15% Regional Relevance
10% Historical Page Performance
5% Competition
```

Make these weights configurable.

Eventually ViralMind should optimize these weights based on historical results.

---

# 10. OPPORTUNITY ENGINE

Suppose ViralMind discovers:

```text
20 trends
```

Do NOT create 20 posts.

Use:

```text
20 Trends
   ↓
Initial Filter
   ↓
Top 10
   ↓
Quality/Risk Filter
   ↓
Top 5
   ↓
Opportunity Scoring
   ↓
Top 2
   ↓
Content Generation
```

The AI must explain why the topic was selected.

Example:

```json
{
  "topic": "Bitcoin resistance breakout",
  "score": 91,
  "reason": "High freshness, strong market momentum and strong regional relevance",
  "riskLevel": "MEDIUM",
  "requiresApproval": true
}
```

---

# 11. CONTENT AGENT

ViralMind should support:

```text
Breaking News
Market Analysis
Educational
Engagement
Poll
Question
Trading Tip
Market Update
Explainer
Meme/Light Content
Community Post
```

Each topic can produce multiple content angles.

Example:

```text
Topic:
Bitcoin resistance breakout

Angle 1:
Breaking News

Angle 2:
Technical Analysis

Angle 3:
Educational

Angle 4:
Audience Question
```

The AI selects the best angle.

---

# 12. CONTENT GENERATION

Every post can contain:

```text
Hook
Main Content
CTA
Hashtags
Source
Disclaimer
```

Example:

```text
🚨 Bitcoin just broke a major resistance level.

Here's what traders should watch next...

What do you think happens next?
```

Do NOT create:

```text
Guaranteed Profit
100% Accurate Prediction
Buy Now
Guaranteed 2x
```

Use responsible language:

```text
Bullish scenario
Possible resistance
Potential support
Traders may watch
If price holds...
One possible scenario...
```

---

# 13. IMAGE AGENT

Create:

```text
src/modules/images/
```

Flow:

```text
Topic
+
Region
+
Brand Identity
+
Post Type
+
Visual Style
        ↓
AI Image Prompt
        ↓
Image Provider
        ↓
Generated Image
        ↓
Storage
        ↓
Facebook Post
```

For trading content:

```text
Premium financial media
Modern
Clean
Mobile-first
Strong visual hierarchy
Minimal clutter
Brand consistent
```

Never create fake market screenshots.

If a chart contains market data, use real data.

---

# 14. QUALITY AGENT

Before publishing:

```text
Content
   ↓
Fact Check
   ↓
Source Validation
   ↓
Financial Risk Check
   ↓
Spam Check
   ↓
Duplicate Check
   ↓
Brand Check
   ↓
Region Check
   ↓
Language Check
   ↓
Final Decision
```

Possible result:

```text
APPROVE
REJECT
NEEDS_REVIEW
```

Also return:

```text
confidence: 0-100
riskLevel
reasons
```

High-risk financial content should require human approval.

---

# 15. FACEBOOK PUBLISHING AGENT

Create:

```text
src/modules/facebook/
```

Responsibilities:

```text
OAuth
Page Connection
Token Management
Page Metadata
Publish Text
Publish Image
Schedule
Fetch Comments
Reply to Comments
Fetch Supported Insights
```

Store external Facebook IDs.

Never publish the same post twice.

Implement idempotency.

---

# 16. COMMENT AI AGENT

Flow:

```text
Facebook Comment
        ↓
Comment Classifier
        ↓
Gemini
        ↓
Response Generator
        ↓
Safety Check
        ↓
Reply / Admin Approval
```

Classify:

```text
Question
Positive
Negative
Spam
Troll
Complaint
Financial Question
Lead
Other
```

Example:

User:

> BTC ekhon buy korbo?

AI:

> Current market momentum bullish holeo volatility high. Nijer risk tolerance, research ebong current market condition consider kore decision neya better.

Risky financial questions:

```text
AI Confidence < Threshold
        ↓
ADMIN APPROVAL
```

---

# 17. COMMENT AUTOMATION SETTINGS

Admin can configure:

```text
Auto Reply
ON/OFF

Minimum Confidence
80%

Financial Questions
Approval Required

Negative Comments
Auto Reply / Approval

Complaints
Priority Alert

Leads
Notify Admin
```

---

# 18. AI CONTENT CALENDAR

ViralMind should generate a dynamic content calendar.

Example:

```text
MONDAY

09:00
Market Update

13:00
Educational

18:00
Trending Topic

21:00
Engagement
```

```text
TUESDAY

10:00
BTC Analysis

15:00
Trading Tip

20:00
Community Post
```

The system should eventually optimize posting time based on historical page performance.

---

# 19. ANALYTICS ENGINE

Collect available Meta analytics:

```text
Reach
Impressions
Likes/Reactions
Comments
Shares
Engagement
Follower Growth
Post Performance
Content Type
Posting Time
Region
Language
Topic
```

Calculate:

```text
Engagement Rate
Growth Rate
Average Reach
Average Shares
Average Comments
Best Posting Time
Best Content Type
Best Topic
Best Hook
Best Region
Best Language
```

---

# 20. AI LEARNING ENGINE

This is the heart of ViralMind.

Example:

```text
Breaking News      8.4%
Market Analysis    6.7%
Educational        4.2%
Meme               9.1%
Generic            1.8%
```

AI should understand:

> Audience responds strongly to Breaking News and Meme content.

Then update future content strategy.

Example:

```text
Breaking News     30%
Market Analysis   25%
Educational       15%
Engagement        20%
Other             10%
```

Store:

```text
Strategy Version
Previous Strategy
New Strategy
Reason
Performance Before
Performance After
```

Use bounded changes.

For example:

A content percentage cannot change more than ±10% in a single learning cycle.

---

# 21. GROWTH ENGINE

Dashboard should show:

```text
Current Followers
Target Followers
Weekly Growth
Monthly Growth
Growth Score
```

Example:

```text
Current:
12,450

Target:
100,000

Weekly Growth:
+3.8%

AI Growth Score:
87/100
```

AI recommendations:

```text
Increase trending content
Test evening posting
Increase visual posts
Reduce generic posts
Improve hooks
Increase community questions
```

Never promise guaranteed follower growth.

---

# 22. COMPETITOR INTELLIGENCE

Allow admin to add competitor/public pages where technically supported.

Analyze:

```text
Topics
Posting Frequency
Content Types
Public Engagement Signals
Emerging Themes
```

Do NOT copy competitor posts.

Use them only for strategic intelligence.

Example:

```text
Competitors are heavily discussing Bitcoin ETF news.

Recommendation:

Create an original educational explanation.
```

---

# 23. VIRALMIND DASHBOARD

Sidebar:

```text
Dashboard

Pages

AI Agent

Trends

Content

Content Calendar

Images

Comments

Analytics

Audience

Growth Strategy

Competitors

AI Decisions

Automation

Settings
```

---

# 24. DASHBOARD HOME

Show:

```text
Followers
Reach
Engagement Rate
Posts Today
AI Growth Score
Automation Status
Trending Topics
Upcoming Posts
Recent Comments
AI Recommendations
```

Example:

```text
┌─────────────────────────────────────────┐
│ VIRALMIND                               │
│ AI Growth Manager                       │
├─────────────────────────────────────────┤
│                                         │
│ Followers     Reach      Engagement     │
│ 12.4K         1.8M       7.4%           │
│                                         │
│ AI Growth Score                          │
│ 87/100                                  │
│                                         │
│ 🔥 Trending Topics                      │
│                                         │
│ Bitcoin Breakout             91         │
│ Gold Rally                   87         │
│ ETH Update                   82         │
│                                         │
│ 🤖 AI Recommendation                    │
│                                         │
│ Publish BTC analysis at 8:30 PM         │
└─────────────────────────────────────────┘
```

---

# 25. AI AGENT CONTROL CENTER

Create a dedicated AI page.

Example:

```text
🤖 VIRALMIND AI

Status:
● ACTIVE

Current Task:
Analyzing Bangladesh crypto trends...

Progress:
████████░░ 80%

Next Task:
Generate content concepts
```

Controls:

```text
Pause AI
Resume AI
Run Research Now
Generate Content Now
Analyze Page Now
Run Learning Cycle
Emergency Stop
```

---

# 26. HUMAN APPROVAL MODES

Support:

## FULL AUTO

AI researches, generates and publishes automatically.

## SEMI AUTO

AI generates content and waits for admin approval.

## MANUAL

AI only provides recommendations.

Allow separate settings for:

```text
Posts
Comments
Financial Content
Images
Publishing
```

---

# 27. DATABASE

Use PostgreSQL + Prisma.

Create models:

```text
User

FacebookPage
FacebookToken

Region
Language
Niche

AISetting
AutomationRule

Trend
TrendSource
TrendScore

MarketAsset
MarketSnapshot
TechnicalIndicator

ContentIdea
Post
PostVariant
PostImage

Comment
CommentReply

Analytics
PostAnalytics
AudienceAnalytics

ContentCalendar

GrowthStrategy

AIDecision
AIFeedback

Competitor

ResearchSource

AIJob

AuditLog
```

Use proper relationships, indexes and timestamps.

---

# 28. BACKEND STRUCTURE

Use:

```text
src/

modules/

auth/
facebook/
pages/
regions/
languages/
niches/
trends/
research/
market/
ai/
content/
images/
comments/
analytics/
growth/
competitors/
scheduler/
automation/
settings/

workers/

trend.worker.ts
research.worker.ts
analysis.worker.ts
content.worker.ts
image.worker.ts
quality.worker.ts
publish.worker.ts
comment.worker.ts
analytics.worker.ts
learning.worker.ts

infrastructure/

database/
redis/
storage/
facebook/
ai/
```

---

# 29. QUEUE SYSTEM

Use BullMQ + Redis.

Queues:

```text
trend-research

content-generation

image-generation

quality-check

facebook-publish

comment-processing

analytics-sync

learning
```

Every job should contain:

```text
id
status
retries
error
createdAt
startedAt
completedAt
```

Use:

* Retry
* Exponential backoff
* Dead-letter handling where appropriate

Do not block HTTP requests with long-running AI tasks.

---

# 30. API DESIGN

Create clean REST APIs.

Examples:

```http
POST /api/auth/login

GET /api/pages

POST /api/pages/connect

DELETE /api/pages/:id

GET /api/trends

POST /api/trends/research

GET /api/content

POST /api/content/generate

POST /api/content/:id/approve

POST /api/content/:id/publish

GET /api/calendar

POST /api/calendar

GET /api/comments

POST /api/comments/:id/reply

GET /api/analytics

GET /api/growth

GET /api/ai/status

POST /api/ai/run

POST /api/ai/pause

POST /api/ai/resume

POST /api/ai/emergency-stop
```

---

# 31. WEBHOOK ARCHITECTURE

Implement Meta webhook support where required.

Flow:

```text
Meta Webhook
      ↓
Verification
      ↓
Event Parser
      ↓
Queue
      ↓
Comment/Event Processor
```

Do not perform heavy AI work directly inside webhook requests.

Return quickly and process asynchronously.

---

# 32. SECURITY

Implement:

* Authentication
* Authorization
* Role-based access
* Input validation
* Rate limiting
* Secure cookies
* Token encryption
* Environment variables
* Audit logs
* API validation
* Webhook validation
* Secret management

Never commit:

```text
GEMINI_API_KEY
DATABASE_URL
FACEBOOK_ACCESS_TOKEN
REDIS_URL
```

---

# 33. ERROR HANDLING

Every external API must support:

```text
Timeout
Retry
Exponential Backoff
Structured Error
Logging
Fallback
```

Examples:

Gemini failure:

```text
Do not publish.
Retry or move to review.
```

Image generation failure:

```text
Retry.
If still failing → review queue.
```

Market API failure:

```text
Do not generate current-market claims using stale data.
```

Facebook failure:

```text
Retry safely.
Prevent duplicate publishing.
```

---

# 34. IDEMPOTENCY

Publishing must be idempotent.

If:

```text
Worker retries
Network timeout
Facebook timeout
Queue retries
```

The same post must NOT be published twice.

Store:

```text
externalPostId
publishStatus
publishedAt
```

Before publishing, check existing status.

---

# 35. AI MEMORY

ViralMind should maintain structured memory.

Memory should include:

```text
Previous Posts
Winning Topics
Winning Hooks
Failed Topics
Best Content Types
Best Posting Times
Audience Preferences
Regional Performance
Language Performance
Recent Strategy
```

Do NOT send the entire database to Gemini.

Generate summarized AI context.

Example:

```json
{
  "bestTopics": [],
  "bestFormats": [],
  "bestTimes": [],
  "audiencePreferences": [],
  "recentFailures": []
}
```

---

# 36. AI OUTPUT

Use strict JSON whenever possible.

Example:

```json
{
  "decision": "CREATE_POST",
  "topic": "Bitcoin resistance breakout",
  "score": 91,
  "contentType": "MARKET_ANALYSIS",
  "reason": "Strong market momentum and high audience interest",
  "riskLevel": "MEDIUM",
  "requiresApproval": true
}
```

Validate with Zod.

Never trust unvalidated LLM output.

---

# 37. PROMPT MANAGEMENT

Do not scatter prompts throughout the codebase.

Create:

```text
ai/prompts/

trend-analysis.prompt.ts

content-generation.prompt.ts

comment-reply.prompt.ts

image-generation.prompt.ts

quality-check.prompt.ts

learning.prompt.ts
```

Support prompt versioning.

Store:

```text
promptVersion
model
input
output
timestamp
```

This is important for debugging AI decisions.

---

# 38. AI ACTIVITY LOG

Create an activity timeline.

Example:

```text
10:32
AI researched 42 trends

10:35
Selected BTC breakout

10:37
Generated content

10:38
Generated image

10:40
Published Facebook post

11:20
Received 42 comments

11:25
AI replied to 31 comments
```

Show this inside the dashboard.

---

# 39. ENVIRONMENT VARIABLES

Create:

```text
.env.example
```

Include placeholders for:

```env
DATABASE_URL=

REDIS_URL=

GEMINI_API_KEY=

META_APP_ID=
META_APP_SECRET=
META_REDIRECT_URI=

IMAGE_PROVIDER_API_KEY=

MARKET_DATA_API_KEY=

STORAGE_ENDPOINT=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_BUCKET=
```

Never hardcode secrets.

---

# 40. DEVELOPMENT PHASES

Do NOT build everything in one step.

Build ViralMind in phases.

## PHASE 1 — Foundation

Implement:

* Next.js
* Node.js
* PostgreSQL
* Prisma
* Redis
* Authentication
* Dashboard shell
* Settings
* Environment configuration

---

## PHASE 2 — Facebook

Implement:

* Meta OAuth
* Page connection
* Page management
* Token storage
* Facebook service
* Webhook architecture

---

## PHASE 3 — Gemini

Implement:

* Gemini provider
* AI orchestrator
* Prompt system
* Structured output
* Trend research
* Trend scoring
* AI decisions

---

## PHASE 4 — Content

Implement:

* Content ideas
* Content generation
* Content variants
* Image generation
* Quality check
* Approval system

---

## PHASE 5 — Publishing

Implement:

* Content calendar
* Scheduler
* Queue workers
* Facebook publishing
* Idempotency

---

## PHASE 6 — Engagement

Implement:

* Webhooks
* Comment processing
* Comment classification
* AI replies
* Approval workflow

---

## PHASE 7 — Analytics

Implement:

* Page analytics
* Post analytics
* Growth analytics
* Content performance
* Audience insights where available

---

## PHASE 8 — AI LEARNING

Implement:

* Performance analysis
* Strategy learning
* Content mix optimization
* Posting time optimization
* AI recommendations

---

## PHASE 9 — Advanced

Implement:

* Competitor intelligence
* Multi-page support
* Multi-region strategy
* Advanced AI controls
* Advanced growth strategy

---

# 41. CODING RULES

Follow these rules strictly:

1. TypeScript everywhere.

2. Clean modular architecture.

3. No unnecessary dependencies.

4. No duplicated logic.

5. Use Prisma migrations.

6. Validate every API input.

7. Validate AI output.

8. Use environment variables.

9. Never expose secrets.

10. Use queues for long-running tasks.

11. Add loading states.

12. Add error states.

13. Add empty states.

14. Add audit logs.

15. Add database indexes.

16. Use transactions where required.

17. Keep integrations provider-independent.

18. Never fabricate API responses.

19. Never fabricate market data.

20. Never promise guaranteed virality.

---

# 42. UI/UX

ViralMind must feel like a premium AI SaaS product.

Design characteristics:

```text
Modern
Clean
Premium
Professional
Data-driven
AI-focused
Responsive
Fast
```

Use:

* Cards
* Tables
* Charts
* Tabs
* Drawers
* Dialogs
* Badges
* Activity timelines
* Progress indicators

The AI should feel like an autonomous employee.

Example:

```text
🤖 ViralMind AI

● ACTIVE

Current Task:

"Analyzing Bangladesh crypto trends..."

Progress:

████████░░ 80%

Next:

"Generate 3 content concepts"
```

---

# 43. FINAL USER EXPERIENCE

The final experience should be:

```text
Create ViralMind Agent

        ↓

Connect Facebook Page

        ↓

Select Niche

        ↓

Select Region

        ↓

Select Language

        ↓

Set Growth Goal

        ↓

Enable Automation

        ↓

ViralMind starts working
```

Then:

```text
🔎 Research

↓

📈 Find Trends

↓

🧠 Analyze

↓

🎯 Select Opportunity

↓

✍️ Generate Content

↓

🖼️ Generate Image

↓

🛡️ Quality Check

↓

📅 Schedule

↓

📢 Publish

↓

💬 Reply to Comments

↓

📊 Analyze Performance

↓

🧠 Learn

↓

🚀 Improve Strategy

↓

🔁 Repeat
```

---

# 44. FIRST TASK — DO THIS FIRST

Do NOT immediately generate the entire application.

First inspect the repository.

Then:

1. Identify the existing framework.
2. Identify existing files.
3. Identify existing dependencies.
4. Create the final architecture.
5. Create the database schema.
6. Create `.env.example`.
7. Create project structure.
8. Implement the foundation.
9. Implement the dashboard shell.
10. Prepare Facebook integration architecture.

After each phase, report:

```text
What was implemented

Files created

Files modified

Database changes

Environment variables required

Commands to run

How to test

Remaining tasks
```

Do not modify unrelated files.

Do not overwrite existing functionality without checking it first.

---

# 45. VIRALMIND PRODUCT PRINCIPLE

ViralMind is NOT:

> "AI that posts automatically."

ViralMind is:

> "An AI agent that understands an audience, discovers what people care about, creates relevant content, manages conversations, analyzes performance, and continuously improves the growth strategy."

Build the system around this principle.

# FINAL PRODUCT

**ViralMind**

> **Your Autonomous Social Media Growth Agent**
