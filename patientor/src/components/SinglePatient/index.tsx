import { useEffect, useState } from "react";
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';

import { Diagnosis, Entry, NewEntry, Patient } from "../../types";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

import { useParams } from "react-router-dom";
import HospitalDetailEntry from "./HospitalEntry";
import OccupationalHealthCare from "./OccupationalHealthCare";
import HealthCheck from "./HealthCheck";
import AddPatientEntryModal from "../AddPatientEntry";
import { Button } from "@mui/material";
import axios from "axios";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[] | undefined;
}

const EntryDetails = ({entry, diagnoses}: EntryDetailsProps) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalDetailEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCare entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  useEffect(() => {
    const getPatient = async () => {
      if(id) {
        setPatient(await patientService.getById(id));
      }
    };
    getPatient();
  }, [id]);

  useEffect(() => {
    const getDiagnosis = async () => {
        setDiagnosis(await diagnosisService.getAll());
    };
    getDiagnosis();
  }, []);

  const submitNewEntryPatient = async (entry: NewEntry) => {
    try {
      if(patient){
        const NewEntry = await patientService.createEntry(patient.id, entry);
        const entries = patient.entries;
        const newEntries = entries.concat(NewEntry);
        const newPatient = {...patient, entries: newEntries};
        setPatient(newPatient);
      }
      setModalOpen(false);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };


  if(!patient || !diagnosis) {
    return <></>;
  }

  return (
    <div className="App">
     <h2>{patient.name}</h2>
     <div>ssn: {patient.ssn}</div>
     <div>occupation: {patient.occupation}</div>
     <h3>entries</h3>
     {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} diagnoses={diagnosis}/>)}
     <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntryPatient}
        error={error}
        onClose={closeModal}
        diagnosisCodes={diagnosis?.map(codes => codes.code)}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default SinglePatient;
