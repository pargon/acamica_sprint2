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

async function findSongById(id) {

    return await sequelize.query(`
        select 
            a.nombre as album,
            b.nombre as banda,
            c.nombre as cancion
        from cancion c
        left join album a on a.id = c.album_id
        left join bandamusical b on b.id = c.banda_id    
        where c.id = ${id};`, 
    {
        type: sequelize.QueryTypes.SELECT 
    });
}

async function findBandById(id) {

    return await sequelize.query(`
        select 
            b.nombre as banda,
            p.nombre as pais
        from bandamusical b
        left join pais p on p.id = b.pais_id
        where b.id = ${id};`, 
    {
        type: sequelize.QueryTypes.SELECT 
    });
}

async function findAlbumById(id) {

    return await sequelize.query(`
    select 
        a.nombre as album,
        b.nombre as banda
    from album a
    left join bandamusical b on b.id = a.banda_id    
    where a.id = ${id};`, 
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

app.get('/canciones/:id', async (req, resp) =>{

    const id = req.params.id;
    resp.json( await findSongById( id ));
} );

app.get('/bandas/:id', async (req, resp) =>{

    const id = req.params.id;
    resp.json( await findBandById( id ));
} );

app.get('/albums/:id', async (req, resp) =>{

    const id = req.params.id;
    resp.json( await findAlbumById( id ));
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