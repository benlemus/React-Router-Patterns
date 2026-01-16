import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const storageMock = {
  store: {},
  getItem(key) {
    return key in this.store ? this.store[key] : null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  clear() {
    this.store = {};
  },
};

beforeEach(() => {
  storageMock.store = {};
  global.localStorage = storageMock;
  vi.spyOn(global.localStorage, "getItem");
  vi.spyOn(global.localStorage, "setItem");
});

afterEach(() => {
  storageMock.clear();
  vi.restoreAllMocks();
  cleanup();
});
