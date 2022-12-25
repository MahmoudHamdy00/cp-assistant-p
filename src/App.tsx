import React from "react";
import { Button } from "react-bootstrap";
import { Header } from "./components/Header/Header";
import { ResultsStanding } from "./components/ResultsStanding/ResultsStanding";
import "./App.css";
import { listStatic } from "./AppConfig";
interface IHandle {
  handle: string;
  total: string;
  Results?: any;
}
 
function App() {
  const [handlesData, setHandlesData] = React.useState<IHandle[]>([]);
  const [handles, setHandles] = React.useState("");
  const [isLoadingHandlesData, setIsLoadingHandlesData] = React.useState(2);
  const [contestsIds, setContestsIds] = React.useState<string[]>([]);
  const [selectedValueList,setSelectedValueList] = React.useState("");
  const [listNames, setListNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    setListNames(Object.keys(listStatic));
    const contestsIdsStatic = [
      "219158",
      "219432",
      "219774",
      "219856",
      "223205",
      "223338",
      "223339",
      "223206",
      "223207",
      "223340"
    ];
    setContestsIds(contestsIdsStatic);
  }, []);

  const handleChange = (event: any) => {
    setHandles(event.target.value);
  };

  async function fetchHandlesData(handles: string[]) {
    setIsLoadingHandlesData(1);
    var results: IHandle[] = [];
    const resultsResponse = await fetch(
      "https://analysissolving.azurewebsites.net/api/Standing",
      {
        headers: {
          "x-functions-key":
            "iuGpPfo-Gqqx-J1VUPsnYXPFm-6YVESfMiwuyq3ZYejxAzFuFKSLkA==",
        },
        method: "POST",
        body: JSON.stringify({
          Handles: handles,
          Contests: contestsIds,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoadingHandlesData(0);
      });
    for (var i = 0; i < resultsResponse?.Result.length; i++) {
      results.push({
        handle: resultsResponse?.Result[i].Handle,
        total: resultsResponse?.Result[i].Total,
        Results: resultsResponse?.Result[i].Results,
      });
    }
    setIsLoadingHandlesData(0);
    return results;
  }

  async function searchClick() {
    const handlesDataEmpty: IHandle[] = [];
    setHandlesData(() => handlesDataEmpty);
    var handlesList: string[] = [];
    
    if(handles !== ""){
      handlesList = handles.split(" ");
    }

    if(selectedValueList !== ""){
      handlesList = handlesList.concat(listStatic[selectedValueList]);
    }

    if(handlesList.length === 0){
      return;
    }
    const handlesSet = new Set(handlesList);

    setHandlesData(await fetchHandlesData(Array.from(handlesSet)));
  }

  const valueListChange = (event: any) => {
    setSelectedValueList(event.target.value);
  };

  const resultsStandingJSX = React.useMemo(() => {
    if (isLoadingHandlesData === 1) {
      return (
        <div className="spinner-container">
          <div className="loading-spinner">
          </div>
        </div>
      );
    }
    if (
      isLoadingHandlesData !== 2 &&
      (!handlesData || handlesData.length === 0)
    ) {
      return <h1> No handles Found</h1>;
    }
    return ResultsStanding(handlesData);
  }, [handlesData, isLoadingHandlesData]);


  return (
    <div className="App">
      <Header />
      <div style={{ maxWidth: "1320px", margin: "auto", marginTop: "50px" }}>
        <textarea
          placeholder="Enter Handles separated by space"
          onChange={handleChange}
          value={handles}
          style={{ width: "50%",  }}
        >
        </textarea>
        <div>
          <label>
            Select name of List : &nbsp;
            <select value={selectedValueList} onChange={valueListChange}>
              <option value=""></option>
              {
                listNames.map((listName) => {
                  return <option value={listName}>{listName}</option>
                })
              }
            </select>
          </label>
        </div>
        <br></br>
        <Button
          type="button"
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
          onClick={searchClick}
        >
          Search
        </Button>
        {resultsStandingJSX}
      </div>
    </div>
  );
}

export default App;
