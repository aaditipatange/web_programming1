const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const reviews = data.reviews;
const restaurants = data.restaurants;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const hotel1 = await restaurants.create("Cafe Magari", "Kandivali, Thane", 
     "828-252-3478", "http://www.magari.com", "$$", ["Mexican","Italian"], {dineIn: true, takeOut: false, delivery: false});
    console.log('First Restaurant that is entered in Database: \n')
    //console.log(hotel1);

    const hotel2 = await restaurants.create("Borivali Biryani Center BBC", "Borivali, Mumbai", 
    "567-696-3213", "http://www.bbcborivali.com", "$", ["Indian", "Chinese"],
    {dineIn: true, takeOut: true, delivery: true});
    console.log('First output of all Restaurants in Database: \n')
    //console.log(await restaurants.getAll());

    const hotel3 = await restaurants.create("Silver Coin", "IC Colony, New Jersey", 
    "852-569-5890", "http://www.silvercoingroups.com", "$$$$", ["Continental", "Kebab"],
    {dineIn: false, takeOut: true, delivery: false});
    console.log('Third Restaurant that is entered in Database: \n')
    //console.log(hotel3);

    const hotel4 = await restaurants.create("Papa Jones", "The Heights, New Jersey", 
    "852-569-1234", "http://www.papajones.com", "$$", ["Pizza"],
    {dineIn: false, takeOut: true, delivery: true});
    console.log('Fourth Restaurant that is entered in Database: \n')

    const hotel5 = await restaurants.create("Ujala Kabab", "Manhatten Ave, New Jersey", 
    "852-123-5390", "http://www.ujalak.com", "$", ["Indian", "Kebab"],
    {dineIn: false, takeOut: true, delivery: false});
    console.log('Fifth Restaurant that is entered in Database: \n')

    const hotel6 = await restaurants.create("The Veg Treat", "Shimpoli, Mumbai", 
    "123-569-5890", "http://www.vegtreat.com", "$$$$", ["Lebanese", "French"],
    {dineIn: true, takeOut: false, delivery: true});
    console.log('Sixth Restaurant that is entered in Database: \n')

    const hotel7 = await restaurants.create("Deepak", "Babhai, Borivali", 
    "852-569-9872", "http://www.deepakrest.com", "$$", ["Indian", "Thai"],
    {dineIn: false, takeOut: true, delivery: false});
    console.log('Seventh Restaurant that is entered in Database: \n')

    const hotel8 = await restaurants.create("Kyuramen", "Exchange place, New York", 
    "852-382-5890", "http://www.kyuramen.com", "$$$$", ["Japanese"],
    {dineIn: true, takeOut: true, delivery: false});
    console.log('Eighth Restaurant that is entered in Database: \n')

    const hotel9 = await restaurants.create("Shake Shak", "Washington ave, Hoboken", 
    "852-569-1144", "http://www.shakeshak.com", "$", ["American", "Fast food"],
    {dineIn: true, takeOut: true, delivery: true});
    console.log('Ninth Restaurant that is entered in Database: \n')

    const hotel10 = await restaurants.create("Joeys Pizza", "Time Square, New York", 
    "111-569-5890", "http://www.joeyspizza.com", "$$", ["Pizza"],
    {dineIn: false, takeOut: true, delivery: false});
    console.log('Tenth Restaurant that is entered in Database: \n')

    // const updtWeb1 = await restaurants.update(hotel1._id,"Cafe Magari", "Kandivali, Thane", 
    // "828-252-3478", "http://www.magari.com", "$$", ["Mexican","Italian"], {takeOut: false, delivery: false});  
    // //name, location, phoneNumber, website, priceRange, cuisines, serviceOptions
    // console.log('First Restaurant updated in Database: \n')
    // console.log(updtWeb1);

    const rev1 = await reviews.create(hotel1._id,'Best Food','Sahil',1,'10/23/2021','loving it');
    const rev2 = await reviews.create(hotel1._id,'Best Service','Saurabh',2,'10/23/2021','Must try');
    const rev3 = await reviews.create(hotel1._id,'Best Ambience','Yogita',3,'10/23/2021','Cant recommend enough');
    const rev4 = await reviews.create(hotel4._id,'Best quality ','Vedant',4,'10/23/2021','Had a great time');
    const rev5 = await reviews.create(hotel4._id,'Best Value ','Abhi',5,'10/23/2021','loved everything about this place');

    const rev6 = await reviews.create(hotel5._id,'aaa','Aaditi',3.7,'10/23/2021','This is a review');
    const rev7 = await reviews.create(hotel5._id,'Baaa ','Chetana',2.7,'10/23/2021','I was here');
    const rev8 = await reviews.create(hotel2._id,'cde ','Shivani',1.7,'10/23/2021','Been there');
    const rev9 = await reviews.create(hotel3._id,'fgh ','Rejoy',4.7,'10/23/2021','had the best kabab');
    const rev10 = await reviews.create(hotel2._id,'ijk ','Akshat',5,'10/23/2021','Visiting soon again');

    const rev11 = await reviews.create(hotel6._id,'lmn ','Aditya',3.1,'10/23/2021','had a blast');
    const rev12 = await reviews.create(hotel7._id,'opq ','Harsh',3.2,'10/23/2021','to good to be true');
    const rev13 = await reviews.create(hotel8._id,'rst ','Sanjana',3.3,'10/23/2021','lovely place');
    const rev14 = await reviews.create(hotel9._id,'uvw ','Nivetha',3.4,'10/23/2021','please visit and support');
    const rev15 = await reviews.create(hotel10._id,'xyz ','Kamya',3.5,'10/23/2021','was a disappointment');

    // const rev16 = await reviews.create(hotel4._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev17 = await reviews.create(hotel4._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev18 = await reviews.create(hotel4._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev19 = await reviews.create(hotel4._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev20 = await reviews.create(hotel4._id,'Best ','Sahil',3.7,'10/22/2021','loving it');

    // const rev21 = await reviews.create(hotel5._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev22 = await reviews.create(hotel5._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev23 = await reviews.create(hotel5._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev24 = await reviews.create(hotel5._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev25 = await reviews.create(hotel5._id,'Best ','Sahil',3.7,'10/22/2021','loving it');

    // const rev26 = await reviews.create(hotel6._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev27 = await reviews.create(hotel6._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev28 = await reviews.create(hotel6._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev29 = await reviews.create(hotel6._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev30 = await reviews.create(hotel6._id,'Best ','Sahil',3.7,'10/22/2021','loving it');

    // const rev31 = await reviews.create(hotel7._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev32 = await reviews.create(hotel7._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev33 = await reviews.create(hotel7._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev34 = await reviews.create(hotel7._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev35 = await reviews.create(hotel7._id,'Best ','Sahil',3.7,'10/22/2021','loving it');

    // const rev36 = await reviews.create(hotel8._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev37 = await reviews.create(hotel8._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev38 = await reviews.create(hotel8._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev39 = await reviews.create(hotel8._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev40 = await reviews.create(hotel8._id,'Best ','Sahil',3.7,'10/22/2021','loving it');

    // const rev41 = await reviews.create(hotel9._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev42 = await reviews.create(hotel9._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev43 = await reviews.create(hotel9._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev44 = await reviews.create(hotel9._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev45 = await reviews.create(hotel9._id,'Best ','Sahil',3.7,'10/22/2021','loving it');

    // const rev46 = await reviews.create(hotel10._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev47 = await reviews.create(hotel10._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev48 = await reviews.create(hotel10._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev49 = await reviews.create(hotel10._id,'Best ','Sahil',3.7,'10/22/2021','loving it');
    // const rev50 = await reviews.create(hotel10._id,'Best ','Sahil',3.7,'10/22/2021','loving it');

  console.log('Done seeding database');

  //db = await dbconnection();
  await db.s.client.close();
}

main().catch((error) => {
  console.log(error);
});