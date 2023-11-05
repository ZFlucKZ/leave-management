import { type SubmitHandler, useForm } from 'react-hook-form';
import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Datepicker, { type DateValueType } from 'react-tailwindcss-datepicker';
import {
  type UpdateLeaveInput,
  type AddLeaveInput,
  type LeaveDetails,
} from '../types';
import * as validators from '../helpers/validators';
import { capitalize } from 'lodash';

// {
//   leaveDate: string // datetime
//   reason:string
// }

export type LeaveFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddLeaveInput>;
    }
  | {
      kind: 'edit';
      leave: LeaveDetails;
      onSubmit: SubmitHandler<UpdateLeaveInput['data']>;
    };

const LeaveForm = (props: LeaveFormProps) => {
  const { kind, onSubmit } = props;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<
    typeof onSubmit extends SubmitHandler<AddLeaveInput>
      ? AddLeaveInput
      : UpdateLeaveInput['data']
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.add : validators.updateForm,
    ),
    defaultValues: kind === 'edit' ? props.leave : undefined,
  });

  const handleValueChange = (value: DateValueType) => {
    if (value?.startDate) {
      setValue('leaveDate', new Date(value.startDate).toISOString(), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const currentLeaveDate = getValues('leaveDate');
  const currentLeaveRange = {
    startDate: currentLeaveDate,
    endDate: currentLeaveDate,
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h1>{capitalize(kind)}</h1>
      <label>Leave Date</label>
      <Datepicker
        value={currentLeaveRange}
        onChange={handleValueChange}
        useRange={false}
        asSingle={true}
      />
      <label htmlFor="reason">Reason</label>
      <textarea id="reason" rows={3} {...register('reason')}></textarea>
      {errors.reason && <div>{errors.reason.message}</div>}
      <button type="submit" disabled={!isValid}>
        {capitalize(kind)}
      </button>
    </form>
  );
};

export default LeaveForm;
