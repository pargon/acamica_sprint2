var express = require('express');
var app = express();
const sequelize = require('./conexion.js');

app.use(express.json());

async function findAllSongs() {

    sequelize.query("SELECT * FROM cancion", { type: sequelize.QueryTypes.SELECT })
        .then(function (productos) {
            console.log(productos);
        })
}

async function findSongByArtist(nombre) {

    return await sequelize.query(`select * 
    from cancion 
    where banda_id in(
        select id
        from bandamusical
        where nombre like '%${nombre}%');`, 
    {
        type: sequelize.QueryTypes.SELECT 
    });
}

async function createSong(nombre,duracion,banda_id,album_id,fechaPublicacion){

    return await sequelize.query(
        `INSERT INTO cancion
        (nombre,
        duracion,
        banda_id,
        album_id,
        fechaPublicacion)
        VALUES(
            '${nombre}',
            ${duracion},
            ${banda_id},
            ${album_id},
            '${fechaPublicacion}')`, 
    {
        type: sequelize.QueryTypes.INSERT
    });
}

async function updateSong(id,nombre,duracion,banda_id,album_id,fechaPublicacion){

    return await sequelize.query(
        `UPDATE cancion SET
            nombre = '${nombre}',
            duracion = ${duracion},
            banda_id = ${banda_id},
            album_id = ${album_id},
            fechaPublicacion = '${fechaPublicacion}'
        WHERE id = ${id}`, 
    {
        type: sequelize.QueryTypes.UPDATE
    });
}

async function deleteSong(id){

    return await sequelize.query(
        `DELETE FROM cancion
        WHERE id = ${id}`, 
    {
        type: sequelize.QueryTypes.DELETE
    });
}

app.get('/canciones', async (req, resp) =>{

    const nombre = req.query.nombre;
    resp.json( await findSongByArtist( nombre ));
} );

app.post('/canciones', async (req, resp) =>{

    const {
        nombre,
        duracion,
        banda_id,
        album_id,
        fechaPublicacion
    } = req.body;

   resp.status(201).json( await createSong(nombre,duracion,banda_id,album_id,fechaPublicacion));
} );


app.put('/canciones/:id', async (req, resp) =>{

    const {id} = req.params;
    const {
        nombre,
        duracion,
        banda_id,
        album_id,
        fechaPublicacion
    } = req.body;

   resp.status(201).json( await updateSong(id,nombre,duracion,banda_id,album_id,fechaPublicacion));
} );

app.delete('/canciones/:id', async (req, resp) =>{

    const {id} = req.params;
    resp.status(204).json( await deleteSong(id));
} );

app.listen(5050, function () {
    console.log('Sistema armado en el puerto 5050!');
});