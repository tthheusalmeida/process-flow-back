<h1 align="center" style="font-size: 64px">
  Process Flow - Backend
</h1>

<p align="center">REST API built with NestJS to support the Process Flow frontend application. </p>

<p align="center">
   <img src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/tthheusalmeida/process-flow-back/">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/tthheusalmeida/process-flow-back/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" target="_blank" />
  </a>
</p>

# 🗂️ Table of Contents

- [About](#about)
- [How To Use](#how-to-use)
- [Scenario](#scenario)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Entities](#entities)

---

<a id="about"></a>

## 📚 About

This is the **backend** of the **Process Flow** project, a tool to document and visualize company processes.  
The backend provides REST APIs to manage **departments, processes, subprocesses, documents, owners, and tools**.  
It is developed with **NestJS**, following a modular and scalable architecture.

Key features:

- 📡 REST endpoints for all entities.
- ⚡ In-memory persistence (no database required).
- 🧩 Modular and extensible architecture.
- 🔐 CORS configuration with support for multiple frontend URLs.
- 🛠️ Code style enforced with ESLint and Prettier.
- ✅ Unit and e2e tests with Jest and Supertest.

---

<a id="how-to-use"></a>

## ⚙️ How to Use

Clone the project:

```bash
git clone https://github.com/tthheusalmeida/process-flow-back.git
```

Install dependencies:

```bash
npm install
```

Set up environment variables in a `.env` file:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Frontend URLs
FRONTEND_URLS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000
```

Run development server:

```bash
npm run start:dev
```

---

<a id="scenario"></a>

## 🏢 Scenario

The backend solves the **business challenge** of disorganized processes by providing a structured and modular API.  
It supports the frontend in enabling companies to:

- Register departments, processes, owners, tools, and documents.
- Create relationships between entities.
- Serve structured data for process visualization in the frontend.

---

<a id="technologies"></a>

## 🚀 Technologies

- [Node.js 20+](https://nodejs.org/)
- [NestJS 11](https://nestjs.com/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/) (code style)

---

<a id="architecture"></a>

## 🏗️ Architecture

The backend is structured in **modules**, each responsible for a business entity.

Example folder structure:

```
src
 └── base
     ├── departments
     │   ├── departments.controller.ts
     │   ├── departments.module.ts
     │   └── departments.service.ts
     ├── documents
     ├── edges
     ├── flows
     ├── owners
     ├── processes
     └── tools
 ├── utils
 │   └── consts.ts
 ├── app.module.ts
 └── main.ts
```

- **Controller** → Defines REST endpoints.
- **Service** → Business logic and in-memory persistence.
- **Module** → Groups controllers and services.
- **Utils** → Shared constants and helpers.

---

<a id="entities"></a>

## 🧩 Entities

The backend works with the following entities:

- **Flow** → Metadata container to assemble the process graph.
- **Department** → Represents an area of the company.
- **Process** → Represents a process or subprocess (can connect hierarchically).
- **Owner** → A responsible person or team.
- **Tool** → External or internal tool used in a process.
- **Document** → Documentation that supports processes.
- **Edge** → Connection between nodes.

### Relationship rules

- A **Process** can connect to any node (including another Process).
- **Department**, **Document**, **Owner**, and **Tool** always connect to a **Process**.

---

## 📝 License

This project is under the MIT license.  
See the [license page](https://opensource.org/licenses/MIT) for more details.
