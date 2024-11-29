import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { useEffect, useState } from "react"
interface state {
  id: number,
  name: string
}
interface CityInterface {
  id: number,
  nome: string
}
interface props {
  value: string
  setValue: (value: string) => void,
  state: state
}
export function CityCombobox({ value, setValue, state }: props) {
  const [open, setOpen] = React.useState(false)
  const [cities, setCities] = useState<CityInterface[]>([])
  console.log("-> " + value + state.name);

  useEffect(() => {
    setValue("")
    if (state.name === "") {
      setOpen(false)
    }
    else {
      const idState = state.id
      fetch(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${idState}/municipios`)
        .then(response => response.json())
        .then((result: CityInterface[]) => {
          setCities(result)

        })
        .catch(error => console.log('error', error));
    }
  }, [state])

  const enabled = state.name.length > 0 ? true : false


  return (
    <Popover open={open && enabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? cities.find((city) => city.nome === value)?.nome
            : "Select a city..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.nome}
                  value={city.nome}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {city.nome}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === city.nome ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
