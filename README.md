# codechat

A collaborative chat application with a real time code interface built with Derby JS and SUIT CSS components.

Install into your Derby project. You also need to install bower to install the SUITCSS dependencies and jQuery. From the root derby project directory:

```
npm install -g bower

cd public/
```

and then (inside of the public directory):

```
bower install --save suit

bower install --save suit-grid-layouts

bower install --save suit-form

bower install jquery
```

You'll probably need to update the liveDB backend, as well:

```
npm update
```
