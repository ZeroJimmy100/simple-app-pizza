enum PizzaSizes {
    small = "small",
    medium = "medium",
    large = "large"
}

const arrayOfMeat = ["pepperoni", "sausage", "ham", "anchovies"];

type BoxOfPizza = Array<Pizza> | Pizza;

interface CustomizePizza{
    addToppings: (a: Array<string>) => Array<string>;
    removeChoiceOfToppings: (a: Array<string>) => Array<string>;
    removeTopping: (a: Array<string>) => Array<string>;
    changeSizeOfPizza: (a: string) => string;
    addTopping: (a: string) => Array<string>;
    markAsVegetarian: (a: boolean) => boolean;
}

interface CustomizeOrder{
    submitOrder: () => Date;

    removePizzaByIndex: (a: number) => BoxOfPizza;

    addPizza: (a: BoxOfPizza) => BoxOfPizza;

    removePizza: (a: BoxOfPizza) => BoxOfPizza
}


class Pizza implements CustomizePizza{
    private toppings;
    private isItVegetarian;
    private size;
    constructor(){
        this.toppings = [];
        this.isItVegetarian = false;
        this.size = PizzaSizes.medium;
    }

    addTopping(myTopping: string){
        if(this.isItVegetarian && arrayOfMeat.includes(myTopping))
        {
            console.log("Cannot add meat to a vegetarian pizza!!!");
            return "";
        }
        return this.toppings.push(myTopping);
    }

    addToppings(myToppings: Array<string>){
        if(this.isItVegetarian)
        {
            for(let index = 0; index < myToppings.length; index++)
            {
                if(!arrayOfMeat.includes(myToppings[index]))
                {
                    this.toppings.push(myToppings[index]);
                }
            }
        }else {
            this.toppings = myToppings.concat(this.toppings);
        }
        return this.toppings;
    }

    removeChoiceOfToppings(myToppings: Array<string>){
        function notInToppings(topping){
            return !myToppings.includes(topping);
        }
        this.toppings = this.toppings.map(topping => topping).filter(notInToppings);

        // solution 2
        // for(let index = 0; index < myToppings.length; index++)
        // {
        //     if(this.toppings.includes(myToppings[index]))
        //     {
        //         console.log("removing toppings");
        //         let removeIndex = this.toppings.indexOf(myToppings[index]);
        //         this.toppings.splice(removeIndex, 1);
        //     }
        // }
            
        return this.toppings;
    }

    removeTopping(){
        return this.toppings.pop();
    }

    changeSizeOfPizza(pizzaSize: string){
        if(!Object.values(PizzaSizes).includes(pizzaSize.toLowerCase()))
        {
            console.log("That size does not exist!!! Keeping default size pizza");
            return "";
        }
        this.size = pizzaSize.toLowerCase();
        return pizzaSize;
    }

    markAsVegetarian(markVegetarian: boolean){
        for(let index = 0; index < this.toppings.length; index++)
        {
            if(arrayOfMeat.includes(this.toppings[index]))
            {
                this.isItVegetarian = false;
                console.log("Cannot change this pizza to vetegarian, because it has MEAT!!!");
                return this.isItVegetarian;
            }
        }
        this.isItVegetarian = markVegetarian;
        return this.isItVegetarian;
    }

}

class Order implements CustomizeOrder{
    private numOfPizza;
    private deliveryAddress;
    private orderSubmitted;

    constructor(NumOfPizza: Number, DeliveryAddress: string)
    {
        if (NumOfPizza == 1){
            let newPizza = new Pizza();
            this.numOfPizza = [newPizza];
        }
        else if(NumOfPizza > 1){
            this.numOfPizza = [];
            for(let index = 0; index < NumOfPizza; index++){
                let newPizza = new Pizza();
                this.numOfPizza.push(newPizza);
            }
        }
        else
        {
            console.log("You need to put a number greater than 0 to make an order!");
        }

        this.deliveryAddress = DeliveryAddress;
    }

    addPizza(pizza: BoxOfPizza){
        if(pizza.length == undefined){
            this.numOfPizza.push(pizza);
        }
        else{
            this.numOfPizza = pizza.concat(this.numOfPizza);
        }
        return this.numOfPizza;
    }

    removePizza(){
        this.numOfPizza.pop();
        return this.numOfPizza;
    }

    removePizzaByIndex(index: number){
        try{
            this.numOfPizza.splice(index, 1);
        }
        catch(error){
            console.log(`Unable to remove pizza, you only have ${this.numOfPizza.length}`);
        }
        return this.numOfPizza;
    }

    submitOrder(){
        if(this.orderSubmitted.length > 1){
            console.log("Sorry, you've already order, this cannot be change!");
        }
        else{
            let dt = new Date();
            this.orderSubmitted = dt.toUTCString();
        }
        return this.orderSubmitted;
    }
}

let newPizza = new Pizza();
let newPizza2 = new Pizza();

newPizza.changeSizeOfPizza("lARGE");
newPizza.markAsVegetarian(true);
newPizza.addTopping("pepperoni");

let newOrder = new Order(1, "1000 Ave");
newOrder.addPizza([newPizza, newPizza2]);
console.log(newOrder);
