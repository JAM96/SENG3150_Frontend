export interface FoodAndDrinks {
    foodAndDrinksID     :   string;
    name                :   string;
    starRating          :   number;
    stars               :   number[];
    address             :   string;
    suburb              :   string;
    menuTheme           :   string;
    websiteURL          :   string;
    briefDescription    :   string;
    expenseRating       :   number;     //Lower number = cheaper restauarant
    expense             :   number[];   //How many '$' to show
    diningStyle         :   string;
    phoneNo             :   string;
    photoURL            :   string;
    userRating          :   number;
    rating              :   string; //'Okay', 'Good', 'Great', "Fabulous!"
}