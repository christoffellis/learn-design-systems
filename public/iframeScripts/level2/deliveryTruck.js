class DeliveryTruck {
    constructor({
        name= 'Rename me!',
        color= '#f7a5b6'
    }) {
        this.name = name; // Use a private variable for management
        this.color = color;
    }
}

const animatedDiv = document.querySelector('.animated-div');

animatedDiv.addEventListener('animationiteration', () => {
    const animation = getComputedStyle(animatedDiv).animation;
    const duration = parseFloat(animation.split(' ')[1]);

    // Calculate current progress as a percentage
    const currentTime = (performance.now() % (duration * 1000)) / (duration * 1000);

    // Check for 50% (0.5) and 100% (1.0)
    if (currentTime >= 0.49 && currentTime < 0.51) {
        // Trigger function at 50%
        functionAt50Percent();
    }
    if (currentTime >= 0.99) {
        // Trigger function at 100%
        functionAt100Percent();
    }
});

function functionAt50Percent() {
    console.log('Animation reached 50%');
    // Your code here
}

function functionAt100Percent() {
    console.log('Animation reached 100%');
    // Your code here
}