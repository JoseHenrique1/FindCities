import { useEffect, useState } from "react"
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

interface StateInterface  {
  id: number,
  sigla: string,
  nome: string,
  regiao: {
    id: number,
    sigla: string,
    nome: string
  }
}
interface state {
  id: number,
  name: string
}
interface props {
  value: state,
  setValue: (value: state) => void

}

export function StateCombobox({value, setValue}: props) {
  const [open, setOpen] = useState(false)
  const [states, setStates] = useState<StateInterface[]>([])
  console.log(states);
  

  useEffect(()=>{
    fetch("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json())
        .then((result: StateInterface[])=>{ setStates(result) })
        .catch(error => console.log('error aqui', error));
  },[])
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value.name!== ""
            ? states.find((state) => state.nome === value.name)?.nome
            : "Select a state..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search a state..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {states.map((state) => (
                <CommandItem
                  key={state.nome}
                  value={state.nome}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value.name ? {id: 0, name: ""} : { id: state.id, name: state.nome })
                    setOpen(false)
                  }}
                >
                  {state.nome}
                  <Check
                    className={cn(
                      "ml-auto",
                      value.name === state.nome ? "opacity-100" : "opacity-0"
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
