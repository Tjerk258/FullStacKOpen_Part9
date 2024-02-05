import { Diary } from "../types";

interface DiaryProps {
  diary: Diary
}

const DiaryElement = (props: DiaryProps): JSX.Element => (
  <li key={props.diary.id}>
    <h2>{props.diary.date}</h2>
    <div><b>Weather: </b>{props.diary.weather}</div><br />
    <div><b>Visibility: </b>{props.diary.visibility}</div>
  </li>
)

interface DiariesProps {
  diaries: Diary[];
}

const Diaries = (props: DiariesProps): JSX.Element => (
  <>
    <h1>Diary entries</h1>
    <ul>
      {props.diaries.map(diary => <DiaryElement key={diary.id} diary={diary} />)}
    </ul>
  </>
)

export default Diaries