import "./App.css";
import CreditCard from "./creditcard";
import BoxColor from "./BoxColor";
import visaImg from "./assets/images/visa.png";
import masterImg  from "./assets/images/master.png";


function App() {
  return (
    <div className="App">
      <h1> LAB | React Training</h1>

<CreditCard
  type="Visa"
  number="0123456789018875"
  expirationMonth={3}
  expirationYear={2021}
  bank="BNP"
  owner="Maxence Bouret"
  bgColor="#11aa99"
  color="white"
  picture= {visaImg}
/>
    
<CreditCard
  type="Master Card"
  number="0123456789010993"
  expirationMonth={3}
  expirationYear={2021}
  bank="N26"
  owner="Maxence Bouret"
  bgColor="#eeeeee"
  color="#222222"
  picture= {masterImg}
/>
    
<CreditCard
  type="Visa"
  number="0123456789016982"
  expirationMonth={12}
  expirationYear={2019}
  bank="Name of the Bank"
  owner="Firstname Lastname"
  bgColor="#ddbb55"
  color="white"
  picture= {visaImg}
/>

<BoxColor r={255} g={0} b={0} />
<BoxColor r={128} g={255} b={0} />

    </div>
  );
}

export default App;