import data from "../data/diagnoses";
import { DiagnoseEntry } from "../types";

const diagnose: DiagnoseEntry[] = data;

const getEntries = (): DiagnoseEntry[] => {
  return diagnose;
};

export default {
  getEntries,
};