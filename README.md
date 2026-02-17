# Duck Hunt

This project was implemented as part of a UI assignment. The goal of the implementation was not only to satisfy functional requirements but also to demonstrate architectural decisions focused on scalability, maintainability, and performance in a real-time UI environment.

---

## Table of Contents

- [Overview](#overview)
- [Architecture Overview](#architecture-overview)
- [Monorepo Structure](#monorepo-structure)
- [Backend Architecture](#backend-architecture)
- [WebSocket Client Architecture](#websocket-client-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Architecture Summary](#architecture-summary)
- [Running the Project](#running-the-project)

---

## Overview

The application implements a simplified Duck Hunt game using a real-time communication model between frontend and backend.

The implementation focuses on:

- clear separation of responsibilities
- contract-driven communication
- predictable state management
- performance-oriented rendering decisions
- extensibility for future real-time scenarios

While the assignment scope is relatively small, the architecture reflects patterns commonly used in production-scale UI systems.

## Architecture Overview

The solution is implemented as a **monorepo** using **Turborepo**, allowing frontend and backend applications to coexist while sharing abstractions and contracts.

The main goals of this approach are:

- separation of frontend and backend concerns
- reusable abstractions
- simplified dependency management
- scalability without structural refactoring

Even within a small assignment scope, this structure enables future growth without architectural changes.

---

## Monorepo Structure

```
apps/
├── web/          # Frontend application (React)
└── api/          # Backend service (NestJS + Socket.IO)

packages/
└── ws-client/    # Shared WebSocket client abstraction with strict types definitions
```


This structure ensures synchronization between client and server contracts and reduces duplication across applications.

---

## Backend Architecture

The backend is implemented using **NestJS** with **Socket.IO**, following the real-time communication requirements of the assignment.

### WebSocket Namespace Design

A dedicated game namespace was introduced to isolate game-related events.

Benefits of this approach:

- clients subscribe only to relevant events
- reduced unnecessary event handling
- logical separation of real-time modules
- improved scalability for future features

This mirrors production-grade real-time architectures where event isolation prevents cross-feature coupling.

### Event Contracts and AsyncAPI Specification

All WebSocket events are described using the **AsyncAPI specification**, which serves as the single source of truth for communication contracts.

This enables:

- strongly typed client ↔ server communication
- automatic generation of data contracts
- consistent event definitions
- reduced integration errors

Both communication directions are explicitly defined:

- client → server events (user actions)
- server → client events (game updates and state changes)

---

## WebSocket Client Architecture

A dedicated WebSocket client abstraction was introduced on the frontend to decouple UI components from transport-level details.

### Contract-Driven Client

The client is generated based on the AsyncAPI specification, providing:

- typed event definitions
- synchronized payload contracts
- compile-time validation
- improved developer experience

This prevents contract drift between frontend and backend and simplifies future refactoring.

### Abstraction Layer

UI components do not interact directly with Socket.IO. Instead, they communicate through a typed abstraction layer, allowing:

- transport replacement if needed
- centralized connection management
- extension with middleware or logging
- easier testing

For development speed, a lightweight React integration library with a `useSocket`-style API was used. The goal at this stage was to demonstrate architectural flexibility rather than transport-level optimization.

---

## Frontend Architecture

The frontend integrates the typed WebSocket client and subscribes only to the relevant game namespace.

### State Management Strategy

Redux was used as required by the assignment. The main architectural focus was defining **what belongs in global state**.

The Redux store contains only global, long-lived state:

- score
- shared UI flags

### State Localization and Performance Considerations

Highly dynamic or frame-dependent state is intentionally localized within components, including:

- duck flight movement
- cursor movement
- animation-related states

Storing such data in the global store would cause unnecessary selector recalculations and potential performance issues in larger applications.

By localizing transient state:

- global updates remain minimal
- re-renders are limited to affected components
- the application scales better as complexity grows

This follows a common production pattern where Redux manages shared state, while ephemeral UI state remains local.

---

## Architecture Summary

The implementation demonstrates an architectural approach focused on long-term maintainability rather than short-term implementation simplicity.

Key principles:

- clear separation between UI, logic, and communication layers
- contract-driven development via AsyncAPI
- performance-oriented state management
- rendering strategy aligned with browser mechanics
- scalable structure suitable for future extensions

Although the application itself is simple, the architecture allows straightforward evolution toward more complex real-time scenarios such as multiplayer gameplay or additional real-time modules.

---

## Running the Project

### Prerequisites

- Node.js 24+
- Yarn

### Installation

Install dependencies from the project root:

```bash
yarn install
```

### Start Development Environment

Run frontend and backend in development mode:

```bash
yarn dev
```

This command starts all applications defined in the Turborepo pipeline.