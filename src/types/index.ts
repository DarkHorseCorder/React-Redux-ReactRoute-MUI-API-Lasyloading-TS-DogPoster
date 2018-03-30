export interface StoreType {
  breeds: object
}
export interface StoreValue {
  breedReducer: StoreType
}

export interface IBreedItemType {
  breedName: string
  subBreeds: Array<string>
}