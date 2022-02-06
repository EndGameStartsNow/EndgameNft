import path from "path";
import fs from "fs";

const basePath = process.cwd();
const buildDir = path.join(basePath, "/build");

const GENERIC_TITLE = "Ethbuild Endgame" 
const GENERIC_DESCRIPTION = "This the nft for the ethbuild endgame team" 

if (!fs.existsSync(path.join(buildDir, "/genericJson"))) {
  fs.mkdirSync(path.join(buildDir, "/genericJson"));
}

fs.readdirSync(`${buildDir}/json`).forEach((file) => {
  if (file === "_metadata.json" || file === "_ipfsMetas.json") return;

  const jsonFile = JSON.parse(fs.readFileSync(`${buildDir}/json/${file}`));

  jsonFile.name = `${GENERIC_TITLE} #${jsonFile.custom_fields.edition}`;
  jsonFile.description = GENERIC_DESCRIPTION;
  delete jsonFile.attributes;
  delete jsonFile.custom_fields.dna;

  fs.writeFileSync(
    `${buildDir}/genericJson/${file}`,
    JSON.stringify(jsonFile, null, 2)
  );

  console.log(`${file} copied and updated!`);
});