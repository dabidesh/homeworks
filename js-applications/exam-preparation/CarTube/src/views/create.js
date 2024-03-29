import { html } from '../../node_modules/lit-html/lit-html.js';

import { createListing } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-listing">
  <div class="container">
    <form @submit=${onSubmit} id="create-form">
      <h1>Create Car Listing</h1>
      <p>Please fill in this form to create an listing.</p>
      <hr>

      <p>Car Brand</p>
      <input type="text" placeholder="Enter Car Brand" name="brand">

      <p>Car Model</p>
      <input type="text" placeholder="Enter Car Model" name="model">

      <p>Description</p>
      <input type="text" placeholder="Enter Description" name="description">

      <p>Car Year</p>
      <input type="number" placeholder="Enter Car Year" name="year">

      <p>Car Image</p>
      <input type="text" placeholder="Enter Car Image" name="imageUrl">

      <p>Car Price</p>
      <input type="number" placeholder="Enter Car Price" name="price">

      <hr>
      <input type="submit" class="registerbtn" value="Create Listing">
    </form>
  </div>
</section>
`;

export function createPage(context) {
  context.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const car = {
      brand: formData.get('brand').trim(),
      model: formData.get('model').trim(),
      description: formData.get('description').trim(),
      year: +(formData.get('year').trim()),
      imageUrl: formData.get('imageUrl').trim(),
      price: +(formData.get('price').trim()),
    };

    /* if (car.year < 0 || !Number.isInteger(car.year)) {
      return alert('Year must by positive integer!');
    } */
    if (car.price <= 0 || car.year <= 0) {  //
      return alert('Price must be positive number!');
    }
    if (Object.values(car).some(x => !x)) {
      return alert('All fields are required!');
    }

    await createListing(car);
    e.target.reset();
    context.page.redirect('/all-listings');
  }

}