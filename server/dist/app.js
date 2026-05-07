import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { prisma } from "./utils/prismaClient.js";
import { Prisma } from "./generated/prisma/client.js";
import { fmt } from "./helpers/esc.js";
import { nanoid } from "nanoid";
import { generateSlug } from "./helpers/generateSlug.js";
import { buildHtml } from "./helpers/buildHtml.js";
import puppeteer, { Browser } from "puppeteer";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { AppError } from "./errors/AppError.js";
import { getAuthToken } from "./lib/getAuthToken.js";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
const PORT = process.env.PORT || 8080;
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.set("io", io);
io.on("connection", (socket) => {
    // console.log(`🟢 New client connected: ${socket.id}`);
    socket.on("join-brief", (briefId) => {
        socket.join(`brief-${briefId}`);
        // console.log(`Client ${socket.id} joined room: brief-${briefId}`);
    });
    socket.on("field-focus", ({ briefId, fieldName, isTyping }) => {
        const eventName = `client-activity-${briefId}`;
        socket.to(`brief-${briefId}`).emit(eventName, { fieldName, isTyping });
    });
    socket.on("disconnect", () => {
        // console.log(`🔴 Client disconnected: ${socket.id}`);
    });
});
let globalBrowser;
async function initBrowser() {
    if (globalBrowser) {
        globalBrowser.close().catch(() => { });
    }
    globalBrowser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
        ],
    });
    // console.log("✅ Puppeteer browser initialized");
}
export async function getHealthyBrowser() {
    // If undefined OR disconnected, restart it
    if (!globalBrowser || !globalBrowser.connected) {
        console.warn("⚠️ Browser disconnected or missing! Re-initializing...");
        await initBrowser();
    }
    // We can safely assert this is defined now
    return globalBrowser;
}
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
app.post("/api/user", async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new AppError({
                message: "A valid 'name' is required to generate a brief.",
                statusCode: 400,
            });
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
    }
    catch (error) {
        if (error.code === "P2002") {
            next(new AppError({
                message: "A database collision occurred. Please try again.",
                statusCode: 409,
                cause: error,
            }));
        }
        else {
            next(error);
        }
    }
});
// get user(freelancer)
app.get("/api/user/me", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const user = await prisma.user.findUnique({
            where: { adminToken: adminToken },
        });
        if (!user) {
            throw new AppError({
                message: "Unauthorized: Invalid token.",
                statusCode: 401,
            });
        }
        res.status(200).json({
            adminToken: user.adminToken,
            slug: user.slug,
            name: user.name,
        });
    }
    catch (error) {
        next(error);
    }
});
// delete user(freelancer)
app.delete("/api/user", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const user = await prisma.user.findUnique({
            where: { adminToken },
            select: { id: true },
        });
        if (!user) {
            throw new AppError({
                message: "Unauthorized: Invalid token.",
                statusCode: 401,
            });
        }
        await prisma.user.delete({
            where: { id: user.id },
        });
        res.status(200).json({
            success: true,
            message: "Account and all associated data permanently deleted.",
        });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2003") {
                console.error("🚨 Prisma Constraint Error: You need to add 'onDelete: Cascade' to your schema.prisma relations!");
            }
        }
        next(error);
    }
});
// create client
app.post("/api/client", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const { name, email, companyName } = req.body;
        if (!name || !email) {
            throw new AppError({
                message: "Name and email are required.",
                statusCode: 400,
            });
        }
        const formattedEmail = email.trim().toLowerCase();
        const existingUser = await prisma.client.findFirst({
            where: { email: formattedEmail, userId: adminToken },
        });
        if (existingUser) {
            throw new AppError({
                message: "You already have a client with this email.",
                statusCode: 409,
                code: "EMAIL_CONFLICT",
                debugMessage: `Attempted to register with existing email: ${email}`,
            });
        }
        const client = await prisma.client.create({
            data: {
                name: name.trim(),
                email: formattedEmail,
                companyName: companyName?.trim(),
                userId: adminToken,
            },
        });
        res.status(201).json(client);
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2003") {
                return next(new AppError({ message: "Invalid admin token.", statusCode: 401 }));
            }
        }
        next(error);
    }
});
// get all clients by user(adminToken)
app.get("/api/client", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const { search, sortBy = "name", order = "asc", hasCompany } = req.query;
        const whereClause = { userId: adminToken };
        if (search && typeof search === "string") {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { companyName: { contains: search, mode: "insensitive" } },
            ];
        }
        if (hasCompany === "true")
            whereClause.companyName = { not: null };
        else if (hasCompany === "false")
            whereClause.companyName = null;
        const validSortFields = ["name", "email", "companyName"];
        const sortField = validSortFields.includes(sortBy)
            ? sortBy
            : "name";
        const sortOrder = order === "desc" ? "desc" : "asc";
        const clients = await prisma.client.findMany({
            where: whereClause,
            orderBy: { [sortField]: sortOrder },
            include: { briefs: true },
        });
        res.status(200).json(clients);
    }
    catch (error) {
        next(error);
    }
});
// get client by id and user(admintoken)
app.get("/api/client/:id", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const { id } = req.params;
        const client = await prisma.client.findUnique({ where: { id } });
        if (!client)
            throw new AppError({ message: "Client not found.", statusCode: 404 });
        if (client.userId !== adminToken) {
            throw new AppError({
                message: "Forbidden. This client belongs to another workspace.",
                statusCode: 403,
            });
        }
        res.status(200).json(client);
    }
    catch (error) {
        next(error);
    }
});
// update client
app.patch("/api/client/:id", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const { id } = req.params;
        const { name, email, companyName } = req.body;
        const existingClient = await prisma.client.findUnique({ where: { id } });
        if (!existingClient)
            throw new AppError({ message: "Client not found.", statusCode: 404 });
        if (existingClient.userId !== adminToken)
            throw new AppError({ message: "Forbidden.", statusCode: 403 });
        const updatedClient = await prisma.client.update({
            where: { id },
            data: {
                ...(name && { name: name.trim() }),
                ...(email && { email: email.trim().toLowerCase() }),
                ...(companyName !== undefined && { companyName: companyName.trim() }),
            },
        });
        res.status(200).json(updatedClient);
    }
    catch (error) {
        if (error.code === "P2002") {
            next(new AppError({
                message: "Another client already uses this email.",
                statusCode: 409,
                cause: error,
            }));
        }
        else {
            next(error);
        }
    }
});
// delete client
app.delete("/api/client/:id", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const { id } = req.params;
        const existingClient = await prisma.client.findUnique({ where: { id } });
        if (!existingClient)
            throw new AppError({ message: "Client not found.", statusCode: 404 });
        if (existingClient.userId !== adminToken)
            throw new AppError({ message: "Forbidden.", statusCode: 403 });
        await prisma.client.delete({ where: { id } });
        res
            .status(200)
            .json({ success: true, message: "Client deleted successfully." });
    }
    catch (error) {
        next(error);
    }
});
// create brief
app.post("/api/brief", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const user = await prisma.user.findUnique({
            where: { adminToken },
            select: { id: true },
        });
        if (!user)
            throw new AppError({
                message: "Invalid token. User not found.",
                statusCode: 401,
            });
        const { name, clientId } = req.body;
        if (!name)
            throw new AppError({
                message: "Brief name is required.",
                statusCode: 400,
            });
        if (clientId) {
            const client = await prisma.client.findUnique({
                where: { id: clientId },
            });
            if (!client || client.userId !== adminToken) {
                throw new AppError({
                    message: "Forbidden. Client does not exist or belong to you.",
                    statusCode: 403,
                });
            }
        }
        let uniqueSlug = generateSlug(name);
        let isSlugUnique = false;
        while (!isSlugUnique) {
            const existing = await prisma.brief.findUnique({
                where: { slug: uniqueSlug },
            });
            if (!existing)
                isSlugUnique = true;
            else
                uniqueSlug = generateSlug(name);
        }
        const newBrief = await prisma.brief.create({
            data: {
                name: name.trim(),
                slug: uniqueSlug,
                userId: user.id,
                clientId: clientId,
                status: "PENDING",
            },
        });
        res.status(201).json(newBrief);
    }
    catch (error) {
        if (error.code === "P2002") {
            next(new AppError({
                message: "A brief with this slug already exists. Please try again.",
                statusCode: 409,
                cause: error,
            }));
        }
        else {
            next(error);
        }
    }
});
// get briefs
app.get("/api/brief", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const user = await prisma.user.findUnique({
            where: { adminToken },
            select: { id: true },
        });
        if (!user)
            throw new AppError({
                message: "Invalid token. User not found.",
                statusCode: 401,
            });
        const { clientId } = req.query;
        const whereClause = { userId: user.id };
        if (clientId)
            whereClause.clientId = String(clientId);
        const briefs = await prisma.brief.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(briefs);
    }
    catch (error) {
        next(error);
    }
});
// Fetch brief
app.get("/api/brief/:id", async (req, res, next) => {
    try {
        const adminToken = getAuthToken(req);
        if (!adminToken)
            throw new AppError({ message: "Unauthorized", statusCode: 401 });
        const user = await prisma.user.findUnique({
            where: { adminToken },
            select: { id: true },
        });
        if (!user)
            throw new AppError({
                message: "Invalid token. User not found.",
                statusCode: 401,
            });
        const brief = await prisma.brief.findUnique({
            where: { id: req.params.id, userId: user.id },
            include: {
                client: { select: { name: true, companyName: true, email: true } },
            },
        });
        if (!brief)
            throw new AppError({ message: "Brief not found", statusCode: 404 });
        res.status(200).json(brief);
    }
    catch (error) {
        next(error);
    }
});
// Client submits the brief
app.put("/api/brief/:id", async (req, res, next) => {
    try {
        const { projectName, primaryGoal, needBuilt, targetAudience, keyFeatures, avoid, budgetRange, deadline, assetsUrls, references, additionalInfo, } = req.body;
        const updatedBrief = await prisma.brief.update({
            where: { slug: req.params.id },
            data: {
                projectName,
                primaryGoal,
                needBuilt,
                targetAudience,
                keyFeatures,
                avoid,
                deadline: deadline ? new Date(deadline) : null,
                budgetRange,
                assetsUrls,
                references,
                additionalInfo,
                status: "COMPLETED",
            },
        });
        const io = req.app.get("io");
        if (io) {
            io.to(`brief-${req.params.id}`).emit(`brief-updated-${req.params.id}`, updatedBrief);
        }
        res.json(updatedBrief);
    }
    catch (error) {
        next(error); // Passes prisma errors (like slug not found) straight to your middleware
    }
});
// Get Public Brief
app.get("/api/public/brief/:id", async (req, res, next) => {
    try {
        const brief = await prisma.brief.findUnique({
            where: { slug: req.params.id },
            select: {
                id: true,
                projectName: true,
                budgetRange: true,
                updatedAt: true,
                status: true,
                deadline: true,
                client: { select: { name: true, companyName: true, email: true } },
            },
        });
        if (!brief)
            throw new AppError({
                message: "Brief not found or link is invalid.",
                statusCode: 404,
            });
        res.status(200).json(brief);
    }
    catch (error) {
        next(error);
    }
});
// Download Brief
app.get("/api/brief/:id/download", async (req, res, next) => {
    try {
        const { id } = req.params;
        const format = req.query.format;
        const brief = await prisma.brief.findUnique({
            where: { slug: id },
            include: {
                client: {
                    select: {
                        name: true,
                        companyName: true,
                        email: true,
                    },
                },
            },
        });
        if (!brief)
            throw new AppError({ message: "Brief not found", statusCode: 404 });
        const safeProjectName = brief.projectName?.replace(/\s+/g, "-").toLowerCase() || "project";
        const ext = format === "pdf" ? "pdf" : format === "doc" ? "doc" : "txt";
        const fileName = `${safeProjectName}-brief.${ext}`;
        if (format === "txt") {
            const submittedDate = fmt(brief.createdAt, "long") ?? "N/A";
            const deadlineFormatted = fmt(brief.deadline, "long") ?? "No hard deadline";
            const W = 56;
            const line = "─".repeat(W);
            const thick = "═".repeat(W);
            const pad = (s) => ` ${s}`;
            const val = (v) => v?.trim() || "—";
            const kv = (k, v) => pad(`${k.padEnd(12)}${val(v)}`);
            const block = (text) => (text || "—")
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
                kv("Name", brief.client?.name),
                kv("Email", brief.client?.email),
                kv("Company", brief.client?.companyName),
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
            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            return res.send(txtContent);
        }
        if (format === "doc") {
            const html = buildHtml(brief, id);
            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
            res.setHeader("Content-Type", "application/msword");
            return res.send("\ufeff" + html);
        }
        if (format === "pdf") {
            let page;
            try {
                const browser = await getHealthyBrowser();
                page = await browser.newPage();
                const html = buildHtml(brief, id);
                await page.setContent(html, { waitUntil: "networkidle0" });
                const pdfBuffer = await page.pdf({
                    format: "A4",
                    printBackground: true,
                });
                res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
                res.setHeader("Content-Type", "application/pdf");
                return res.send(pdfBuffer);
            }
            finally {
                if (page)
                    await page.close();
            }
        }
        throw new AppError({
            message: "Invalid format. Use ?format=txt, ?format=doc, or ?format=pdf",
            statusCode: 400,
        });
    }
    catch (error) {
        next(error);
    }
});
// error middleware
app.use(errorMiddleware);
async function startServer() {
    try {
        await initBrowser();
        httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (error) {
        console.error("❌ Failed to initialize PDF engine. Shutting down.", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=app.js.map