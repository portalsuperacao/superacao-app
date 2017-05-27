
export class UserModel {
  pacient: '';
  cancer_status: '';
  participant_profile:any = {
    participant_type: String,
    first_name: String,
    last_name: '',
    occupation: '',
    country: '',
    state: '',
    city: '',
    relationship: '',
    sons: '',
    facebook: '',
    instagram: '',
    whatsapp: '',
    youtube: '',
    snapchat: '',
    genre: '',
    email: String,
    belief: ''
  };
  current_treatment_profile: {
    metastasis: boolean;
    relapse: boolean;
    treatments: [
      {
        status: '',
        treatment_type_id: 1
      }
    ]
  }
}
