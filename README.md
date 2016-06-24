# node-regru
Library to reg.ru API

```javascript
var RegRu = require("./node-regru");

var regru = new RegRu("test","test");

regru.check("test.ru").then(function(res){ });
regru.create("test.ru",data, nss[, org]).then(function(res){ });//org for organisation
//For some domains has special fields
regru.renew("test.ru",1).then(function(res){ });
regru.getPrices("RUR").then(function(res){ });// RUR, USD, UAH, EUR
```
API docs: https://www.reg.ru/support/help/api2
