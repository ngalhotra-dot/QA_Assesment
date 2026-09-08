**E-Commerce Functional Testing**
| Functional Area | Positive Scenarios              | Negative / Edge Scenarios                                              |
| --------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Registration    | Valid registration              | Existing email, invalid email, weak password, mandatory fields missing |
| Login           | Valid credentials               | Invalid password, invalid username, locked account, empty fields       |
| Product Search  | Search existing product         | No results, special characters, partial search                         |
| Product Details | Correct price/details displayed | Out-of-stock product, missing image                                    
|
| Product Listing | Sorting/filtering works         | Conflicting filters, no products                                       |
| Cart            | Add/remove/update quantity      | Quantity exceeds stock, unavailable product                            |
| Checkout        | Successful checkout             | Missing address, invalid address, payment failure                      |
| Payment         | Successful payment              | Declined card, expired card, duplicate payment                         |
| Orders          | Order created correctly         | Failed order, cancelled order                                          |
| Coupons         | Valid coupon applied            | Expired/invalid coupon, minimum order not met                          
|
| Inventory       | Stock updated after purchase    | Concurrent purchase of last item                                       |
| Logout          | User successfully logged out    | Back button should not expose authenticated pages                      |
| Security        | Authorization enforced          | Access checkout/order pages without login                              |
