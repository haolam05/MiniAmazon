# User Stories

## Products

### Read
  * As the user visits the home page, they will see a list of products
  * Each product will have the followings
    * name
    * description
    * price
    * category
    * seller
    * product image
  * Each product will have reviews if there is any (See Reviews Feature for more details) --- (coming soon)

### Create
  * The user must be logged in to list a selling product
  * The user can click a button (should be clearly indicated) to add a product
  * The user will fill out the form to add a product with the following fields
    * name
    * description
    * price
    * category
    * seller
    * product image
  * A submit button can be clicked to add the product
  * There will be appropriate validations for each field

### Update
  * The user must be logged in to edit a listed product
  * The user can click a button (should be clearly indicated) to edit a product
  * The user will fill out the form to edit an existing product with the following fields
    * name
    * description
    * price
    * category
    * seller
    * product image
  * Note that the form will pre-populate with existing data of the product
  * A submit button can be clicked to update product details
  * There will be appropriate validations for each field

### Delete
  * The user must be logged in to delete a listed product
  * The user can click a button (should be clearly indicated) to delete a product
  * The user will see a confirm delete form modal with 2 buttons "Cancel" and "Delete"
    * Clicking cancel will close the modal
    * Clicking delete will actually delete the listed product

## Orders (Carts)

### Read
  * The user must be logged in to see a list of their current order and past order(s)
  * The current order(singular) includes the items they have added to the cart but hasn't checkout
  * The past order(s) includes the orders that the user is already checked out
  * Each order should have a list of product items and the total price

### Create
  * The user must be logged in to add an item to the cart (the first added item marks the start or the creation of an order)
  * When a user clicks an "Add to cart" button on the product, the product is added to the cart
  * Next to each product, there should be a quantity of the current added product
  * After the user adds the product into the cart, the user should be able to see their added products in the carts by
  * The cart can be open via the side bar button

### Update
  * The user must be logged in to edit the item(s) in the cart
  * Inside the cart, each item will have a plus(+) and minus(-) button on the side that the user can clicks to increment or decrement the product quantity
  * Optionally, there will be an input field to specify the exact quantity the user wants for a product item
  * Increment/Decrement each product will update the total price accordingly

### Delete
  * The user must be logged in to edit the item(s) in the cart
  * Inside the cart, each item will have an icon to remove the item from the cart
  * Clicking the icon will remove the item from the cart, and update the total price accordingly
