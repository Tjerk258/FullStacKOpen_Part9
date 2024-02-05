import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddPatientEntryForm from "./AddPatientEntryForm";
import { NewEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
  diagnosisCodes: string[]
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnosisCodes }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose} diagnosisCodes={diagnosisCodes}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientEntryModal;
