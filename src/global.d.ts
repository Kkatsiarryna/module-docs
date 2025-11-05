declare global {
  interface Window {
    __ENV__: {
      // [key: string]: any,
      BASE_URL: "${BASE_URL}"
    }
  }
}

export {}
