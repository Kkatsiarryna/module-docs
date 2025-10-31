declare global {
  interface Window {
    __ENV__: {
      [key: string]: any
    }
  }
}

export {}
