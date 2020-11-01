import React,  { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import lodash from 'lodash'
import { getPlacesFromApis } from '../utils/functions'
import { OptionType } from '../utils/types'

const PlaceSeach = () => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<OptionType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  const debounce = lodash.debounce((nextValue) => getData(nextValue as string), 1000)
  const debouncedSave = useRef(debounce).current

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const getData = async (query: string) => {
    try {
      setLoading(true)
      const apiResults = await getPlacesFromApis(query)
      setOptions(apiResults)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = async (e: any) => {
    const searchTerm = e.target.value as string
    if (searchTerm.length < 3) return
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
      onChange={(e) => console.log('select', e)}
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

export default PlaceSeach