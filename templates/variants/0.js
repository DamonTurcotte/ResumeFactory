import { icons } from "../icons";
import { renderSummary, renderObjective, renderExperience, renderEducation, renderCertificates, renderSkills, renderLanguages, renderProjects, renderPublications, renderReferences } from "./sections";
import templateDecorations from "../decorations";

export const variant0 = (profile, fonts, fontSize, margin, dimensions, categoryOrder, setCategoryOrder) => {
  if (categoryOrder.includes("personal")) {
    const newOrder = [];
    for (let i = 0; i < categoryOrder.length; i++) {
      if (categoryOrder[i] !== "personal") {
        if (categoryOrder[i] === "summary" && profile.summary.active) {
          continue;
        }
        if (categoryOrder[i] === "objective" && profile.objective.active && !profile.summary.active) {
          continue;
        }
        newOrder.push(categoryOrder[i]);
      }
    }
    setCategoryOrder(newOrder);
  }

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
    experience: renderExperience(profile),
    education: renderEducation(profile),
    certificates: renderCertificates(profile),
    projects: renderProjects(profile),
    publications: renderPublications(profile),
    skills: renderSkills(profile),
    languages: renderLanguages(profile),
    references: renderReferences(profile)
  };
  
  return {
    html: (`
    <body>
      <header>
        <div class="header-1">
          <h1>${personal.Name}</h1>
          ${ personal.Position.trim().length > 0 ? `<h2>${personal.Position}</h2>` : "" }
          ${ summary.active ? `<p>${summary.data}</p>` : objective.active ? `<p>${objective.data}</p>` : "" }
        </div>
        ${ contact.length === 6 ? (`
          <div style="display: flex; justify-content: center; align-items: center; background-color: #283143">
            <div style="position: absolute; height: 2px; width: ${dimensions.width}in; background-color: #384163"></div>
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
          <div style="display: flex; justify-content: center; background-color: #283143; padding: 6px 0">
            <span style="margin-right: 40px">${contact[0]}</span>
            <span style="margin-right: 40px">${contact[1]}</span>
            <span style="margin-right: 40px">${contact[2]}</span>
          </div>
          <div style="display: flex; justify-content: center; background-color: #283143; padding: 6px 0; margin-top: 2px">
            <span style="margin-right: 40px">${contact[3]}</span>
            <span style="margin-right: 40px">${contact[4]}</span>
          </div>
        `) : (`
          <div style="display: flex; justify-content: center; background-color: #283143; padding: 6px 0">
            ${contact.map((c, i) => `<span style="margin-right: ${i < contact.length - 1 ? "25px" : "0"}">${c}</span>`).join("")}
          </div>
        `)}
      </header>
      <main>
        ${categoryOrder.map((category) => sections[category]).join("")}
      </main>
      ${ templateDecorations[0] }
    </body>
    `),
    css: (`
    body {
      font-family: '${fonts[0]}';
      width: ${dimensions.width}in;
      height: ${dimensions.height}in;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #111;
      display: flex;
      flex-direction: column;
      font-size: ${fontSize}px;
    }
    header {
      background-color: #384163;
      color: #ffffff;
    }
    header .header-1 {
      padding: ${margin * 1.5}rem ${margin * 2}rem;
    }
    header svg {
      fill: #FFC150;
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
      color: #FFC150;
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
    main {
      padding: ${margin * 1.5}rem ${margin * 2}rem;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      overflow: hidden;
      align-content: space-between;
    }
    section {
      margin-bottom: 1rem;
      width: calc(${ dimensions.width / 2 }in - ${margin * 3}rem);
    }
    section:last-of-type {
      margin-bottom: 0;
    }
    section > div {
      margin-top: 1rem;
    }
    section > div:first-of-type {
      margin-top: 0;
    }
    main h3 {
      font-size: 1.4rem;
      color: #FFC150;
      text-transform: uppercase;
      margin-bottom: 0.625rem;
      padding-bottom: 0.15rem;
      border-bottom: 0.15rem solid #FFC150;
      width: fit-content;
      line-height: 1;
    }
    main h4 {
      font-size: 1.15rem;
      margin-bottom: 4px;
      line-height: 1;
    }
    main h5 {
      font-size: 1.15rem;
      font-weight: 400;
      margin-bottom: 4px;
      line-height: 1;
    }
    main h6 {
      font-size: 1rem;
      margin-bottom: 4px;
      line-height: 1;
      font-weight: 400;
      font-style: italic;
      color: #666666;
    }
    main p {
      font-size: 1rem;
      line-height: 1.2;
      margin-bottom: 3px;
    }
    main ul {
      margin-bottom: 0.15rem;
      list-style-type: disc;
      padding-left: 0.6rem;
    }
    ::marker {
      color: #FFB150;
    }
    main li {
      font-size: 1rem;
      margin-bottom: 0.3rem;
    }
    header a {
      color: unset;
    }
    main a {
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
      background: #384163;
    }
    meter::-webkit-meter-bar {
      background-color: #E1E1E1;
      border: 0.1rem solid #FFC150;
      height: 0.625rem;
    }
  `)
  }
}