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
    state.profiles[state.currentProfile].personal = personalSlice.reducer(state.profiles[state.currentProfile].personal, action);
  });

  // Objective Slice Actions
  builder.addCase(objectiveSlice.actions.setObjective, (state, action) => {
    state.profiles[state.currentProfile].objective = objectiveSlice.reducer(state.profiles[state.currentProfile].objective, action);
  });
  builder.addCase(objectiveSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].objective = objectiveSlice.reducer(state.profiles[state.currentProfile].objective, action);
  });

  // Summary Slice Actions
  builder.addCase(summarySlice.actions.setSummary, (state, action) => {
    state.profiles[state.currentProfile].summary = summarySlice.reducer(state.profiles[state.currentProfile].summary, action);
  });
  builder.addCase(summarySlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].summary = summarySlice.reducer(state.profiles[state.currentProfile].summary, action);
  });

  // Highlight Slice Actions
  builder.addCase(highlightSlice.actions.addHighlight, (state, action) => {
    state.profiles[state.currentProfile].highlights = highlightSlice.reducer(state.profiles[state.currentProfile].highlights, action);
  });
  builder.addCase(highlightSlice.actions.removeHighlight, (state, action) => {
    state.profiles[state.currentProfile].highlights = highlightSlice.reducer(state.profiles[state.currentProfile].highlights, action);
  });
  builder.addCase(highlightSlice.actions.setHighlight, (state, action) => {
    state.profiles[state.currentProfile].highlights = highlightSlice.reducer(state.profiles[state.currentProfile].highlights, action);
  });
  builder.addCase(highlightSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].highlights = highlightSlice.reducer(state.profiles[state.currentProfile].highlights, action);
  });

  // Experience Slice Actions
  builder.addCase(experienceSlice.actions.addJob, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });
  builder.addCase(experienceSlice.actions.removeJob, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });
  builder.addCase(experienceSlice.actions.setJob, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });
  builder.addCase(experienceSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });

  // Volunteer Slice Actions
  builder.addCase(volunteerSlice.actions.addPosition, (state, action) => {
    state.profiles[state.currentProfile].volunteer = volunteerSlice.reducer(state.profiles[state.currentProfile].volunteer, action);
  });
  builder.addCase(volunteerSlice.actions.removePosition, (state, action) => {
    state.profiles[state.currentProfile].volunteer = volunteerSlice.reducer(state.profiles[state.currentProfile].volunteer, action);
  });
  builder.addCase(volunteerSlice.actions.setPosition, (state, action) => {
    state.profiles[state.currentProfile].volunteer = volunteerSlice.reducer(state.profiles[state.currentProfile].volunteer, action);
  });
  builder.addCase(volunteerSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].volunteer = volunteerSlice.reducer(state.profiles[state.currentProfile].volunteer, action);
  });

  // Education Slice Actions
  builder.addCase(educationSlice.actions.addEducation, (state, action) => {
    state.profiles[state.currentProfile].education = educationSlice.reducer(state.profiles[state.currentProfile].education, action);
  });
  builder.addCase(educationSlice.actions.removeEducation, (state, action) => {
    state.profiles[state.currentProfile].education = educationSlice.reducer(state.profiles[state.currentProfile].education, action);
  });
  builder.addCase(educationSlice.actions.setEducation, (state, action) => {
    state.profiles[state.currentProfile].education = educationSlice.reducer(state.profiles[state.currentProfile].education, action);
  });
  builder.addCase(educationSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].education = educationSlice.reducer(state.profiles[state.currentProfile].education, action);
  });

  // Skill Slice Actions
  builder.addCase(skillSlice.actions.addSkill, (state, action) => {
    state.profiles[state.currentProfile].skills = skillSlice.reducer(state.profiles[state.currentProfile].skills, action);
  });
  builder.addCase(skillSlice.actions.removeSkill, (state, action) => {
    state.profiles[state.currentProfile].skills = skillSlice.reducer(state.profiles[state.currentProfile].skills, action);
  });
  builder.addCase(skillSlice.actions.setSkill, (state, action) => {
    state.profiles[state.currentProfile].skills = skillSlice.reducer(state.profiles[state.currentProfile].skills, action);
  });
  builder.addCase(skillSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].skills = skillSlice.reducer(state.profiles[state.currentProfile].skills, action);
  });
  builder.addCase(skillSlice.actions.setUseProficiency, (state, action) => {
    state.profiles[state.currentProfile].skills = skillSlice.reducer(state.profiles[state.currentProfile].skills, action);
  });

  // Certificate Slice Actions
  builder.addCase(certificateSlice.actions.addCertificate, (state, action) => {
    state.profiles[state.currentProfile].certificates = certificateSlice.reducer(state.profiles[state.currentProfile].certificates, action);
  });
  builder.addCase(certificateSlice.actions.removeCertificate, (state, action) => {
    state.profiles[state.currentProfile].certificates = certificateSlice.reducer(state.profiles[state.currentProfile].certificates, action);
  });
  builder.addCase(certificateSlice.actions.setCertificate, (state, action) => {
    state.profiles[state.currentProfile].certificates = certificateSlice.reducer(state.profiles[state.currentProfile].certificates, action);
  });
  builder.addCase(certificateSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].certificates = certificateSlice.reducer(state.profiles[state.currentProfile].certificates, action);
  });

  // Project Slice Actions
  builder.addCase(projectSlice.actions.addProject, (state, action) => {
    state.profiles[state.currentProfile].projects = projectSlice.reducer(state.profiles[state.currentProfile].projects, action);
  });
  builder.addCase(projectSlice.actions.removeProject, (state, action) => {
    state.profiles[state.currentProfile].projects = projectSlice.reducer(state.profiles[state.currentProfile].projects, action);
  });
  builder.addCase(projectSlice.actions.setProject, (state, action) => {
    state.profiles[state.currentProfile].projects = projectSlice.reducer(state.profiles[state.currentProfile].projects, action);
  });
  builder.addCase(projectSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].projects = projectSlice.reducer(state.profiles[state.currentProfile].projects, action);
  });

  // Publication Slice Actions
  builder.addCase(publicationSlice.actions.addPublication, (state, action) => {
    state.profiles[state.currentProfile].publications = publicationSlice.reducer(state.profiles[state.currentProfile].publications, action);
  });
  builder.addCase(publicationSlice.actions.removePublication, (state, action) => {
    state.profiles[state.currentProfile].publications = publicationSlice.reducer(state.profiles[state.currentProfile].publications, action);
  });
  builder.addCase(publicationSlice.actions.setPublication, (state, action) => {
    state.profiles[state.currentProfile].publications = publicationSlice.reducer(state.profiles[state.currentProfile].publications, action);
  });
  builder.addCase(publicationSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].publications = publicationSlice.reducer(state.profiles[state.currentProfile].publications, action);
  });

  // Language Slice Actions
  builder.addCase(languageSlice.actions.addLanguage, (state, action) => {
    state.profiles[state.currentProfile].languages = languageSlice.reducer(state.profiles[state.currentProfile].languages, action);
  });
  builder.addCase(languageSlice.actions.removeLanguage, (state, action) => {
    state.profiles[state.currentProfile].languages = languageSlice.reducer(state.profiles[state.currentProfile].languages, action);
  });
  builder.addCase(languageSlice.actions.setLanguage, (state, action) => {
    state.profiles[state.currentProfile].languages = languageSlice.reducer(state.profiles[state.currentProfile].languages, action);
  });
  builder.addCase(languageSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].languages = languageSlice.reducer(state.profiles[state.currentProfile].languages, action);
  });

  // Reference Slice Actions
  builder.addCase(referenceSlice.actions.addReference, (state, action) => {
    state.profiles[state.currentProfile].references = referenceSlice.reducer(state.profiles[state.currentProfile].references, action);
  });
  builder.addCase(referenceSlice.actions.removeReference, (state, action) => {
    state.profiles[state.currentProfile].references = referenceSlice.reducer(state.profiles[state.currentProfile].references, action);
  });
  builder.addCase(referenceSlice.actions.setReference, (state, action) => {
    state.profiles[state.currentProfile].references = referenceSlice.reducer(state.profiles[state.currentProfile].references, action);
  });
  builder.addCase(referenceSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].references = referenceSlice.reducer(state.profiles[state.currentProfile].references, action);
  });

  // Template Options Actions
  builder.addCase(templateOptionSlice.actions.setOptions, (state, action) => {
    state.profiles[state.currentProfile].options = templateOptionSlice.reducer(state.profiles[state.currentProfile].options, action);
  })
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