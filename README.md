<h1 align="center">Ingestio</h1>

## :page_facing_up: Description

Ingestio is a tool that converts GitHub repositories into prompt-friendly text digests for large language models (LLMs).

## :gear: Tech Stack

- [Next.js 15](https://nextjs.org/)
- [GitHub API (Octokit)](https://github.com/octokit)
- [Tailwind CSS](https://tailwindcss.com/)

## :rocket: Features

- Converts all repo files into one text file
- Extracts full directory structure
- Filters files by size limit
- Calculates LLM token usage
- Shows processed file count
- Enables download & copy of extracted text

## :hammer: Local Installation

### Clone the repository

```sh
$ git clone git@github.com:mtsfy/ingestio.git
```

### Setup

```sh
$ cd ingestio
$ npm install
```

Setup environment variables for the frontend:

- [GitHub Token](https://github.com/settings/tokens/new)

```sh
GITHUB_API_TOKEN= # YOUR_GITHUB_API_TOKEN
```

Start the frontend server:

```sh
$ npm run dev
```

The frontend will start running on `http://localhost:3000`
