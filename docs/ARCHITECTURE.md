# Architecture

## Current system

Mission 00A is a single Next.js application using the App Router, React, TypeScript strict mode, Tailwind CSS, and a small set of server-rendered presentation components.

```text
Browser
  └── Next.js application
      ├── app/                 routes, metadata, global styles
      ├── components/          reusable presentation components
      ├── tests/               browser smoke tests
      └── docs/                product and engineering decisions
```

There is no backend, database, authentication provider, or AI provider in this mission. Components are React Server Components unless interaction later requires a client boundary. This keeps the initial JavaScript payload and operational surface small.

## Why a modular monolith

A small team and early audience benefit from one deployable application, one dependency graph, and one place to trace behavior. Next.js provides routing, server rendering, and future server-only endpoints without requiring separate services. Domain modules can be separated inside the application when real behavior appears. Independent services should be introduced only after measured scaling, ownership, or isolation needs justify them.

## Proposed future boundaries

When validated product work needs persistence, use PostgreSQL through Supabase as a proposed starting point. Supabase is not installed or configured yet. Keep vendor-specific code behind small server-side adapters.

```text
Presentation (routes and components)
        ↓
Application use cases
        ↓
Domain concepts
        ↓
Server-only adapters
  ├── PostgreSQL / Supabase
  ├── licensed content storage
  └── AI provider gateway
```

The intended data relationships are subject-neutral:

- a course has learning outcomes and many lessons;
- a lesson has ordered activities and references resources;
- a resource records its owner, license, source, language, and permitted use;
- a tutoring session is scoped to a learner and approved course context;
- progress records attempts and completion events against activities.

## Server-side AI integration

Future AI calls must originate from server-only code. Provider keys must never use `NEXT_PUBLIC_` variables or enter browser bundles. An AI gateway should enforce:

- authenticated and rate-limited requests;
- approved course context and source citations;
- prompt and output safety rules appropriate to minors and education;
- cost, latency, and failure budgets;
- structured observability without storing sensitive learner conversations by default;
- a provider-neutral interface so product behavior is not coupled to one model vendor.

No part of that gateway is implemented in Mission 00A.

## Styling and accessibility

Design tokens live in `app/globals.css` and cover color, spacing, radii, shadows, and typography. Components use logical CSS properties so RTL behavior is native. The font stack favors locally installed Arabic fonts and avoids an external font request. Visible focus states, semantic landmarks, reduced-motion handling, and responsive smoke checks are part of the baseline.

## Deployment shape

The application can eventually run on any supported Next.js host. No host is selected or configured in this mission. A production decision should follow a pilot's traffic, regional latency, data residency, support, and cost requirements.
