import { icons } from "../icons";
import templateDecorations from "../decorations";
import {
  renderSummary,
  renderObjective,
  renderHighlights,
  renderExperience,
  renderVolunteer,
  renderEducation,
  renderCertificates,
  renderSkills,
  renderLanguages,
  renderProjects,
  renderPublications,
  renderReferences
} from "./sections";

export const colorScheme0 = [
  // Black
  { primary: "#2E2E2E", secondary: "#1E1E1E", tertiary: "#FFC150" },
  // Blue
  { primary: "#384163", secondary: "#283143", tertiary: "#FFC150" },
  // Green
  { primary: "#3A4D3C", secondary: "#2A3D2C", tertiary: "#FFC150" },
  // Red
  { primary: "#4A282A", secondary: "#35181A", tertiary: "#FFC150" },
  // Purple
  { primary: "#3B3A4D", secondary: "#2B2A3D", tertiary: "#FFC150" },
  // Teal
  { primary: "#2F4F4F", secondary: "#1F3F3F", tertiary: "#FFC150" },
];

export const editSectionOrder0 = (sectionOrder, profile) => {
  if (sectionOrder.includes("personal")) {
    const newOrder = [];
    for (let i = 0; i < sectionOrder.length; i++) {
      if (sectionOrder[i] !== "personal") {
        if (sectionOrder[i] === "summary" && profile.summary.active) {
          continue;
        }
        if (sectionOrder[i] === "objective" && profile.objective.active && !profile.summary.active) {
          continue;
        }
        newOrder.push(sectionOrder[i]);
      }
    }
    return newOrder;
  }
};

export const variant0 = (profile, fonts, dimensions) => {
  const { colorIndex, fontSize, margin, order } = profile.options.templateOptions["0"];

  const personal = profile.personal.data;
  const objective = profile.objective;
  const summary = profile.summary;

  const contact = [];
  if (personal.Email.trim().length > 0) { contact.push(`${icons.email} ${personal.Email}`) };
  if (personal.Phone.trim().length > 0) { contact.push(`${icons.phone} ${personal.Phone}`) };
  if (personal.Location.trim().length > 0) { contact.push(`${icons.location} ${personal.Location}`) };
  if (personal.Website.trim().length > 0) { contact.push(`${icons.website} <a href="${personal.Website}" target="_blank">${personal.Website}</a>`) };
  if (personal.LinkedIn.trim().length > 0) { contact.push(`${icons.linkedin} <a href="https://www.linkedin.com/in/${personal.LinkedIn}" target="_blank">${personal.LinkedIn}</a>`) };
  if (personal.GitHub.trim().length > 0) { contact.push(`${icons.github} <a href="https://github.com/${personal.GitHub}" target="_blank">${personal.GitHub}</a>`) };

  const sections = {
    summary: renderSummary(profile),
    objective: renderObjective(profile),
    highlights: renderHighlights(profile),
    experience: renderExperience(profile),
    volunteer: renderVolunteer(profile),
    education: renderEducation(profile),
    certificates: renderCertificates(profile),
    projects: renderProjects(profile),
    publications: renderPublications(profile),
    skills: renderSkills(profile),
    languages: renderLanguages(profile),
    references: renderReferences(profile)
  };
  
  return {
    columns: 2,
    html: (`
      <main>
        <header>
          <div class="header-1">
            <h1>${personal.Name}</h1>
            ${ personal.Position.trim().length > 0 ? `<h2>${personal.Position}</h2>` : "" }
            ${ summary.active ? `<p>${summary.data}</p>` : objective.active ? `<p>${objective.data}</p>` : "" }
          </div>
          ${ contact.length === 6 ? (`
            <div style="display: flex; justify-content: center; align-items: center; background-color: ${colorScheme0[colorIndex].secondary}">
              <div style="position: absolute; height: 2px; width: ${dimensions.width}in; background-color: ${colorScheme0[colorIndex].primary}"></div>
              <div style="display: flex; flex-direction: column; margin-right: 50px">
                <span style="padding: 6px 0 7px;">${contact[0]}</span>
                <span style="padding: 7px 0 6px;">${contact[3]}</span>
              </div>
              <div style="display: flex; flex-direction: column; margin-right: 50px">
                <span style="padding: 6px 0 7px;">${contact[1]}</span>
                <span style="padding: 7px 0 6px;">${contact[4]}</span>
              </div>
              <div style="display: flex; flex-direction: column">
                <span style="padding: 6px 0 7px;">${contact[2]}</span>
                <span style="padding: 7px 0 6px;">${contact[5]}</span>
              </div>
            </div>
          `) : contact.length === 5 ? (`
            <div style="display: flex; justify-content: center; background-color: ${colorScheme0[colorIndex].secondary}; padding: 6px 0">
              <span style="margin-right: 40px">${contact[0]}</span>
              <span style="margin-right: 40px">${contact[1]}</span>
              <span style="margin-right: 40px">${contact[2]}</span>
            </div>
            <div style="display: flex; justify-content: center; background-color: ${colorScheme0[colorIndex].secondary}; padding: 6px 0; margin-top: 2px">
              <span style="margin-right: 40px">${contact[3]}</span>
              <span style="margin-right: 40px">${contact[4]}</span>
            </div>
          `) : (`
            <div style="display: flex; justify-content: center; background-color: ${colorScheme0[colorIndex].secondary}; padding: 6px 0">
              ${contact.map((c, i) => `<span style="margin-right: ${i < contact.length - 1 ? "25px" : "0"}">${c}</span>`).join("")}
            </div>
          `)}
        </header>
        <article>
          ${order.map((category) => sections[category]).join("")}
        </article>
        <aside class="decoration-container">
        ${ templateDecorations[0] }
        </aside>
      </main>
    `),
    extraPageHtml: (`
    <main>
      <article>
      </article>
      <aside class="decoration-container">
      ${ templateDecorations[0] }
      </aside>
    </main>
    `),
    css: (`
    body {
      font-family: '${fonts[0]}';
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #111;
      display: flex;
      flex-direction: column;
      font-size: ${fontSize}px;
    }
    main {
      width: ${dimensions.width}in;
      height: ${dimensions.height}in;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }
    .decoration-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: ${dimensions.width}in;
      height: ${dimensions.height}in;
    }
    .decoration {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 7in;
      fill: ${colorScheme0[colorIndex].primary}20;
    }
    header {
      background-color: ${colorScheme0[colorIndex].primary};
      color: #ffffff;
    }
    header .header-1 {
      padding: ${margin * 1.5}rem ${margin * 2}rem;
    }
    header svg {
      fill: ${colorScheme0[colorIndex].tertiary};
      width: 1rem;
      height: 1rem;
      vertical-align: -0.1rem;
      margin-right: 0.5rem;
    }
    header h1 {
      font-size: 2.5rem;
      line-height: 1;
      font-weight: 400;
    }
    header h2 {
      line-height: 1;
      font-size: 1.5rem;
      color: ${colorScheme0[colorIndex].tertiary};
      margin-top: 0.15rem;
      font-weight: 400;
    }
    header p {
      margin-top: ${margin / 2}rem;
      font-size: 1rem;
    }
    header span {
      font-size: 1rem;
      display: flex;
      align-items: center;
    }
    article {
      padding: ${margin * 1.5}rem ${margin * 2}rem;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      overflow: hidden;
      align-content: space-between;
      gap: 1rem;
      flex-grow: 1;
    }
    article > * {
      width: calc(${ dimensions.width / 2 }in - ${margin * 4}rem);
    }
    section > div,
    article > div {
      margin-top: 1rem;
    }
    section > div:first-of-type,
    article > div:first-of-type {
      margin-top: 0;
    }
    article h3 {
      font-size: 1.4rem;
      color: ${colorScheme0[colorIndex].tertiary};
      text-transform: uppercase;
      margin-bottom: 0.625rem;
      padding-bottom: 0.15rem;
      border-bottom: 0.15rem solid ${colorScheme0[colorIndex].tertiary};
      width: fit-content;
      line-height: 1;
    }
    article h4 {
      font-size: 1.15rem;
      margin-bottom: 4px;
      line-height: 1;
    }
    article h5 {
      font-size: 1.15rem;
      font-weight: 400;
      margin-bottom: 4px;
      line-height: 1;
    }
    article h6 {
      font-size: 1rem;
      margin-bottom: 4px;
      line-height: 1;
      font-weight: 400;
      font-style: italic;
      color: #666666;
    }
    article p {
      font-size: 1rem;
      line-height: 1.2;
      margin-bottom: 3px;
    }
    article ul {
      margin-bottom: 0.15rem;
      list-style-type: disc;
      padding-left: 0.6rem;
    }
    ::marker {
      color: #FFB150;
    }
    article li {
      font-size: 1rem;
      margin-bottom: 0.3rem;
    }
    header a {
      color: unset;
    }
    article a {
      color: #384163;
    }
    #skills ul {
      display: flex;
      flex-wrap: wrap;
    }
    #skills li {
      width: 50%;
    }
    #skills span {
      margin-bottom: 0;
      font-size: 1rem;
    }
    meter::-webkit-meter-optimum-value {
      background: ${colorScheme0[colorIndex].primary};
    }
    meter::-webkit-meter-bar {
      background-color: #E1E1E1;
      border: 0.1rem solid ${colorScheme0[colorIndex].tertiary};
      height: 0.625rem;
    }
  `)
  }
}