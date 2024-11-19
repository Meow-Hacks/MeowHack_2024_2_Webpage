import { Outlet } from "react-router-dom";
import './App.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";

const App: React.FC = () => {

  return (
    <>
      {/* <HeaderComponent /> */}
      <Outlet />
    </>
  )
}

export default App