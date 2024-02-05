import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Hospital {
  entry: HospitalEntry
  diagnoses: Diagnosis[] | undefined
}

const HospitalDetailEntry = ({ entry, diagnoses }: Hospital) => (
  <div style={{ borderStyle: "solid", borderRadius: 10, padding: 10 }}>
    <div>{entry.date} - {entry.discharge.date}<LocalHospitalIcon /></div>
    <div>{entry.description}</div>
    {entry.diagnosisCodes && <><div><b>Diagneses:</b></div>
      <ul>
        {entry.diagnosisCodes?.map(code => (<li key={code}>{code} - {diagnoses?.find(f => f.code === code)?.name}</li>))}
      </ul></>}
      <br />
    <div>By {entry.specialist}</div>
  </div>
);

export default HospitalDetailEntry;