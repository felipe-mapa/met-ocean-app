import React, { useEffect, useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import DataChart from "../components/DataChart";
import Spinner from "../Layout/Spinner/Spinner";
import { Typography } from "@material-ui/core";

const ChartContainer = () => {
  // get selectors from store
  const columns = useSelector(
    (state: RootStateOrAny) => state.metocean.columns.data
  );

  // set states
  const [columnSelected, setColumnSelected] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  // set inicial state for column
  useEffect(() => {
    setColumnSelected(columns[0].name);
    setIsLoading(false)
  }, []);

  useEffect(() => {
    if(columnSelected !== undefined) {
      setIsLoading(false)
    }
  }, [columnSelected])

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="body1" align="justify">
        To begin you analyzes, select one of the following options from the
        dropbox below:
      </Typography>
      {/* select column data */}
      <select
        value={columnSelected}
        style={{ margin: "0 auto" }}
        onChange={(e) => {
          setIsLoading(true);
          return setColumnSelected(e.target.value);
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
      {!isLoading ? (
        <DataChart ySelected={columnSelected} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ChartContainer;
