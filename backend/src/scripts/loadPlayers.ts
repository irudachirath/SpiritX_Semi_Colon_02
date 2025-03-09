import "reflect-metadata";
import { createConnection } from "typeorm";
import { importCsvData } from "../utils/importCsv";

async function main() {
  const connection = await createConnection();
  await importCsvData("data/sample_data.csv");
  await connection.close();
}

main().catch((err) => console.error(err));
