
export class UserModel {
  pacient;
  cancer_status;
  participant_profile = {
    participant_type: "angel",
    first_name: "Allison",
    last_name: "Teste",
    occupation: "Corporate Response Specialist",
    country: "Índia",
    state: "Tocantins",
    city: "Município de Nicolasdo Sul",
    relationship: "Solteira",
    sons: 4,
    facebook: "http://swiftbarrows.co/petra",
    instagram: "http://prohaska.net/luisa",
    whatsapp: "http://grimetokes.name/norris",
    youtube: "http://oconnell.info/zoey",
    snapchat: "http://vonrueden.biz/rhett.hilpert",
    genre: "other",
    email: "loyce@hintz.io",
    belief: "Kaffir Leaves"
  };
  current_treatment_profile: {
    metastasis,
    relapse,
    treatments: [
      {
        status,
        treatment_type_id
      }
    ]
  }
  avatar = '';
  birthdate = '';
  cancer_name = '';
  children = 0;
  city = '';
  country = '';
  email = '';
  emotion = {
    img: '',
    is_active: 0,
    status: ''
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
    healing_phrase: '',
    phrase_of_difficulties: ''
  };
  type_participant = 0;
  provider = 0;
  relationship = '';
  religion = 0;
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
    is_metastasis: 0,
    is_recurrent: 0
  };
  type_user = '';
}
