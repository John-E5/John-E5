## John Ennis

Software engineer in Ireland. I build tools that make LLM features safe to ship.

Right now that's **[drift-ci](https://github.com/Drift-CI/drift-ci)**. It runs your LLM test cases on every pull request, compares the results with baselines committed to git, and blocks the merge when behaviour regresses. The CLI and GitHub Action are open source, and there's a hosted dashboard at [drift-ci.com](https://drift-ci.com).

<p>
  <a href="https://github.com/marketplace/actions/drift-ci"><img src="https://img.shields.io/badge/GitHub%20Marketplace-drift--ci-00f5ff?logo=github&labelColor=121214" alt="drift-ci on GitHub Marketplace"></a>
  <a href="https://www.npmjs.com/package/@drift-ci/cli"><img src="https://img.shields.io/npm/v/@drift-ci/cli?label=%40drift-ci%2Fcli&color=00f5ff&labelColor=121214" alt="@drift-ci/cli on npm"></a>
</p>

<a href="https://github.com/Drift-CI/drift-ci">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Drift-CI/drift-ci/main/assets/pr-comment-dark.png">
    <img src="https://raw.githubusercontent.com/Drift-CI/drift-ci/main/assets/pr-comment-light.png" width="640" alt="A drift-ci comment on a pull request: switching a support agent to a cheaper model regressed two structured-output cases, so the check failed and the merge was blocked">
  </picture>
</a>
<br>
<sub>drift-ci catching a regression after a model swap on a real pull request.</sub>

### What I work on

- **drift-ci:** a TypeScript monorepo with an evaluation engine (7 LLM providers, 8 evaluators), a CLI, a native GitHub Action, and a Next.js SaaS on Cloudflare Workers with Postgres, Clerk and Stripe.
- **Healthcare, Health Innovation Labs:** authentication on AWS Cognito with custom Lambda auth flows, a telehealth video consultation subsystem, and an AI call-summary service on AWS Bedrock and Amazon Connect, all deployed with CDK.
- **LiveTiles:** lead engineer and manager of a product team, building React and .NET applications on Azure.

### Tools I use

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=ts,js,react,nextjs,nodejs,nestjs,vue,dotnet,cs,python,aws,azure,cloudflare,postgres,docker,kubernetes,terraform,githubactions&perline=9&theme=dark">
  <img src="https://skillicons.dev/icons?i=ts,js,react,nextjs,nodejs,nestjs,vue,dotnet,cs,python,aws,azure,cloudflare,postgres,docker,kubernetes,terraform,githubactions&perline=9&theme=light" alt="TypeScript, JavaScript, React, Next.js, Node.js, NestJS, Vue, .NET, C#, Python, AWS, Azure, Cloudflare, PostgreSQL, Docker, Kubernetes, Terraform, GitHub Actions">
</picture>

### Latest writing

<!-- BLOG:START -->
- [Anthropic SDK: "temperature: Extra inputs are not permitted"](https://drift-ci.com/blog/anthropic-sdk-temperature-not-permitted) · 7 Nov 2026
- [How to run LLM evals in GitHub Actions](https://drift-ci.com/blog/llm-evals-github-actions) · 7 Nov 2026
- [LLM regression testing: a practical guide](https://drift-ci.com/blog/llm-regression-testing-guide) · 7 Nov 2026
- [LLM evaluation tools compared for CI (2026)](https://drift-ci.com/blog/llm-regression-testing-tools-compared) · 7 Nov 2026
<!-- BLOG:END -->

<!-- OSS:START -->
<!-- OSS:END -->

### Elsewhere

[drift-ci.com](https://drift-ci.com) · [Blog](https://drift-ci.com/blog) · [LinkedIn](https://www.linkedin.com/in/j-ennis)

[![@johne5's Holopin board](https://holopin.me/johne5)](https://holopin.io/@johne5)
