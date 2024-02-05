import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, Slider, OutlinedInput } from '@mui/material';

import { NewEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnosisCodes: string[];
}

const AddPatientEntryForm = ({ onCancel, onSubmit, diagnosisCodes }: Props) => {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodesSelected, setDiagnosisCodesSelected] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [criteria, setCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case 'HealthCheck':
        onSubmit({
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodesSelected,
          healthCheckRating
        });
        return;
      case 'Hospital':
        onSubmit({
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodesSelected,
          discharge: {
            date: dischargeDate,
            criteria
          }
        });
        return;
      case 'OccupationalHealthcare':
        onSubmit({
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodesSelected,
          employerName,
          sickLeave: {
            startDate,
            endDate
          }
        });
        return;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Entry Type</InputLabel>
        <Select
          fullWidth
          value={type}
          label="HealthCheck"
          onChange={({ target }) => setType(target.value)}
          placeholder="Entry Type"
        >
          <MenuItem value={'HealthCheck'}>Health Check Entry</MenuItem>
          <MenuItem value={'Hospital'}>Hospital Entry</MenuItem>
          <MenuItem value={'OccupationalHealthcare'}>Occupational Health Care Entry</MenuItem>
        </Select>
        <TextField
          // label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          labelId="Diagnosis Codes"
          id="Diagnosis Codes"
          multiple
          fullWidth
          label="Diagnosis Codes"
          placeholder="Diagnosis Codes"
          value={diagnosisCodesSelected}
          onChange={({target}) => setDiagnosisCodesSelected(typeof target.value === 'string' ? target.value.split(',') : target.value)}
          input={<OutlinedInput label="Name" />}
        >
          {diagnosisCodes.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>

        {type === 'HealthCheck' &&
          <>
            <InputLabel>Health Rating</InputLabel>
            <Slider
              aria-label="Health Rating"
              defaultValue={0}
              value={healthCheckRating}
              onChange={(event, value) => setHealthCheckRating(Number(value))}
              // getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={3}
            />
          </>
        }

        {type === 'Hospital' &&
          <>
            <InputLabel>Discharge</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </>
        }

        {type === 'OccupationalHealthcare' &&
          <>
            <TextField
              label="employerName"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel>Discharge</InputLabel>
            <InputLabel>startDate</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel>endDate</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </>
        }


        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;