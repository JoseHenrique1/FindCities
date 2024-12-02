import "dotenv/config"
import express from "express"
import cors from "cors"
import { client } from "./config/client.js"
await client.connect()

const app = express()

app.use(express.json())
app.use(cors())

app.get("/svg/:estado/:municipio", async (req, res) => {
   

   const { estado, municipio } = req.params
   const pathEstado = await client.query('SELECT ST_AsSVG(geom) FROM estado WHERE nome ilike $1', [estado]);
   const pathMunicipio = await client.query(`SELECT ST_AsSVG(m.geom) 
    FROM municipio m
    JOIN estado e ON ST_Contains(e.geom, m.geom)
    WHERE m.nome ILIKE $1 AND e.nome ILIKE $2`, [municipio, estado]);
   const viewBox = await client.query('SELECT getViewBox($1)', [estado]);
   

   res.json({
      pathestado: pathEstado.rows[0].st_assvg,
      pathmunicipio: pathMunicipio.rows[0].st_assvg,
      viewbox: viewBox.rows[0].getviewbox
   });
})

app.listen(3000, () => console.log("Server running on port 3000"))