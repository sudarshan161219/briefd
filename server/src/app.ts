import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { prisma } from "./utils/prismaClient.js";
import { Prisma } from "../generated/prisma/client.js";
import { fmt } from "./helpers/esc.js";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { generateSlug } from "./helpers/generateSlug.js";
import { buildHtml } from "./helpers/buildHtml.js";
import puppeteer from "puppeteer";
import { getAuthToken } from "./lib/getAuthToken.js";

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
    const adminToken = getAuthToken(req);

    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    // Look up the user
    const user = await prisma.user.findUnique({
      where: { adminToken: adminToken },
    });

    //  Handle invalid/expired tokens
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

// create client
app.post("/api/client", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    // client creation limitation
    const MAX_CLIENTS = 5;
    const clientCount = await prisma.client.count({
      where: { userId: adminToken },
    });

    if (clientCount >= MAX_CLIENTS) {
      return res.status(403).json({
        error: `limit reached: You can only have up to ${MAX_CLIENTS} clients.`,
      });
    }

    const { name, email, companyName } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        companyName: companyName?.trim(),
        userId: adminToken,
      },
    });

    res.status(201).json(client);
  } catch (error) {}
});

// get all clients by user(adminToken)
app.get("/api/client", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    const {
      search,
      sortBy = "name", // Default sort by name
      order = "asc", // Default order ascending
      hasCompany, // Optional filter: 'true' or 'false'
    } = req.query;

    const whereClause: Prisma.ClientWhereInput = {
      userId: adminToken,
    };

    if (search && typeof search === "string") {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
      ];
    }

    if (hasCompany === "true") {
      whereClause.companyName = { not: null };
    } else if (hasCompany === "false") {
      whereClause.companyName = null;
    }

    const validSortFields = ["name", "email", "companyName"];
    const sortField = validSortFields.includes(sortBy as string)
      ? sortBy
      : "name";
    const sortOrder = order === "desc" ? "desc" : "asc";

    const clients = await prisma.client.findMany({
      where: whereClause,
      orderBy: {
        [sortField as string]: sortOrder,
      },
      include: {
        briefs: true,
      },
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error("[Get Client Error]:", error);
    res.status(500).json({ error: "Failed to fetch client." });
  }
});

// get client by id and user(admintoken)
app.get("/api/client/:id", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found." });
    }

    if (client.userId !== adminToken) {
      return res.status(403).json({
        error: "Forbidden. This client belongs to another workspace.",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("[Get Client Error]:", error);
    res.status(500).json({ error: "Failed to fetch client." });
  }
});

// update client (name, email, companyName)
app.patch("/api/client/:id", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { name, email, companyName } = req.body;

    // 1. Verify ownership before updating
    const existingClient = await prisma.client.findUnique({ where: { id } });

    if (!existingClient) {
      return res.status(404).json({ error: "Client not found." });
    }
    if (existingClient.userId !== adminToken) {
      return res.status(403).json({ error: "Forbidden." });
    }

    // 2. Perform the update
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(email && { email: email.trim().toLowerCase() }),
        ...(companyName !== undefined && { companyName: companyName.trim() }),
      },
    });

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("[Update Client Error]:", error);
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Another client already uses this email." });
    }
    res.status(500).json({ error: "Failed to update client." });
  }
});

// delete cient
app.delete("/api/client/:id", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    // 1. Verify ownership before deleting
    const existingClient = await prisma.client.findUnique({ where: { id } });

    if (!existingClient) {
      return res.status(404).json({ error: "Client not found." });
    }
    if (existingClient.userId !== adminToken) {
      return res.status(403).json({ error: "Forbidden." });
    }

    // 2. Perform the delete
    await prisma.client.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ success: true, message: "Client deleted successfully." });
  } catch (error) {
    console.error("[Delete Client Error]:", error);
    res.status(500).json({ error: "Failed to delete client." });
  }
});

//- Brief -//
// create brief
app.post("/api/brief", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { adminToken },
      select: { id: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    // brief creation limitation
    const MAX_BRIEFS = 5;
    const briefCount = await prisma.brief.count({
      where: { userId: user.id },
    });

    if (briefCount >= MAX_BRIEFS) {
      return res.status(403).json({
        error: `Showcase limit reached: You can only create up to ${MAX_BRIEFS} briefs.`,
      });
    }

    const { name, clientId } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Brief name is required." });
    }

    if (clientId) {
      const client = await prisma.client.findUnique({
        where: { id: clientId },
      });

      if (!client || client.userId !== adminToken) {
        return res.status(403).json({
          error: "Forbidden. Client does not exist or belong to you.",
        });
      }
    }

    // Creating unique Slug
    let uniqueSlug = generateSlug(name);

    let isSlugUnique = false;
    while (!isSlugUnique) {
      const existing = await prisma.brief.findUnique({
        where: { slug: uniqueSlug },
      });
      if (!existing) isSlugUnique = true;
      else uniqueSlug = generateSlug(name);
    }

    //  Database Operation
    const newBrief = await prisma.brief.create({
      data: {
        name: name.trim(),
        slug: uniqueSlug,
        userId: user.id,
        clientId: clientId || null,
        status: "PENDING",
      },
    });

    //  Success Response
    res.status(201).json(newBrief);
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

app.get("/api/brief", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { adminToken },
      select: { id: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    const { clientId } = req.query;

    const briefs = await prisma.brief.findMany({
      where: {
        userId: user.id,
        clientId: String(clientId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(briefs);
  } catch (error) {
    console.error("[Fetch Briefs Error]:", error);
    res.status(500).json({ error: "Failed to fetch briefs." });
  }
});

//  Fetch brief (for client form or freelancer view)
app.get("/api/brief/:id", async (req, res) => {
  try {
    const adminToken = getAuthToken(req);
    if (!adminToken) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { adminToken },
      select: { id: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    const brief = await prisma.brief.findUnique({
      where: {
        id: req.params.id,
        userId: user.id,
      },
      include: {
        client: {
          select: { name: true, companyName: true, email: true },
        },
      },
    });

    if (!brief) return res.status(404).json({ error: "Brief not found" });
    res.status(200).json(brief);
  } catch (error) {
    console.error("[Fetch Brief Error]:", error);
    res.status(500).json({ error: "Failed to fetch brief." });
  }
});

// 3. Client submits the brief
app.put("/api/brief/:id", async (req, res) => {
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
app.get("/api/brief/:id/download", async (req, res) => {
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
