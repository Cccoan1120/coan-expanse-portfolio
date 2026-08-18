import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  archiveProjects,
  featuredProjects,
  flagshipProjects,
  hiddenShowcaseProjects,
  projects,
  rankedProjects,
  satelliteProjects,
  solutionShowcaseProjects,
  spotlightProjects,
  workShowcaseProjects,
} from "./projects";

const publicRoot = join(process.cwd(), "public");

describe("portfolio content contract", () => {
  it("keeps the approved project hierarchy", () => {
    expect(flagshipProjects).toHaveLength(2);
    expect(satelliteProjects).toHaveLength(6);
    expect(archiveProjects).toHaveLength(9);
  });

  it("uses unique, route-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  it("assigns every project a domain and exactly five unique featured ranks", () => {
    projects.forEach((project) => expect(project.domains.length).toBeGreaterThan(0));
    expect(featuredProjects).toHaveLength(5);
    expect(featuredProjects.map((project) => project.featuredRank)).toEqual([1, 2, 3, 4, 5]);
    expect(spotlightProjects).toHaveLength(3);
    expect(spotlightProjects.map((project) => project.spotlightRank)).toEqual([1, 2, 3]);
  });

  it("assigns every project a unique showcase rank and local logo", () => {
    expect(rankedProjects).toHaveLength(17);
    expect(rankedProjects.map((project) => project.showcaseRank)).toEqual(
      Array.from({ length: 17 }, (_, index) => index + 1),
    );
    expect(rankedProjects[0].slug).toBe("mine");

    const ranks = new Set(rankedProjects.map((project) => project.showcaseRank));
    expect(ranks.size).toBe(17);
    rankedProjects.forEach((project) => {
      expect(project.logo.alt.trim()).not.toBe("");
      expect(project.logo.src).toMatch(/^\/images\/project-logos\/[a-z0-9-]+\.(?:png|svg)$/);
      expect(existsSync(join(publicRoot, project.logo.src.replace(/^\//, ""))), project.logo.src).toBe(true);
    });
  });

  it("separates logo works, expandable solutions and hidden records", () => {
    expect(workShowcaseProjects).toHaveLength(7);
    expect(solutionShowcaseProjects).toHaveLength(5);
    expect(hiddenShowcaseProjects).toHaveLength(5);
    expect(workShowcaseProjects[0].slug).toBe("mine");
    solutionShowcaseProjects.forEach((project) => {
      expect(project.actions?.length).toBeGreaterThan(0);
      expect(project.outcomes?.length).toBeGreaterThan(0);
    });
  });

  it("contains no placeholder public links", () => {
    const links = projects.flatMap((project) => project.links ?? []);
    expect(links.length).toBeGreaterThan(0);
    links.forEach(({ href }) => {
      expect(href).toMatch(/^https:\/\//);
      expect(href).not.toMatch(/example\.com|placeholder|TODO/i);
    });
  });

  it("links Mine and Orbito to their verified public sites", () => {
    expect(flagshipProjects.find((project) => project.slug === "mine")?.links).toEqual([
      { label: "产品官网", href: "https://mine-knowledge-studio.onrender.com/" },
      { label: "查看 GitHub", href: "https://github.com/Cccoan1120/mine-knowledge-studio" },
    ]);
    expect(flagshipProjects.find((project) => project.slug === "orbito")?.links).toContainEqual({
      label: "在线体验",
      href: "https://www.orbito.com.cn",
    });
  });

  it("has every responsive image variant on disk", () => {
    const assets = projects.flatMap((project) => [project.cover, ...(project.gallery ?? [])]).filter(Boolean);
    assets.forEach((asset) => {
      if (!asset) return;
      for (const suffix of ["-sm.avif", ".avif", "-sm.webp", ".webp"]) {
        const relativePath = `${asset.base}${suffix}`.replace(/^\//, "");
        expect(existsSync(join(publicRoot, relativePath)), relativePath).toBe(true);
      }
    });
  });
});
