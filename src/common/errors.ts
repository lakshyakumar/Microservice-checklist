class Errors {
  static readonly MONGO_URL_NOT_DEFINED = { message: 'MONGO_URL is not defined in .env file', status: 500 };
}

export default Errors;
