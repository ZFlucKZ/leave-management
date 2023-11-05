import { AddLeaveInput } from '../types';
import LeaveForm from './LeaveForm';

const CreateLeave = () => {
  const createLeave = (leave: AddLeaveInput) => {

  }

  return <LeaveForm kind='create' onSubmit={createLeave}></LeaveForm>;
};

export default CreateLeave;
