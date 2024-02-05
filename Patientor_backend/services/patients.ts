import data from "../data/patients";
import { Entry, NewEntry, NewPatientEntry, NonSensitivePatient, PatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

// const patients: PatientEntry[] = data;

const getEntries = (): PatientEntry[] => {
  return data;
};

const GetNonSensativePatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newData: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...newData
  };

  data.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = data.find(d => d.id === id);
  return entry;
};

const addEntry = (patientId: string, newData: NewEntry): Entry => {
  const id = uuid();
  const newEntryEntry: Entry = {
    id,
    ...newData
  };
  const Entrydata = data.find(d => d.id === patientId);
  if (Entrydata) {
    Entrydata.entries.push(newEntryEntry);
  }
  return newEntryEntry;
};

export default {
  getEntries,
  addPatient,
  GetNonSensativePatients,
  findById,
  addEntry
}; 