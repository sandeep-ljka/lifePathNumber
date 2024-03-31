import { useState } from "react";
import "./App.css";

const initial_State = { lifePathNumber: "", description: "" };

function App() {
  const [enteredDate, setEnteredDate] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(initial_State);

  const handleSubmit = async () => {
    if (enteredDate === "") {
      setErr(true);
      return;
    }

    setLoading(true);
    const split = enteredDate.split("-");
    const year = split[0];
    const month = split[1];
    const date = split[2];

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: JSON.stringify({
          date: `${month}/${date}/${year}`,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const parsedData = await response.json();

      setRes(parsedData);
      setEnteredDate("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setErr(false);
    setEnteredDate(e.target.value);
  };

  return (
    <div className="datePickerHolder">
      <label className="datePickerLabel">
        Check what your <b>life path number</b> says about you
      </label>

      {err && (
        <label className="errorLabel">Date shouldn't be empty or invalid</label>
      )}

      <input
        value={enteredDate}
        className="datePickerComponent"
        type="date"
        onChange={handleDateChange}
        disabled={loading}
      />

      <button
        className="submitBtn"
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      >
        Evaluate
      </button>

      {!!res.description && !!res.lifePathNumber && (
        <div className="result">
          <span>
            <b>Life Path Number:</b> {res.lifePathNumber}
          </span>
          <span>
            <b>What it means:</b> {res.description}
          </span>
          <button
            className="clearBtn"
            type="button"
            onClick={() => setRes(initial_State)}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
