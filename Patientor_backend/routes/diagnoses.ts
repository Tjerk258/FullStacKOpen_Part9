import express from 'express';
import diagnoses from '../services/diagnoses';
// import { NewDiagnoseEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnoses.getEntries());
});

// router.post('/', (req, res) => {
//   const { code, name, latin } = req.body;

//   if (typeof code === 'string' && typeof name === 'string') {
//     if (latin) {
//       if (typeof latin === 'string') {
//         const newDiagnose = diagnoses.addEntry({
//           code,
//           name,
//           latin
//         });
//         res.json(newDiagnose);
//       } else {
//         res.status(400).json({ error: 'malformed parameters' });
//       }
//     } else {
//       const newDiagnose = diagnoses.addEntry({
//         code,
//         name,
//       });
//       res.json(newDiagnose);
//     }
//   } else {
//     res.status(400).json({ error: 'malformed parameters' });
//   }

// });

export default router;