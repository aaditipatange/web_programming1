const connection = require('./config/mongoConnection');
const restaurants = require('./data/restaurants');

const main = async () => {

    const hotel1 = await restaurants.create("Cafe Magari", "Kandivali, Thane", 
     "828-252-3478", "http://www.magari.com", "$$", ["Mexican","Italian"], 3.5, {dineIn: true, takeOut: false, delivery: false});
    console.log('First Restaurant that is entered in Database: \n')
    console.log(hotel1);

    const hotel2 = await restaurants.create("Borivali Biryani Center BBC", "Borivali, Mumbai", 
    "567-696-3213", "http://www.bbcborivali.com", "$", ["Indian", "Chinese"], 2, 
    {dineIn: true, takeOut: true, delivery: true});
    console.log('First output of all Restaurants in Database: \n')
    console.log(await restaurants.getAll());

    const hotel3 = await restaurants.create("Silver Coin", "IC Colony, New Jersey", 
    "852-569-5890", "http://www.silvercoingroups.com", "$$$$", ["Continental", "Kebab"], 4.5, 
    {dineIn: false, takeOut: true, delivery: false});
    console.log('Third Restaurant that is entered in Database: \n')
    console.log(hotel3);

    const updtWeb1 = await restaurants.rename(hotel1._id,'http://www.magarihousecafe.com');
    console.log('First Restaurant updated in Database: \n')
    console.log(updtWeb1);

    console.log('Second Restaurant Deleted form Database: \n')
    console.log(await restaurants.remove(hotel2._id));

    console.log('Second output of all Restaurants in Database: \n')
   console.log(await restaurants.getAll());

try{
    const hotel4 = await restaurants.create("    ", "Kandivali, Thane", 
    "828-252-7890", "http://www.magaricafe.com", "$$", ["Mexican", "Italian"], 3.7, 
    {dineIn: true, takeOut: false, delivery: false});
}catch(e){
        console.log(e.message);
}
try{
  console.log(await restaurants.remove('615f29a055d1a32f34cbf3fa'));
}catch(e){
    console.log(e.message);
}

try{
    console.log(await restaurants.rename('615ea73bcefd41a4784ec307','http://www.unknownRest.com'));
}catch(e){
    console.log(e.message);
}

try{
    const updtWeb2 = await restaurants.rename(hotel3._id,'http:.magarihousecafe.com');
    console.log(updtWeb2);
}catch(e){
    console.log(e.message);
}

try{
    console.log(await restaurants.get('615ea73bcefd41a4784ec307'));
}catch(e){
    console.log(e.message);
}

    const db = await connection();
    await db.s.client.close();
};

main().catch((error) => {
    console.log(error);
  });