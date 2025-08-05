# 🧪 Test Cases for Sauce Demo

## 🛠️[IN PROGRESS]
This document contains the test scenarios organized by pages of the Sauce Demo website, including pre conditions, detailed steps, expected results, automation status, and tag classification (Smoke, Edge Case, Exploratory...)

---

## 🔐 Login Page

| Description        | Pre-conditions   | Steps                                                                 | Expected Result                                      | Automated | Tag       |
|--------------------|------------------|-----------------------------------------------------------------------|------------------------------------------------------|-----------|-----------|
| Valid Login        | Go to login page | 1. Enter valid username<br>2. Enter valid password<br>3. Click 'Login' button | User is redirected to the Home (Products) page       | Yes       | smoke     |
| Invalid Username   | Go to login page | 1. Enter invalid username<br>2. Enter valid password<br>3. Click 'Login' button | 'Epic sadface: Username and password do not match any user in this service' message is displayed  | Yes       | smoke |
| Invalid Password   | Go to login page | 1. Enter valid username<br>2. Enter invalid password<br>3. Click 'Login' button | 'Epic sadface: Username and password do not match any user in this service' message is displayed  | Yes       | smoke |
| Blank Password     | Go to login page | 1. Enter valid username<br>2. Leave password blank<br>3. Click 'Login' button   | 'Epic sadface: Password is required' message is displayed  | Yes       | regression |
| Blank Username     | Go to login page | 1. Leave username blank<br>2. Enter valid password<br>3. Click 'Login' button  | 'Epic sadface: Username is required' message is displayed  | Yes       | regression |
| Password Masking   | Go to login page | 1. Enter password in password field                                   | Characters are masked with dots or asterisks         | No        | UI       |

---

## 🏠 Home / Products Page

| Description         | Pre-conditions    | Steps                                                           | Expected Result                                      | Automated | Tag         |
|---------------------|-------------------|------------------------------------------------------------------|------------------------------------------------------|-----------|-------------|
| Products Page    | Login to the site | 1. Observe products on Home page                                | 1. Each product shows name, description, prince and image<br> 2. 'Add to Cart' button is displayed | No        | regression |
| Add Item to Cart    | Login to the site | 1. Click on 'Add to cart' button for a product                             | Button changes to 'Remove', cart badge at the top of the page increases     | Yes       | regression  |
| Remove Item         | Login to the site | 1. Click on 'Remove' button for added product                          | Button changes to 'Add to cart', badge at the top of the page decreases     | Yes       | regression  |
| Cart Badge Updates  | Login to the site | 1. Add three products to cart                                   | Cart badge updates and displays '3'                  | Yes       | smoke       |
| Cart Badge Clears    | Login to the site | 1. Remove all products from cart                                | Cart badge disappears                                | Yes       | regression  |
| Filter      | Login to the site | 1. Click on 'Filter' dropdown                                | The default option is  'Select filter 'Name (A to Z)'<br>                | Yes       | regression  |
| Filter A to Z       | Login to the site | 1. Select filter 'Name (A to Z)'                                | Products sorted alphabetically from A to Z                | Yes       | regression  |
| Filter Z to A       | Login to the site | 1. Select filter 'Name (Z to A)'                                | Products sorted alphabetically from Z to A                | Yes       | regression  |
| Price Low to High   | Login to the site | 1. Select filter 'Price (low to high)'                          | Products sorted by increasing price                  | Yes       | regression  |
| Price High to Low   | Login to the site | 1. Select filter 'Price (high to low)'                          | Products sorted by decreasing price                  | Yes       | regression  |

---

## ☰ Menu

| Description         | Pre-conditions    | Steps                                                        | Expected Result                                 | Automated | Tag         |
|---------------------|-------------------|---------------------------------------------------------------|-------------------------------------------------|-----------|-------------|
| Open Menu           | Login to the site | 1. Click on the burger menu icon                             | Menu options become visible:<br>1. All items<br>2. About<br>3.Logout<br>4.Reset Item State  | Yes       | smoke       |
| All Items Option    | Login to the site | 1. Open menu<br>2. Click 'All Items'                         | Redirects to the Home page                          | Yes       | regression  |
| About Option        | Login to the site | 1. Open menu<br>2. Click 'About'                             | Redirects to About page with site info          | No        | exploratory |
| Logout Option       | Login to the site | 1. Open menu<br>2. Click 'Logout'                            | User is logged out and returned to login page   | Yes       | smoke       |
| Reset Item State    | Login to the site | 1. Add item<br>2. Open menu<br>3. Click 'Reset item state'   | Cart is cleared and badge is not displayed          | Yes       | regression  |

---

## 🛒 Cart Page

| Description         | Pre-conditions    | Steps                                                    | Expected Result                                      | Automated | Tag        |
|---------------------|-------------------|-----------------------------------------------------------|------------------------------------------------------|-----------|------------|
| Open Cart | Login to the site | 1. Add a product<br>2. Click on cart icon | Cart page is opened displaying all added items, containing name, description, quantity and 'Remove' button. It includes 'Continue Shopping' and 'Checkout' button | Yes | smoke |
| Cart Content Display| 1. Login to the site<br>2. Add a product | 1. Go to cart page                   | Product name, description, quantity and price are displayed, 'Remove' button is displayed | Yes       | regression |
| Remove from Cart    | 1. Login to the site<br>2. Add a product<br>3. Go to cart<br>| 1. Click 'Remove' button for added item   | Product is removed from cart                         | Yes       | regression |
| Continue Shopping   | 1. Login to the site<br>2. Add a product<br>3. Go to cart<br> | 1. Click on 'Continue Shopping' button on cart page               | User is redirected to Home page                      | Yes       | smoke      |
| Proceed to Checkout | 1. Login to the site<br>2. Add a product<br>3. Go to cart<br> | 1. Click on 'Checkout' button on cart page                        | Redirects to Checkout: Your Information page         | Yes       | smoke      |

---

## 📝 Checkout: Your Information Page

| Description             | Pre-conditions    | Steps                                                                 | Expected Result                                    | Automated | Tag       |
|-------------------------|-------------------|------------------------------------------------------------------------|----------------------------------------------------|-----------|-----------|
| Empty Fields Checkout   | Login to the site | 1. Go to checkout info<br>2. Leave all fields blank<br>3. Click Continue| Validation error is shown                          | Yes       | edge case |
| Valid Info Submission   | Login to the site | 1. Fill First, Last, Zip<br>2. Click Continue                         | Navigates to Checkout: Overview page               | Yes       | smoke     |
| Cancel Checkout         | Login to the site | 1. Click 'Cancel' on Checkout Info page                              | User is redirected back to Cart page               | Yes       | regression|

---

## 📦 Checkout: Overview Page

| Description          | Pre-conditions    | Steps                                                       | Expected Result                                     | Automated | Tag        |
|----------------------|-------------------|--------------------------------------------------------------|-----------------------------------------------------|-----------|-------------|
| Verify Product Info  | Login to the site | 1. Go to Overview page<br>2. Verify name, price, tax, total | Product and total values displayed correctly         | No        | exploratory |
| Cancel at Overview   | Login to the site | 1. Click 'Cancel' on Overview page                          | User is redirected to Home page                     | Yes       | regression  |
| Finish Order         | Login to the site | 1. Click 'Finish' on Overview page                          | User is redirected to 'Order Successful' page       | Yes       | smoke       |

---

## ✅ Order Confirmation Page

| Description         | Pre-conditions    | Steps                                              | Expected Result                                  | Automated | Tag        |
|---------------------|-------------------|-----------------------------------------------------|--------------------------------------------------|-----------|------------|
| Verify Success Page | Login to the site | 1. Complete order and verify result                | Confirmation message is displayed                | Yes       | regression |
| Back to Shopping    | Login to the site | 1. From success page, click back/home              | User is redirected to Home page                  | Yes       | smoke      |
