# codechat

A collaborative chat application with a real time code interface built with Derby JS and SUIT CSS components. In order to set this project up you will need the dependencies for Derby including Redis and MongoDB.

![codechat ui](http://www.ericmcd.com/blog/img/codechat.png)
Format: ![codechat ui](url)

Clone into a directory and `npm install`

You also need to install bower to install the SUITCSS dependencies and jQuery. From the root derby project directory:

```bash
npm install -g bower

cd public/
```

and then (inside of the public directory):

```bash
bower install --save suit

bower install --save suit-grid-layouts

bower install --save suit-form

bower install jquery
```

You may need to update the liveDB backend, as well:

```bash
npm update
```
