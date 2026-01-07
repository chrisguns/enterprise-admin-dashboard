import { TextDecoder, TextEncoder } from "util";

// Polyfill for Jest/Node where TextEncoder isn't available globally
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  // @ts-expect-error - assigning to global for test env
  global.TextDecoder = TextDecoder;
}

import "@testing-library/jest-dom";