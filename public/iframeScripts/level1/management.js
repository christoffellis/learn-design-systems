class Management {
    constructor({
        name= 'Rename me!',
        color= '#f7a5b6'
    }) {
        this.name = name; // Use a private variable for management
        this.color = color;
    }
}


TheFactory.management = new Management(
    {
        name: 'My Management',
        color: '#555'
    }
)