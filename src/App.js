import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, add, format } from "date-fns"


function App(){
  // State to store the user birthday
  const [birthday,setBirthday] = useState("");
  const [timeOfBirth,settimeOfBirth] = useState("");
  const [milestones,setMilestones] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [birthDate, setBirthDate] = useState(null);


  // Detect user's timezone on components load
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
  }, [])
  // Handle input change
  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
    // Update State with input value
  };
  const handleTimeChange = (event) => {
    settimeOfBirth(event.target.value);
    
  };
  const handleDateChange = (date) => {
    setBirthDate(date);
    
  }



  // Function to calculate milestones
  const calculateMilestone = () => {
    if(!birthday || !timeOfBirth) {
      alert("Please select your date of birth!") 
      return ;
    }

    

    const milestoneArray = [];
    const birthDateTime = new Date(`${birthday}T${timeOfBirth}`);

    // calculate milestone
    const oneThousandsDays = new Date(birthDateTime.getTime() + 1000 * 24 * 60 * 60 * 1000);
    milestoneArray.push(`1,000 days old: ${oneThousandsDays.toLocaleString("en-US", {timeZone: timezone})}`);

    const twoThousandsDays = new Date(birthDateTime.getTime() + 2000 * 24 * 60 * 60 * 1000);
    milestoneArray.push(`2,000 days old: ${twoThousandsDays.toLocaleString("en-US", {timeZone: timezone})}`);

    const tenThousandsDays = new Date(birthDateTime.getTime() + 10000 * 24 * 60 * 60 * 1000);
    milestoneArray.push(`10,000 days old: ${tenThousandsDays.toLocaleString("en-US", {timeZone: timezone})}`);

    const fiftyThousandsDays = new Date(birthDateTime.getTime() + 50000 * 24 * 60 * 60 * 1000);
    milestoneArray.push(`50,000 days old: ${fiftyThousandsDays.toLocaleString("en-US", {timeZone: timezone})}`);

    const twoThousandsWeeks = new Date(birthDateTime.getTime() + 2000 * 7 * 24 * 60 * 60 * 1000);
    milestoneArray.push(`2,000 weeks old: ${twoThousandsWeeks.toLocaleString("en-US", {timeZone: timezone})}`);

    const twoThousandsHours = new Date(birthDateTime.getTime() + 50000 *  60 * 60 * 1000);
    milestoneArray.push(`2,000 hours old: ${twoThousandsHours.toLocaleString("en-US", {timeZone: timezone})}`);


    setMilestones(milestoneArray);
    
  }

  return(
    <div style={styles.container}>
      <h1 style={styles.header}>Age MileStone Calculator</h1>
      <p style={styles.subHeader}>Enter your birthday to calculate special milestone</p>
      <div style={styles.form}>
        <label style={styles.label}>Date of Birth</label>
        {/* <br/>
        <DatePicker
        selected={birthDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select Date and Time"
        /> */}
        <input
        type="date"
        value={birthday}
        onChange={handleBirthdayChange}
        style={styles.input}
        />
        <label style={styles.label}>Time of Birth</label>
        <input
        type="time"
        value={timeOfBirth}
        onChange={handleTimeChange}
        style={styles.input}
        />

        <button
        onClick={calculateMilestone}
        style={styles.button}
        >
          calculate MileStone
        </button>
      </div>

      {/* Display timezone */}
      {timezone && (
        <p style={styles.timezone}>
          <strong> Your timezone: </strong>
          {timezone}
        </p>
      )}
      
      {/* Display MileStone */}
      {milestones.length > 0 && (
        <div style={styles.milestonesContainer}>
          <h2 style={styles.milestoneHeader}>Your MileStone</h2>
          <ul style={styles.milestoneList}>
            {milestones.map((miles, index) => (
              <li key={index} 
              style={styles.milestoneItem}
              >{miles}</li>
            ))}
          </ul>
        </div>

      )}
    </div>

  )
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  header: {
    fontSize: "2rem",
    color: "#6A5ACD",
    marginBottom: "10px"
  },
  subHeader: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "20px"
  },
  form: {
    backgroundColor: "#F9F9F9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "1rem",
    color: "#333"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    border: "1px solid #DDD",
    borderRadius: "5px",
    width: "100%"
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#6A5ACD",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  milestonesContainer: {
    marginTop: "20px",
    textAlign: "left",
  },
  milestoneHeader: {
    fontsize: "1.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  milestoneList: {
    listStyleType: "none",
    padding: 0,
  },
  milestoneItem: {
    backgroundColor: "#FFF",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #DDD",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  }
}

export default App;
