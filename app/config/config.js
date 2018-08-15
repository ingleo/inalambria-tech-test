//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BD
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/lista-mercado';
} else {
    urlDB = 'mongodb://admin:inalambria18@ds121282.mlab.com:21282/lista-mercado'
}
process.env.URLDB = urlDB;