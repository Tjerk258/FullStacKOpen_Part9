import { Diagnosis, HealthCheckEntry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface Hospital {
  entry: HealthCheckEntry
  diagnoses: Diagnosis[] | undefined
}

const HealthCheck = ({ entry, diagnoses }: Hospital) => {
  const HealthCheckColor = (health: number): string => {
    switch (health) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div style={{ borderStyle: "solid", borderRadius: 10, padding: 10 }}>
      <div>{entry.date} <MedicalServicesIcon /></div>
      <div>{entry.description}</div>
      <FavoriteIcon style={{ color: HealthCheckColor(entry.healthCheckRating) }} />
      {entry.diagnosisCodes && <><div><b>Diagneses:</b></div>
      <ul>
        {entry.diagnosisCodes?.map(code => (<li key={code}>{code} - {diagnoses?.find(f => f.code === code)?.name}</li>))}
      </ul></>}

      <br />
      <div>By {entry.specialist}</div>
    </div>
  );
};

export default HealthCheck;