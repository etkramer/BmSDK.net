const city = 'https://github.com/Team-BmSDK/BmSDK-AC'
const knight = 'https://github.com/Team-BmSDK/BmSDK-AK'

export const site = {
  name: 'BmSDK',
  tagline: 'Modding SDK for Arkham City/Knight',
  description:
    'BmSDK is a C#-based script hook/modding SDK for Batman: Arkham City and Arkham Knight. Extend the game with custom gameplay and logic using a full C# SDK.',
}

export const links = {
  docs: {
    home: '/docs/',
    firstMod: '/docs/getting-started/first-mod/',
    building: '/docs/contributing/building/',
  },
  city: {
    repo: city,
    releases: `${city}/releases/latest`,
    wiki: `${city}/wiki`,
    firstMod: `${city}/wiki/Creating-your-first-mod`,
    building: `${city}/wiki/Building-BmSDK`,
    license: `${city}/blob/master/LICENSE.md`,
  },
  knight: {
    repo: knight,
    releases: `${knight}/releases/latest`,
  },
}
