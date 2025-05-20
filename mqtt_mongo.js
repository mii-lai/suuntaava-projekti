
//MQTT-välityspalvelimen määrittely
const mqtt    = require('mqtt');
const broker = 'mqtt://automaatio:Z0od2PZF65jbtcXu@automaatio.cloud.shiftr.io';
const user = '';
const pw = ''; 

//määritellään välityspalvelimen "olio"
mq = mqtt.connect(broker, {
  'username': user,
  'password': pw
});

//tilataan oikea topic
mq.subscribe('automaatio2/#');

//liitytään välityspalvelimeen
mq.on('connect', function(){
    console.log('Connected.....');
});

//Määritellään tietokanta-API
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Miika:Peruna@miika.qfpm6fy.mongodb.net/?retryWrites=true&w=majority&appName=Miika";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//määritellään tietokannan ja kokoelman nimi sekä dataobjekti sensoridatan käsittelyyn
const myDB = client.db("sensordata2");
const myColl = myDB.collection("sensordata2");
var obj;

//odotetaan dataa välityspalvelimelta ja viedään data tietokantaan
mq.on('message', function(topic, message) {
  console.log(message.toString('utf8'));
  obj = JSON.parse(message);
  console.log(obj.Time, obj.T, obj.H, obj.DP, obj.pCount);
	myColl.insertOne(obj);
	console.log(
	`An entry was inserted successfully`,
	);
});





