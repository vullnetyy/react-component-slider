# react-image-slider
React carousel or slider designed with images in mind but can be used with any other react component.

We wrote this slider because we wanted to have an extremely simple and easy to integrate slider/carousel for one of our commercial projects.

To use this slider simply import it and give it an array of children components all of which have the same width. The consistent width is required because the slider decides how much to move left or right depending on he width first child. This will be more advanced in the upcoming version.

Below is a simple use case for react-component-slider:

````
<div style={{marginTop: '50px'}}>
    <Slider animationDelay={300} childWidth={400}>
        {children}
    </Slider>
</div>
````

See example.js for a more detailed example.

You can run the example app by running npm install, and then calling the following two commands in your terminal:

````
grunt browserify
node app
````
