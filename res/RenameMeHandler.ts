import { IWoxQueryHandler, JsonRPCAction, Logger, Result, ResultItem } from "wox-ts"
import * as fs from "fs"

export interface RenameMeHandlerDeps {
  logger: Logger
}

const METHOD_FAKE = "FAKE"
const METHOD_INVALID = "INVALID"
const COMMAND_CONFIGURE = "configure"

export class RenameMeHandler implements IWoxQueryHandler {
  constructor(private deps: RenameMeHandlerDeps) { }



  private getFakeAction(command: string): ResultItem {
    const logEntryResult =
    {
      Title: "Save log",
      Subtitle: command,
      IcoPath: "img/logo.jpg",
      JsonRPCAction: {
        method: METHOD_FAKE,
        parameters: [command]
      }
    }
    return logEntryResult
  }

  private processFake(command: string) {

  }

  async processAsync(rpcAction: JsonRPCAction): Promise<Result> {
    let commands = []
    if (rpcAction.method === METHOD_FAKE) {
      this.processFake(rpcAction.parameters[0])
    } else if (rpcAction.method !== METHOD_INVALID) {
      if (rpcAction.parameters[0].startsWith(COMMAND_CONFIGURE)) {
        commands.push(this.getFakeAction(rpcAction.parameters[0]))
      }
    }
    return {
      result: commands
    }
  }
}