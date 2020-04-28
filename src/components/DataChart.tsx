import * as React from "react";
import {
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryScatter,
  VictoryLine,
  VictoryBrushContainer,
  VictoryArea,
} from "victory";
import { useSelector, RootStateOrAny } from "react-redux";
import { useState, useEffect } from "react";
import { eachDayOfInterval } from "date-fns";

import { Colors } from "../Layout/Colors";

const DataChart = (props: any) => {
  // get selectors from store
  const hourlyData = useSelector(
    (state: RootStateOrAny) => state.metocean.hourlyData.data
  );
  const columns = useSelector(
    (state: RootStateOrAny) => state.metocean.columns.data
  );

  // set inicial states
  const [dataSelected, setDataSelected] = useState<
    Array<{ x: Date; y: number }>
  >([]);
  const [selectedDomain, setSelectedDomain] = useState<any>();
  const [measurement, setMeasurement] = useState<string>();
  const [zoomValues, setZoomValue] = useState<Array<Date>>([]);

  // update chart value
  useEffect(() => {
    // set selected column data
    const newData = hourlyData.map((data: any) => {
      const y = data.time.slice(0, 4);
      const m = data.time.slice(5, 7);
      const d = data.time.slice(8, 10);
      const h = data.time.slice(11, 13);

      return {
        x: new Date(y, m, d, h),
        y: data[props.ySelected] * 100,
      };
    });
    setDataSelected(newData);

    // set measurement of selected column
    const newMeasurement = columns.find((c: any) => c.name === props.ySelected)
      .measurement;
    setMeasurement(newMeasurement);
  }, [props.ySelected, columns, hourlyData]);

  useEffect(() => {
    if (dataSelected.length > 0) {
      const newZoomValue = eachDayOfInterval({
        start: dataSelected.map((date: any) => date.x)[0],
        end: dataSelected.map((date: any) => date.x)[dataSelected.length - 1],
      });
      setZoomValue(newZoomValue);
    }
  }, [dataSelected]);

  return (
    <React.Fragment>
      {/* TOP CHART */}
      <VictoryChart
        theme={VictoryTheme.material}
        width={550}
        height={300}
        style={{ parent: { width: "90%", margin: "0 auto" }}}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            responsive={true}
            zoomDimension="x"
            zoomDomain={selectedDomain}
            onZoomDomainChange={(domain: any) => setSelectedDomain(domain)}
          />
        }
      >
        {/* X axis */}
        <VictoryAxis />
        {/* Y axis */}
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${y / 100} ${measurement}`}
        />
        {/* lines */}
        <VictoryLine
          style={{
            data: { stroke: Colors.secondary },
          }}
          data={dataSelected}
        />
        {/* dots */}
        <VictoryScatter
          size={3}
          labels={({ datum }) => {
            const label = parseFloat(datum.y) / 100;

            return `${label} ${measurement}`;
          }}
          labelComponent={<VictoryTooltip />}
          data={dataSelected}
        />
      </VictoryChart>

          {/* BOTTOM CHART */}
      <VictoryChart
        width={600}
        height={90}
        scale={{ x: "time" }}
        style={{ parent: { width: "90%", margin: "0 auto" } }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        containerComponent={
          <VictoryBrushContainer
            responsive={true}
            brushDimension="x"
            brushDomain={selectedDomain}
            onBrushDomainChange={(domain: any) => setSelectedDomain(domain)}
          />
        }
      >
        {/* X axis */}
        <VictoryAxis
          tickValues={zoomValues}
          tickFormat={(x) =>
            `${new Date(x).getDate()}/${new Date(x).getMonth()}/${new Date(x)
              .getFullYear()
              .toString()
              .substr(-2)}`
          }
        />
        {/* filled chart */}
        <VictoryArea
          style={{
            data: { stroke: Colors.primary, fill: Colors.primary },
          }}
          data={dataSelected}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 },
          }}
        />
      </VictoryChart>
    </React.Fragment>
  );
};

export default DataChart;