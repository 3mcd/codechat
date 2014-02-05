# SUIT form

[![Build Status](https://secure.travis-ci.org/suitcss/form.png?branch=master)](http://travis-ci.org/suitcss/form)

A very lightweight SUIT component for forms.

Read more about [SUIT's design principles](https://github.com/suitcss/suit/).

## Installation

* [Bower](http://bower.io/): `bower install --save suit-form`
* [Component(1)](http://component.io/): `component install suitcss/suit-form`
* Download: [zip](https://github.com/suitcss/form/zipball/master)
* Git: `git clone https://github.com/suitcss/form.git`


## Available classes

* `Form` - Provides some basic display and alignment adjustments to form elements.
* `Form--inline` -.
* `Form-item` - The wrapper for a label-control pair.
* `Form-item--stacked` - Modifier to stack labels on top of controls.
* `Form-label` - A control's _visual_ label.
* `Form-input` - Styles intended for text-based controls (e.g., `textarea` or `input`)


## Usage

SUIT form depends on normalize.css:

```css
@import "/bower_components/normalize-css/normalize.css";
@import "/bower_components/suit-form/form.css";
```

SUIT form works best with other structural packages, especially:

* [suit-utils-state](https://github.com/suitcss/utils-state) - for accessible hiding of labels
* [suit-utils-dimension](https://github.com/suitcss/utils-dimension) - for dimension control of form elements
* [suit-button](https://github.com/suitcss/button) - for form buttons

Example compact form:

```html
<form class="Form">
    <fieldset>
        <label class="u-isHiddenVisually" for="email">Email</label>
        <input class="Form-input" id="email" type="email" placeholder="Email">

        <label class="u-isHiddenVisually" for="password">Password</label>
        <input class="Form-input" id="password" type="password" placeholder="Password">

        <input id="remember" type="checkbox">
        <label for="remember">Remember me</label>

        <button type="submit" class="Button">Sign in</button>
    </fieldset>
</form>
```

Example of horizontally arranged label-control pairs:

```html
<form class="Form">
    <div class="Form-item">
        <label class="Form-label u-size1of4" for="name">Choose username</label>
        <input class="Form-input" id="name" placeholder="">
    </div>

    <div class="Form-item u-before1of4">
        <input id="remember" type="checkbox">
        <label for="remember">Remember me</label>
    </div>

    <button type="submit" class="Button u-before1of4">Sign up</button>
</form>
```

Example of a stacked form:


```html
<form class="Form">
    <div class="Form-item Form-item--stacked">
        <label class="Form-label" for="name">Choose username</label>
        <input class="Form-input" id="name" placeholder="">
    </div>

    <button type="submit" class="Button">Sign up</button>
</form>
```

See the test file for more examples.

## Testing

Install [Node](http://nodejs.org) (comes with npm). It's recommended that you
also globally install [Component(1)](http://component.io): `npm install -g
component`.

From the repo root, install the project's development dependencies:

```
make
```

To run the CSS Lint tests and build the front-end development bundle:

```
make test
```

Basic visual tests are in `test.html`.

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+
