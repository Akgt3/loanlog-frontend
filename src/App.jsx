import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home.jsx'; // landing page
import Dash from './Pages/Dash';
import Add from './Pages/Add';
import Pnf from './Pages/Pnf';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import View from './Pages/View.jsx';
import Payment from './Pages/Payment.jsx';
import Edit from "./Pages/Edit";


function App() {
  const navigate = useNavigate(); // navigation hook

  return (
    <>
      <Header />
      <Routes>
        {/* Landing Page / Home with navigation props */}
        <Route
          path='/'
          element={
            <Home
              onGoToDashboard={() => navigate("/dash")}
              onAddLoan={() => navigate("/addloan")}
            />
          }
        />

        {/* Other routes */}
        <Route path='/dash' element={<Dash />} />
        <Route path='/addloan' element={<Add />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path='/*' element={<Pnf />} />
        <Route path="/edit/:id" element={<Edit />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
