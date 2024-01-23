const fs = require('node:fs');
const path = require('node:path');
const { copyDir } = require('../04-copy-directory/index');
const { mergeStyles } = require('../05-merge-styles/index');

const prDistPath = path.join(path.basename(__dirname), 'project-dist');
const prDistHTMLPath = path.join(
  path.basename(__dirname),
  'project-dist',
  'index.html',
);
fs.promises.mkdir(prDistPath, { recursive: true });

async function getTemplate() {
  const templatePath = path.join(path.basename(__dirname), 'template.html');

  const template = await fs.promises
    .readFile(templatePath, 'utf-8')
    .then((data) => {
      return data;
    });

  return template;
}

async function getTemplateNames(template) {
  const regExp = /{{([a-zA-Z]+)}}/g;
  const matches = template.match(regExp);

  const filenames = matches.map((match) => {
    return match.replace('{{', '').replace('}}', '') + '.html';
  });

  return filenames;
}

async function changeTemplate(template, filenames) {
  let newTemplate = template;
  for (const file of filenames) {
    const keyword = path.parse(file).name;
    const filePath = path.join(path.basename(__dirname), 'components', file);

    const fileData = await fs.promises.readFile(filePath, 'utf-8');
    newTemplate = newTemplate.replace(`{{${keyword}}}`, fileData);
  }

  return newTemplate;
}

async function getNewTemplate() {
  const template = await getTemplate();
  const filenames = await getTemplateNames(template);
  const changedTemplate = await changeTemplate(template, filenames);

  fs.promises.writeFile(prDistHTMLPath, changedTemplate);
}

getNewTemplate();

const folderPath = path.basename(__dirname);
mergeStyles(folderPath, 'styles', 'project-dist', 'style.css');

async function copyAssets(from) {
  const folderContents = await fs.promises.readdir(from, 'utf8');
  const assPrDist = path.join(prDistPath, 'assets');
  fs.promises.mkdir(assPrDist, { recursive: true });

  for (const content of folderContents) {
    if (!path.extname(content)) {
      const from = path.join(assetsPath, content);
      const to = path.join(assPrDist, content);

      fs.promises.mkdir(to, { recursive: true });

      copyDir(from, to);
    }
  }
}

const assetsPath = path.join(folderPath, 'assets');
copyAssets(assetsPath);
