import { esc, fmt } from "./esc.js";
// 2. Extract CSS to prevent memory reallocation on every call
const STYLES = `
  @page {
    size: A4;
    margin: 2.4cm 2.8cm;
    mso-header-margin: 1cm;
    mso-footer-margin: 1cm;
  }
  body {
    font-family: "Georgia", serif;
    font-size: 11pt;
    color: #1a1a1a;
    line-height: 1.7;
    background: #ffffff;
  }
  .doc-header {
    border-bottom: 2.5pt solid #1a1a1a;
    padding-bottom: 14pt;
    margin-bottom: 24pt;
  }
  .doc-eyebrow {
    font-family: "Arial", sans-serif;
    font-size: 7.5pt;
    font-weight: bold;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #888888;
    margin: 0 0 6pt;
  }
  .doc-title {
    font-size: 22pt;
    font-weight: bold;
    font-style: italic;
    color: #0f0f0f;
    margin: 0 0 4pt;
    line-height: 1.2;
  }
  .doc-meta-row {
    font-family: "Arial", sans-serif;
    font-size: 8.5pt;
    color: #888888;
  }
  .meta-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 22pt;
  }
  .meta-cell {
    width: 50%;
    vertical-align: top;
    padding: 12pt 14pt;
    background: #f5f5f5;
    border: 1pt solid #e0e0e0;
  }
  .meta-cell-right { border-left: none; }
  .meta-group-label {
    font-family: "Arial", sans-serif;
    font-size: 7pt;
    font-weight: bold;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888888;
    margin: 0 0 8pt;
  }
  .meta-kv {
    font-family: "Arial", sans-serif;
    font-size: 9pt;
    margin: 0 0 5pt;
    color: #1a1a1a;
  }
  .meta-k { color: #888888; font-size: 8pt; }
  .goal-box {
    border-left: 3pt solid #1a1a1a;
    padding: 12pt 16pt;
    margin-bottom: 22pt;
    background: #fafafa;
  }
  .goal-label {
    font-family: "Arial", sans-serif;
    font-size: 7pt;
    font-weight: bold;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888888;
    margin: 0 0 6pt;
  }
  .goal-text {
    font-size: 12pt;
    font-style: italic;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.6;
  }
  .sections-table { width: 100%; border-collapse: collapse; }
  .section-cell {
    padding: 14pt 0;
    border-top: 0.75pt solid #e0e0e0;
    vertical-align: top;
  }
  .section-label {
    font-family: "Arial", sans-serif;
    font-size: 7.5pt;
    font-weight: bold;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888888;
    margin: 0 0 6pt;
  }
  .section-body { font-size: 10.5pt; color: #1a1a1a; margin: 0; line-height: 1.7; }
  .doc-footer {
    border-top: 0.75pt solid #cccccc;
    margin-top: 28pt;
    padding-top: 10pt;
    font-family: "Arial", sans-serif;
    font-size: 7.5pt;
    color: #aaaaaa;
  }
`;
// 3. Extract the section builder logic
const buildSection = (title, content) => {
    if (!content?.trim())
        return "";
    return `
    <tr>
      <td class="section-cell">
        <p class="section-label">${title}</p>
        <p class="section-body">${esc(content)}</p>
      </td>
    </tr>
  `;
};
// 4. Main HTML builder function
// ... (keep the STYLES and buildSection helper from previous step) ...
// Update the parameter type to PrismaBrief
export const buildHtml = (brief, id) => {
    const submittedDate = fmt(brief.updatedAt) ?? "N/A";
    const deadlineFormatted = fmt(brief.deadline) ?? "No hard deadline";
    const projectName = esc(brief.projectName) || "Untitled Project";
    // Safely extract client data (falling back to "N/A" if client is null)
    const clientName = esc(brief.client?.name) || "N/A";
    const clientEmail = esc(brief.client?.email) || "N/A";
    const companyName = esc(brief.client?.companyName) || "N/A";
    return `
    <!DOCTYPE html>
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8"/>
      <title>${projectName} — Project Brief</title>
      <style>${STYLES}</style>
    </head>
    <body>
      <div class="doc-header">
        <p class="doc-eyebrow">Briefd — Project Brief</p>
        <p class="doc-title">${projectName}</p>
        <p class="doc-meta-row">Submitted ${submittedDate}&nbsp;&nbsp;·&nbsp;&nbsp;Ref: ${id}</p>
      </div>
    
      <table class="meta-table">
        <tr>
          <td class="meta-cell">
            <p class="meta-group-label">Client</p>
            <p class="meta-kv"><span class="meta-k">Name&nbsp;&nbsp;&nbsp;</span> ${clientName}</p>
            <p class="meta-kv"><span class="meta-k">Email&nbsp;&nbsp;</span> ${clientEmail}</p>
            <p class="meta-kv"><span class="meta-k">Company</span> ${companyName}</p>
          </td>
          <td class="meta-cell meta-cell-right">
            <p class="meta-group-label">Logistics</p>
            <p class="meta-kv"><span class="meta-k">Budget&nbsp;&nbsp;</span> ${esc(brief.budgetRange) || "N/A"}</p>
            <p class="meta-kv"><span class="meta-k">Deadline</span> ${deadlineFormatted}</p>
          </td>
        </tr>
      </table>
    
      ${brief.primaryGoal?.trim()
        ? `
      <div class="goal-box">
        <p class="goal-label">Primary Goal</p>
        <p class="goal-text">${esc(brief.primaryGoal)}</p>
      </div>`
        : ""}
    
      <table class="sections-table">
        ${buildSection("What needs to be built", brief.needBuilt)}
        ${buildSection("Target Audience", brief.targetAudience)}
        ${buildSection("Key Features", brief.keyFeatures)}
        ${buildSection("What to Avoid", brief.avoid)}
        ${buildSection("Assets & Links", brief.assetsUrls)}
        ${buildSection("Additional Information", brief.additionalInfo)}
      </table>
    
      <div class="doc-footer">
        Generated by Briefd · ${fmt(new Date(), "long")}
      </div>
    </body>
    </html>
  `.trim();
};
//# sourceMappingURL=buildHtml.js.map