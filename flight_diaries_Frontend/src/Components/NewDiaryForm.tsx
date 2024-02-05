import { useState } from "react";
import { createDiary } from "../Services/DiaryService";
import axios from "axios";
import { AddDairyFunctionType } from "../types";

interface DiariesProps {
  addDiary: AddDairyFunctionType;
}

interface NotificationProps {
  message: string;
}

const Notifications = (props: NotificationProps): JSX.Element => {
  if (props.message) {
    return (<div>{props.message}</div>)
  } else {
    return <></>
  }
}

const NewDiaryForm = (props: DiariesProps): JSX.Element => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [Notification, setNotification] = useState('');

  const setNotificationTimeout = (message:string, timeout:number) => {
    setNotification(message);
    setTimeout(() => setNotification(''), timeout);
  };

  const dairyCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const dairyToAdd = {
      date,
      visibility,
      weather,
      comment
    };
    try {
      const newDiary = await createDiary(dairyToAdd);
      setNotificationTimeout('Succesvolly added dairy entry', 5000);
      setComment('');
      props.addDiary(newDiary);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotificationTimeout(`Error: ${error.message}`, 5000);
      }
    }
  };



  return (
    <div>
      <h1>Add new entry</h1>
      <Notifications message={Notification} />
      <form onSubmit={dairyCreation}>
        <b>Date: </b> <input type="date" value={date} onChange={(event) => setDate(event.target.value)} /><br/>

        <b>Visibility: </b><input type="radio" id="great" name="visibility" value="great" onClick={() => setVisibility('great')}/>
        <label htmlFor="great">great</label>
        <input type="radio" id="good" name="visibility" value="good" onClick={() => setVisibility('good')}/>
        <label htmlFor="good">good</label>
        <input type="radio" id="ok" name="visibility" value="ok" onClick={() => setVisibility('ok')}/>
        <label htmlFor="ok">ok</label>
        <input type="radio" id="poor" name="visibility" value="poor" onClick={() => setVisibility('poor')}/>
        <label htmlFor="poor">poor</label><br/>

        <b>Weather: </b><input type="radio" id="sunny" name="weather" value="sunny" onClick={() => setWeather('sunny')}/>
        <label htmlFor="sunny">sunny</label>
        <input type="radio" id="rainy" name="weather" value="rainy" onClick={() => setWeather('rainy')}/>
        <label htmlFor="rainy">rainy</label>
        <input type="radio" id="cloudy" name="weather" value="cloudy" onClick={() => setWeather('cloudy')}/>
        <label htmlFor="cloudy">cloudy</label>
        <input type="radio" id="stormy" name="weather" value="stormy" onClick={() => setWeather('stormy')}/>
        <label htmlFor="stormy">stormy</label>
        <input type="radio" id="stormy" name="weather" value="stormy" onClick={() => setWeather('stormy')}/>
        <label htmlFor="stormy">stormy</label><br/>

        <b>Comment: </b><input value={comment} onChange={(event) => setComment(event.target.value)} /><br/>
        <button type='submit'>add</button>
      </form>
    </div>
  )
};

export default NewDiaryForm
