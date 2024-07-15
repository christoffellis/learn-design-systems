const content = [
`<p>Lets start off with one of the most well known design patterns, the Singleton. Singletons are known as a creational design pattern, a pattern that assists in class instantiation.</p>

<p>The Singleton has one distinctive property, which comes directly from its name: during runtime, only one of a specific Singleton will ever exist.</p>

<p>Singletons can be anything from a super simple enumerator, to a complex controller class used for managing a monolith of a system. Chances are, you've implemented a Singleton without knowing it.</p>`,

`<p>In the context of what we're building today, we're going to have a management center. We'll expand the factory in a second, and our management center will be very useful in communicating with the rest of our subdivisions.</p>

<p>We have a global class, <code>TheFactory</code>, to which we can assign the pieces of our system. In <code>management.js</code>, after the declaration of the class, assign a new instance of the Management class to TheFactory using <code>TheFactory.management</code></p>`
];

const successText = [
    `<p>Although in this example, our singleton is quite simple, don\'t be fooled. I\'ve seen projects where a singleton is the main foundation of thw entire running system. Whether this is good practice depends on the implementation, as well as your specific use case.</p>
    
    <p>The singleton is useful when you want to avoid having many classes.</p>

    <p>You'll notice that singletons pop up all over the place. As you progress through these levels, see if you can identify which are singletons. Fortunately, in these levels, I try and visualize the system, which should make it easier, but when working on larger projects, they might be more difficult to spot.</p>
    
    <p>Some are however critical on whether the Singleton is a design pattern, or an anti-pattern</p>`
];

const title = 'The Singleton';

export const level1Enums = {
    content,
    successText,
    title
}
