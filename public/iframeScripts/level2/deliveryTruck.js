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

function functionAt50Percent() {
    console.log('Animation reached 50%');
    // Your code here
}

const TruckType = [
    { color: '#faffaa', name: 'A' },
    { color: '#afaffa', name: 'B' },
    { color: '#aafaff', name: 'C' },
    { color: '#faafaf', name: 'D' },
    { color: '#ffaafa', name: 'E' }
];

function functionAt0Percent() {
    const randomColor = TruckType[Math.floor(Math.random() * TruckType.length)];
    animatedDiv.style.backgroundColor = randomColor.color;
    animatedDiv.innerText = randomColor.name;
    animatedDiv.style.color = '#303030a0';
}

let lastAnimationProgress = 0;
const checkAnimationProgress = () => {
    const animationProgress = parseFloat(getComputedStyle(animatedDiv).getPropertyValue('--animation-progress'));
    
    if (lastAnimationProgress < 0.5 && animationProgress >= 0.5) {
        functionAt50Percent();
    }
    if (animationProgress === 0) {
        functionAt0Percent();
    }
    
    lastAnimationProgress = animationProgress;
};

// Use a setInterval to periodically check the animation progress
setInterval(checkAnimationProgress, 100);


