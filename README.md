# Airbnb Search App with Testing Data from MongoDB

### About

This is a simple full stack demo app that was built with:

> **Frontend**: React, Material UI, Google Maps Javascript API
> 
> **Backend**: Express (Node.js), MongoDB Atlas
> 
> **Database**: MongoDB

This app makes use of the sample data sets of Airbnb, provided by MongoDB. It demonstrates the use case of geoWithin operator to perform geographical search (lat and lng) in a smooth and fast way. Wanted to create an autocomplete (real time retrieval of database index field), but came across this available test dataset from the documentation ([geoWithin - MongoDB Atlas](https://docs.atlas.mongodb.com/atlas-search/geoWithin/)), and found out that this geoWithin is more powerful than I thought. 

In this app, user can search type in the keyword and pin the desired location (right click on the map), and while you type, it is retrieving data on the pre-indexed fields from MongoDB and presenting them as suggestions to the users. Creating different types of index fields were easy, as I found on YouTube the exactly thing that I wanted to do. Here's a take of the search page:

[Live Demo](https://airbnb-app-data-app-frontend.vercel.app)

![Sample_Airbnb_App_-_Google_Chrome_2022-01-11_21-32-18_AdobeCreativeCloudExpress (1)](https://user-images.githubusercontent.com/49362324/148952837-7f0471c5-db69-4bfe-811e-77fe4ec8f9ed.gif)

Basically, both the search filters (keyword and the location selected) were combined to produce the search results. If you right click and select the location, it will try to find in a circle shape (you can define in your GeoJSON), and with a radius of 10km (you can also define thsi in GeoJSON). By providing keywords, it will further filter down those properties that match the "name" field of the property. 

In this demo app, Sydney is set to the initial center location of the search. If you click on "Search" without keyword, it will show you the results 10km within the radius of Sydney. And since this is using the sample test data from MongoDB (only 5000+ documents), you might not be able find any property in a lot of places. However , the purpose of this demo app is to demonstrate how MongoDB and MongoDB Atlas can help to manage, index and search Geolocation fast, and there are a lot of applications to it. Since I have started building this demo, I will also continue to add in more functionalities towards this demo app in the future. 
