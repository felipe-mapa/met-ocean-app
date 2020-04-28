import React, { useEffect, useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Container,} from "@material-ui/core";

import "./App.css";
import * as actions from "./store/metoceanAction";
import ChartContainer from "./containers/ChartContainer";
import Spinner from "./Layout/Spinner/Spinner";
import Header from "./components/Header";

const App = () => {
  // get selectors from store
  const hourlyData = useSelector(
    (state: RootStateOrAny) => state.metocean.hourlyData.data
  );

  // set states
  const [isLoading, setIsLoading] = useState(true);

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
    }
  }, [hourlyData]);

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md" className="App">
        {!isLoading ? (
          <ChartContainer />
        ) : (
          // display a loader if data is not loaded
          <Spinner />
        )}
      </Container>
    </React.Fragment>
  );
};

export default App;
