import * as React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import '../../stylesheets/spinner.css';

interface ISpinnerProps {
  area:string
}

export const Spinner = ({area} : ISpinnerProps) => {
  
  const { promiseInProgress } = usePromiseTracker({area: area});

  if(promiseInProgress){
    return(
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
      </div>
    )
  } else{
    return (
      <></>
    )
  }
};