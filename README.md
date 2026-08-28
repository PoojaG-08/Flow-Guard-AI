# 🚦 FlowGuard AI

### **Predict. Explain. Act. Before Cash Runs Out.**

FlowGuard AI is an **AI-powered working-capital intelligence platform** designed to help **SMEs and MSMEs detect, understand, and prevent cash-flow crises before they disrupt business operations.**

Instead of simply showing financial data, FlowGuard AI focuses on one important question:

> **“What should I do with my money now?”**

---

## 🎯 Problem

Small businesses often face cash-flow problems because of:

* Delayed customer payments
* Upcoming supplier payments
* Unexpected expenses
* Payment deadlines
* High dependence on certain customers or suppliers
* Limited working capital

Traditional financial dashboards mainly show **what happened**.

They don't always clearly explain:

* Will I run out of cash?
* Why is my financial risk increasing?
* Which payment should I make first?
* How much cash should I keep?
* What happens if a customer pays late?
* What should I do now?

---

# 💡 Our Solution

FlowGuard AI transforms financial information into **simple, proactive and actionable decisions**.

The platform follows:

## **PREDICT → EXPLAIN → ACT**

### 🔮 Predict

Identify potential cash-flow pressure and upcoming liquidity problems.

### 🧠 Explain

Explain why the business is at risk using factors such as:

* Receivables
* Payables
* Cash balance
* Payment deadlines
* Supplier dependency
* Customer payment delays
* Unexpected expenses

### ⚡ Act

Recommend the next best action to help protect business cash and maintain financial stability.

---

# 🚀 Key Features

## 💰 Financial Dashboard

Provides a simple view of:

* Money Available Now
* Money Coming In
* Payments Due
* Safe Cash to Keep
* Financial Health
* Risk Level
* Cash-flow trends

---

## 🧠 AI Decision Center

The **core feature** of FlowGuard AI.

The system evaluates different financial options and recommends the most suitable action.

Possible actions:

* **Pay Now**
* **Pay Later**
* **Delay**
* **Capture Discount**
* **Bank Finance**
* **Supplier Finance**
* **Keep Cash**

Each recommendation provides:

* Recommended action
* Amount
* Expected saving/cost
* Risk level
* Confidence score
* Simple explanation
* Important assumptions

### Example

```text
Recommended Action:
PAY NOW

Amount:
₹2,00,000

Expected Saving:
₹4,000

Risk:
LOW

Confidence:
92%

Why:
Pay the supplier today to capture the early-payment
discount while maintaining the required safety reserve.
```

---

# 🧾 Bills & Payables Intelligence

Track supplier obligations and payment decisions.

Each bill can contain:

* Supplier
* Amount
* Due Date
* Early-Payment Discount
* Late Penalty
* Supplier Importance
* AI Priority Score
* Recommended Action

Example:

```text
ABC Components

Amount: ₹2,00,000
Due Date: 30 Aug
Early Discount: ₹4,000
Priority: HIGH

AI Recommendation:
Pay Today
```

---

# 💵 Receivables Intelligence

Monitor expected customer payments.

Track:

* Customer
* Amount
* Expected Payment Date
* Payment Delay Risk
* Payment Confidence
* Predicted Cash-In Date

Example:

```text
XYZ Retail

Amount: ₹3,00,000
Expected Date: 5 Sep
Delay Risk: MEDIUM
Confidence: 78%
Predicted Date: 10 Sep
```

---

# 🧪 What-If Simulator

The **What-If Simulator** allows business owners to test financial scenarios before making decisions.

Users can change:

* Customer payment delay
* Unexpected expenses
* Supplier deadline
* Discount
* Interest rate
* Cash balance

The system automatically recalculates the financial situation.

### Example

**BEFORE**

Pay supplier today

↓

**CHANGE**

Customer payment delayed by 15 days

↓

**NEW DECISION**

Pay at due date

↓

**WHY DID IT CHANGE?**

> “Your expected customer payment is delayed, reducing your available cash buffer. Keeping cash until the supplier's due date may reduce liquidity risk.”

The simulation does not permanently modify the actual business data.

---

# 🎙️ AI Voice Assistant

FlowGuard AI includes a voice-based financial assistant.

Users can ask:

> “Can I pay this supplier today?”

> “Which payment should I make first?”

> “How much money should I keep?”

> “What happens if my customer pays 15 days late?”

> “Why is my risk high?”

The assistant provides simple answers using the business's financial information.

### Supported Languages

* 🇬🇧 English
* 🇮🇳 Tamil
* 🇮🇳 Hindi
* 🇮🇳 Telugu
* 🇮🇳 Malayalam
* 🇮🇳 Kannada
* 🇮🇳 Marathi
* 🇮🇳 Bengali

---

# 🚨 Early-Warning System

FlowGuard AI can identify warning signs such as:

* Low cash reserves
* Upcoming large payments
* Delayed receivables
* High customer dependency
* High supplier dependency
* Increasing financial obligations
* Unexpected expenses
* High financing costs

Risk levels:

**LOW → MEDIUM → HIGH → CRITICAL**

The system also explains **why** the risk level increased.

---

# 🔗 Financial & Supply-Chain Dependency

FlowGuard AI analyzes relationships between:

```text
Customers
    ↓
Receivables
    ↓
Cash Flow
    ↓
Supplier Payments
    ↓
Business Operations
```

This helps identify whether the business is highly dependent on a particular customer or supplier.

---

# 🧠 Decision Intelligence

The decision engine considers multiple factors instead of optimizing only one metric.

It evaluates:

* Current cash
* Minimum cash reserve
* Upcoming obligations
* Expected receivables
* Receivable uncertainty
* Supplier importance
* Early-payment discounts
* Late-payment penalties
* Financing costs
* Customer dependency
* Supplier dependency
* Future cash requirements

The engine returns:

```text
Action
Amount
Expected Benefit / Cost
Risk
Confidence
Explanation
Assumptions
```

---

# 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │     SME / MSME      │
                 │        USER         │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   FlowGuard AI UI   │
                 │ React + Vite        │
                 └──────────┬──────────┘
                            │
                         REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │    Node + Express   │
                 │      Backend        │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   ┌────────────┐    ┌────────────┐    ┌────────────┐
   │ Decision   │    │ Risk & Cash│    │ What-If    │
   │ Engine     │    │ Engine     │    │ Simulator  │
   └──────┬─────┘    └──────┬─────┘    └──────┬─────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ▼
                     ┌─────────────┐
                     │   SQLite    │
                     │  Database   │
                     └─────────────┘
```

---

# 🛠️ Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* SQLite

### Authentication

* JWT
* bcrypt

### AI & Intelligence

* AI Decision Engine
* Cash-flow analysis
* Risk scoring
* Explainable recommendations
* What-If simulation
* Voice Assistant
* Multilingual support

---

# 📱 Application Modules

```text
FlowGuard AI
│
├── 🏠 Home / Dashboard
│
├── 💰 Money
│
├── 🧾 Bills
│
├── 💵 Receivables
│
├── 🧠 AI Decision Center
│
├── 🧪 What-If Simulator
│
├── 🎙️ AI Voice Assistant
│
└── 👤 Profile
```

---

# 🎨 Design Philosophy

FlowGuard AI is designed for **real SME owners**, including users with limited financial knowledge.

The interface focuses on:

* Simple language
* Large readable numbers
* Clear recommendations
* Minimal financial jargon
* Visual risk indicators
* Easy navigation
* Mobile-first design
* Responsive desktop design
* Friendly fintech experience

The product should feel like a **financial decision assistant**, not a complicated accounting application.

---

# 📊 Example Business Scenario

### Business

**Arun Electrical Supplies**

### Current Financial Position

```text
Available Cash:       ₹5,00,000
Safety Reserve:       ₹2,00,000

Supplier Bill:        ₹2,00,000
Early Discount:       ₹4,000

Customer Receivable:  ₹3,00,000
```

### Initial Recommendation

**Pay Supplier Now**

Reason:

> Capture the ₹4,000 discount while maintaining the minimum safety reserve.

---

### What-If Scenario

Customer payment is delayed by **15 days**.

FlowGuard AI recalculates the projected cash position.

The recommendation may change to:

**Pay Supplier at Due Date**

Reason:

> The delayed customer payment reduces available liquidity, so keeping cash for longer may be safer.

---

# 🎯 Target Users

FlowGuard AI is designed for:

* SMEs
* MSMEs
* Retail businesses
* Wholesale businesses
* Manufacturers
* Distributors
* Service businesses
* Small business owners

Especially businesses that manage:

**Customers → Receivables → Cash → Suppliers → Payments**

---

# 🌟 Innovation

Traditional financial software mainly answers:

> **“What happened?”**

FlowGuard AI aims to answer:

> **“What could happen?”**

Then:

> **“Why could it happen?”**

And finally:

> **“What should I do?”**

This creates a complete:

# **Predict → Explain → Act**

workflow.

---

# 💥 Why FlowGuard AI?

### Traditional Dashboard

```text
Revenue
Expenses
Invoices
Balance
Reports
```

### FlowGuard AI

```text
          PREDICT
             ↓
     Detect Cash Risk
             ↓
          EXPLAIN
             ↓
     Find Root Cause
             ↓
            ACT
             ↓
   Recommend Best Action
```

---

# 📈 Future Scope

FlowGuard AI can evolve into a complete **SME Resilience Layer** with:

* Banking API integration
* GST data integration
* UPI transaction analysis
* Real-time transaction monitoring
* Advanced ML forecasting
* Automated payment scheduling
* Supplier risk intelligence
* Customer credit intelligence
* Supply-chain risk mapping
* Automated alerts
* Credit and financing recommendations
* Financial institution integrations

---

# 🔐 Security

The application is designed with security in mind:

* Password hashing
* JWT authentication
* Protected APIs
* Input validation
* Environment variables for secrets
* Business-level data isolation
* No API keys exposed in frontend code

---

# 🏆 Impact

FlowGuard AI aims to help SMEs:

* Detect liquidity problems earlier
* Protect working capital
* Reduce avoidable penalties
* Capture early-payment discounts
* Manage supplier relationships
* Understand financial risks
* Prepare for delayed customer payments
* Make better working-capital decisions
* Prevent cash-flow crises

---

# 👥 Team

## **AetherGrid**

We are **AetherGrid**, a student innovation team focused on building practical technology solutions for real-world problems.

### Team Members

| Name              | 
| ----------------- | 
| **G. Pooja**      | 
| **R. Pooja**      | 
| **S. Sandhya**    | 
| **Monishwaran B** | 

### 🚀 Our Mission

Our goal is to use **AI, software engineering and data-driven decision making** to create solutions that are practical, accessible and impactful.

With **FlowGuard AI**, AetherGrid aims to help SMEs and MSMEs move from:

**Reactive Financial Management → Proactive Financial Decision Making**

---

# 🔮 Vision

Our vision is to build an intelligent platform that continuously monitors SME financial health, detects early warning signs, explains the causes and recommends practical actions.

Instead of waiting for a business to run out of cash:

> **FlowGuard AI helps businesses act before the cash runs out.**

---

# 🚦 FlowGuard AI

## **Predict the risk. Understand the cause. Act before the cash runs out.**

### Built by **AetherGrid** ❤️
