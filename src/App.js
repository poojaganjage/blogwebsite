import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import Blogs from './Components/Blogs';
import {useSelector} from "react-redux";
import {selectSignedIn} from "./features/userSlice";
import './App.css';

function App() {
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="App">
      <Navbar />
      <Homepage />
      {isSignedIn && <Blogs />}
    </div>
  );
}
export default App;
