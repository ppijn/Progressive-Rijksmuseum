# Rijksmuseum - Progressive Web App

For this course we needed to change our Web App Page from client-side rendering to server-side rendering. This was a challenge since I had no experience in the languages used for this at all.

Link to Web Page:
https://progressive-rijksmuseum.herokuapp.com/

# Table of Content:

- [User story](#user-story)
- [Client- vs. serverside rendering](#client--vs.-serverside-rendering)
- [Install](#install)
- [Features](#features)
- [Service worker](#service-worker)
- [Enhancements for the critical rendering path](#enhancement-for-the-critical-rendering-path)
- [Feature checklist](#feature-checklist)
- [Activity diagram](#activity-diagram)


# User Story

The user story was the same as the one we used for the course WAFS: 
_As an art lover, I want to be able to search and view art from the Rijksmuseum at home, so that I can still enjoy art during a lockdown._

# Client- vs. serverside rendering

To know what we had to do, we first needed to know what server side rendering is and how it different from client side rendering.

The basic difference between the client and server is that client relies on the services of the server, whereas the server authorizes the client's requests and facilitates them with the requested services. Servers can store and analyze the large data sets, whereas clients are not suited for such tasks.

They are both usefull for different things. It was our tasks to convert our Web App from client side to server side.

![sketch](https://github.com/ppijn/Progressive-Rijksmuseum/blob/main/public/img/readme/sketch.jpg)


# Install 

I started by updating my version of Node.JS and NPM using Node Version Manager. If you want to install from scratch go to the Node website. Once Node was installed I followed the Node Getting Started Guide, which helps you through setting up a simple https server and displaying 'Hello World' on localhost {port}.

After that I started with Express. I navigated to my project directory to `npm init`. This makes a `package.json` file to store, among other things, dependencies. I installed Express using `npm install express`. After that i added a render function to my app.js to render the index.html file in my directory.

# Features

## **Home Page**
During the first interaction of the page, we do a app.get request for the home page `/`.
```
app.get("/", async (request, response) => {
  const rijksAPI =
  `https://www.rijksmuseum.nl/api/nl/collection?key=8Rynz75W&p=0-n&ps=10&imgonly=true`
  const json = await fetch(rijksAPI)
  .then(res => res.json())
  .catch(e => {
    console.error({
      'message': 'oh no',
      error: e,
    })
  })
  
  // console.log(json.artObjects)
  response.render("index", {
    data: json.artObjects
  })
});
```

The other features that are included in this webpage are: 
- Search Function
- Detailed Page
- Fallback Page

 ## **Search Page**

For the search function, we put certain elements on the form: ` <form method="get" action="/search">`.
Now that we have put it on the form we can make some changes in the app.js.
```
app.get("/search", async (request, response) => {
  const rijksAPI =
  `https://www.rijksmuseum.nl/api/nl/collection?key=8Rynz75W&q=${request.query.q}&p=0-n&ps=10&imgonly=true`
  console.log(request.query.q)
  
  const json = await fetch(rijksAPI)
  .then(res => res.json())
  .catch(e => {
    console.error({
      'message': 'oh no',
      error: e,
    })
  })
  console.log(json.artObjects)
  response.render("index", {
    data: json.artObjects
  })
});
```

The code itself didn't change much, but the function works very great and it looks just like I wanted.

## **Detailed Page**

For the detailed page, it is a little more complicated. We want to get the ObjectNumber (or ID) from the API and put it back into the URL. We need this since there is certain information that we want to put in the detailed page, and its only in this URL. So for the code, we implement the objectnumber in the url and get all the data out of it.

```
app.get("/detail/:id", async (request, response) => {
  const rijksAPI =
  `https://www.rijksmuseum.nl/api/nl/collection/${request.params.id}?key=8Rynz75W&p=0-n&ps=10&imgonly=true`
  const json = await fetch(rijksAPI)
  .then(res => res.json())
  .catch(e => {
    console.error({
      'message': 'oh no',
      error: e,
    })
  }).then(data=>{
    response.render("detail", {
      data: data
    })
  })
});
```

# Service Worker

The Service Worker caches the pages that you have visited, and makes it so that when you are offline, you can visit the pages you have visited when you were online (see activity diagram). 
The service worker consist of 3 events:
- the install event
- the activate event
- the fetch event

For each of these event we write a function that is going to make the service worker work.

## Install Event

```
self.addEventListener('install', evt => {
  // console.log('service worker has been installed');
  evt.waitUntil( 
    caches.open(staticCacheName).then(cache => {
     console.log('caching shell assets');
     cache.addAll(assets);
    })
  );
});
```
## Activate Event

```
self.addEventListener('activate', evt => {
  // console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys); 
      return Promise.all(keys
        .filter(key  => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
        )
    })
  );
});
```

## Fetch Event

```
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    }).catch(() => caches.match('/fallback'))
  );
});
```

We want to cache certain assets called `assets` and in which I put these files:
```
'/offline',
'/',
'/css/style.css',
'/img'
```


# Enhancement for the critical rendering path

In order to make the rendering path quicker and Enhance the Progressiveness from the page. In the Inpector element, we can create a report of our webiste (Lighthouse report). When doing this we can see stats and tips on how to improve our webpage. If you follow all of these you create a more and better progressive app. 

I was struggeling with this since my report kept saying I have a 29 or 42 progressiveness. Which is really really low. I wanted to figure out what was going wrong and updated my code a lot. In the end, it jumped up to about 68-72 which was still not good. 

![Lighthouse report windows](https://github.com/ppijn/Progressive-Rijksmuseum/blob/main/public/img/readme/Lighthouse-windows.jpg)

What the problem actually was, was that my laptop just has a very bad CPU...
the error that the report was showing me was `Reduce initial server response time`. And basically to improve this, you had to get a better CPU. 
So, I wanted to test it on a better laptop (a MacBook Pro) and do a Lighthouse report there. 
The results were interesting since my Progressiveness was way better.

![Lighthouse report macbook](https://github.com/ppijn/Progressive-Rijksmuseum/blob/main/public/img/readme/Lighthouse-mac.png)

# Activity Diagram

![Activity Diagram](https://github.com/ppijn/Progressive-Rijksmuseum/blob/main/public/img/readme/Activity%20Diagram%20PWA.png)
