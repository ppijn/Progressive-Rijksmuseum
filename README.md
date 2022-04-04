# Rijksmuseum - Progressive Web App

For this course we needed to change our Web App Page from client-side rendering to server-side rendering. This was a challenge since I had no experience in the languages used for this at all.

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
# Service Worker
# Enhancement for the critical rendering path
# Feature Checklist
# Activity Diagram
