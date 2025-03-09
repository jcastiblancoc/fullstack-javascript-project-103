import fs from "fs";
import path from "path";
import yaml from "js-yaml";


const parse = (data, filepath) => {
  try {
      return JSON.parse(data);
  } catch (error) {
      console.error(`❌ Error al parsear ${filepath}:`, error.message);
      process.exit(1);
  }
};

export default parse;
