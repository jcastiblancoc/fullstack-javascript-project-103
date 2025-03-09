import fs from "fs";
import path from "path";
import yaml from "js-yaml";


const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, "utf8");

  if (filepath.endsWith(".json")) {
    return JSON.parse(fileContent);
  }
  if (filepath.endsWith(".yml") || filepath.endsWith(".yaml")) {
    return yaml.load(fileContent);
  }
  throw new Error(`Unsupported file format: ${filepath}`);
};

export default parse;
