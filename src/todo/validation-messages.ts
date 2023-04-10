export const validationMessages = {
  name: {
    required: 'Le nom es obligatore',
    minlength: 'Le nom doit avoir au min 3 caractére',
    maxlength: 'le nom ne doit pas depasser les 10 caracteres ',
  },
  description: {
    required: 'La description est obligatoire',
    minlength: 'La description doit avoir au moins 10 caractères',
  },
  status: {
    isIn: "Le statut doit être l'une des valeurs suivantes : actif, waiting, done",
  },

  userId: {
    required: 'le userId est obligatoire',
    number: ' le userId doit etre un nombre',
  },
};
