import { CityCombobox } from "./city-combobox"
import { StateCombobox } from "./state-combobox"
import { useEffect, useState } from "react"

interface DataResponseInterface {
  pathestado: string
  pathmunicipio: string
  viewbox: string
}

interface state {
  id: number,
  name: string
}

export function Main() {
  const [svg, setSvg] = useState({
    pathCity: '',
    pathState: '',
    viewBox: '0 0 0 0'
  })



  const [state, setState] = useState<state>({ id: 0, name: "" })
  const [city, setCity] = useState("")

  //const {pathCity, pathState, viewBox} = svg;

  useEffect(() => {
    if (state.name !== "" && city !== "") {
      console.log(city, "here");
      
      fetch(`http://localhost:3000/svg/${state.name}/${city}`)
        .then(res => res.json())
        .then((data: DataResponseInterface) => {
          setSvg({
            pathCity: data.pathmunicipio,
            pathState: data.pathestado,
            viewBox: data.viewbox
          })
        })
    }
  }, [state, city])
  return (
    <main className=" px-4 pb-4 space-y-4">
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-around">
        <StateCombobox value={state} setValue={setState} />
        <CityCombobox value={city} setValue={setCity} state={state} />
      </div>

      <div className=" bg-gray-200">
        {state.name !== "" && city !== "" ?
          <svg className="max-w-full max-height-off-map mx-auto" viewBox={svg.viewBox}>
            <path d={svg.pathState} />
            <path d={svg.pathCity} fill="red" />
          </svg>
          :
          <p className="text-center">Selecione um estado e uma cidade</p>}
      </div>

    </main>
  )
}

