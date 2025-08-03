const consts = {
  debug: false,
  getFrontendUrl() {
    return this.debug
      ? 'http://localhost:3000'
      : 'https://my-reader-journey.onrender.com';
  },
  getBackendUrl() {
    return this.debug
      ? 'http://localhost:3030'
      : 'https://my-reader-journey-backend-1.onrender.com';
  },
};

export default consts;
