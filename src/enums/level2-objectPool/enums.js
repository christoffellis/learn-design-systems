const content = [
`<p>Next, we take a look at another, well known creational pattern, the Object Pool.</p>

<p>The object pool is a useful pattern when dealing with a large amount of classes, and recycling a class instance is faster, or easier, than creating a new instance.</p>

<p>This pattern is common in computer game design, where many objects exist at the same time. For example, imagine a scene with many balls flying across the screen. Instead of destroying the balls when they leave the screen, and continuously creating new ones, store the "destroyed" ball in an array, and when needed, set the properties of one of the stored balls to that of the one you'd like to create.</p>`,

`<p>The object pool doesn't just have to be for when you need to manage memory or other resources. Our factory in this demo is going to receive deliveries, but each company that delivers, does so with a unique colored truck. To receive their delivery, our loading bay needs to be the same color. Each delivery truck will call the method <code>TheFactory.deliver(product)</code>. We will have to process the contents of the product, to make it useful.</p>

<p>We're going to implement an object pool to keep track of our delivery bays. Lets assume all of the delivery companies deliver the <code>product</code> in a standard format. We could use one instance of the loading bay class, and continuously change it's color, but what if company A decides that it wants to deliver our package in a different format to the rest of the delivery companies? We would have to seriously complicate our processing algorithm to match <b>all</b> of the previous delivery companies' formats, as well as Company A's new format.</p>`
];

const successText = [
    ``
];

const title = 'The Object Pool';

export const level2Enums = {
    content,
    successText,
    title
}
