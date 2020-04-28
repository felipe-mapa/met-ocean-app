import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";

import * as actions from "./store/metoceanAction";
import DataChart from "./components/DataChart";
import Spinner from "./Layout/Spinner/Spinner";

function App() {
  // get selectors from store
  const hourlyData = useSelector(
    (state: RootStateOrAny) => state.metocean.hourlyData.data
  );
  const columns = useSelector(
    (state: RootStateOrAny) => state.metocean.columns.data
  );

  // set states
  const [isLoading, setIsLoading] = useState(true);
  const [columnSelected, setColumnSelected] = useState<string>();

  // fetch all data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchColumns());
    dispatch(actions.fetchHoulyData());
  }, [dispatch]);

  //  check if it's loading
  useEffect(() => {
    if (hourlyData !== undefined) {
      setIsLoading(false);
      setColumnSelected(columns[0].name);
    }
  }, [hourlyData, columns]);

  return (
    <div className="App">
      {!isLoading ? (
        <div>
          {/* select column data */}
          <select
            value={columnSelected}
            onChange={(e) => {
              setColumnSelected(e.target.value);
            }}
          >
            {columns.map((d: any) => {
              if (d.name !== "time") {
                return (
                  <option key={d.name} value={d.name}>
                    {d.name} - {d.description}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>
          {/* display data from chosen column */}
          <DataChart ySelected={columnSelected} />
        </div>
      ) : (
        // display a loader if data is not loaded
        <Spinner />
      )}
    </div>
  );
}

export default App;
