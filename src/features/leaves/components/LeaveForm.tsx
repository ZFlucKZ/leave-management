import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Datepicker, { type DateValueType } from 'react-tailwindcss-datepicker';

// {
//   leaveDate: string // datetime
//   reason:string
// }

const schema = z.object({
  leaveDate: z.string().datetime(),
  reason: z.string().min(1),
});

const LeaveForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
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
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((value) => console.log(value))}
    >
      <h1>Create Leave</h1>
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
        Create Leave
      </button>
    </form>
  );
};

export default LeaveForm;
