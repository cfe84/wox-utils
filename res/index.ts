import { Logger, WoxQueryProcessor } from "wox-ts"
import { RenameMeHandler } from "./RenameMeHandler";

const logger = new Logger(true);
const handler = new RenameMeHandler({ logger })
const processor = new WoxQueryProcessor(handler, logger);
processor.processFromCommandLineAsync(process.argv).then(() => { });