import "dotenv/config"
import express from "express"
import cors from "cors"
import { client } from "./config/client.js"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/svg/:estado/:municipio", async (req, res) => {
   await client.connect()

   const { estado, municipio } = req.params
   const pathEstado = await client.query('SELECT ST_AsSVG(geom) FROM estado WHERE nome ilike $1', [estado]);
   const pathMunicipio = await client.query('SELECT ST_AsSVG(geom) FROM municipio WHERE nome ilike $1', [municipio]);
   const viewBox = await client.query('SELECT getViewBox($1)', [estado]);

   res.json({
      pathestado: pathEstado.rows[0].st_assvg,
      pathmunicipio: pathMunicipio.rows[0].st_assvg,
      viewbox: viewBox.rows[0].getviewbox
   });
})

app.listen(3000, () => console.log("Server running on port 3000"))