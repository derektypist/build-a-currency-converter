const { useState, useMemo, useEffect, useCallback, useRef } = React;

export function CurrencyConverter() {

const [currency, setCurrency] = useState(1);
const [startRate, setStartRate] = useState(1);
const [targetRate,setTargetRate] = useState(1);

const [startUnits, setStartUnits] = useState("USD");
const [targetUnits, setTargetUnits] = useState("USD");

const defaultStartUnit = useRef("USD");
const defaultTargetUnit = useRef("USD");

const currencyOptions = [{
  name: "USD",
  rate: 1
}, {
  name: "EUR",
  rate: 0.85
}, {
  name: "GBP",
  rate: 0.73
}, {
  name: "JPY",
  rate: 144.3
}, {
  name: "CAD",
  rate: 1.36
}];

const total = useMemo(() => {
return currency * (targetRate/startRate)
}, [currency, startRate]);

const handleStartUnits = useCallback((e) => {
  const selectedName = e.target.value;
  const currency = currencyOptions.find(c => c.name === selectedName);
  const unit = e.target.options[e.target.selectedIndex].text;
  setStartRate(currency.rate);
  setStartUnits(unit);
});

const handleTargetExchange = useCallback((e) => {
  const selectedName = e.target.value;
  const currency = currencyOptions.find(c => c.name === selectedName);
  const unit = e.target.options[e.target.selectedIndex].text;
  setTargetRate(currency.rate);
  setTargetUnits(unit);
});

const resetAll = useCallback(() => {
  setCurrency(1);
  setTargetRate(1);
  setStartRate(1);
  setTargetUnits("USD");
  defaultStartUnit.current.selectedIndex = 0;
  defaultTargetUnit.current.selectedIndex = 0;
});

return (
  <div className="container">
  <h1>Currency Converter</h1>
  <p>Convert {startUnits} to {targetUnits}</p>
  <input className="select-field" type="number" value={currency} onChange={e=>setCurrency(e.target.value)} />
  <p>Start Currency</p>
  <select className="select-field" onChange={handleStartUnits} ref={defaultStartUnit}>
{currencyOptions.map((c) => (<option value={c.name} key={c.name}>{c.name}</option>))}
  </select>

  <p>Target Currency</p>
  <select className="select-field" onChange={handleTargetExchange} ref={defaultTargetUnit}>
  {currencyOptions.map((c) => (<option value={c.name} key={c.name}>{c.name}</option>))}
  </select>

  <p className="total">Converted Amount: {total.toFixed(2)} {targetUnits}</p>
  <button className="reset" onClick={resetAll}>Reset</button>
  </div>
)


}
