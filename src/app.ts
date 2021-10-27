import deps from "./deps";

const depsInstances: { [index: string]: any } = {};

function app(dep: string) {
  if (!depsInstances[dep]) {
    throw new Error(`Unregistered dep ${dep}`);
  }
  return depsInstances[dep];
}

for (const dep in deps) {
  depsInstances[dep] = deps[dep](app);
  if (depsInstances[dep].run) {
    depsInstances[dep].run();
  }
}

export default app;
