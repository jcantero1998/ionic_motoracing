var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Moto {
  constructor(
    public id: number,
    public model: string,
    public price: number,
    public rating: number,
    public shortDescription: string,
    public description: string,
    public type: string[],
    public image: string
  ) { }
}

const motos: Moto[] = [
  new Moto(
    0,
    "Moto1",
    24.99,
    4.3,
    "This is a short description of the First Moto",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ["A", "Sport"],
    "http://placehold.it/820x320"
  ),
  new Moto(
    1,
    "Moto2",
    64.99,
    3.5,
    "This is a short description of the Second Moto",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ["A2", "Naked"],
    "http://placehold.it/820x320"
  ),
  new Moto(
    2,
    "Moto3",
    74.99,
    4.2,
    "This is a short description of the Third Moto",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ["A2", "Street"],
    "http://placehold.it/820x320"
  ),
  new Moto(
    3,
    "Moto4",
    84.99,
    3.9,
    "This is a short description of the Fourth Moto",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ["A", "Sport"],
    "http://placehold.it/820x320"
  ),
  new Moto(
    4,
    "Moto5",
    94.99,
    5,
    "This is a short description of the Fourth Moto",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ["A2", "Custom"],
    "http://placehold.it/820x320"
  ),
  new Moto(
    5,
    "Moto6",
    54.99,
    4.6,
    "This is a short description of the Fourth Moto",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ["A2", "Sport"],
    "http://placehold.it/820x320"
  )
]





function getMotos(): any[] {
  return motos;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "127.0.0.1:8101"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/motos', bodyParser.json(), (req: any, res: any) => {

  let pNew = new Moto(
    motos.length + 1,
    req.body.model,
    req.body.price,
    req.body.rating,
    req.body.shortDescription,
    req.body.description,
    req.body.type,
    req.body.image
  );
  motos.push(pNew);
  res.status(200).send({ 
    id: pNew.id,
    model: pNew.model,
    price: pNew.price,
    rating: pNew.rating,
    shortDescription: pNew.shortDescription,
    description: pNew.description,
    type: pNew.type,
    image: pNew.image
   });
 
})

app.get('/', (req: any, res: any) => {
  res.send('The URL of motos is http://127.0.0.1:8101/motos');
});

app.get('/motos', (req: any, res: any) => {
 
  let tmp = getMotos();
  console.log("new request"+tmp);
  res.json(tmp);
});


function getMotosById(motoId: number): any {
  let p: any;
  p = motos.find(p => p.id == motoId);
  return p;
}

app.get('/motos/:id', (req: any, res: any) => {
  res.json(getMotosById(parseInt(req.params.id)));
});



function updateMotosById(req:any, motoId: number): any {
  let p: any;
  p = motos.find(p => p.id == motoId);
  let index = motos.indexOf(p);

  p.model =  req.body.model,
  p.price =  req.body.price,
  p.rating =  req.body.rating,
  p.shortDescription =  req.body.shortDescription,
  p.description =  req.body.description,
  p.type =  req.body.type,
  p.image =  req.body.image
  
  motos[index] = p;
  return p;
}

app.put('/motos/:id', function (req:any, res:any) {
  res.json(updateMotosById(req, parseInt(req.params.id)));
  res.send('Got a UPDATE request at /user');
});

function deleteMotosById(motoId: number): any {
  let p: any;
  p = motos.find(p => p.id == motoId);
  let index = motos.indexOf(p);
  motos.splice(index, 1);
  //delete motos[index];
  return p;
}

app.delete('/motos/:id', function (req:any, res:any) {
  res.json(deleteMotosById(parseInt(req.params.id)));
  res.send('Got a DELETE request at /user');
});

const server = app.listen(8100, "127.0.0.1", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});