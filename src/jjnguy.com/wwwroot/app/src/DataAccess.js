
const baseUrl = 'https://tegrity-content.azurewebsites.net';

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