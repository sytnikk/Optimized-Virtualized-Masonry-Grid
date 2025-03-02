import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];
  
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  
  private callback: IntersectionObserverCallback;
  private elements: Element[] = [];
  
  observe(element: Element): void {
    this.elements.push(element);
  }
  
  unobserve(element: Element): void {
    this.elements = this.elements.filter(el => el !== element);
  }
  
  disconnect(): void {
    this.elements = [];
  }
  
  triggerIntersection(entries: IntersectionObserverEntry[]): void {
    this.callback(entries, this as IntersectionObserver);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver;

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
})); 