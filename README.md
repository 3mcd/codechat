# codechat

A collaborative chat application with a real time code interface built with Derby JS and SUIT CSS components.

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
