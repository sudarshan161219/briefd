import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { prisma } from "./utils/prismaClient.js";
import { fmt } from "./helpers/esc.js";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { buildHtml } from "./helpers/buildHtml.js";
import puppeteer from "puppeteer";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST", "PUT"] },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  socket.on("field-focus", ({ briefId, fieldName, isTyping }) => {
    console.log(
      `3. Server Received: Client typing in '${fieldName}' for brief '${briefId}'`,
    );

    // Broadcast it out
    const eventName = `client-activity-${briefId}`;
    socket.broadcast.emit(eventName, { fieldName, isTyping });
    console.log(`4. Server Broadcasted out on channel: ${eventName}`);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

app.get("/", async (req, res) => {
  const sunArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⢹⣿⣄⠀⠀⣄⠀⠀⠀⣠⣾⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣄⠀⠀⢻⣿⡇⠰⠿⠀⠀⢀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠤⣀⣀⣀⠀⠀⠀⠀⠀⠙⠆⠀⣼⣿⡷⠠⡦⠀⣤⣾⣿⠇⠀⣠⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠛⢿⣶⣤⣤⣤⣀⣀⠴⠇⠈⢀⣀⣠⣤⣤⡉⠛⠋⣤⡘⠋⠀⠀⢀⣠⣤⣄⣠⣤⡴⠂
⠀⠀⠀⠀⠀⠀⠉⠛⠛⢿⣿⡿⠀⣰⣾⡿⠟⠛⠛⠛⢿⣷⣄⠈⣵⣤⣤⣶⣿⠟⠛⠻⠛⠙⠀⠀
⠀⠀⠀⠀⠠⢤⣤⣤⠀⢀⣉⠁⣼⣿⠋⣠⣶⣿⣿⣷⣄⠙⣿⣆⠘⠿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣈⣍⠀⣿⡏⠈⣿⣿⣁⡈⠹⣿⡇⢻⣿⠀⠺⠆⠀⣶⠶⠦⠂⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⡇⠻⣿⣦⡈⠛⠋⣁⣴⣿⢃⣽⣿⠀⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣤⣾⣿⠿⣿⡿⠟⠁⠀⠠⣶⢀⡈⠻⠿⣿⣿⠿⠏⣡⣾⡿⠃⣸⣿⣿⣿⣿⣿⣷⣦⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠀⠀⣿⣿⣿⣷⣶⣶⣾⡿⠟⠋⢀⣤⠈⠉⠉⠉⠁⠀⠛⠿⣶⣤⣄⡀
⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⢸⣿⡟⠁⠀⣥⡁⢠⣤⣴⣶⠀⠁⢶⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⡇⠀⢀⣌⠀⠈⣿⣿⡇⠀⠀⠀⠉⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠰⠗⠀⠀⠘⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⠁⠀⠀⠀⠈⠀⠀⠀⠀⠈⠻⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    Hail!, Surya Deva
    `;

  res.send(`<pre style="line-height: 1.0;">${sunArt}</pre>`);
});

// create user(freelancer)
app.post("/api/user", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "A valid 'name' is required to generate a brief." });
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        slug: `fl-${nanoid(8)}`,
      },
    });

    res.status(201).json({
      adminToken: user.adminToken,
      slug: user.slug,
      name: user.name,
    });
  } catch (error) {
    console.error("[Create User Error]:", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "A database collision occurred. Please try again.",
      });
    }
    res.status(500).json({
      error: "An unexpected error occurred while generating the user.",
    });
  }
});

// get user(freelancer)
app.get("/api/user/me", async (req, res) => {
  try {
    // 1. Grab the Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check if it exists and follows the "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Missing token." });
    }

    // 3. Extract just the token part
    const adminToken = authHeader.split(" ")[1];

    // 4. Look up the user
    const user = await prisma.user.findUnique({
      where: { adminToken: adminToken },
    });

    // 5. Handle invalid/expired tokens
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token." });
    }

    // 6. Return the user data
    res.status(200).json({
      adminToken: user.adminToken,
      slug: user.slug,
      name: user.name,
    });
  } catch (error) {
    console.error("[Fetch User Error]:", error);
    res.status(500).json({
      error: "An unexpected error occurred while fetching user data.",
    });
  }
});

// 1. Freelancer creates a new blank brief link
app.post("/api/briefs", async (req, res) => {
  try {
    const data = req.body;
    const { name } = data;
    // 1. Input Validation (Client Error - 400)
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "A valid 'name' is required to generate a brief." });
    }

    const baseSlug = slugify.default(name, { lower: true, strict: true });
    const suffix = nanoid(5);
    const slug = `${baseSlug}-${suffix}`;

    // 2. Database Operation
    const brief = await prisma.brief.create({
      data: {
        name: name,
        slug: slug,
      },
    });

    // 3. Success Response
    res.status(201).json({ id: brief.id });
  } catch (error) {
    console.error("[Create Brief Error]:", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "A brief with this slug already exists. Please try again.",
      });
    }
    res.status(500).json({
      error: "An unexpected error occurred while generating the brief.",
    });
  }
});

// 2. Fetch brief (for client form or freelancer view)
app.get("/api/briefs/:id", async (req, res) => {
  const brief = await prisma.brief.findUnique({ where: { id: req.params.id } });
  if (!brief) return res.status(404).json({ error: "Brief not found" });
  res.json(brief);
});

// 3. Client submits the brief
app.put("/api/briefs/:id", async (req, res) => {
  try {
    const updatedBrief = await prisma.brief.update({
      where: { id: req.params.id },
      data: { ...req.body, status: "SUBMITTED" },
    });

    // Emit real-time event to the specific freelancer viewing this brief
    io.emit(`brief-updated-${req.params.id}`, updatedBrief);

    res.json(updatedBrief);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit brief" });
  }
});

// 4. User and Client Single source of truth (Download a copy)
app.get("/api/briefs/:id/download", async (req, res) => {
  try {
    const { id } = req.params;
    const format = req.query.format as string; // 'txt' | 'doc' | 'pdf'

    const brief = await prisma.brief.findUnique({ where: { id } });
    if (!brief) return res.status(404).json({ error: "Brief not found" });

    const safeProjectName =
      brief.projectName?.replace(/\s+/g, "-").toLowerCase() || "project";
    const ext = format === "pdf" ? "pdf" : format === "doc" ? "doc" : "txt";
    const fileName = `${safeProjectName}-brief.${ext}`;

    // ── TXT ──────────────────────────────────
    if (format === "txt") {
      const submittedDate = fmt(brief.createdAt, "long") ?? "N/A";
      const deadlineFormatted =
        fmt(brief.deadline, "long") ?? "No hard deadline";

      const W = 56;
      const line = "─".repeat(W);
      const thick = "═".repeat(W);
      const pad = (s: string) => ` ${s}`;
      const val = (v: string | null | undefined) => v?.trim() || "—";
      const kv = (k: string, v: string | null | undefined) =>
        pad(`${k.padEnd(12)}${val(v)}`);
      const block = (text: string | null | undefined) =>
        (text || "—")
          .trim()
          .split("\n")
          .map((l) => pad(l))
          .join("\n");

      const txtContent = [
        "",
        `  ╔${thick}╗`,
        `  ║  BRIEFD — PROJECT BRIEF${" ".repeat(W - 24)}║`,
        `  ╚${thick}╝`,
        "",
        pad(`Project   ${val(brief.projectName)}`),
        pad(`Submitted ${submittedDate}`),
        pad(`Brief ID  ${id}`),
        "",
        line,
        "  CLIENT",
        line,
        kv("Name", brief.clientName),
        kv("Email", brief.clientEmail),
        kv("Company", brief.companyName),
        "",
        line,
        "  LOGISTICS",
        line,
        kv("Budget", brief.budgetRange),
        kv("Deadline", deadlineFormatted),
        "",
        line,
        "  PRIMARY GOAL",
        line,
        block(brief.primaryGoal),
        "",
        line,
        "  WHAT NEEDS TO BE BUILT",
        line,
        block(brief.needBuilt),
        "",
        ...(brief.targetAudience
          ? [line, "  TARGET AUDIENCE", line, block(brief.targetAudience), ""]
          : []),
        ...(brief.keyFeatures
          ? [line, "  KEY FEATURES", line, block(brief.keyFeatures), ""]
          : []),
        ...(brief.avoid
          ? [line, "  WHAT TO AVOID", line, block(brief.avoid), ""]
          : []),
        ...(brief.assetsUrls
          ? [line, "  ASSETS & LINKS", line, block(brief.assetsUrls), ""]
          : []),
        ...(brief.additionalInfo
          ? [line, "  ADDITIONAL INFO", line, block(brief.additionalInfo), ""]
          : []),
        line,
        pad(`Generated by Briefd · ${new Date().toLocaleDateString()}`),
        "",
      ].join("\n");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`,
      );
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.send(txtContent);
    }

    // ── DOC ──────────────────────────────────
    if (format === "doc") {
      const html = buildHtml(brief, id);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`,
      );
      res.setHeader("Content-Type", "application/msword");
      return res.send("\ufeff" + html);
    }

    // ── PDF ──────────────────────────────────
    if (format === "pdf") {
      const html = buildHtml(brief, id);

      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        // For Docker / production, point to your installed Chromium:
        // executablePath: "/usr/bin/chromium-browser",
      });

      try {
        const page = await browser.newPage();

        // Set HTML directly — no network round-trip needed
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
          format: "A4",
          margin: {
            top: "2.4cm",
            bottom: "2.4cm",
            left: "2.8cm",
            right: "2.8cm",
          },
          printBackground: true, // renders background colours (grey meta cards etc.)
        });

        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`,
        );
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Length", pdfBuffer.length);
        return res.send(pdfBuffer);
      } finally {
        // Always close the browser, even if pdf() throws
        await browser.close();
      }
    }

    return res.status(400).json({
      error: "Invalid format. Use ?format=txt, ?format=doc, or ?format=pdf",
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to generate download" });
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
