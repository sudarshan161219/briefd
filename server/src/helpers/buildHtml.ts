import { esc, fmt } from "./esc";

export const buildHtml = (brief: any, id: string): string => {
  const submittedDate = fmt(brief.updatedAt) ?? "N/A";
  const deadlineFormatted = fmt(brief.deadline) ?? "No hard deadline";

  const section = (title: string, content: string | null | undefined) =>
    content?.trim()
      ? `<tr>
           <td class="section-cell">
             <p class="section-label">${title}</p>
             <p class="section-body">${esc(content)}</p>
           </td>
         </tr>`
      : "";

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8"/>
  <title>${esc(brief.projectName)} — Project Brief</title>
  <style>
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
  </style>
</head>
<body>
  <div class="doc-header">
    <p class="doc-eyebrow">Briefd — Project Brief</p>
    <p class="doc-title">${esc(brief.projectName) || "Untitled Project"}</p>
    <p class="doc-meta-row">Submitted ${submittedDate}&nbsp;&nbsp;·&nbsp;&nbsp;Ref: ${id}</p>
  </div>
 
  <table class="meta-table">
    <tr>
      <td class="meta-cell">
        <p class="meta-group-label">Client</p>
        <p class="meta-kv"><span class="meta-k">Name&nbsp;&nbsp;&nbsp;</span> ${esc(brief.clientName)}</p>
        <p class="meta-kv"><span class="meta-k">Email&nbsp;&nbsp;</span> ${esc(brief.clientEmail)}</p>
        <p class="meta-kv"><span class="meta-k">Company</span> ${esc(brief.companyName)}</p>
      </td>
      <td class="meta-cell meta-cell-right">
        <p class="meta-group-label">Logistics</p>
        <p class="meta-kv"><span class="meta-k">Budget&nbsp;&nbsp;</span> ${esc(brief.budgetRange)}</p>
        <p class="meta-kv"><span class="meta-k">Deadline</span> ${deadlineFormatted}</p>
      </td>
    </tr>
  </table>
 
  <div class="goal-box">
    <p class="goal-label">Primary Goal</p>
    <p class="goal-text">${esc(brief.primaryGoal)}</p>
  </div>
 
  <table class="sections-table">
    ${section("What needs to be built", brief.needBuilt)}
    ${section("Target Audience", brief.targetAudience)}
    ${section("Key Features", brief.keyFeatures)}
    ${section("What to Avoid", brief.avoid)}
    ${section("Assets & Links", brief.assetsUrls)}
    ${section("Additional Information", brief.additionalInfo)}
  </table>
 
  <div class="doc-footer">
    Generated by Briefd · ${fmt(new Date(), "long")}
  </div>
</body>
</html>`;
};
