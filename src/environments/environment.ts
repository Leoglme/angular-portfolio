// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {any} from 'codelyzer/util/function';

export const environment = {
  production: false,
  skillsApi: 'https://dibodev-api.herokuapp.com/categories',
  projectsApi: 'https://dibodev-api.herokuapp.com/projects',
  postConnect: 'https://dibodev-api.herokuapp.com/auth/connexion',
  projectDetailsApi : 'https://dibodev-api.herokuapp.com/project/',
  categoriesObject: {},
  mail: 'contact@dibodev.com',
  urlApp: 'http://localhost:4200',
  githubUrl: 'https://github.com/Leoglme',
  linkedinUrl: 'https://www.linkedin.com/in/dibodev/',
  discordUrl: 'https://discordapp.com/users/466757841001250818',
  sendMailAPI: 'https://dibodev-api.herokuapp.com/sendmail',
  addCategoryAPi: 'http://localhost:9000/categories/add'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
