
export class UserModel {
  avatar = 'https://placehold.it/150x150';
  birthdate = '';
  cancer_name = '';
  children = 0;
  city = '';
  country = '';
  email = '';
  emotion = {
    img: './assets/images/emoji-happy.svg',
    is_active: 0,
    status: 'Normal'
  };
  genre = '';
  latitude = '';
  longitude = '';
  name = '';
  occupation = '';
  other_datas = {
    active: 0,
    token_device: '',
    last_access: '',
    healing_phrase : '',
    phrase_of_difficulties: ''
  };
  type_participant = 0;
  provider = 0;
  relationship = '';
  religion = 5;
  state = '';
  treatment = {
    cirurgia: 0,
    quimioterapia: 0,
    radiografia: 0,
    terapia_oval: 0,
    terapia_oral: 0,
    terapias_naturais: 0
  };
  type_cancer = {
    is_metastasis : 0,
    is_recurrent: 0
  };
  type_user = 'Normal';
}
