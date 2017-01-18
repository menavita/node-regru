# node-regru
Library to reg.ru API(https://www.reg.ru/support/help/api2)

##Usage

```javascript
var RegRu = require("./node-regru");

var regru = new RegRu("test","test");

regru.check("test.ru").then(function(res){ });
regru.create("test.ru",data, nss[, org]).then(function(res){ });//org for organisation
//For some domains has special fields (check data samples)
regru.renew("test.ru",1).then(function(res){ });
regru.getPrices("RUR").then(function(res){ });// RUR, USD, UAH, EUR
```

##Domains for registration

###1 group

'.ru', '.su', '.рф'

###2 group

'.ru.net', '.com.ru', '.exnet.su'

###3 group

'.com', '.net', '.org', '.biz', '.name', '.info', '.mobi', '.uk', '.cc', 
'.tv', '.ws', '.bz', '.me', '.us', '.pro', '.lv', '.ro', '.site', 
'.rest','.academy', '.accountant', '.accountants', '.actor', 
'.adult', '.aero', '.agency', '.airforce', '.apartments', '.associates', 
'.attorney', '.auction', '.audio', '.auto', '.band', '.bar', '.bargains', 
'.beer', '.best', '.bet', '.bid', '.bike', '.bingo', '.black', '.blackfriday', 
'.blog', '.blue','.boutique', '.broker', '.build', '.builders', '.business', 
'.buzz', '.bzh', '.cab', '.cafe', '.cam', '.camera', '.camp', '.capital', 
'.car', '.cards', '.care', '.career', '.careers', '.cars', '.casa', '.cash', 
'.casino', '.cat', '.catering','.center', '.chat', '.cheap', '.christmas', 
'.church', '.city', '.claims', '.cleaning', '.click', '.clinic','.clothing', 
'.cloud', '.club', '.coach', '.codes', '.coffee', '.college', '.community', 
'.company', '.computer','.condos', '.construction', '.consulting', '.contractors', 
'.cooking', '.cool', '.country', '.coupons', '.courses','.credit', '.creditcard', 
'.cricket', '.cruises', '.dance', '.date', '.dating', '.deals', '.degree', 
'.delivery', '.democrat','.dental', '.dentist', '.desi', '.design', '.diamonds', 
'.diet', '.digital', '.direct', '.directory', '.discount', '.dog', '.domains', 
'.download','.earth', '.education', '.email', '.energy', '.engineer', 
'.engineering', '.enterprises', '.equipment', '.estate', '.eus', '.events', 
'.exchange','.exnet.su', '.expert', '.exposed', '.express', '.fail', '.faith', 
'.family', '.fans', '.farm', '.fashion', '.feedback', '.film', '.finance', 
'.financial', '.fish', '.fishing', '.fit', '.fitness', '.flights', '.florist', 
'.flowers', '.fm', '.football', '.forex', '.forsale','.foundation', '.frl', 
'.fund', '.furniture', '.futbol', '.fyi', '.gallery', '.game', '.games', 
'.garden', '.gent', '.gift', '.gifts', '.gives','.glass', '.global', '.gmbh', 
'.gold', '.golf', '.graphics', '.gratis', '.green', '.gripe', '.group', 
'.guide', '.guitars', '.guru','.haus', '.healthcare', '.help', '.hiphop', 
'.hiv', '.hockey', '.holdings', '.holiday', '.horse', '.host', '.hosting', 
'.house', '.how','.immo', '.immobilien', '.industries', '.ink', '.institute', 
'.insure', '.international', '.investments', '.jetzt', '.jewelery', '.jobs', 
'.juegos','.kaufen', '.kim', '.kitchen', '.kiwi', '.land', '.lawyer', 
'.lease', '.legal', '.lgbt', '.life','.lighting', '.limited', '.limo', 
'.link', '.live', '.loan','.loans', '.lol', '.love', '.ltd', '.ltda', 
'.luxury', '.maison', '.management', '.market', '.marketing', '.markets', 
'.mba', '.media', '.memorial', '.men', '.menu', '.mobi', '.moda','.moe', 
'.mom', '.money', '.movie', '.network', '.ninja', '.one', '.onl', '.online', 
'.ooo', '.partners', '.parts', '.party', '.pet', '.photo', '.photography', 
'.photos', '.physio', '.pics','.pictures', '.pink', '.pizza', '.place', 
'.plumbing', '.plus', '.poker', '.porn', '.press', '.pro', '.productions', 
'.promo', '.properties', '.property', '.protection', '.pub','.qpon', 
'.radio.am', '.radio.fm', '.racing', '.recipes', '.red', '.rehab', '.reisen', 
'.rent', '.rentals', '.repair', '.report', '.rest', '.restaurant', '.reviews', 
'.rip','.rocks', '.rodeo', '.run', '.sale', '.salon', '.sarl', '.school', 
'.schule', '.science', '.security', '.services', '.sex', '.sexy', '.shiksha', 
'.shoes', '.shop', '.shopping', '.show', '.singles', '.site', '.ski', '.soccer', 
'.social', '.software', '.solar', '.solutions', '.soy', '.space', '.store', 
'.stream', '.studio', '.study', '.sucks', '.supplies', '.supply', '.support', 
'.surf', '.surgery', '.systems', '.tattoo', '.tax', '.taxi', '.team', '.tech', 
'.technology', '.tel', '.tennis', '.theater', '.theatre', '.tienda', '.tips', 
'.tires', '.today', '.tools', '.top', '.tours', '.town', '.toys', '.trade', 
'.trading', '.training', '.travel', '.tube', '.tv', '.university', '.uno', 
'.vacations', '.ventures', '.vet', '.viajes', '.video', '.villas', '.vin', 
'.vip', '.vision', '.vodka', '.vote', '.voto', '.voyage', '.wang', '.watch', 
'.webcam', '.website', '.wedding', '.whoswho', '.wiki', '.win', '.wine', 
'.work', '.works', '.world', '.wtf', '.xxx', '.xyz', '.yoga', '.zone'

###Premium domains
**We can't register premium domains**
'.actor', '.airforce', '.band', '.bike', '.build', '.cam', 
'.career', '.casa', '.center', '.click', '.clinic', '.cloud', 
'.club', '.codes', '.consulting', '.country', '.courses', 
'.dance', '.degree', '.dentist', '.diamonds', '.digital', 
'.directory', '.email', '.engineer', '.equipment', '.exchange', 
'.expert','.family','.fashion','.film','.fishing','.fit',
'.forsale','.fui','.game','.garden','.glass','.gratis',
'.gripe','.horse','.jewelery','.life','.limited','.live',
'.love','.ltda','.management','.market','.network',
'.ninja','.one','.photos','.productions','.rehab','.report'
,'.reviews','.rip','.zone','.work','.whoswho','.wedding',
'.vodka','.video','.vet','.training','.tips','.technology',
'.surf','.support','.supplies','.study','.studio','.solutions',
'.software','.social','.ski','.sale','.rodeo'

##Data samples
###For 1 group
```json
"sms_security_number": "+7 927 1234567",
"p_addr": "101000, Москва, ул.Пупкина, 1, стр. 2, отдел мебели,офис 433 (для В. Лоханкина)",
"phone": "+7 495 1234567",
"e_mail": "test@gmail.com",
"person": "Vassily N Pupkin",
"person_r": "Пупкин Василий Николаевич",
"passport": "34 02 651241 выдан 123 отделением милиции г.Москвы 30.01.2011",
"birth_date": "07.11.1917",
"country": "RU"
```

###For 2 group
```json
"o_first_name": "Ivan",
"o_first_name_ru": "Иван",
"o_last_name": "Ivanov",
"o_last_name_ru": "Иванов",
"o_patronimic": "Ivanovich",
"o_patronimic_ru": "Иванович",
"o_city": "Moscow",
"o_city_ru": "г. Москва",
"o_addr": "Koshkina str, 15-4",
"o_addr_ru": "ул. Кошкина, д.15, кв.4",
"o_state": "Moscow",
"o_state_ru": "Московская обл.",
"o_phone": "+7 495 1234567",
"o_email": "test@gmail.com",
"o_postcode": "119002",
"o_country_code": "RU",
"o_birth_date": "30.01.1992",
"o_passport_date": "30.01.2011",
"o_passport_number": "34 02 651241",
"o_passport_place": "выдан 123 отделением милиции г.Москвы"
```

###For 3 group
```json
"o_company": "Private Person",
"o_first_name": "Ivan",
"o_first_name_ru": "Иван",
"o_last_name": "Ivanov",
"o_last_name_ru": "Иванов",
"o_patronimic": "Ivanovich",
"o_patronimic_ru": "Иванович",
"o_city": "Moscow",
"o_city_ru": "г. Москва",
"o_addr": "Koshkina str, 15-4",
"o_addr_ru": "ул. Кошкина, д.15, кв.4",
"o_state": "Moscow",
"o_state_ru": "Московская обл.",
"o_phone": "+7 495 1234567",
"o_email": "test@gmail.com",
"o_postcode": "119002",
"o_country_code": "RU",
"o_birth_date": "30.01.1992",
"o_passport_date": "30.01.2011",
"o_passport_number": "34 02 651241",
"o_passport_place": "выдан 123 отделением милиции г.Москвы",
"a_company": "Private Person",
"a_first_name": "Ivan",
"a_last_name": "Ivanov",
"a_email": "test@gmail.com",
"a_phone": "+7 495 1234567",
"a_addr": "Chrome str, 12-26",
"a_city": "Moscow",
"a_state": "Russian Federation",
"a_postcode": "119002",
"a_country_code": "RU",
"t_company": "Private Person",
"t_first_name": "Ivan",
"t_last_name": "Ivanov",
"t_email": "test@gmail.com",
"t_phone": "+7 495 1234567",
"t_addr": "Chrome str, 12-26",
"t_city": "Moscow",
"t_state": "Russian Federation",
"t_postcode": "119002",
"t_country_code": "RU",
"b_company": "Private Person",
"b_first_name": "Ivan",
"b_last_name": "Ivanov",
"b_email": "test@gmail.com",
"b_phone": "+7 495 1234567",
"b_addr": "Chrome str, 12-26",
"b_city": "Moscow",
"b_state": "Russian Federation",
"b_postcode": "119002",
"b_country_code": "RU"
```
##Tests

```bash
npm run test-check
npm run test-create
npm run test-getprices
npm run test-renew
```
or
```bash
npm test
```