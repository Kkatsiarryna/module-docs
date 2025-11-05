declare global {
  interface Window {
    __ENV__: {
      // [key: string]: any,
      BASE_URL: string
    }
  }
}

export {}
