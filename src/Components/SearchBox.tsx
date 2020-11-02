import React from 'react'
import { Box, Paper } from '@material-ui/core'
import PlaceSearch from './PlaceSearch'

const SearchBox = () => {

  return (
    <Paper square={true} elevation={3}>
      <Box padding="20px">
        <PlaceSearch />
      </Box>
    </Paper>
  )
}

export default SearchBox