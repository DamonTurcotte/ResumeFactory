import { personalSlice } from "./personalSlice";
import { objectiveSlice } from "./objectiveSlice";
import { summarySlice } from "./summarySlice";
import { highlightSlice } from "./highlightSlice";
import { experienceSlice } from "./experienceSlice";
import { volunteerSlice } from "./volunteerSlice";
import { educationSlice } from "./educationSlice";
import { skillSlice } from "./skillSlice";
import { certificateSlice } from "./certificateSlice";
import { projectSlice } from "./projectSlice";
import { publicationSlice } from "./publicationSlice";
import { languageSlice } from "./languageSlice";
import { referenceSlice } from "./referenceSlice";

import { templateOptionSlice } from "./templateOptionSlice";

export const extraReducers = (builder) => {
  // Personal Slice Actions
  builder.addCase(personalSlice.actions.setPersonal, (state, action) => {
    state.personal = personalSlice.reducer(state.personal, action);
  });

  // Objective Slice Actions
  builder.addCase(objectiveSlice.actions.setObjective, (state, action) => {
    state.objective = objectiveSlice.reducer(state.objective, action);
  });
  builder.addCase(objectiveSlice.actions.setActive, (state, action) => {
    state.objective = objectiveSlice.reducer(state.objective, action);
  });

  // Summary Slice Actions
  builder.addCase(summarySlice.actions.setSummary, (state, action) => {
    state.summary = summarySlice.reducer(state.summary, action);
  });
  builder.addCase(summarySlice.actions.setActive, (state, action) => {
    state.summary = summarySlice.reducer(state.summary, action);
  });

  // Highlight Slice Actions
  builder.addCase(highlightSlice.actions.addHighlight, (state, action) => {
    state.highlights = highlightSlice.reducer(state.highlights, action);
  });
  builder.addCase(highlightSlice.actions.removeHighlight, (state, action) => {
    state.highlights = highlightSlice.reducer(state.highlights, action);
  });
  builder.addCase(highlightSlice.actions.setHighlight, (state, action) => {
    state.highlights = highlightSlice.reducer(state.highlights, action);
  });
  builder.addCase(highlightSlice.actions.setActive, (state, action) => {
    state.highlights = highlightSlice.reducer(state.highlights, action);
  });

  // Experience Slice Actions
  builder.addCase(experienceSlice.actions.addJob, (state, action) => {
    state.experience = experienceSlice.reducer(state.experience, action);
  });
  builder.addCase(experienceSlice.actions.removeJob, (state, action) => {
    state.experience = experienceSlice.reducer(state.experience, action);
  });
  builder.addCase(experienceSlice.actions.setJob, (state, action) => {
    state.experience = experienceSlice.reducer(state.experience, action);
  });
  builder.addCase(experienceSlice.actions.setActive, (state, action) => {
    state.experience = experienceSlice.reducer(state.experience, action);
  });

  // Volunteer Slice Actions
  builder.addCase(volunteerSlice.actions.addPosition, (state, action) => {
    state.volunteer = volunteerSlice.reducer(state.volunteer, action);
  });
  builder.addCase(volunteerSlice.actions.removePosition, (state, action) => {
    state.volunteer = volunteerSlice.reducer(state.volunteer, action);
  });
  builder.addCase(volunteerSlice.actions.setPosition, (state, action) => {
    state.volunteer = volunteerSlice.reducer(state.volunteer, action);
  });
  builder.addCase(volunteerSlice.actions.setActive, (state, action) => {
    state.volunteer = volunteerSlice.reducer(state.volunteer, action);
  });

  // Education Slice Actions
  builder.addCase(educationSlice.actions.addEducation, (state, action) => {
    state.education = educationSlice.reducer(state.education, action);
  });
  builder.addCase(educationSlice.actions.removeEducation, (state, action) => {
    state.education = educationSlice.reducer(state.education, action);
  });
  builder.addCase(educationSlice.actions.setEducation, (state, action) => {
    state.education = educationSlice.reducer(state.education, action);
  });
  builder.addCase(educationSlice.actions.setActive, (state, action) => {
    state.education = educationSlice.reducer(state.education, action);
  });

  // Skill Slice Actions
  builder.addCase(skillSlice.actions.addSkill, (state, action) => {
    state.skills = skillSlice.reducer(state.skills, action);
  });
  builder.addCase(skillSlice.actions.removeSkill, (state, action) => {
    state.skills = skillSlice.reducer(state.skills, action);
  });
  builder.addCase(skillSlice.actions.setSkill, (state, action) => {
    state.skills = skillSlice.reducer(state.skills, action);
  });
  builder.addCase(skillSlice.actions.setActive, (state, action) => {
    state.skills = skillSlice.reducer(state.skills, action);
  });
  builder.addCase(skillSlice.actions.setUseProficiency, (state, action) => {
    state.skills = skillSlice.reducer(state.skills, action);
  });

  // Certificate Slice Actions
  builder.addCase(certificateSlice.actions.addCertificate, (state, action) => {
    state.certificates = certificateSlice.reducer(state.certificates, action);
  });
  builder.addCase(certificateSlice.actions.removeCertificate, (state, action) => {
    state.certificates = certificateSlice.reducer(state.certificates, action);
  });
  builder.addCase(certificateSlice.actions.setCertificate, (state, action) => {
    state.certificates = certificateSlice.reducer(state.certificates, action);
  });
  builder.addCase(certificateSlice.actions.setActive, (state, action) => {
    state.certificates = certificateSlice.reducer(state.certificates, action);
  });

  // Project Slice Actions
  builder.addCase(projectSlice.actions.addProject, (state, action) => {
    state.projects = projectSlice.reducer(state.projects, action);
  });
  builder.addCase(projectSlice.actions.removeProject, (state, action) => {
    state.projects = projectSlice.reducer(state.projects, action);
  });
  builder.addCase(projectSlice.actions.setProject, (state, action) => {
    state.projects = projectSlice.reducer(state.projects, action);
  });
  builder.addCase(projectSlice.actions.setActive, (state, action) => {
    state.projects = projectSlice.reducer(state.projects, action);
  });

  // Publication Slice Actions
  builder.addCase(publicationSlice.actions.addPublication, (state, action) => {
    state.publications = publicationSlice.reducer(state.publications, action);
  });
  builder.addCase(publicationSlice.actions.removePublication, (state, action) => {
    state.publications = publicationSlice.reducer(state.publications, action);
  });
  builder.addCase(publicationSlice.actions.setPublication, (state, action) => {
    state.publications = publicationSlice.reducer(state.publications, action);
  });
  builder.addCase(publicationSlice.actions.setActive, (state, action) => {
    state.publications = publicationSlice.reducer(state.publications, action);
  });

  // Language Slice Actions
  builder.addCase(languageSlice.actions.addLanguage, (state, action) => {
    state.languages = languageSlice.reducer(state.languages, action);
  });
  builder.addCase(languageSlice.actions.removeLanguage, (state, action) => {
    state.languages = languageSlice.reducer(state.languages, action);
  });
  builder.addCase(languageSlice.actions.setLanguage, (state, action) => {
    state.languages = languageSlice.reducer(state.languages, action);
  });
  builder.addCase(languageSlice.actions.setActive, (state, action) => {
    state.languages = languageSlice.reducer(state.languages, action);
  });

  // Reference Slice Actions
  builder.addCase(referenceSlice.actions.addReference, (state, action) => {
    state.references = referenceSlice.reducer(state.references, action);
  });
  builder.addCase(referenceSlice.actions.removeReference, (state, action) => {
    state.references = referenceSlice.reducer(state.references, action);
  });
  builder.addCase(referenceSlice.actions.setReference, (state, action) => {
    state.references = referenceSlice.reducer(state.references, action);
  });
  builder.addCase(referenceSlice.actions.setActive, (state, action) => {
    state.references = referenceSlice.reducer(state.references, action);
  });

  // Template Options Actions
  builder.addCase(templateOptionSlice.actions.setSize, (state, action) => {
    state.options = templateOptionSlice.reducer(state.options, action);
  });
  builder.addCase(templateOptionSlice.actions.setOptions, (state, action) => {
    state.options = templateOptionSlice.reducer(state.options, action);
  });
}


// Actions to set resume categories to active
export const sliceActivators = {
  objective: objectiveSlice.actions.setActive,
  summary: summarySlice.actions.setActive,
  highlights: highlightSlice.actions.setActive,
  experience: experienceSlice.actions.setActive,
  volunteer: volunteerSlice.actions.setActive,
  education: educationSlice.actions.setActive,
  skills: skillSlice.actions.setActive,
  certificates: certificateSlice.actions.setActive,
  projects: projectSlice.actions.setActive,
  publications: publicationSlice.actions.setActive,
  languages: languageSlice.actions.setActive,
  references: referenceSlice.actions.setActive,
}

export {
  personalSlice,
  objectiveSlice,
  summarySlice,
  highlightSlice,
  experienceSlice,
  volunteerSlice,
  educationSlice,
  skillSlice,
  certificateSlice,
  projectSlice,
  publicationSlice,
  languageSlice,
  referenceSlice,
  templateOptionSlice,
}