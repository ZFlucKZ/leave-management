import { zodResolver } from '@hookform/resolvers/zod';
import { type ProfileInput } from '../types';
import * as validators from '../helpers/validators';
import { type SubmitHandler, useForm } from 'react-hook-form';
import AvatarUploader from '~/features/ui/components/AvatarUploader';
import { useSession } from 'next-auth/react';
import { getImagePath } from '~/features/shared/helpers/upload';
import FormField from '~/features/ui/components/form/FormField';
import Button from '~/features/ui/components/Button';
import { useEffect } from 'react';
import { Profile } from 'next-auth';
import { api } from '~/utils/api';
import { useAppStore } from '~/features/store';
import { useRouter } from 'next/router';

const Profile = () => {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const { mutateAsync: update } = api.auth.update.useMutation();
  const setUiToast = useAppStore((state) => state.setUiToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<ProfileInput>({
    resolver: zodResolver(validators.profile),
    defaultValues: { image: undefined },
  });

  const updateProfile: SubmitHandler<Profile> = async (profile) => {
    await update(profile);

    await updateSession(profile);

    setUiToast({
      type: 'Success',
      message: 'Your profile has already updated.',
    });

    void router.push('/leaves');
  };

  useEffect(() => {
    if (session?.user.name) setValue('name', session.user.name);
    if (session?.user.email) setValue('email', session.user.email);
  }, [session?.user.email, session?.user.name, setValue]);

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="center mx-auto py-3">
          <AvatarUploader
            defaultImage={
              session?.user.image
                ? getImagePath(session.user.image)
                : '/assets/images/avatar.png'
            }
            onImageChanged={(image) => {
              setValue('image', image, {
                shouldValidate: true,
              });
            }}
            error={errors.image?.message}
          ></AvatarUploader>
        </div>
        <FormField
          id="name"
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name')}
        ></FormField>
        <FormField
          id="email"
          type="email"
          label="Email"
          placeholder="Your email"
          error={errors.email?.message}
          {...register('email')}
        ></FormField>
        <FormField
          id="password"
          label="Password"
          placeholder="Your password"
          error={errors.password?.message}
          {...register('password')}
        ></FormField>
        <Button
          type="submit"
          align="center"
          color={isValid ? 'primary' : 'default'}
          disabled={!isValid}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default Profile;
