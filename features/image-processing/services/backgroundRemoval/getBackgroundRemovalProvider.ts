import type { BackgroundRemovalProvider } from "./BackgroundRemovalProvider";
import { mockBackgroundRemovalProvider } from "./mockBackgroundRemovalProvider";

// Single point of configuration — swapping to a real provider means
// changing only this function, not the rest of the application.
export function getBackgroundRemovalProvider(): BackgroundRemovalProvider {
  return mockBackgroundRemovalProvider;
}
