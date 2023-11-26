# ................CASE HENÜZ BİTMEDİ................

# Case Özetim

- RestAPI yapacağım, 3 tane endpoint hazırlamam gerekiyor.
- **API-1 (Exchange Rate API)**
  - input olarak 2 parametre veriyoruz.
    - source_currency (mesela TL)
    - target_currency_list (mesela, Dolar, Euro, Gram Altın)
  - output olarak TL'nin target olarak verilen her bir değer için oran isteniyor.
  - Full örnek için
    - Anlık kurun şöyle olduğunu varsayalım
      - 1$ = 28,87₺
      - 1€ = 31,61₺
      - 1GramAltın = 1858₺
    - API'ye toplamda 2 parametre veriyoruz.
      - source_currency=TL
      - target_currency=Dolar,Euro,GramAltın
    - Beklenen API response
    - ```json
      {
        "rates": {
          "Dolar": 28.87,
          "Euro": 31.61,
          "GramAltın": 1858
        }
      }
      ```

```
https://data.fixer.io/api/latest
    ? access_key = API_KEY
    & base = USD
    & symbols = GBP,JPY,EUR
```

- **API-2 (Exchange API)**
  - Birincine benzer, ama extradan 1 input daha var. Source Currency için amount(adet) verilecek.
  - Özet vermek gerekirse, her bir target currency oranını bu amount ile çarpılmış hali olacak.
  - Extradan bir kritik durum daha var. Kullandığınız request size `transaction_id` gibi bir değer dönmeli bu değer, 3. API'de kullanacağız. Buradaki `transaction_id` değerini anlamadım. fixer'in yada currencylayer'ın hiç bir response'unda da buna benzer bir veri yok. Bu değeri benim oluşturmam lazım galiba, DB'de tutacağım
  - Anladığım kadarı ile, geçmiş tarihteki 10$ için kaç TL ödedik sorusuna cevap vermek için kullanacağız bu değeri

```bash
https://data.fixer.io/api/convert
    ? access_key = API_KEY
    & from = GBP
    & to = JPY
    & amount = 25
# RES BODY
{
    "success": true,
    "query": {
        "from": "GBP",
        "to": "JPY",
        "amount": 25
    },
    "info": {
        "timestamp": 1519328414,
        "rate": 148.972231
    },
    "historical": "",
    "date": "2018-02-22",
    "result": 3724.305775
}
```

- **API-3 (Exchange List API)**
  - Bu apiyi anlamadım, target ve source currency değerleri belirsiz. Hadi, birinci option için bu değerleri DB'de tuttuğumu varsayalım. Özellikle ikinci opsiyon için, dünyadaki tüm para birimlerinin, diğer tüm para birimlerine olan oranını mı vereceğim.
  - input olarak, 2 option var.
    - birinci option
      - transaction_id
    - ikinci option
      - start_date
      - end_date

---

## Requirements

### Functional Requirements:

1. Exchange Rate API
   - input: source currency, target currency list
   - output: exchange rate list
2. Exchange API:
   - input: source amount, source currency, target currency list
   - output: amount list in target currencies and transaction id.
3. Exchange List API - input: transaction id or conversion date range (e.g. start date and end
   date) - only one of the inputs shall be provided for each call - output: list of conversions filtered by the inputs
4. The application shall use a service provider to retrieve exchange rates and optionally
   for calculating amounts. (see hints)
5. In the case of an error, a specific code to the error and a meaningful message shall
   be provided as response.

### Technical Requirements:

1. Application shall run without need of extra configuration.
2. APIs shall be developed as RESTful APIs using json models with any
   programming language which you are comfortable with.
3. Build & dependency management tools shall be used.
4. Sample unit tests shall be provided (100% coverage is NOT required)

### Hints

1. Example service providers for FX rates are listed below (any other one is also
   acceptable), limitations of service providers (free services) are acceptable (e.g. no
   real time rates, only one base currency support etc.) - a. https://currencylayer.com/ - b. http://fixer.io/
2. An in memory database can be used to store data.
