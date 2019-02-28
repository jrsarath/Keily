const Config = {
  website: "https://www.diwamediaworks.com/",
  endpoint: "https://www.diwamediaworks.com/wp-json/wp/v2/",
  domains: {
      default: 'https://www.diwamediaworks.com'
  },
  prefixes: {
      default: '/wp-json/wp/v2'
  },
  debugAPI: true,
  printNetworkRequests: true
}
export const Endpoints = {
  posts: {
    path: 'posts?categories=:categories&per_page=:perPage',
    method: 'GET',
    expiration: 5 * 60 * 1000
  },
  media: {
    path: 'media?media_type=image&per_page=:perPage',
    method: 'GET',
    expiration: 5 * 60 * 1000
  }
}

export default Config;
