import { NextResponse } from "next/server";

interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export async function GET() {
  const fallbackCommit = {
    sha: "c320570",
    shortSha: "c320570",
    message: "feat(content): integrate live projects, social profiles, and direct WhatsApp channel",
    author: "mohamed1332006badra-ops",
    branch: "main",
    date: new Date().toISOString(),
    url: "https://github.com/mohamed1332006badra-ops/badra-portfolio/commit/c320570",
    verified: true,
    source: "local-build",
  };

  try {
    const res = await fetch(
      "https://api.github.com/repos/mohamed1332006badra-ops/badra-portfolio/commits?per_page=1",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "badra-portfolio-edge",
        },
        next: { revalidate: 120 },
      }
    );

    if (res.ok) {
      const commits: GitHubCommitResponse[] = await res.json();
      if (commits && commits.length > 0) {
        const latest = commits[0];
        return NextResponse.json(
          {
            sha: latest.sha,
            shortSha: latest.sha.substring(0, 7),
            message: latest.commit.message.split("\n")[0],
            author: latest.commit.author.name,
            branch: "main",
            date: latest.commit.author.date,
            url: latest.html_url,
            verified: true,
            source: "github-api",
          },
          {
            headers: {
              "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
            },
          }
        );
      }
    }
  } catch {
    // Graceful fallback to verified build commit
  }

  return NextResponse.json(fallbackCommit, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
