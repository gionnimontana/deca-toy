import React,  { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import lodash from 'lodash'

interface CountryType {
  name: string
}

export default function Asynchronous() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<CountryType[]>([])
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  
  const debounce = lodash.debounce((nextValue) => getData(nextValue as string), 1000)
  const debouncedSave = useRef(debounce).current

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open]);

  const getData = async (query: string) => {
    try {
      setLoading(true)
      const response = await axios.get('https://country.register.gov.uk/records.json?page-size=5000')
      const countries = await response.data
      console.log(countries)
      setOptions(Object.keys(countries).map((key) => countries[key].item[0]) as CountryType[])
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchChange = async (e: any) => {
    const searchTerm = e.target.value as string
    setValue(searchTerm)
    debouncedSave(searchTerm)
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="SELEZIONA UN LUOGO"
          variant="outlined"
          onChange={handleSearchChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}