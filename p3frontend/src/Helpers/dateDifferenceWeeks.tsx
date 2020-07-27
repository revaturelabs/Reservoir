import React from "react";
import { Table } from "reactstrap";
import Calendar from "react-calendar";

export class TestdateDifferenceWeeks extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dates: [
        //display dates. see the week difference.
        { i: 4, start: new Date(2020, 5, 16), end: new Date(2020, 6, 4) },
        { i: 3, start: new Date(2020, 0, 18), end: new Date(2020, 0, 14) },
        { i: 2, start: new Date(2020, 0, 1), end: new Date(2020, 0, 4) },
        { i: 1, start: new Date(2020, 0, 1), end: new Date(2020, 0, 8) },
        { i: 0, start: new Date(2020, 5, 19), end: new Date(Date.now()) },
      ],
    };
  }

  render() {
    return (
      <Table>
        {this.state.dates.map((twoDates: any) => {
          return (
            <>
              <tr>
                {/* <td>{twoDates.start.toDateString()} Day {twoDates.start.getDay()}</td> 
						<td>{twoDates.end.toDateString()} Day {twoDates.end.getDay()}</td>  */}
                <td>
                  <Calendar value={[twoDates.start, twoDates.end]} />
                </td>
                <td>i {twoDates.i}</td>
                <td>
                  Week diff {dateDifferenceWeeks(twoDates.start, twoDates.end)}
                </td>
              </tr>
            </>
          );
        })}
      </Table>
    );
  }
}

/*
	{dateDifferenceWeeks(dateObjectSooner,dateObjectLater)}

	returns:
		number. the difference in dates, in weeks. this uses some rounding.
		-1 when dateObjectLater comes before dateObjectSooner.
*/
export function dateDifferenceWeeks(dateStart: Date, dateEnd: Date) {
  if (dateEnd.getTime() < dateStart.getTime()) {
    return -1; //End is before Start
  }

  const msInADay = 8.64e7;

  let dayStart = Math.floor(dateStart.getTime() / msInADay);
  let dayEnd = Math.ceil(dateEnd.getTime() / msInADay);

  let dayDiff = dayEnd - dayStart;

  return Math.round(dayDiff / 7);
  //return dayDiff
}
