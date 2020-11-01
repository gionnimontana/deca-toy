import { searchFromDkt, searchFromGmaps } from '../api'
import { OptionType } from '../types'

export const getPlacesFromApis = async (query: string): Promise<OptionType[]> => {
  let dktError = false
  let gmapsError = false
  try {
    const dktResults: OptionType[] = await searchFromDkt(query)
    if (dktResults.length > 0) return dktResults
  } catch (e) {
    dktError = true
  }
  try {
    const gmapsResults: OptionType[]   = await searchFromGmaps(query)
    if (gmapsResults.length > 0) return gmapsResults
  } catch (e) {
    gmapsError = true
  }
  if (dktError && gmapsError) throw new Error('both api calls failed')
  return []
}