import axios from "axios";
import "../Home/style.css";
import { useEffect, useState } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  async function senddata() {
    try {
      const responses = await axios.post(
        "http://ismayilli1.beget.tech/api/todo/store",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization:
              "Bearer 37|vpzXIdgYUVDhfovr56KCU2RV1f4uNcPAO5LIuadz394a5af4",
          },
        }
      );
      todofetch();
      console.log("Data sent successfully:", responses.data);
    } catch (error) {
      console.error("Error sending data:", error.message);
    }
  }

  async function update(id) {
    try {
      const data = await axios.post(
        `http://ismayilli1.beget.tech/api/todo/update/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      todofetch();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  async function todofetch() {
    try {
      const { data } = await axios.get(
        "http://ismayilli1.beget.tech/api/todo/index",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(data.data?.todos);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    todofetch();
  }, []);

  async function deletetodo(id) {
    try {
      const data = await axios.delete(
        `http://ismayilli1.beget.tech/api/todo/destroy/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      todofetch();
    } catch (e) {
      alert("xeta");
    }
  }
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <form>
            <label htmlFor="tittle">Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="tittle"
            />
            <label htmlFor="text">Password</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="text"
            />
            <button className="button" type="button" onClick={senddata}>
              Add
            </button>
          </form>
        </div>

        <div>
          <div>
            {filteredData.map((item) => (
              <div key={item.id} className="datacontanier">
                <td className="td">
                  <tr className="tr">Title: {item.title} </tr>
                  <tr className="tr">Description: {item.description}</tr>
                </td>
                <button
                  onClick={() => deletetodo(item.id)}
                  className="deletebtn"
                >
                  Delete
                </button>
                <button onClick={() => update(item.id)} className="updatebtn">
                  Update
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
