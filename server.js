const { Client } = require("pg")
const express = require("express")
const app = express();
const port = process.env.PORT || 5000;

var actualUser = "";
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/db";

const client = new Client(connectionString);

client.connect((err) => {
    if (err) {
        console.log("Error conectando a db: " + err);
    }
});

client.query("CREATE TABLE IF NOT EXISTS centros(id SERIAL PRIMARY KEY, nombre TEXT, likes SMALLINT, longitud SMALLINT, latitud SMALLINT, direccion TEXT, ciudad TEXT)", (err, result) => {
    if (err) {
        console.log("Error creando tabla Centros: " + err);
    }
});

client.query("CREATE TABLE IF NOT EXISTS doctoresVerificados(id SERIAL NOT NULL PRIMARY KEY, nombres TEXT, apellidos TEXT, especialidad TEXT, likes SMALLINT, idCentro INT REFERENCES centros(id))", (err, result) => {
    if (err) {
        console.log("Error creando tabla Doctores: " + err);
    }
});

client.query("CREATE TABLE IF NOT EXISTS doctoresPendientes(id SERIAL NOT NULL PRIMARY KEY, nombres TEXT, apellidos TEXT, especialidad TEXT, idCentro INT REFERENCES centros(id))", (err, result) => {
    if (err) {
        console.log("Error creando tabla Doctores: " + err);
    }
});

client.query("CREATE TABLE IF NOT EXISTS comentariosDoctores(id SERIAL PRIMARY KEY, usuario TEXT NOT NULL, fecha TEXT, comentario TEXT, fkDoctor INT REFERENCES doctores(id))", (err, result) => {
    if (err) {
        console.log("Error creando tabla ComentariosDoctores: " + err);
    }
});

client.query("CREATE TABLE IF NOT EXISTS comentariosCentro(id SERIAL PRIMARY KEY, usuario TEXT NOT NULL, fecha TEXT, comentario TEXT, fkCentro INT REFERENCES doctores(id))", (err, result) => {
    if (err) {
        console.log("Error creando tabla ComentariosCentros: " + err);
    }
});

app.get("/doctores/verificados", (req, res) => {
    client.query("SELECT * FROM doctoresVerificados", (err, result) => {
        if(err) {
            console.log("Error en SELECT * FROM doctoresVerificados: " + err);
        } else {
            res.send(result.rows)
        }
    })
})

app.get("/doctores/pendientes", (req, res) => {
    client.query("SELECT * FROM doctoresPendientes", (err, result) => {
        if(err) {
            console.log("Error en SELECT * FROM doctoresPendientes: " + err);
        } else {
            res.send(result.rows)
        }
    })
})

app.get("/doctores/agregarAPendiente", (req, res) => {
    const [nombres, apellidos, especialidad, idCentro] = req.query;
    client.query("INSERT INTO doctoresPendientes(nombres, apellidos, especialidad, idCentro) values($1, $2, $3, $4)", [nombres, apellidos, especialidad, idCentro], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("ok")
        }
    })
})

app.get("/doctores/agregarAVerificado", (req, res) => {
    const [id] = req.query;
    client.query("SELECT nombres, apellidos, especialidad, idCentro from doctoresPendientes where id = $1", [id], (err, result) => {
        if (err) {
            console.log("Error en SELECT doctorAgregarVerificado: " + err);
        } else {
            client.query("INSERT INTO doctoresVerificados(nombres, apellidos, especialidad, idCentro) values($1, $2, $3, $4)",
                [result.rows.nombres, result.rows.apellidos, result.rows.especialidad, result.rows.idcentro], (err, result) => {
                    if (err) {
                        console.log("Error en INSERT INTO doctoresVerificados: " + err);
                    } else {
                        client.query("DELETE FROM doctoresPendientes where id = $1", [id], (err, result) => {
                            if(err) {
                                console.log("Error en DELETE FROM doctoresPendientes: " + err)
                            } else {
                                res.send("Todo bien")
                            }
                        })
                    }
                })
        }
    })
})

app.get("/comentarios/doctor", (req, res) => {
    const [usuario, fecha, comentario, fkDoctor] = req.query;
    client.query("INSERT INTO comentariosDoctores(usuario, fecha, comentario, fkDoctor) values($1,$2,$3,$4", [usuario, fecha, comentario, fkDoctor], (err, result) => {
        if(err) {
            console.log("Error INSERT INTO comentariosDoctores: " + err);
            res.send(err)
        } else {
            res.send("ok")
        }
    })
})

app.get("/comentarios/doctor/eliminar", (req, res) => {
    const[id] = req.query
    client.query("DELETE FROM comentariosDoctores where id = $1", [id], (err, result) => {
        if(err) {
            console.log("Error en DELETE FROM comentariosDoctores: " + err);
            res.send(err)
        } else {
            res.send("ok")
        }
    })
})

app.get("/comentarios/centro", (req, res) => {
    const [usuario, fecha, comentario, fkCentro] = req.query;
    client.query("INSERT INTO comentariosCentros(usuario, fecha, comentario, fkDoctor) values($1,$2,$3,$4", [usuario, fecha, comentario, fkCentro], (err, result) => {
        if(err) {
            console.log("Error INSERT INTO comentariosCentros: " + err);
            res.send(err)
        } else {
            res.send("ok")
        }
    })
})

app.get("/comentarios/centro/eliminar", (req, res) => {
    const[id] = req.query
    client.query("DELETE FROM comentariosCentros where id = $1", [id], (err, result) => {
        if(err) {
            console.log("Error en DELETE FROM comentariosCentros: " + err);
            res.send(err)
        } else {
            res.send("ok")
        }
    })
})

app.get("/centros", (req,res) => {
    client.query("SELECT * FROM centros", (err, result) => {
        if(err){
            console.log("Error en SELECT * FROM centros: " + err);
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.get("/centros/like", (req,res) => {
    const {idCentro} = req.query
    client.query("UPDATE centros SET likes = (likes + 1) WHERE id = $1",[idCentro],(err, result) => {
        if(err){
            console.log("Error en UPDATE centros: " + err);
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.get("/centros/unlike", (req,res) => {
    const {idCentro} = req.query
    client.query("UPDATE centros SET likes = (likes - 1) WHERE id = $1",[idCentro],(err, result) => {
        if(err){
            console.log("Error en UPDATE centros: " + err);
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.get("/doctores/like", (req,res) => {
    const {idDoctor} = req.query
    client.query("UPDATE doctoresVerificados SET likes = (likes + 1) WHERE id = $1",[idDoctor],(err, result) => {
        if(err){
            console.log("Error en UPDATE doctoresVerificados: " + err);
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
})

app.get("/doctores/unlike", (req,res) => {
    const {idDoctor} = req.query
    client.query("UPDATE doctoresVerificados SET likes = (likes - 1) WHERE id = $1",[idDoctor],(err, result) => {
        if(err){
            console.log("Error en UPDATE doctoresVerificados: " + err);
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
})