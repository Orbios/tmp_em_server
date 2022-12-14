import * as hbs from 'handlebars';
import * as fs from 'fs-extra';

export default {
  renderTemplate
};

let templatesCache = {};

async function renderTemplate(templatePath: string, data) {
  if (!templatesCache[templatePath]) {
    let source = await readFile(templatePath);

    templatesCache[templatePath] = hbs.compile(source);
  }

  let template = templatesCache[templatePath];

  return template(data);
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err);

      return resolve(data);
    });
  });
}
