import React from 'react';
import { GeneralCard } from '../../../../components/UI/GeneralCard';
import Form from './Form';
import List from './List';

interface Props {

}

const index = (props: Props) => {
  return (
    <div className='container py-3'>
      <GeneralCard title={"Tasks"}>
        <div className="row">
          <div className="col-lg-12">
            <Form />
          </div>
          <div className="col-lg-12">
            <List />
          </div>
        </div>
      </GeneralCard>
    </div>
  )
}

export default index