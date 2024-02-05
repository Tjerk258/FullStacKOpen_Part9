import { CoursePart, assertNever } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps): JSX.Element => {
  const coursePart = props.coursePart;
  switch (coursePart.kind) {
    case "basic":
      return (
        <li>
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            <b>Description:</b> {coursePart.description}
          </p>
        </li>
      );
    case "background":
      return (
        <li>
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            <b>Description:</b> {coursePart.description}<br />
            <b>Background meterial:</b> {coursePart.backgroundMaterial}
          </p>
        </li>
      );
    case "group":
      return (
        <li>
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            <b>Group Project Count:</b> {coursePart.groupProjectCount}
          </p>
        </li>
      );
    case "special":
      return (
        <li>
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
            <b>requirements:</b> {coursePart.requirements.join(', ')}<br />
            <b>Description:</b> {coursePart.description}
          </p>
        </li>
      );
    default:
      return assertNever(coursePart);
  }
}



interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <ul>
      {props.courseParts.map(part => <Part coursePart={part} />)}
    </ul>
  );
};

export default Content