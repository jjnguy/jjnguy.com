
const baseUrl = 'https://content.tegrity.one';

function getData(url) {
  return fetch(
    `${baseUrl}${url}`,
    {
      headers: {
        "x-api-key": "{tegrity_content_api_key}",
      },
    }
  )
}

export { getData };