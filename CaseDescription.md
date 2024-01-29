## Functional Requirements:
1. Exchange Rate API
- input: source currency, target currency list
- output: exchange rate list

2. Exchange API:
- input: source amount, source currency, target currency list
- output: amount list in target currencies and transaction id.

3. Exchange List API
- input: transaction id or conversion date range (e.g. start date and end date) i. only one of the inputs shall be provided for each call
- output: list of conversions filtered by the inputs

4. The application shall use a service provider to retrieve exchange rates and optionally
for calculating amounts. (see hints)
5. In the case of an error, a specific code to the error and a meaningful message shall
be provided as response.

## Technical Requirements:
1. Application shall run without need of extra configuration.
2. APIs shall be developed as RESTful APIs using json models with any
programming language which you are comfortable with.
3. Build & dependency management tools shall be used.
4. Sample unit tests shall be provided (100% coverage is NOT required)


## Hints
1. Example service providers for FX rates are listed below (any other one is also acceptable), limitations of service providers (free services) are acceptable (e.g. no real time rates, only one base currency support etc.)
- a. https://currencylayer.com/
- b. http://fixer.io/
2. An in memory database can be used to store data.
