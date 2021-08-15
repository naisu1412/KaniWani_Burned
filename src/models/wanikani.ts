export interface IAssignment {
  id: Number;
  object: string;
  url: string;
  data_updated_at: string;
  data: {
    created_at: string;
    subject_id: Number;
    subject_type: string;
    srs_stage: Number;
    unlocked_at: string;
    started_at: string;
    passed_at: string;
    burned_at: string;
    available_at: string;
    resurrected_at: string;
  };
}

export interface ISubject {

}
