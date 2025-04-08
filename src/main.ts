#!/usr/bin/env node

import "dotenv/config";
import {
  connectionSettings,
  createInterfaceFile,
  getTablesRegisters,
} from "database-to-typescript-lib";
import { getConnectionSettings } from "../connection/connection-settings";
import { table } from "database-to-typescript-lib/bin/_interface/table.interface";

//read the connection settings from a json file

let settings: connectionSettings;

async function readSettings() {
  //validate if the file exists
  settings = await getConnectionSettings();
}

async function run() {
  await readSettings();
  const tables: table[] = await getTablesRegisters(settings);
  await createInterfaceFile(tables, settings.options);

  console.log("file created, Done 🎉");
  process.exit(0);
}

run();
