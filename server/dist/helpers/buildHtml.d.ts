export interface ProjectBrief {
    id: string;
    slug: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    projectName: string | null;
    primaryGoal: string | null;
    needBuilt: string | null;
    targetAudience: string | null;
    keyFeatures: string | null;
    avoid: string | null;
    deadline: Date | null;
    budgetRange: string | null;
    assetsUrls: string | null;
    references: string | null;
    additionalInfo: string | null;
    userId: string;
    clientId: string | null;
    client: {
        companyName: string | null;
        email: string;
        name: string;
    } | null;
}
export declare const buildHtml: (brief: ProjectBrief, id: string) => string;
//# sourceMappingURL=buildHtml.d.ts.map