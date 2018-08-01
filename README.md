# Front Matter Generator

## What is it?
A node script parses breakpoints, dynamically generates Jekyll Front Matter, and places all Front Matter in a dynamically generated folder/file structure.

This node script was designed for a specific banner ad project (I've anonymized the content), but I've been able to adapt it to several related uses.

## Why'd you make it?
Our team had to convert dynamic banner ads to static banner ads. The dynamic ads were built using Google Studio (previously, DoubleClick Studio), I wanted to create a script to generate all the necessary Front Matter files for our local Jekyll repo. Previously we had been writing these files by hand, then copy/pasting/editing for each concept/size (44 files total).

## How'd you do it?
1. I pulled the data from the Studio Dynamic Feed (an excel sheet).
2. I formatted the data as arrays in the `script.js` file.
3. I wrote two `for` loops in order to cycle through all concepts and sizes. 
4. Within these `for` loops, I populated our standard Front Matter with dynamic values.  
    1. The copy for each ad has special breakpoints, classes, and `<spans>` that an external function parses according to our original setup for Studio's dynamic feed.
5. With node's `fs` I created`||`used the `./ads/` folder, created`||`used current concept/size folder, and populated the relevant `index.html` file w/ the generated Front Matter.
6.  Step 5 is repeated for all concept/sizes (44 total).

## What's it end up looking like?
You can check the folders and files in `ads` to see an example of what the output looks like.
