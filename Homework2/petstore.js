
/**
 * This function should calculate the total amount of pet food that should be
 * ordered for the upcoming week.
 * @param numAnimals the number of animals in the store
 * @param avgFood the average amount of food (in kilograms) eaten by the animals
 * 				each week
 * @return the total amount of pet food that should be ordered for the upcoming
 * 				 week, or -1 if the numAnimals or avgFood are less than 0 or non-numeric
 */
function calculateFoodOrder(numAnimals, avgFood) {
    if((numAnimals > 0 && /^[0-9]*$/.test(numAnimals))
        && (avgFood > 0 && /^[0-9]*$/.test(avgFood))){
        return numAnimals*avgFood;
    }else{
        return -1;
    }
}

/**
 * Determines which day of the week had the most number of people visiting the
 * pet store. If more than one day of the week has the same, highest amount of
 * traffic, an array containing the days (in any order) should be returned.
 * (ex. ["Wednesday", "Thursday"]). If the input is null or an empty array, the function
 * should return null.
 * @param week an array of Weekday objects
 * @return a string containing the name of the most popular day of the week if there is only one most popular day, and an array of the strings containing the names of the most popular days if there are more than one that are most popular
 */
function mostPopularDays(week) {
    if(week === null || week === undefined || week.length === 0)
        return null;

    let array = getAllDaysOfMaxNumberOfPeopleVisited(week);

    if(array.length === 1)
        return array[0];

    return array;
}


/**
 * Given three arrays of equal length containing information about a list of
 * animals - where names[i], types[i], and breeds[i] all relate to a single
 * animal - return an array of Animal objects constructed from the provided
 * info.
 * @param names the array of animal names
 * @param types the array of animal types (ex. "Dog", "Cat", "Bird")
 * @param breeds the array of animal breeds
 * @return an array of Animal objects containing the animals' information, or an
 *         empty array if the array's lengths are unequal or zero, or if any array is null.
 */
function createAnimalObjects(names, types, breeds) {
    let createdAnimalsArray = [];

    if( areObjectsNull(names, types, breeds) || areObjectsUndefined(names, types, breeds)
        || names.length === 0 || types.length === 0 || breeds.length === 0
        || names.length !== types.length || names.length !== breeds.length)
        return createdAnimalsArray;

    for(let index = 0; index < names.length; index++) {
        createdAnimalsArray.push(new Animal(names[index],types[index],breeds[index]));
    }

    return createdAnimalsArray;
}

/////////////////////////////////////////////////////////////////
//
//  Do not change any code below here!
//
/////////////////////////////////////////////////////////////////


/**
 * A prototype to create Weekday objects
 */
function Weekday (name, traffic) {
    this.name = name;
    this.traffic = traffic;
}

/**
 * A prototype to create Item objects
 */
function Item (name, barcode, sellingPrice, buyingPrice) {
     this.name = name;
     this.barcode = barcode;
     this.sellingPrice = sellingPrice;
     this.buyingPrice = buyingPrice;
}
 /**
  * A prototype to create Animal objects
  */
function Animal (name, type, breed) {
     this.name = name;
     this.type = type;
     this.breed = breed;
}

function getAllDaysOfMaxNumberOfPeopleVisited(week){
    let controlDay = week[0];
    let maxDayArray = [];

    for(let index = 0; index < week.length; index++){
        if(controlDay.traffic < week[index].traffic) {
            controlDay = week[index];

            maxDayArray = [];
            maxDayArray.push(controlDay.name);
        } else if(controlDay.traffic === week[index].traffic){
            maxDayArray.push(week[index].name);
        }
    }

    return maxDayArray;
}

function areObjectsNull(names, types, breeds){
    if( names === null || types === null || breeds === null )
        return true;

    return false;
}

function areObjectsUndefined(names, types, breeds){
    if( names === undefined || types === undefined || breeds === undefined )
        return true;

    return false;
}


/**
 * Use this function to test whether you are able to run JavaScript
 * from your browser's console.
 */
function helloworld() {
    return 'hello world!';
}

/*      Teste

        let a = []

        for(let i=0; i < 7; i++){
            switch(i){
                case 1:
                    a.push(new Weekday("Monday", 12));
                    break;
                case 2:
                    a.push(new Weekday("Tuesday", 10));
                    break;
                case 3:
                    a.push(new Weekday("Wednesday", 9));
                    break;
                case 4:
                    a.push(new Weekday("Thursday", 11));
                    break;
                case 5:
                    a.push(new Weekday("Friday", 14));
                    break;
                case 6:
                    a.push(new Weekday("Saturday", 15));
                    break;
                case 7:
                    a.push(new Weekday("Sunday", 10));
                    break;
            }
        }
 */