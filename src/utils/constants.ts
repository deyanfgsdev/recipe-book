import { v4 as uuidv4 } from 'uuid';

export const MOBILE_BREAKPOINT = 992;
export const MOBILE_HEADER_IMAGE =
  'https://i.ibb.co/npZ5DZZ/mobile-header-bg.jpg';
export const DESKTOP_HEADER_IMAGE =
  'https://i.ibb.co/GSnYnBH/desktop-header-bg.jpg';
export const SPOONACULAR_API_PREFIX = 'https://api.spoonacular.com';
export const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
export const SPOONACULAR_API_INGREDIENT_IMAGE_PREFIX =
  'https://img.spoonacular.com/ingredients_';
export const SPOONACULAR_API_INGREDIENT_IMAGE_SIZE = '500x500';
export const RECIPE_CATEGORIES = [
  {
    id: uuidv4(),
    name: 'Main Course',
    imageUrl: 'https://i.ibb.co/HT7YzHJ6/main-course.png',
  },
  {
    id: uuidv4(),
    name: 'Side Dish',
    imageUrl: 'https://i.ibb.co/PRp5kKG/side-dish.png',
  },
  {
    id: uuidv4(),
    name: 'Dessert',
    imageUrl: 'https://i.ibb.co/nsN57yVt/dessert.png',
  },
  {
    id: uuidv4(),
    name: 'Appetizer',
    imageUrl: 'https://i.ibb.co/XZ21mfg7/appetizer.png',
  },
  {
    id: uuidv4(),
    name: 'Salad',
    imageUrl: 'https://i.ibb.co/0jTXQMDj/salad.png',
  },
  {
    id: uuidv4(),
    name: 'Bread',
    imageUrl: 'https://i.ibb.co/CKMPWbC1/bread.png',
  },
  {
    id: uuidv4(),
    name: 'Breakfast',
    imageUrl: 'https://i.ibb.co/QjbRXNcs/breakfast.png',
  },
  {
    id: uuidv4(),
    name: 'Soup',
    imageUrl: 'https://i.ibb.co/QjPK5W1B/soup.png',
  },
  {
    id: uuidv4(),
    name: 'Sauce',
    imageUrl: 'https://i.ibb.co/gcRWHF2/sauce.png',
  },
  {
    id: uuidv4(),
    name: 'Marinade',
    imageUrl: 'https://i.ibb.co/qYzHTXfZ/marinade.png',
  },
  {
    id: uuidv4(),
    name: 'Finger Food',
    imageUrl: 'https://i.ibb.co/C3WL8CJn/fingerfood.png',
  },
  {
    id: uuidv4(),
    name: 'Snack',
    imageUrl: 'https://i.ibb.co/ycmkGptz/snack.png',
  },
  {
    id: uuidv4(),
    name: 'Drink',
    imageUrl: 'https://i.ibb.co/mC61mHVW/drink.png',
  },
];
export const STORAGE_FAVOURITE_RECIPES_KEYNAME =
  'recipe-book--favourite-recipes';
