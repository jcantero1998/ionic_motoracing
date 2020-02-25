import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MotoData implements InMemoryDbService {

  createDb() {
    let motos = [
      {
        id: 1,
        modelo: "cbf",
        tipo: "street",
        imagen: "",
        descripcion: "",
        precio: 15000
      },
      {
        id: 2,
        modelo: "cbr",
        tipo: "sport",
        imagen: "",
        descripcion: "",
        precio: 10000
      }
    ];
    return { motos: motos };
  }
}
