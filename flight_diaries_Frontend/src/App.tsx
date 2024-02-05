import { useEffect, useState } from 'react'
import Diaries from './Components/Diaries'
import { getAllDiaries } from './Services/DiaryService'
import { Diary } from './types'
import NewDiaryForm from './Components/NewDiaryForm'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    const getAll = async () => {
      const data = await getAllDiaries()
      setDiaries(data)
    }
    getAll()
  })

  const addDiary = (diary: Diary) => {
    setDiaries(diaries.concat(diary))
  }

  return (
    <>
    <NewDiaryForm addDiary={addDiary}/>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App
