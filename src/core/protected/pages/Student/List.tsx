import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
// import { Table } from 'reactstrap';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import { RootState } from '../../../../store/root-reducer';
import useDeleteConfirmation from '../../../../hooks/useDeleteConfirmation';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal';
import { toast } from 'react-toastify';
import { getStudentLogsAction } from '../../../../store/modules/Student/getStudentLogs';
import { deleteStudentLogsAction } from '../../../../store/modules/Student/deleteStudentLogs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton } from '@mui/material';
import moment from 'moment';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const List = (props: Props) => {
  
  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    props.getStudentLogsAction();
  }, [])

  const studentDetails = useSelector((state: RootState) => state.StudentData.getStudentLogs.data)
  console.log({ studentDetails });

  const handleStudentAction = async () => {
    const res = await props.deleteStudentLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toggleModal();
      resetDeleteData();
      props.getStudentLogsAction();
      toast.success("Task Deleted Successfully")
    } else {
      toast.error("Task Delete Failed")
    }
  }

  // return (
  //   <div className='task-list container-fluid'>
  //     <div className="task-list-table table-responsive">
  //       <Table>
  //         <thead>
  //           <tr>
  //             <th>SN</th>
  //             <th>Student Name</th>
  //             <th>Gender</th>
  //             <th>Phone Number</th>
  //             <th>Address</th>
  //             <th>Date of Birth</th>
  //             <th>Fee</th>
  //             <th>Section</th>
  //             <th>Action</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {studentDetails?.map((item, index) => (
  //             <tr key={index}>
  //               <td>{index + 1}</td>
  //               <td>{item.stdname}</td>
  //               <td>{item.gender}</td>
  //               <td>{item.phoneno}</td>
  //               <td>{item.address}</td>
  //               <td>{item.dob}</td>
  //               <td>{item.fee}</td>
  //               <td>{item.section}</td>
  //               <td className='action d-flex'>
  //                 <div role='button' className="mr-1">
  //                   <img src={EditIconDark} alt="edit" />
  //                 </div>
  //                 <div role='button' className="mr-0">
  //                   <img src={DeleteIcon} alt="delete" onClick={() => handleDeleteClick(item.id)}/>
  //                 </div>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </Table>
  //     </div>
  //     <ConfirmationModal open={modal}
  //       handleModal={() => toggleModal()}
  //       handleConfirmClick={() => handleStudentAction()} />
  //   </div>
  // )

  return (
    <div className='task-list container-fluid'>
      <div className="task-list-table table-responsive">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Fee</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentDetails?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.stdname}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.phoneno}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{moment.utc(item.dob).format("YYYY-MM-DD HH:mm A")}</TableCell>
                  <TableCell>{item.fee}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{item.section}</TableCell>
                  <TableCell className='action'>
                    <IconButton color="primary">
                      <img src={EditIconDark} alt="Edit" onClick={() => props.setEditData(item)}/>
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(item.id)}>
                      <img src={DeleteIcon} alt="Delete" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ConfirmationModal open={modal}
        handleModal={() => toggleModal()}
        handleConfirmClick={() => handleStudentAction()} />
    </div>
  );
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {
  getStudentLogsAction,
  deleteStudentLogsAction,
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(List);