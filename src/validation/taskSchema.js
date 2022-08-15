import * as yup from 'yup';

export const createTaskSchema = yup
  .object({
    title: yup.string().required('Título obrigatório'),
    description: yup.string().required('Descrição obrigatória'),
    date: yup.string().required('Data obrigatória'),
    time: yup.string().required('Horário obrigatório'),
    hour: yup
      .number()
      .typeError('Quantidade de horas obrigatório')
      .required('Quantidade de horas obrigatório'),
    minute: yup
      .number()
      .typeError('Quantidade de horas obrigatório')
      .required('Quantidade de minutos obrigatório'),
  })
  .required();
