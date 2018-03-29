import { BASE_URL, httpClient } from "./http-client"

export const DogApis = {
  getAllBreeds: async () => await httpClient.get(`${BASE_URL}breeds/list/all`),
  getBreedImages: async (breed: string) => await httpClient.get(`${BASE_URL}breed/${breed}/images`),
  getSubBreeds: async (breed: string) => await httpClient.get(`${BASE_URL}breed/${breed}/list`),
}