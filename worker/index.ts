import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS?: {
    fetch(request: Request): Promise<Response> | Response;
  };
}

interface WorkerExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException?(): void;
}

export default {
  fetch(request: Request, env: Env, ctx: WorkerExecutionContext) {
    return handler.fetch(request, env, ctx);
  },
};
