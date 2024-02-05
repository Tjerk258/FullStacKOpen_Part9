export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseDescirption extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBaseDescirption {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBaseDescirption {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartBaseDescirption {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};