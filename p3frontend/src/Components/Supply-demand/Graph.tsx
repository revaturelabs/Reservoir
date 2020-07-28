import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
export default function Graph(props: any) {
  return (
    <Chart
      width={"80vw"}
      height={"80vh"}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          "S&D",
          "Demand",
          "Committed Supply",
          "Confirmed Supply",
          "Unconfirmed Supply",
        ],
        ["Total Demand", props.total_demand, undefined, undefined, 0],
        [
          "Total Supply",
          undefined,
          props.committed_supply,
          props.confirmed_supply,
          props.unconfirmed_supply,
        ],
        [
          "Total Available Currently",
          undefined,
          props.committed_curr,
          props.confirmed_curr,
          props.unconfirmed_curr,
        ],
        [
          "Total Available in 1 Month",
          undefined,
          props.committed_1m,
          props.confirmed_1m,
          props.unconfirmed_1m,
        ],
        [
          "Total Available in 3 Months",
          undefined,
          props.committed_3m,
          props.confirmed_3m,
          props.unconfirmed_3m,
        ],
      ]}
      options={{
        title: "Client Demands vs Revature Supply",
        chartArea: { left: "auto", width: "50%" },
        orientation: "horizontal",
        isStacked: true,
        hAxis: {
          title: "Number of Associates",
          minValue: 0,
        },
        series: {
          0: { color: "#F26925" },
          1: { color: "#FCB414" },
          2: { color: "#72A4C2" },
          3: { color: "#474C55" },
        },
      }}
      // For tests
      rootProps={{ "data-testid": "3" }}
    />
  );
}
