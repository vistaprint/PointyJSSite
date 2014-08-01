---
layout: main
title: pointy.gestures.js
---

## pointy.gestures.js

pointy.gestures.js is a set of jQuery custom events, built on top of pointer events, that support high-level, abstract gestures such as press, presshold, and sweep.

### Inclusion

Include pointy.gestures.js immediately after pointy.js in your JavaScript bundle HTML page:

{% highlight html %}
<!-- pointy.js requires jQuery -->
<script type="text/javascript" src="/path/to/pointy.js"></script>

<script type="text/javascript" src="/path/to/pointy.gestures.js"></script>
{% endhighlight %}

The script must me loaded prior to binding to any pointer events of any element on the page.

## Events

##### press

This event is fired after a quick, complete interaction event. This is similar to JQM's `tap` event.

A `press` is determined immediately upon `pointerend`, and avoids the 300ms delay on touch devices. pointy.js internally determines the interaction to be complete.

##### presshold

This event is fired after a sustained, complete interaction event (sometimes referred to as a long press). This is similar to JQM's `taphold`.

A `presshold` is defined as a pointer being held in place without significant pointer movement for 750ms.

`$.event.special.press.pressholdThreshold` (default 750) - This value dictates how long (in ms) the user must hold their press before the `presshold` event is fired.

##### sweep

This event is fired when a horizontal drag occurs within a short duration. The event object will contain ``direction`` indicating right or left. This is similar to JQM's `swipe` event.

##### sweepleft

This event is fired when a `sweep` event occurs moving in the left direction. This is similar to JQM's `swipeleft` event.

##### sweepright

This event is fired when a `sweep` event occurs moving in the right direction. This is similar to JQM's `swiperight` event.