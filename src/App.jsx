import './App.css'
import 'react-calendar/dist/Calendar.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from './assets/components/Calendar';

function App() {
  

  return (
    <>
    <div className='px-0 md:px-20 lg:px-44'>
      <BigCalendar />
    </div>
           
    </>
  )
}

export default App
