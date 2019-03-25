<img src="gandul.png" alt="gandul" width="148" />

# **gandul!** 😴 (accessible-image-lazy-load)

[![MIT license](https://img.shields.io/github/license/alterebro/accessible-image-lazy-load.svg)](http://opensource.org/licenses/MIT) [![NPM Version](https://img.shields.io/npm/v/accessible-image-lazy-load.svg)](https://www.npmjs.com/package/accessible-image-lazy-load) [![File Size](https://img.shields.io/github/size/alterebro/accessible-image-lazy-load/dist/gandul.min.js.svg)](https://github.com/alterebro/accessible-image-lazy-load/blob/master/dist/gandul.min.js) [![Twitter](https://img.shields.io/twitter/follow/alterebro.svg)](https://twitter.com/alterebro)

- [About gandul](#accessible-lazy-loading-images)
- [How to use it](#how-to-use-it)
- [Image attributes](#image-attributes)
- [Options](#options)
- [Development](#development)

---

## Accessible lazy loading images

**gandul** 😴 is a lightweight javascritp module that adds a different approach on lazy loading focusing on accessibility. Most existing options work by either making you drop the `src` attribute of the image or, making you create a base64 data / low resolution blurred alternative version of the image, or also including the img element into a `<noscript>` tag. This could be hacky and verbose and the main issue with it is that alters the semantics of the original element.

In order to avoid that, **gandul** 😴 works by taking a common anchor hyperlink `<a>` as the data source of the image to be loaded and transforms it into a `<img>` element. This way you don't lose the reference to the image you want to show and, in case there's no JavaScript, your image will still be accessible by users and crawlers.

#### Basic Example :

```html
<!-- How your HTML will look like: -->
<a href="http://placekitten.com/320/180" class="gandul">Nice kitten</a>

<!-- What the gandul script will output : -->
<img src="http://placekitten.com/320/180" class="gandul" alt="Nice kitten" />
```

<table>
<thead>
    <tr>  
        <th>HTML Input</th>
        <th>gandul 😴 Output</th>
    </tr>  
</thead>
<tbody>
    <tr>
        <td><code>&lt;a href="http://placekitten.com/320/180" class="gandul"&gt;Nice kitten&lt;/a&gt;</code></td>
        <td><code>&lt;img src="http://placekitten.com/320/180" class="gandul" alt="Nice kitten" /&gt;</code></td>
    </tr>
    <tr>
        <td><a href="http://placekitten.com/320/180" class="gandul">Nice kitten</a></td>
        <td><img src="http://placekitten.com/320/180" class="gandul" alt="Nice kitten" /></td>
    </tr>
</tbody>
</table>

## How to use it

#### 1. Download the script

You have multiple options to get gandul 😴 ( [gandul.min.js](dist/gandul.min.js) ):

- Via [NPM](https://www.npmjs.com/package/accessible-image-lazy-load) : `npm i accessible-image-lazy-load`
- By cloning the repository : `git clone https://github.com/alterebro/accessible-image-lazy-load.git`
- By downloading the project : [Download ZIP](https://github.com/alterebro/accessible-image-lazy-load/archive/master.zip)
- From the jsDelivr CDN : [`cdn.jsdelivr.net/gh/alterebro/accessible-image-lazy-load/dist/gandul.min.js`](https://cdn.jsdelivr.net/gh/alterebro/accessible-image-lazy-load/dist/gandul.min.js)


#### 2. Get it working

Write an anchor hyperlink with the reference to your image and set the class gandul on it (`<a class="gandul">`). then, include and call the script :

```html
<!-- How a gandul image reference looks like -->
<a href="http://placekitten.com/200/200" class="gandul">Nice kitten</a>

<!-- Include and call the script -->
<script src="//cdn.jsdelivr.net/gh/alterebro/accessible-image-lazy-load/dist/gandul.min.js"></script>
<script>gandul();</script>
```

## Image Attributes

**gandul** 😴 will take all the existing attributes on the `<a>` element and they will be passed to the newly created `<img>` with a few peculiarities, as `<a>` elements don't have `srcset`, `sizes`, `width`... attributes, those will be passed as data attributes. Right below you can see the equivalences table and some examples:

| &lt;a&gt; attributes  | &lt;img&gt; attributes equivalence  |
|-----------------------|-------------|
| `data-srcset`    		| `srcset` 	|
| `data-sizes`     		| `sizes`  	|
| `data-width`     		| `width`  	|
| `href`     			| `src`  	|
| Anchor hyperlink inner text. | `alt` 	|


#### Fully responsive image example:

```html
<!-- Write your hyperlink HTML as it follows : -->
<a href="http://placekitten.com/800/400"
   data-srcset="http://placekitten.com/320/160 320w,
             http://placekitten.com/480/240 480w,
             http://placekitten.com/800/400 800w"
   data-sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
   class="gandul">Nice kitten</a>

<!-- To get a responsive image output like this one: -->
<img src="http://placekitten.com/800/400"
	 srcset="http://placekitten.com/320/160 320w,
             http://placekitten.com/480/240 480w,
             http://placekitten.com/800/400 800w"
     sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
     class="gandul"
     alt="Nice kitten" />

```


#### Setting just the width attribute of an image :

```html
<!-- What you'll write: -->
<a href="http://placekitten.com/800/400" data-width="800" class="gandul">Nice kitten</a>

<!-- What you'll get : -->
<img src="http://placekitten.com/800/400" width="800" alt="Nice kitten" />
```


#### Any other attributes :

Any other attributes will remain as they are, which means that if you already set or you need on the `<img>` an `id` or different `classes`, those will be passed through the **gandul** 😴 script :

```html
<!-- input -->
<a href="http://placekitten.com/800/400" id="cat" class="nice kitten gandul">Nice kitten</a>

<!-- gandul output -->
<img src="http://placekitten.com/800/400" id="cat" class="nice kitten gandul" alt="Nice kitten" />
```

## Options

Some parameters can be send to the **gandul** 😴 function:

```javascript
gandul(target, opts, action);
```

- **`target (@string)`** : a selector targeting all the elements where you want the script to get executed. It defaults to all anchor hyperlinks with the classname *gandul* : `"a.gandul"`
- **`opts (@object)`** : an options object containing the fields used by the `IntersectionObserver` constructor
    * `root` : element used as viewport of the target. Default value is the brwoser viewport (`null`)
    * `rootMargin` : margin of root element to grow or shrink the intersection. Default value takes an extra 50 pixels above and below the viewport (`"50px 0px 50px 0px"`).
    * `threshold` : percentage of target visibility to trigger the action. Default is `0`.
- **`action (@function)`** : A callback function to be executed when the image finishes loading after the target has intersected the given viewport, it comes with image element itself as first parameter (`function(img){ /* console.log(img) */ }`). The default action when image loads is to attach to the `img` element the class named `'gandul-active'`.

The following example makes use of some of these options, it will target all hyperlinks with the class `gandul-hyperlink`, will be activated when 50% of the target element is visible and the function used as callback will change the created image border style as defined below:

```javascript
gandul('a.gandul-hyperlink', { threshold: .5 }, function(img) {
    img.style.border = 'solid red 10px';
});
```

---

## Development

```sh
# Clone the repo
$ git clone https://github.com/alterebro/accessible-image-lazy-load.git
$ cd accessible-image-lazy-load/

# Install dependencies
$ npm install

# Build (any of the below will do it)
$ npm run build
$ gulp
```

---

*Jorge Moreno — [@alterebro](https://twitter.com/alterebro)*
