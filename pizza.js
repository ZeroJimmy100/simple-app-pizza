var PizzaSizes;
(function (PizzaSizes) {
    PizzaSizes["small"] = "small";
    PizzaSizes["medium"] = "medium";
    PizzaSizes["large"] = "large";
})(PizzaSizes || (PizzaSizes = {}));
var arrayOfMeat = ["pepperoni", "sausage", "ham", "anchovies"];
var Pizza = /** @class */ (function () {
    function Pizza() {
        this.toppings = [];
        this.isItVegetarian = false;
        this.size = PizzaSizes.medium;
    }
    Pizza.prototype.addTopping = function (myTopping) {
        if (this.isItVegetarian && arrayOfMeat.includes(myTopping)) {
            console.log("Cannot add meat to a vegetarian pizza!!!");
            return "";
        }
        return this.toppings.push(myTopping);
    };
    Pizza.prototype.addToppings = function (myToppings) {
        if (this.isItVegetarian) {
            for (var index = 0; index < myToppings.length; index++) {
                if (!arrayOfMeat.includes(myToppings[index])) {
                    this.toppings.push(myToppings[index]);
                }
            }
        }
        else {
            this.toppings = myToppings.concat(this.toppings);
        }
        return this.toppings;
    };
    Pizza.prototype.removeChoiceOfToppings = function (myToppings) {
        function notInToppings(topping) {
            return !myToppings.includes(topping);
        }
        this.toppings = this.toppings.map(function (topping) { return topping; }).filter(notInToppings);
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
    };
    Pizza.prototype.removeTopping = function () {
        return this.toppings.pop();
    };
    Pizza.prototype.changeSizeOfPizza = function (pizzaSize) {
        if (!Object.values(PizzaSizes).includes(pizzaSize.toLowerCase())) {
            console.log("That size does not exist!!! Keeping default size pizza");
            return "";
        }
        this.size = pizzaSize.toLowerCase();
        return pizzaSize;
    };
    Pizza.prototype.markAsVegetarian = function (markVegetarian) {
        for (var index = 0; index < this.toppings.length; index++) {
            if (arrayOfMeat.includes(this.toppings[index])) {
                this.isItVegetarian = false;
                console.log("Cannot change this pizza to vetegarian, because it has MEAT!!!");
                return this.isItVegetarian;
            }
        }
        this.isItVegetarian = markVegetarian;
        return this.isItVegetarian;
    };
    return Pizza;
}());
var Order = /** @class */ (function () {
    function Order(NumOfPizza, DeliveryAddress) {
        if (NumOfPizza == 1) {
            var newPizza_1 = new Pizza();
            this.numOfPizza = [newPizza_1];
        }
        else if (NumOfPizza > 1) {
            this.numOfPizza = [];
            for (var index = 0; index < NumOfPizza; index++) {
                var newPizza_2 = new Pizza();
                this.numOfPizza.push(newPizza_2);
            }
        }
        else {
            console.log("You need to put a number greater than 0 to make an order!");
        }
        this.deliveryAddress = DeliveryAddress;
    }
    Order.prototype.addPizza = function (pizza) {
        if (pizza.length == undefined) {
            this.numOfPizza.push(pizza);
        }
        else {
            this.numOfPizza = pizza.concat(this.numOfPizza);
        }
        return this.numOfPizza;
    };
    Order.prototype.removePizza = function () {
        this.numOfPizza.pop();
        return this.numOfPizza;
    };
    Order.prototype.removePizzaByIndex = function (index) {
        try {
            this.numOfPizza.splice(index, 1);
        }
        catch (error) {
            console.log("Unable to remove pizza, you only have " + this.numOfPizza.length);
        }
        return this.numOfPizza;
    };
    Order.prototype.submitOrder = function () {
        if (this.orderSubmitted.length > 1) {
            console.log("Sorry, you've already order, this cannot be change!");
        }
        else {
            var dt = new Date();
            this.orderSubmitted = dt.toUTCString();
        }
        return this.orderSubmitted;
    };
    return Order;
}());
var newPizza = new Pizza();
var newPizza2 = new Pizza();
newPizza.changeSizeOfPizza("lARGE");
newPizza.markAsVegetarian(true);
newPizza.addTopping("pepperoni");
var newOrder = new Order(1, "1000 Ave");
newOrder.addPizza([newPizza, newPizza2]);
console.log(newOrder);
