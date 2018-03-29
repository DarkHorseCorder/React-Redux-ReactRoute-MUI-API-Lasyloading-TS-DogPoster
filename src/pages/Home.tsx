import BreedsTable from 'components/BreedsTable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DogApis } from 'service/api-service';
import { setBreeds } from 'redux/redux-slice';
import { StoreValue } from 'types';
import mainLayoutWrapHOC from 'pages/hoc/MainLayoutWrapHOC';

/**
 * Pulling data from the dog server and dispatch data into the store
 */
const Home = () => {
  
  const breeds = useSelector((state: StoreValue) => state.breedReducer.breeds)
  const dispatch = useDispatch()

  useEffect(() => {
    const getBreeds = async (): Promise<void> => {
      try {
        const allBreeds: object = await DogApis.getAllBreeds()
        dispatch(setBreeds(allBreeds))
      } catch (e: any) {
        console.log('Get Recipes Error : ', e.response?.data?.message)
      }
    }
    if (breeds && Object.keys(breeds).length === 0 ) {
      getBreeds()
    }
  }, [dispatch, breeds])

  return (
    <BreedsTable /> 
  );
};

export default mainLayoutWrapHOC(Home);