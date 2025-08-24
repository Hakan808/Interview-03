import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  //KODUNUZ BURAYA GELECEK
  const [activity, setActivity] = useState([]);
  const [show, setShow] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(0);
  const handleDetails = (id) => {
    setSelectedId((pre) => {
      if (pre === id) {
        return null;
      }
      return id;
    });
  };

  useEffect(() => {
    const query = async () => {
      try {
        const response = await axios.get("http://localhost:5000/activities");
        console.log(response.data);
        setActivity(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    query();
  }, []);
  const handleNext = () => {
    
    if(index >= activity.length) return
    setSelectedId(null)
    setIndex((prev) => prev + 1);
    setShow((pre) => [...pre, activity[index]]);
  };

  if (activity.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleNext} className="btn next-btn">
        Next Activity
      </button>
      <div className="container">
        {show.map((item) => {
          return (
            <div key={item.key}>
              <button
                onClick={() => handleDetails(item.key)}
                className={`btn ${selectedId === item.key ? "active" : null}`}
              >
                {item.type}
              </button>
              <br />
              <ExpandableListItem
                item={item}
                isOpen={selectedId === item.key}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExpandableListItem = ({ item, isOpen }) => {
  // KODUNUZ BURAYA GELECEK
  const { activity, participants, price, accessibility } = item;

  if (isOpen) {
    return (
      <div className="item">
        <p>activity : {activity}</p>
        <p>participants : {participants}</p>
        <p>price : {price}</p>
        <p>accessibility : {accessibility}</p>
      </div>
    );
  }
};

export default App;
