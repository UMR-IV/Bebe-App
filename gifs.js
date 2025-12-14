// GIF helper functions for Discord bot responses

const GIFS = {
  happy: [
    'https://tenor.com/view/nanahira-nanahilive-vtuber-%E3%81%AA%E3%81%AA%E3%81%B2%E3%82%89-%E3%81%AA%E3%81%AA%E3%81%B2%E3%82%89%E3%81%84%E3%81%B6-gif-7654078662632045954',
    'https://tenor.com/view/happy-easter-gif-21158905',
    'https://tenor.com/view/onimai-cute-anime-girl-smile-smiling-dancing-dance-trans-transgender-gif-3516690546094625230',
    'https://cdn.discordapp.com/attachments/641538472771059722/1424475833740955709/dfa1d57a72c82c87.gif?ex=691acc40&is=69197ac0&hm=b4c5bd781da78e2585a3d9a2fb82d95a63b2466963f996c90dcbc8f198cdee91&',
    'https://tenor.com/view/elaina-anime-dance-exciting-smile-gif-19196528'
  ],
  sad: [
    'https://cdn.discordapp.com/attachments/1182960034263613440/1370268055468511242/received_1357416828873469.gif?ex=69385952&is=693707d2&hm=07c3a54a79f56338875d52ca8a777c4520c7877a6088d505230cfe4a92ffff63&',
    'https://cdn.discordapp.com/attachments/1182960034263613440/1370268055468511242/received_1357416828873469.gif?ex=69385952&is=693707d2&hm=07c3a54a79f56338875d52ca8a777c4520c7877a6088d505230cfe4a92ffff63&',
    'https://cdn.discordapp.com/attachments/1182960034263613440/1370268055468511242/received_1357416828873469.gif?ex=69385952&is=693707d2&hm=07c3a54a79f56338875d52ca8a777c4520c7877a6088d505230cfe4a92ffff63&',
    'https://cdn.discordapp.com/attachments/1182960034263613440/1370268055468511242/received_1357416828873469.gif?ex=69385952&is=693707d2&hm=07c3a54a79f56338875d52ca8a777c4520c7877a6088d505230cfe4a92ffff63&',
    'https://cdn.discordapp.com/attachments/1182960034263613440/1370268055468511242/received_1357416828873469.gif?ex=69385952&is=693707d2&hm=07c3a54a79f56338875d52ca8a777c4520c7877a6088d505230cfe4a92ffff63&'
  ],
  kiss: [
    'https://tenor.com/view/love-cheek-gif-3364935243901510877',
    'https://tenor.com/view/love-cheek-gif-3364935243901510877',
    'https://tenor.com/view/love-cheek-gif-3364935243901510877',
    'https://tenor.com/view/love-cheek-gif-3364935243901510877',
    'https://tenor.com/view/love-cheek-gif-3364935243901510877'
  ],
  hugpat: [
    'https://tenor.com/view/syno-i-love-you-syno-synowithazero-gif-2023483407273504018',
    'https://tenor.com/view/tsumiki-anime-waifu-miia-neko-gif-27055340',
    'https://tenor.com/view/lean-on-shoulder-cute-yuru-yuri-gif-18331939',
    'https://tenor.com/view/lean-on-shoulder-cute-yuru-yuri-gif-18331939'
  ],
  yandere: [
    'https://tenor.com/view/aiobahn-%E3%81%AA%E3%81%AA%E3%81%B2%E3%82%89-p%E4%B8%B8%E6%A7%98-%E5%A4%A9%E5%A4%A9%E5%A4%A9%E5%9B%BD%E5%9C%B0%E7%8D%84%E5%9B%BD-nanahira-gif-7517346856547190445',
    'https://tenor.com/view/yandere-gif-20934065',
    'https://tenor.com/view/yandere-gif-20934065',
    'https://tenor.com/view/yandere-gif-20934065',
    'https://tenor.com/view/yandere-gif-20934065'
  ],
  smug: [
    'https://tenor.com/view/sistine-gif-8862065168685297656',
    'https://tenor.com/view/sistine-gif-8862065168685297656',
    'https://tenor.com/view/hehe-gif-13235663798838824687',
    'https://tenor.com/view/hehe-gif-13235663798838824687'
  ],
  sleep: [
    'https://tenor.com/view/nekopara-cute-clingy-anime-gif-16080404',
    'https://tenor.com/view/nekopara-cute-clingy-anime-gif-16080404',
    'https://tenor.com/view/nekopara-cute-clingy-anime-gif-16080404',
    'https://tenor.com/view/nekopara-cute-clingy-anime-gif-16080404',
    'https://tenor.com/view/nekopara-cute-clingy-anime-gif-16080404'
  ],
  angry: [
    'https://tenor.com/view/yunyun-syndrome-yunyun-qtie-gif-14454526139942414915',
    'https://tenor.com/view/michele-michelle-lee-strinova-calabiyau-gif-8894011967410227272',
    'https://tenor.com/view/michele-michelle-lee-strinova-calabiyau-gif-8894011967410227272',
    'https://tenor.com/view/michele-michelle-lee-strinova-calabiyau-gif-8894011967410227272',
    'https://tenor.com/view/michele-michelle-lee-strinova-calabiyau-gif-8894011967410227272'
  ]
};

export const getRandomGif = (category) => {
  const categoryGifs = GIFS[category];
  
  if (!categoryGifs || categoryGifs.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * categoryGifs.length);
  return categoryGifs[randomIndex];
};

export const getGifCategories = () => {
  return Object.keys(GIFS);
};