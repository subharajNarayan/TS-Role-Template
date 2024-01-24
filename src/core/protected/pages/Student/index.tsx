import React from 'react';
import { GeneralCard } from '../../../../components/UI/GeneralCard';
import Form from './Form';
import List from './List';

interface Props {

}

const StudentIndex = (props: Props) => {

  const [editData, setEditData] = React.useState<any>();
  console.log({ editData });

  return (
    <div className='container'>
      <GeneralCard title={"Student"}>
        <div className="row">
          <div className="col-lg-12">
            <Form editData={editData} setEditData={setEditData}/>
          </div>
          <div className="col-lg-12 mt-3">
            <List setEditData={setEditData} />
          </div>
        </div>
      </GeneralCard>
    </div>
  )
}

export default StudentIndex;