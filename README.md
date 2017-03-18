# [PopDex!](https://popsdex-475f1.firebaseapp.com) 

> Your one stop for information on Funko Pop! Toys

## About


PopDex! is a PWA-like single page application for aficionados of Funko Pop! Toys. Here, you can view all available brands of pops, 
browse the current pop prices, maintain what you have and what you want. 

The site is built with Vue 2.0, VueRouter, VueLoader, Webpack, and Firebase. Javascript and CSS are bundled and minified into 
a single file each. On the first load of the website, after the app loads it begins fetching the data on each brand, toy, and 
data specific to the user. 

Built and currently maintained by Abbas Dharamsey and Adam Setters

## Build Setup

``` bash
# clone repository
git clone https://github.com/likeabbas/cse134b-popdex.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
For information on the webpack setup, go to the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader)

## Folder Layout

build/          - Webpack Code
config/         - NPM initialization 
src/            - Application code
src/assets/     - CSS, fonts, and images 
src/components/ - Vue Components and subcomponents (.Vue files)
src/router/     - VueRouter code 
src/services/   - Javascript code (Firebase, storage, etc)

## Main Component Structure 

Lead        - Home page which shows currently trending items
MainGuide   - Shows the different brands of Pop! toys sorted alphabetically, and can search through them
BrandPage   - Shows the differnet items of this Pop! brand
UserPage    - Shows the user's current items (My Stuff), able to be sorted A-Z and Z-A
SignUp      - Sign up Modal
Login       - Login Modal 

## App Code Structure

The app functions in a single state that is defined in storage and then imported into every component. The storage contains the 
user's authentication and item data, as well as the site data so there is no redundant fetching of data by switching pages.

Any addition, deletion, and update to the user's personal collection does two tasks. 
1) It calls firebase using the FBService defined in src/services/ to apply the action to the database, and 
2) Updates the state of the user via the storage service 

Each component deals with it's own manipulation of data for rendering purposes. Components like BrandPage and MainGuide use a similar filtering 
which has been abstracted to a seperate service


## TODOS
Features - 

  1) Add more fields to the user's item specifics. 
    - Price at the time of purchase

  2) Write a server to update firebase daily of new prices 

  3) Implement Service Workers and make this app completely offline 

  4) Implement code splitting to decrease the time to first byte 


