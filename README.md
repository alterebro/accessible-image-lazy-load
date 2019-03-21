<img src="gandul.png" alt="gandul" width="128" />

# **gandul!** (accessible-image-lazy-load)

- [About **gandul**](#intro) 😴
- [How to use it](#howto)
- [Image attributes](#attributes)
- [Options](#options)
- [Download](#download)

---

## Accessible lazy loading images <a name="intro"></a>

**gandul** 😴 is a script that adds a different approach on lazy loading focusing on accessibility. Most existing options work by either making you drop the `src` attribute of the image or, making you create a base64 data / low resolution blured alternative version of the image, or also including the img element into a `<noscript>`. This could be hacky and verbose and the main issue is that alters the semantics of the original element.

In order to avoid that **gandul** 😴 works by taking an anchor hyperlink `<a>` as the data source of the image to be loaded and transforms it into a `<img>` element. This way you don't lose the reference to the image you want to show and, in case there is no JavaScript, your image will still be accessible by users and crawlers.

**For example, if you write this:**

```html
<a href="http://placekitten.com/320/180" class="gandul">Nice kitten</a>
```

**You'll get this:**

```html
<img src="http://placekitten.com/320/180" class="gandul" alt="Nice kitten" />
```

<table>
<thead>
    <tr>  
        <th>HTML input</th>
        <th>gandul 😴 output</th>
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

## How to use it <a name="howto"></a>

You simply have to include the `gandul.js` file on your page, write a normal anchor hyperlink with the `gandul` class (`<a class="gandul">`), and call the gandul function after the elements to transform have been laoded from your JavaScript code.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>gandul!</title>
</head>
<body>
	<a href="http://placekitten.com/200/200" class="gandul">Nice kitten</a>
	<script src="path/to/script/gandul.min.js"></script>
	<script>gandul();</script>
</body>
</html>
```

## Image Attributes <a name="attributes"></a>

**gandul** 😴 will take all the existing attributes on the `<a>` element and they will be passed to the newly created `<img>` with a few peculiarities. As `<a>` elements don't have `srcset`, `sizes`, `width`... attributes, those will be passed as data attributes. Below you can see the equivalences table and one example:

| &lt;a&gt; attributes | &lt;img&gt; attributes equivalence  |
|----------------------|-------------|
| `data-srcset`    		| `srcset` 	|
| `data-sizes`     		| `sizes`  	|
| `data-width`     		| `width`  	|
| `href`     			| `src`  	|
| Anchor hyperlink inner text. | `alt` 	|


```html
<!-- You would have to write your hyperlink as it follows : -->
<a href="http://placekitten.com/800/400"
   data-srcset="http://placekitten.com/320/160 320w,
             http://placekitten.com/480/240 480w,
             http://placekitten.com/800/400 800w"
   data-sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
   class="gandul">Nice kitten</a>

<!-- If you want to have a responsive image like this one: -->
<img src="http://placekitten.com/800/400"
	 srcset="http://placekitten.com/320/160 320w,
             http://placekitten.com/480/240 480w,
             http://placekitten.com/800/400 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     class="gandul"
     alt="Nice kitten" />

```
---

In case you only want to set the width :

```html
<!-- What you'll write: -->
<a href="http://placekitten.com/800/400" data-width="800" class="gandul">Nice kitten</a>

<!-- What you'll get : -->
<img src="http://placekitten.com/800/400" width="800" alt="Nice kitten" />
```
---

Any other attributes will remain as they are, that means that if you already set or you need on the `<img>` an `id` or different `classes`, those will be passed through the **gandul** 😴 script :

```html
<!-- input -->
<a href="http://placekitten.com/800/400" id="cat" class="nice kitten gandul">Nice kitten</a>

<!-- gandul output -->
<img src="http://placekitten.com/800/400" id="cat" class="nice kitten gandul">Nice kitten</a>
```

## Options <a name="options"></a>

Some parameters can be send to the **gandul** 😴 function:

- `target (@string)` : a selector targeting all the elements where you want the script to get executed. It defaults to all anchor hyperlinks with the classname *gandul* : `"a.gandul"`
- `opts (@object)` : an options object containing the fields used by the `IntersectionObserver` constructor
    * `root` : element used as viewport of the target. Default value is the brwoser viewport (`null`)
    * `rootMargin` : margin of root element to grow or shrink the intersection. Default value takes an extra 50 pixels above and below the viewport (`"50px 0px 50px 0px"`).
    * `threshold` : percentage of target visibility to trigger the action. Default is `0`.
- `action (@function)` : callback function executed when the target intersects the given viewport, this defaults to the **gandul** 😴 behaviour but it can be overwritten using this parameter.

The following example makes use of some of these options, it will target all hyperlinks with the class `gandul-hyperlink`, will activate when 50% of the target element is visible and the function attached will change the inner HTML of the link to read the string — '**Gandul!**'.

```javascript
gandul('a.gandul-hyperlink', { threshold: .5 }, function(el) {
    el.innerHTML = 'Gandul!';
});
```

## Download <a name="download"></a>

- You can download the minified version of the **gandul** 😴 script from this repo : [gandul.min.js](dist/gandul.min.js)

---

*Jorge Moreno — [@alterebro](https://twitter.com/alterebro)*
