const BASE_URL = process.env.NODE_ENV === "production" ? "/weibo/" : "/";
module.exports = {
  publicPath: BASE_URL,
}