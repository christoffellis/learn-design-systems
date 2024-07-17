class Factory {
    constructor() {
        this._management = null; // Use a private variable for management
        this._loadingBay = null;

        this._loadingBayTruck = null;

        this._maxReachedLevel = 0;
    }

    // Getter for management
    get management() {
        return this._management;
    }

    // Setter for management
    set management(value) {
        this._management = value;
        this.createStyledDiv(
            {
                width: '30%',
                height: '40%',
                zIndex: 10,
                content: this._management.name,
                color: this._management.color,
                parent: document.querySelector('.section1')
            }
        );

        this.broadcastLevel();
    }

    get loadingBay() {
        return this._loadingBay;
    }

    // Setter for management
    set loadingBay(value) {
        this._loadingBay = value;
        this.createStyledDiv(
            {
                width: '5%',
                height: '20%',
                content: '',
                zIndex: 1,
                color: this._loadingBay.color,
                transform: 'translate(-25%, 0px)',
                parent: document.querySelector('.section1'),
            }
        );

        this._loadingBayTruck = {};

        this.createStyledDiv(
            {
                width: '5%',
                height: '3%',
                content: '',
                zIndex: 0,
                color: this._loadingBay.color,
                parent: document.querySelector('.section1'),
                className: 'animated-div',
                transform: 'translate(0px, 0px)'
            }
        );

        this.broadcastLevel();
    }

    createStyledDiv({
        width = '10%',
        height = '10%',
        color = 'rgba(255, 182, 193, 0.8)',
        content = 'Div Name',
        parent = document,
        zIndex = 0,
        transform = '',
        className = '',
    } = {}) {
        const div = document.createElement('div');
        div.style.width = width;
        div.style.height = height;
        div.style.backgroundColor = color;
        div.style.borderRadius = '2vh';
        div.style.transform = transform;
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.color = '#fff';
        div.style.padding = '10px';
        div.style.textAlign = 'center';
        div.style.zIndex = zIndex;
        div.style.border = '5px solid black';
        div.style.animationPlayState = 'var(--animation-play-state)'
        div.innerText = content;
        
        if (!transform) {
            div.style.animation = '1s ease 0s infinite normal none var(--animation-play-state) pulse';
        }
    
        if (className) {
            div.classList.add(className);
        }
    
        parent.appendChild(div);
    }
    

    
    assessLevel = () => {
        if (!this.management || (this.management && this.management.name === 'My Management'))
        {
            return LevelEnums.Singleton;
        }
        else if (true)
        {
            return LevelEnums.TempNext;
        }
        else
        {
            return LevelEnums.None
        }
    };

    broadcastLevel = () => {
        const level = this.assessLevel();

        console.log({level: level, maxReachedLevel: this._maxReachedLevel});

        if (this._maxReachedLevel < level)
        {
            this._maxReachedLevel = level;
        }
    };
}

// Example usage
const TheFactory = new Factory();

const LevelEnums = {
    None: 0,
    Singleton: 1,
    TempNext: 2,
}