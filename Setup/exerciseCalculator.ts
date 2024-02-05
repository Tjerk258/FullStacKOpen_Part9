export type rating = 1 | 2 | 3;
export type ratingDescription = 'you failed' | 'you did very well' | 'you met the target';

export interface TrainingObject {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: rating;
  ratingDescription: ratingDescription;
}

export const calculateExercises = (dailyExercise: number[], target: number): TrainingObject => {
  if (dailyExercise.find(day => isNaN(day))) {
    throw new Error('Provided dailyExercise is not a array with numbers');
  } else if (isNaN(target)) {
    throw new Error('Provided target is not a number');
  }
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.reduce((i, day) => day ? i + 1 : i, 0);
  const average = dailyExercise.reduce((i, day) => i + day) / periodLength;
  const success = average >= target;
  const [rating, ratingDescription] = ((): [rating, ratingDescription] => {
    if (!success) {
      return [1, 'you failed'];
    } else if (average > (target + 2)) {
      return [3, 'you did very well'];
    } else {
      return [2, 'you met the target'];
    }
  })();
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// console.log(
//   process.argv.slice(2, process.argv.length - 1).map(number => Number(number)),
//   Number(process.argv[process.argv.length - 1])
// );

// console.log(
//   calculateExercises(
//     process.argv.slice(2, process.argv.length - 1).map(number => Number(number)),
//     Number(process.argv[process.argv.length - 1])
//   )
// );
