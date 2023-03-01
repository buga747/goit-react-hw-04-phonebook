import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // for React-hook-form work with Yup
import * as yup from 'yup'; // Form validation
import {
  Label,
  LabelName,
  Button,
  ErrorText,
  Form,
  Input,
} from './ContactForm.styled';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup
    .string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export function ContactForm({ addContact }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', number: '' },
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    addContact(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>
          <LabelName>Name</LabelName>
          <Input
            {...register('name', {
              required: true,
            })}
            aria-invalid={errors['name'] ? 'true' : 'false'}
            type="text"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
        </Label>
        {errors['name'] && (
          <ErrorText role="alert">{errors['name']?.message}</ErrorText>
        )}
      </div>

      <div>
        <Label>
          <LabelName>Number</LabelName>
          <Input
            {...register('number', {
              required: true,
            })}
            aria-invalid={errors['number'] ? 'true' : 'false'}
            type="tel"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
        </Label>
        {errors['number'] && (
          <ErrorText role="alert">{errors['number']?.message}</ErrorText>
        )}
      </div>

      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
