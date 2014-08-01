---
layout: main
title: jQuery.pointerEvents
---

## jQuery.pointerEvents

jQuery.pointerEvents is a polyfill for the new [pointer events api](http://www.w3.org/TR/pointerevents/). It is an abstraction on top of touch and mouse events which mimics native pointer events. This is particularly useful because it will work across all devices which support either the Apple-style touch events (i.e. iOS, Android, Chrome OS) and those that support pointer events (i.e. Windows 8 and Windows Phone 7).

### Inclusion

Include pointy.js in your JavaScript bundle or add it to your HTML page:

{% highlight html %}
<!-- pointy.js requires jQuery -->
<script type="text/javascript" src="/path/to/pointy.js"></script>
{% endhighlight %}

Additionally, pointy.guestures can be included, which supports a number of high-level events built on top of pointer events:

{% highlight html %}
<script type="text/javascript" src="/path/to/pointy.gestures.js"></script>
{% endhighlight %}

The script must me loaded prior to binding to any pointer events of any element on the page.

pointy.js allows you to attach only to pointer events and let it deal with support all the other types of events. You no longer attach to mouse or touch events, only attach to pointer events.

### Events

##### pointerdown

This event is fired when a pointer enters the active state, and abstracts the `mousedown` and `touchstart` events.

For mouse devices, this occurs when the device goes from no buttons depressed to at least one button depressed. Subsequent button pressing on mouse devices only trigger a `pointermove` event. 

For touch and pen devices, this event occurs when an initial touch occurs.

##### pointerup

This event is fired when a pointer leaves the active state, and abstracts the `mouseup` and `touchend` events. For mouse devices, this is when the device goes from at least one button depressed to no buttons depressed. For touch and pen devices, this occurs when touch contact is removed.

##### pointercancel

This event is fired when a pointer is determined to be unlikely to produce further events. For example, on a mobile device, this occurs when the user starts to touch and then proceeds to zoom or pan the page. Other times this may be triggered is when the device's screen orientation is changed while a pointer is active, or if the user starts using more inputs than the device supports (such as on five-finger contact screens and the user attempts to use more than five fingers).

While pointy.js abstracts `touchcancel` events, there is no mouse equivalent. pointy.js does not attempt to detect situations that may cause a `pointercancel` event directly. User agents are responsible for determining when it thinks it should trigger cancel events, as such, each device may trigger cancel events for different reasons.

##### pointermove

This event abstracts the `mousemove` and `touchmove` events, and is fired when a pointer changes coordinates, button state, pressure, tilt, or contact geometry.

##### pointerover

This event abstracts `mouseover`, and is fired when a pointing device is moved into the hit test boundaries of an element.

Note: There is no touch equivalent for this event. 

##### pointerout

This event abstracts `mouseout`, and is fired when a pointing device is moved out of the hit test boundaries of an element.

Note: There is no touch equivalent for this event. 

##### pointerenter

This event is fired when a pointing device hits the boundaries of an element or one of its descendants. This is similar to `pointerover`, except that `pointerover` does not consider descendants.

pointy.js abstracts `MSPointerOver` for IE10, otherwise it uses jQuery's `mouseenter` polyfill.

There is no touch equivalent to this event.

##### pointerleave

This event is fired when a pointing device leaves the hit test boundaries of an element and all of its descendants.
This is similar to `pointerout`, except that `pointerout` does not consider descendants.

pointy.js abstracts `MSPointerOut` for IE10, otherwise it uses jQuery's `mouseleave` polyfill

There is no touch equivalent to this event.

### The `touch-action` CSS property

pointy.js does not implement a polyfill for the `touch-action` CSS property. We recommend setting `touch-action` to `none` for all elements you indent to attach pointer events to through pointy.js. This ensures you receive the same events across devices that support native pointer events and those that don't natively.

### Event object

The ``jQuery.Event`` object passed is modified by pointy.js to standardize it between all the user input APIs (mouse, touch and pointer events).

#### Pointer Type

``event.pointerType`` will be: `touch`, `pen`, or `mouse`.

#### Buttons

``event.buttons`` is a bitmask of buttons currently depressed. [See spec](http://www.w3.org/TR/pointerevents/#chorded-button-interactions).

Values:

* ``0`` no buttons are pressed.
* ``1`` means either touch contact (finger), pen or the left-mouse button is depressed.
* ``2`` means the right-mouse button is depressed.
* ``4`` means the middle-mouse button is depressed.
* ``8`` means the x1 (back mouse button) is depressed.
* ``18`` means the x1 (forward mouse button) is depressed.
* ``32`` means the eraser button on a pen is depressed.

The bitmask of these identifies which buttons are pressed. For example: if both the left and right mouse buttons are depressed, ``event.buttons`` will be 3.

#### Pointer ID

``event.pointerId`` is a standardized identifier to keep track of various pointers.

``pointerId`` is always 1 for a mouse. It however provides a unique identifer for touch-driven events, which you can compare across the `pointerdown`, `pointermove` and `pointerend` events to keep track of separate fingers.

#### Pressure, width, height

``event.pressure`` is a normalized pressure of the pointer represented as a float in the range of [0,1]. When the hardware does not support pressure detection, the value will be 0.5 when any pointer is active (i.e. user is currently touching or a button is down) and 0 otherwise.

``event.width`` and ``event.height`` represent the contact geometry for a pointer. When the hardware cannot provide this, the value will be 0.

#### Preventing click events

``event.preventClick()`` is a utility to stop the native click event that follows a pointer event.

This utility especially useful when attempting to prevent navigation from within a pointer event. An example of this:

{% highlight javascript %}
$('a').on('press', function (event) {
	if (event.pointerType === 'touch') {
		event.preventClick();
		toggleDropDownMenu();
	}
});
{% endhighlight %}

You can check whether `preventClick()` has been called on a click event using ``event.isClickPrevented()``. These utilities can be used from `pointerdown`, `pointerup`, `pointermove`, `press`, `presshold`, `swipe`, `swipeleft`, and `swiperight`.

Note: The click event cannot always be prevented completely. In cases where pointy.js cannot prevent it from being triggered, it will call `event.preventDefault()` and `event.stopPropagation()` on the event.

### Examples

{% highlight javascript %}
$('a').on('pointerdown', function (event) {

	// Getting coordinates
	var top = event.clientX;
	var left = event.clientY;

	// Detecting the underlying event
	var underlyingEvent = e.originalEvent; // could be a MouseDown event, TouchStart event, or actual PointerDown event.

	// continue on your way...
});
{% endhighlight %}

{% highlight javascript %}
// opening a context menu
$('a').on({
	// if they either press down for awhile; like people do on mobile devices.
	'presshold': openMenu,
	// or we can get the contextmenu event, such as from right clicking
	'contextmenu': openMenu
});
{% endhighlight %}

For more examples, see [Skinny.js](https://github.com/vistaprint/SkinnyJS) which uses pointy.js within many of its plugins.