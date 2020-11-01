import axios from 'axios'

export const searchFromDkt = async (query: string) => {
  const url = `https://api-eu.preprod.decathlon.net/dktrent/api/v1/sites/full-text-search.json?fullTextToSearch=${query}`
  const callConfig = { 
    headers : {
      'x-api-key': '771e8ae7-04ae-498a-8141-5568016852c5',
      'Content-Type': 'application/json'
    }
  }
  const response = await axios.get(url, callConfig)
  return response.data
} 

export const searchFromGmaps = async (query: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&region=it&language=it&type=locality&key=${process.env.REACT_APP_HOST}`
  const callConfig = { 
    headers : {
      'Content-Type': 'application/json'
    }
  }
  const response = await axios.get(url, callConfig)
  return response.data.results
} 