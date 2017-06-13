export class UserCredentias {
  constructor(
    public email: string,
    public password: string
  ) {}
}

export class UserTreatmentAttributes {
  status: any
  treatment_type_id: number
  treatable_type: any
}

export class UserCancerTreatmentsAttributes {
  cancer_type_id: number
  cancerous_type: any
}

export class UserModel {
  uid: any
  type: string
  pacient: string
  family_member: string
  cancer_status: any
  participant_profile_attributes = {
    avatar: <string> null,
    first_name: <string> null,
    last_name: <string> null,
    birthdate: <any> null,
    occupation: <string> null,
    country: <string> null,
    state: <string> null,
    city: <string> null,
    relationship: <string> null,
    sons: <number> null,
    facebook: <string> null,
    instagram: <string> null,
    whatsapp: <string> null,
    youtube: <string> null,
    snapchat: <string> null,
    participant_id: <number> null,
    genre: <string> null,
    email: <any> null,
    belief: <string> null,
    healing_quote: <string> null,
    difficulty_quote: <string> null
  }
  past_treatment_profile_attributes = {
    metastasis : <boolean> null,
    relapse: <boolean> null,
    treatments_attributes: <[UserTreatmentAttributes]> null,
    cancer_treatments_attributes: <[UserCancerTreatmentsAttributes]> null
  }
  current_treatment_profile_attributes = {
    metastasis: <boolean> null,
    relapse : <boolean> null,
    treatments_attributes: <[UserTreatmentAttributes]> null,
    cancer_treatments_attributes: <[UserCancerTreatmentsAttributes]> null
  }
}
