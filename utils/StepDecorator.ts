import { test } from '@playwright/test'

export function step(stepName) {
  return function step(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any[]) {
      const name = this.constructor.name + '.' + (context.name as string);
      return test.step(stepName || name, async () => {
        return await target.call(this, ...args);
      });
    };
  }
}