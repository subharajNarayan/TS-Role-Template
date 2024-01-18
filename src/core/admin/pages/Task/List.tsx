import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import { getTaskLogsAction } from '../../../../store/modules/Task/getTaskLogs';
import { Dispatch } from 'redux';
import { RootState } from '../../../../store/root-reducer';

interface Props extends PropsFromRedux {

}

const List = (props: Props) => {

  React.useEffect(() => {
    props.getTaskLogsAction();
  },[])

  const TaskDetails = useSelector((state: RootState) => state.TaskData.getFormLogs.data);
console.log({TaskDetails});


  return (
    <div className='task-list container-fluid'>
      <div className="task-list-table table-responsive">
        <Table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Address</th>
              <th>Assigned Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {TaskDetails?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
                <td>{item.address}</td>
                <td>{item.assigned_user_name}</td>
                <td className='action d-flex'>
                <div role='button' className="mr-1">
                  <img src={EditIconDark} alt="edit" />
                </div>
                <div role='button' className="mr-0">
                  <img src={DeleteIcon} alt="delete" />
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {
  getTaskLogsAction
}


const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(List);