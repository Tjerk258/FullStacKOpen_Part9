import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface Hospital {
  entry: OccupationalHealthcareEntry
  diagnoses: Diagnosis[] | undefined
}

const OccupationalHealthCare = ({ entry, diagnoses }: Hospital) => (
  <div style={{ borderStyle: "solid", borderRadius: 10, padding: 10 }}>
    <div>{entry.date} <MedicalServicesIcon /> {entry.employerName}</div>
    <div>{entry.description}</div>
    {entry.sickLeave && <div><b>Sick leave: </b>{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</div>}
    {entry.diagnosisCodes && <><div><b>Diagneses:</b></div>
      <ul>
        {entry.diagnosisCodes?.map(code => (<li key={code}>{code} - {diagnoses?.find(f => f.code === code)?.name}</li>))}
      </ul></>}

    <br />
    <div>By {entry.specialist}</div>
  </div>
);

export default OccupationalHealthCare;