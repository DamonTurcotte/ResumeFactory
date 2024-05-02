export const renderObjective = (profile) => (`
  <section id="objective">
    <h3>Objective</h3>
    <p>${profile.objective.data}</p>
  </section>
`)

export const renderSummary = (profile) => (`
  <section id="summary">
    <h3>Summary</h3>
    <p>${profile.summary.data}</p>
  </section>
`)

export const renderHighlights = (profile) => {
  const highlights = profile.highlights.data;
  let html = '<section id="highlights"><h3>Highlights</h3>';
  html += `${highlights.map((highlight) => `<ul><li>${highlight}</li></ul>`).join("")}`;
  html += "</section>";
  return html;
}

export const renderExperience = (profile) => {
  const experience = profile.experience.data;
  let html = '<section id="experience">';
  for (let i = 0; i < experience.length; i++) {
    html += `
      <div id="experience-${i}">
        ${i === 0 ? '<h3>Experience</h3>' : ""}
        <h4>${experience[i].Title}</h4>
        <h5>${experience[i].Company}</h5>
        ${ experience[i].Start.length > 0 || experience[i].End.length > 0 || experience[i].Location.length > 0 ? `
          <div style="display: flex; justify-content: space-between">
            ${ experience[i].Start.length > 0 && experience[i].End.length > 0 ?
              `<h6>${experience[i].Start} - ${experience[i].End}</h6>`
            : experience[i].Start.length > 0 ?
              `<h6>${experience[i].Start}</h6>`
            : experience[i].End.length > 0 ?
              `<h6>${experience[i].End}</h6>`
            : "" }
            ${ experience[i].Location.length > 0 ? `<h6>${experience[i].Location}</h6>` : "" }
          </div>
        ` : ""}
        ${ experience[i].Duties.length > 0 ? `<ul>${experience[i].Duties.map((duty) => `<li>${duty}</li>`).join("")}</ul>` : "" }
      </div>
    `;
  }
  html += "</section>";
  return html;
}

export const renderVolunteer = (profile) => {
  const volunteer = profile.volunteer.data;
  let html = '<section id="volunteer">';
  for (let i = 0; i < volunteer.length; i++) {
    html += `
      <div id="volunteer-${i}">
        ${i === 0 ? '<h3>Volunteer</h3>' : ""}
        <h4>${volunteer[i].Title}</h4>
        <h5>${volunteer[i].Company}</h5>
        ${ volunteer[i].Start.length > 0 || volunteer[i].End.length > 0 || volunteer[i].Location.length > 0 ? `
          <div style="display: flex; justify-content: space-between">
            ${ volunteer[i].Start.length > 0 && volunteer[i].End.length > 0 ?
              `<h6>${volunteer[i].Start} - ${volunteer[i].End}</h6>`
            : volunteer[i].Start.length > 0 ?
              `<h6>${volunteer[i].Start}</h6>`
            : volunteer[i].End.length > 0 ?
              `<h6>${volunteer[i].End}</h6>`
            : "" }
            ${ volunteer[i].Location.length > 0 ? `<h6>${volunteer[i].Location}</h6>` : "" }
          </div>
        ` : ""}
        ${ volunteer[i].Duties.length > 0 ? `<ul>${volunteer[i].Duties.map((duty) => `<li>${duty}</li>`).join("")}</ul>` : "" }
      </div>
    `;
  }
  html += "</section>";
  return html;
}

export const renderEducation = (profile) => {
  const education = profile.education.data;
  let html = '<section id="education">';
  for (let i = 0; i < education.length; i++) {
    html += `
      <div id="education-${i}">
        ${i === 0 ? '<h3>Education</h3>' : ""}
        <h4>${education[i].Credential}</h4>
        <h5>${education[i].School}</h5>
        ${ education[i].Start.length > 0 || education[i].End.length > 0 || education[i].GPA.length > 0 ? `
          <div style="display: flex; justify-content: space-between">
            ${ education[i].Start.length > 0 && education[i].End.length > 0 ?
              `<h6>${education[i].Start} - ${education[i].End}</h6>`
            : education[i].Start.length > 0 ?
              `<h6>${education[i].Start}</h6>`
            : education[i].End.length > 0 ?
              `<h6>${education[i].End}</h6>`
            : "" }
            ${ education[i].GPA.length > 0 ? `<h6>GPA: ${education[i].GPA}</h6>` : "" }
          </div>
        ` : ""}
        ${ education[i].Description.length > 0 ? `<p>${education[i].Description}</p>` : "" }
      </div>
    `;
  }
  html += "</section>";
  return html;
};

export const renderCertificates = (profile) => {
  const certificates = profile.certificates.data;
  let html = '<section id="certificates">';
  for (let i = 0; i < certificates.length; i++) {
    html += `
      <div id="certificate-${i}">
        ${i === 0 ? '<h3>Certificates</h3>' : ""}
        ${certificates[i].CredentialURL.length > 0 ? `<a href="${certificates[i].CredentialURL}" target="_blank">` : ''}
        <h4>${certificates[i].Certificate}</h4>
        ${certificates[i].CredentialURL.length > 0 ? '</a>' : ''}
        <h5>${certificates[i].Issuer}</h5>
        ${ certificates[i].IssueDate.length > 0 || certificates[i].ExpirationDate.length > 0 ? `
          <div style="display: flex; justify-content: space-between">
            ${ certificates[i].IssueDate.length > 0 && certificates[i].ExpirationDate.length > 0 ?
              `<h6>${certificates[i].IssueDate} - ${certificates[i].ExpirationDate}</h6>`
            : certificates[i].IssueDate.length > 0 ?
              `<h6>${certificates[i].IssueDate}</h6>`
            : certificates[i].ExpirationDate.length > 0 ?
              `<h6>${certificates[i].ExpirationDate}</h6>`
            : "" }
          </div>
        ` : ""}
      </div>
    `;
  }
  html += "</section>";
  return html;
};

export const renderProjects = (profile) => {
  const projects = profile.projects.data;
  let html = '<section id="projects">';
  for (let i = 0; i < projects.length; i++) {
    html += `
      <div id="project-${i}">
        ${i === 0 ? '<h3>Projects</h3>' : ""}
        <h4>${projects[i].Title}</h4>
        <h5>${projects[i].Category}</h5>
        ${ projects[i].Start.length > 0 || projects[i].End.length > 0 ? `
          <div style="display: flex; justify-content: space-between">
            ${ projects[i].Start.length > 0 && projects[i].End.length > 0 ?
              `<h6>${projects[i].Start} - ${projects[i].End}</h6>`
            : projects[i].Start.length > 0 ?
              `<h6>${projects[i].Start}</h6>`
            : projects[i].End.length > 0 ?
              `<h6>${projects[i].End}</h6>`
            : "" }
          </div>
        ` : ""}
        ${ projects[i].Description.length > 0 ? `<p>${projects[i].Description}</p>` : "" }
        ${ projects[i].Achievements.length > 0 ? `<ul>${projects[i].Achievements.map((achievement) => `<li>${achievement}</li>`).join("")}</ul>` : "" }
        ${ projects[i].Links.length > 0 ? `<p>Links: ${projects[i].Links.map((link) => `<a href="${link.URL}" target="_blank">${link.Title}</a>`).join(", ")}</p>` : "" }
      </div>
    `;
  }
  html += "</section>";
  return html;
};

export const renderPublications = (profile) => {
  const publications = profile.publications.data;
  let html = '<section id="publications">';
  for (let i = 0; i < publications.length; i++) {
    html += `
      <div id="publication-${i}">
        ${i === 0 ? '<h3>Publications</h3>' : ""}
        ${publications[i].URL.length > 0 ? `<a href="${publications[i].URL}" target="_blank">` : ''}
        <h4>${publications[i].Title}</h4>
        ${publications[i].URL.length > 0 ? '</a>' : ''}
        <h5>${publications[i].Publisher}</h5>
        ${ publications[i].Date.length > 0 ? `<h6>${publications[i].Date}</h6>` : "" }
        ${ publications[i].Description.length > 0 ? `<p>${publications[i].Description}</p>` : "" }
      </div>
    `;
  }
  html += "</section>";
  return html;
};

export const renderSkills = (profile) => {
  if (profile.skills.useProficiency) {
    const skills = profile.skills.data;
    let html = '<section id="skills"><h3>Skills</h3>';
    html += `${skills.map((skill) => `<div style="display: flex; justify-content: space-between"><span>${skill.Name}</span> <meter style="width: 50%" min="0" max="5" value="${skill.Proficiency}" /></div>`).join("")}`;
    html += "</section>";
    return html;
  } else {
    const skills = profile.skills.data;
    let html = '<section id="skills"><h3>Skills</h3>';
    html += `${skills.map((skill) => `<ul><li>${skill.Name}</li></ul>`).join("")}`;
    html += "</section>";
    return html;
  }
};

export const renderLanguages = (profile) => {
  const languages = profile.languages.data;
  let html = '<section id="languages"><h3>Languages</h3>';
  html += `${languages.map((language) => `<ul><li>${language.Name} - ${language.Proficiency}</li></ul>`).join("")}`;
  html += "</section>";
  return html;
};

export const renderReferences = (profile) => {
  const references = profile.references.data;
  let html = '<section id="references">';
  for (let i = 0; i < references.length; i++) {
    html += `
      <div id="reference-${i}">
        ${i === 0 ? '<h3>References</h3>' : ""}
        <h4>${references[i].Name}</h4>
        <h5>${references[i].Position}</h5>
        <h6>${references[i].Company}</h6>
        <p>${references[i].Phone}</p>
        <p>${references[i].Email}</p>
      </div>
    `;
  }
  html += "</section>";
  return html;
};