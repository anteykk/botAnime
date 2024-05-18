const TelegramApi = require('node-telegram-bot-api');
// Здесь мы храним наш token
let Token = require(`./config`);
// Клавиатура жанров
let keyboard = require(`./keyboard`);
let mongoose = require(`mongoose`);
let keys = require(`./keys`);
let Anime = require(`./modules/title`);
let express = require(`express`);
let app = express();

let bot = new TelegramApi(Token.token, {polling: true})

// Когда мы пишем `/` то слева у нас появляеться меню с доступными командами от сюда.
bot.setMyCommands([
  {command: `/start`, description: `Запустить бота`},
])



let basaAnime = [
  {

      src: [
        `https://images.hdqwalls.com/download/kakashi-4k-tb-3840x2160.jpg`,
        `https://images.hdqwalls.com/download/sasuke-death-of-parents-4k-nn-3840x2160.jpg`,
        `https://images.hdqwalls.com/wallpapers/bthumb/sakura-haruno-from-naruto-4k-oa.jpg`,
        `https://images.hdqwalls.com/download/sakura-haruno-from-naruto-4k-oa-3840x2160.jpg`,
        `https://images.hdqwalls.com/download/naruto-anbu-anime-4k-nr-3840x2160.jpg`,
        `https://images.hdqwalls.com/download/ino-yamanaka-4k-fv-3840x2160.jpg`,
        `https://images.hdqwalls.com/download/anbu-mask-naruto-4k-je-3840x2160.jpg`,
        `https://images.hdqwalls.com/download/anime-naruto-minimalism-j9-3840x2160.jpg`,
        `https://images.hdqwalls.com/download/uchiha-sasuke-naruto-ix-3840x2160.jpg`
      ],
      name: `Наруто` 
    
  },
  {

      src: [
        `https://images.hdqwalls.com/download/boruto-anime-4k-qp-3840x2160.jpg`,
        `https://images.hdqwalls.com/download/naruto-rasengan-0y-3840x2160.jpg`,
        `https://celes.club/uploads/posts/2022-05/1652351118_1-celes-club-p-boruto-uzumaki-art-krasivo-1.jpg`,
        `https://ixbt.online/live/images/original/16/95/46/2022/09/26/bd002bbed3.jpg`,
        `https://img3.akspic.ru/attachments/crops/5/8/0/6/2/126085/126085-animaciya-multfilm-minato_namikaze-saske_uchiha-klan_uchiha-1920x1080.jpg`,
        `https://static.wikia.nocookie.net/naruto/images/b/b8/Himawari_saves_Shukaku.png/revision/latest?cb=20200420123319&path-prefix=ru`,
        `https://static.wikia.nocookie.net/naruto/images/5/5c/Mitsuki.png/revision/latest?cb=20180830180405&path-prefix=ru`,
        `https://static.wikia.nocookie.net/naruto/images/2/26/Konohamaru_Part_III.png/revision/latest?cb=20201016123236&path-prefix=ru`,
        `https://static.wikia.nocookie.net/naruto/images/b/bd/Sasuke_Part_3.jpg/revision/latest?cb=20210404192327&path-prefix=ru`
      ],
      name: `Боруто`
    
  },
  {
    src: [
      `https://static.wikia.nocookie.net/bleachpedia/images/a/ae/Ep113IchigoKurosaki.png/revision/latest?cb=20171102172807&path-prefix=ru`,
      `https://static.wikia.nocookie.net/character-power/images/2/2b/%D0%AF%D1%85%D0%B2%D0%B51.jpg/revision/latest?cb=20171008144417&path-prefix=ru`,
      `https://upload.wikimedia.org/wikipedia/ru/f/fd/Kuchiki_Rukia.jpg`,
      `http://pm1.narvii.com/7475/ee3d2c725d21a0b64442b705922ab7de03c20942r1-720-1280v2_uhq.jpg`,
      `https://static.wikia.nocookie.net/anime-crossover-characters-fight/images/6/69/Kenpachi_%281%29.png/revision/latest/scale-to-width-down/708?cb=20170320143327&path-prefix=ru`,
      `https://static.wikia.nocookie.net/bleachpedia/images/1/16/Ep329UraharaProfileOption4.png/revision/latest?cb=20131028221828&path-prefix=ru`,
      `https://slovnet.ru/wp-content/uploads/2019/02/1-21.jpg`,
      `https://static.wikia.nocookie.net/bleachpedia/images/4/4d/Ep158SadoProfile.png/revision/latest?cb=20190117104613&path-prefix=ru`,
      `https://static.wikia.nocookie.net/bleachpedia/images/f/f7/267Ulquiorra_profile.png/revision/latest?cb=20180127223623&path-prefix=ru`,
      `https://static.wikia.nocookie.net/bleachpedia/images/1/16/Episode_344_Uryu_Option_3.png/revision/latest?cb=20120410210731&path-prefix=ru`,
      `https://static.wikia.nocookie.net/bleachpedia/images/5/5a/Ep264GinProfile.png/revision/latest?cb=20181119085252&path-prefix=ru`,
      `https://static.wikia.nocookie.net/bleachpedia/images/a/a9/Ep75MayuriProfile.png/revision/latest?cb=20220223160016&path-prefix=ru`,
      `https://static.wikia.nocookie.net/bleachpedia/images/d/d4/E320_Renji_Mugshot.png/revision/latest?cb=20121006222737&path-prefix=ru`
    ],
    name: `Блич`
  },
  {
    src: [
      `https://i.ytimg.com/vi/2VfvvfCUmYk/maxresdefault.jpg`,
      `https://static.wikia.nocookie.net/character-power/images/c/cd/%D0%A0%D0%BE%D1%80%D0%BE%D0%BD%D0%BE%D0%B0_%D0%97%D0%BE%D1%80%D0%BE1.jpg/revision/latest?cb=20140224113150&path-prefix=ru`,
      `https://pm1.narvii.com/6582/72dfb0ce499c1e6839585d50a10c7964a6693c4f_hq.jpg`,
      `http://pm1.narvii.com/6817/9a75b21beb2a81480075602e5811b0f0d754e667v2_00.jpg`,
      `https://static.wikia.nocookie.net/onepiece/images/6/66/Shanks_Anime_Infobox.png/revision/latest?cb=20210928072950&path-prefix=ru`,
      `https://static.wikia.nocookie.net/onepiece/images/6/6a/Anime_Sanji_Post_Timeskip_Infobox.png/revision/latest?cb=20170731055027&path-prefix=ru`,
      `http://pm1.narvii.com/6403/7619fecd18840da71dd3564057d226d04a80e994_00.jpg`,
      `https://static.wikia.nocookie.net/onepiece/images/4/4f/Portgas_D._Ace_Anime_Infobox.png/revision/latest?cb=20130511215742&path-prefix=ru`,
      `https://static.wikia.nocookie.net/onepiece/images/8/8a/Kuro_Kabuto_Infobox.png/revision/latest?cb=20141021201956&path-prefix=ru`,
      `https://slovnet.ru/wp-content/uploads/2019/01/1-49.jpg`,
      `https://static.wikia.nocookie.net/onepiece/images/8/8c/Franky_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20140824155400&path-prefix=ru`,
      `https://cdn.wallpapersafari.com/46/20/OpthzY.jpg`

    ],
    name: `ВанПис`
  },
  {
    src: [
      `https://citaty.info/files/portraits/screenshot_10.jpg`,
      `http://pm1.narvii.com/6919/be3502fb3e3f37206ef7313b79d291daede1cc80r1-1024-867v2_uhq.jpg`,
      `https://citaty.info/files/portraits/screenshot_9_0.jpg`,
      `https://static.wikia.nocookie.net/blackclover/images/2/2a/Noelle_arrogance-0.png/revision/latest?cb=20171129130954&path-prefix=ru`,
      `https://abrakadabra.fun/uploads/posts/2022-02/1643729860_19-abrakadabra-fun-p-fanfiki-s-nozel-silver-37.jpg`,
      `http://pm1.narvii.com/7148/cd51200b330a20e015b8ad230041effe19700641r1-470-529v2_uhq.jpg`,
      `https://citaty.info/files/quote-pictures/574964-chernyi-klever-black-clover_0.jpg`,
      `https://i.pinimg.com/originals/5c/47/3c/5c473c63fbe8705817ad6e3e87aed3f2.jpg`,
      `https://i.pinimg.com/736x/b3/17/c9/b317c9bc45ffbc1e3f0425ea6f9368c5.jpg`
    ],
    name: `Черный клевер`
  },
  {
    src: [
      `https://i.pinimg.com/564x/ba/15/eb/ba15eb2ae47a332282e253e22ea3119c.jpg`,
      `https://static.wikia.nocookie.net/character-power/images/4/45/%D0%9A%D0%B8%D1%80%D0%B8%D1%88%D0%B8%D0%BC%D0%B0_%D0%A2%D0%BE%D1%83%D0%BA%D0%B01.jpg/revision/latest?cb=20170802164455&path-prefix=ru`,
      `http://pm1.narvii.com/6911/b29f3767365c72cb218b178695bc8c26538d0ce5r1-540-960v2_uhq.jpg`,
      `https://1tb.favim.com/preview/7/720/7205/72053/7205389.png`,
      `https://pm1.narvii.com/6536/764a37d8f303927ec1ef25f7b93b017613958d97_hq.jpg`,
      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxRR49alJy5FXh2wpcqNKqogZbmZCVBOg3UA&usqp=CAU`,
      `http://pm1.narvii.com/7001/1aa432090f8c0639fd16e57446ccc52586e8edbcr1-1920-1080v2_uhq.jpg`,
      `http://pm1.narvii.com/6553/9177207b78396eea1bb615fd124587088dbbbaea_00.jpg`,
      `http://pm1.narvii.com/7296/fff8f7743b43636d1b99c495f7b8046483d4369br1-370-370v2_00.jpg`,
      `https://citaty.info/files/quote-pictures/543888-tokiiskii-gul/tokiiskii-monstr-tokyo-ghoul_0.png`,
      `https://static.wikia.nocookie.net/tokyoghoul/images/0/0f/Chie_Hori_Pinto.png/revision/latest?cb=20151228214945&path-prefix=ru`,
      `http://pm1.narvii.com/6645/1c6eee5b2aac5e58e198b193cb7912167addfd07_00.jpg`,
      `https://static.wikia.nocookie.net/character-power/images/8/8f/%D0%A8%D0%B8%D0%BD%D0%BE%D1%85%D0%B0%D1%80%D0%B0_%D0%AE%D0%BA%D0%B8%D0%BD%D0%BE%D1%80%D0%B81.png/revision/latest?cb=20170813083407&path-prefix=ru`,
      `https://s8.favim.com/orig/150517/tokyo-kushu-suzuya-juuzou-shinohara-yukinori-crime-scene-tape-Favim.com-2738945.jpg`,
      `https://static.wikia.nocookie.net/tokyoghoul/images/a/a6/Kuroiwa.png/revision/latest?cb=20141222061847&path-prefix=ru`,
      `https://static.wikia.nocookie.net/tokyoghoul/images/4/4c/Koma1.png/revision/latest?cb=20141228140610&path-prefix=ru`
    ],
    name: `Токийский гуль`
  },
  {
    src: [
      `https://slovnet.ru/wp-content/uploads/2019/04/1-127.jpg`,
      `https://static.wikia.nocookie.net/onepunchman/images/8/84/Genos_Anime_portrait.png/revision/latest?cb=20201113123909&path-prefix=ru`,
      `https://img.wtftime.ru/store/2020/02/26/6f7kcf5M_amp_big_s.jpg`,
      `https://nyaa.shikimori.one/system/screenshots/original/985c970e7d5968e76e967e17319d4b0e2114301e.png?1554832437`,
      `https://media.kg-portal.ru/anime/o/onepunchman2/trailers/35227t.jpg`,
      `https://i.pinimg.com/564x/7e/e4/0f/7ee40f1555c0749b978c43e1755d18e8.jpg`,
      `https://kawai.shikimori.one/system/screenshots/original/1f7b9bc259eda19d08ee3f7fa807464676b37bed.jpg?1444048971`,
      `https://static.wikia.nocookie.net/onepunchman/images/c/c3/%D0%98%D0%B0%D0%B9%D1%80%D0%BE%D0%BD%2C_%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5.png/revision/latest/scale-to-width-down/1200?cb=20210710132233&path-prefix=ru`,
      `https://static.animedia.pro/screens/1556651907eb522ed9e87c353287a72ef81c91747091adc36a.jpg`,
      `https://anime-fans.ru/wp-content/uploads/2021/02/5-silnei-shih-zlodeev-Vanpanchmena-4.jpg`,
      `https://static.wikia.nocookie.net/onepunch/images/c/cb/%D0%92%D0%B0%D0%BD%D0%BF%D0%B0%D0%BD%D1%87%D0%BC%D0%B5%D0%BD_%D0%93%D0%BE%D0%BC%D0%BE-%D0%93%D0%BE%D0%BC%D0%BE_%D0%97%D0%B5%D0%BA.jpg/revision/latest?cb=20160809065525&path-prefix=ru`,
      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CRHtje03QjawAClbgngx_XMfKpdmstYcg8FLo7JuDpV9inGLvgPxNY1tFErsPzRk_S8&usqp=CAU`,
      `https://pm1.narvii.com/7262/d9519b1b3ee675bc1449cefb8c2c4997c8c75e68r1-2048-1152v2_hq.jpg`
    ],
    name: `Ванпачмен`
  },
  {
    src: [
      `https://static.wikia.nocookie.net/zlodei/images/f/f6/788494647.jpg/revision/latest?cb=20151011154509&path-prefix=ru`,
      `https://wikiwarriors.org/mediawiki/images/8/88/Misa-Amane-Free-PNG.jpg`,
      `https://wikiwarriors.org/mediawiki/images/c/c6/1611233625_1.jpg`,
      `https://wikiwarriors.org/mediawiki/images/b/b9/Dce69c96ab3f.jpg`,
      `https://static.wikia.nocookie.net/deathnote/images/2/2b/C8b0b7deb93c78b37d11a22a6333813a.jpg/revision/latest?cb=20201228144143&path-prefix=ru`,
      `https://static.wikia.nocookie.net/deathnote/images/4/43/1319014_death_note.jpeg/revision/latest?cb=20160217092713&path-prefix=ru`,
      `https://static.wikia.nocookie.net/zlodei/images/b/b0/%D0%9C%D0%B8%D0%BA%D0%B0%D0%BC%D0%B8.png/revision/latest?cb=20210819230629&path-prefix=ru`,
      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDv8ZlvTZmD5uEQG-IgMH3_837G2o0KNX5Ow&usqp=CAU`,
      `https://static.wikia.nocookie.net/deathnote/images/b/be/X_267efc2c.jpg/revision/latest?cb=20160329235301&path-prefix=ru`
    ],
    name: `Тетрадь смерти`
  },
  {
    src: [
      `https://i.ytimg.com/vi/NrAuNoNWPF4/maxresdefault.jpg`,
      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-Y9VAOyAXu84ZAuKPRcJjv7hWlPq-DjliA&usqp=CAU`,
      `http://pm1.narvii.com/6564/caadfa37ee85b6b1980f15a22ac539252e28838e_00.jpg`,
      `https://static.wikia.nocookie.net/overlordanime/images/1/16/Sebas_Profile.png/revision/latest?cb=20150925195702&path-prefix=ruhttps://static.wikia.nocookie.net/overlordanime/images/1/16/Sebas_Profile.png/revision/latest?cb=20150925195702&path-prefix=ru`,
      `https://cdn.gamestatic.net/files/editor_uploads/Rins/gta/%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%D0%9F%D0%B0%D0%BF%D0%BA%D0%B0%2084/%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%D0%9F%D0%B0%D0%BF%D0%BA%D0%B0/albe.jpg`,
      `http://pm1.narvii.com/6860/da00ef8567661c50417736b5d6985632d8290248r1-723-1024v2_uhq.jpg`,
      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ujZJANsMMjGVEeI07BplqN6AaD-8rwrlRA&usqp=CAU`,
      `https://gamerwall.pro/uploads/posts/2022-05/1652837635_1-gamerwall-pro-p-demon-demiurg-overlord-oboi-krasivo-1.jpg`,
      `https://dere.shikimori.one/system/screenshots/original/22a270ccea6af74475feda8d82e58b78c340f556.jpg?1664819714`,
      `https://pm1.narvii.com/6803/d358c018cb673b7a8effbcd53cda1baab0a8196ev2_hq.jpg`,
      `https://static.wikia.nocookie.net/overlordanime/images/8/80/PA_Profile.png/revision/latest?cb=20151126224425&path-prefix=ru`
    ],
    name: `Overlord`
  }
]



let start = async ()=>{

  await mongoose.connect(keys.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log(`База данных успешно подключена`);
  })

/*
  for(let elem of basaAnime){
    await new Anime(elem)
    .save()
    .then((s)=>{
      console.log(s);
    })
  }
*/  

 





  //! Прослушивание сообщений
  bot.on(`message`, async(msg)=>{
    let chatId = msg.from.id;

    let check = await Anime.findOne({name: msg.text})

    // Проверка на существования тайтла
    if(check){
      try {
        await bot.sendPhoto(chatId, randTitle(check));  
      } catch (error) {
        await bot.sendMessage(chatId, `❌ Чтото пошло не так, попробуйте снова ❌`)
      } 
    } else if(msg.text !== `/start`) {
      await bot.sendMessage(chatId, `Я не понимаю что вы написали`)
    }
    
    
  })

  //! Подключения к чату
  bot.onText(/\/start/, async(msg)=>{
    let userId = msg.from.id;

    let textHTML = `
    <b>🥇Добро пожаловать ${msg.from.first_name} в чат</b> \n
Данный бот😈 позволяет выбрать один из девяти популярных аниме тайтлов и в ответ получить картинку рандомно выбранного персонажа этого тайтла. 
    `

    await bot.sendMessage(userId, textHTML, {
      reply_markup: {
        keyboard: keyboard.keyboard
      },      
      parse_mode: `HTML`
    })
  })
}

// Запуск бота
start();


//! Рандомный выбор персонажа
function randTitle (mesiv){
  let rand = Math.floor(Math.random() * mesiv.src.length + 1);
  return mesiv.src[rand];
}


let PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
  console.log(`Дневник запущен`);
})  





