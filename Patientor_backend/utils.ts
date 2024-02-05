import data from "./data/diagnoses";
import { NewPatientEntry, Gender, NewEntry, NewHospitalEntry, Discharge, NewHealthCheckEntry, HealthCheckRating, DiagnoseEntry, NewOccupationalHealthcareEntry, SickLeave } from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {

  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient: NewPatientEntry = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: []
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseString = (string: unknown, variableName: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`incorrect or missing ${variableName}`);
  }
  return string;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('incorrect or missing gender');
  }
  return gender;
};

// const parseEntries = (entries: unknown): Entry[] => {
//   if (!Array.isArray(entries)) {
//     throw new Error('incorrect or missing entries');
//   }
// let newEntries: Entry[] = [];
// entries.forEach(entry => {
//   newEntries.push(toNewEntryEntry(entry));
// })
  
// };


export const toNewEntryEntry = (object: unknown): NewEntry => {

  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }


  if (!('type' in object) || !('description' in object) || !('date' in object) || !('specialist' in object)) {
    throw new Error('incorrect or missing entries');
  }
  const description: string = parseString(object.description, 'description');
  const date: string = parseString(object.date, 'date');
  const specialist: string = parseString(object.specialist, 'specialist');
  let diagnosisCodes: string[] | undefined = undefined;
  if ('diagnosisCodes' in object)
    diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);

  switch (object.type) {
    case "Hospital":
      if ('discharge' in object) {
        const newEntry: NewHospitalEntry = {
          description,
          type: object.type,
          date,
          specialist,
          discharge: parseDischarge(object.discharge),
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined
        };
        return newEntry;
      }
      break;
    case "HealthCheck":
      if ('healthCheckRating' in object) {
        const newEntry: NewHealthCheckEntry = {
          description,
          type: object.type,
          date,
          specialist,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined
        };
        return newEntry;
      }
      break;
    case "OccupationalHealthcare":
      let sickLeave: SickLeave | undefined = undefined;
      if ('sickLeave' in object) {
        sickLeave = parseSickLeave(object.sickLeave);
      }
      if ('employerName' in object) {
        const newEntry: NewOccupationalHealthcareEntry = {
          description,
          type: object.type,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
          sickLeave: sickLeave ? sickLeave : undefined,
          employerName: parseString(object.employerName, 'employerName')
        };
        return newEntry;
      }
      break;
  }
  throw new Error('incorrect or missing entries');
};


// if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
//   const newPatient: NewPatientEntry = {
//     name: parseName(object.name),
//     dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//     ssn: parseSsn(object.ssn),
//     gender: parseGender(object.gender),
//     occupation: parseOccupation(object.occupation),
//     entries: parseEntries(object.entries)
//   };
//   return newPatient;
// }
// throw new Error('Incorrect data: some fields are missing');
// };

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if(!('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Incorrect or missing data');
  }
  const newSickLeave: SickLeave = {
    startDate: parseString(sickLeave.startDate, 'startDate'),
    endDate: parseString(sickLeave.endDate, 'endDate')
  };
  return newSickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('date' in discharge && 'criteria' in discharge) {
    const newDischarge: Discharge = {
      date: parseString(discharge.date, 'date'),
      criteria: parseString(discharge.criteria, 'criteria')
    };
    return newDischarge;
  }
  throw new Error('incorrect or missing discharge');

};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (typeof healthCheckRating === 'number' && !isHealthCheckRating(healthCheckRating)) {
    throw new Error('incorrect or missing healthcheckrating');
  }
  switch (healthCheckRating) {
    case 0:
      return HealthCheckRating.Healthy;
    case 1:
      return HealthCheckRating.LowRisk;
    case 2:
      return HealthCheckRating.HighRisk;
    case 3:
      return HealthCheckRating.CriticalRisk;
    default:
      return HealthCheckRating.CriticalRisk;
  }
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v).includes(param);
};

const parseDiagnosisCodes = (codes: unknown): Array<DiagnoseEntry['code']> => {
  if (!Array.isArray(codes)) {
    throw new Error('incorrect or missing parseDiagnosisCodes');
  }
  const NewDiagnoseCodes: Array<DiagnoseEntry['code']> = [];
  codes.forEach(code => {
    if (!isString(code)) {
      throw new Error('incorrect or missing parseDiagnosisCodes');
    }
    if (!data.map(da => da.code).includes(code)) {
      throw new Error('incorrect or missing parseDiagnosisCodes');
    }
    NewDiagnoseCodes.push(code);
  });
  return NewDiagnoseCodes;
};