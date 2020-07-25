import React, { useState, useEffect } from 'react'
import Chart from 'react-google-charts'
import { getAllCurrentClientDemands } from '../Common/API/clientDemand'
import { ClientDemands } from '../../models/ClientDemands';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function TestChart() {

    const [total, setTotal]: [number, any] = useState(0);

    useEffect(() => {
        (async () => {
            await getTotalDemand();
        })();
    }, [total]);

    async function getTotalDemand() {
        calculateTotal(await getAllCurrentClientDemands());
    }

    function calculateTotal(arr: ClientDemands[]) {
        let t: number = 0;
        arr.forEach((e) => {
            t += e.quantity;
        })
        setTotal(t);
    }

    return (
        <div>
        {/* <Dropdown isOpen={clientDropdownOpen} toggle={clientToggle}>
            <DropdownToggle caret>
                {clientSelected
                    ? clientSelected
                    : "Select Client"}
            </DropdownToggle>
            <DropdownMenu>
                {clientOptions &&
                    clientOptions.map((s: any) => {
                        return (
                            <DropdownItem key={s} onClick={setClientSelected}>
                                {s}
                            </DropdownItem>
                        );
                    })}
            </DropdownMenu>
        </Dropdown> */}
        <Chart
            width={'80vw'}
            height={'80vh'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ["S&D", "Total", "Committed", "Confirmed", "Unconfirmed"],
                ['Total Demand', total, undefined, undefined, undefined],
                ['Total Supply', undefined, 3, 3, 1],
                ['Total Available Currently', undefined, 4, 2, 3],
                ['Total Available in 1 Month', undefined, 2, 1, 1],
                ['Total Available in 3 Months', undefined, 1, 2, 1],
            ]}
            options={{
                title: 'Population of Largest U.S. Cities',
                chartArea: { width: '50%' },
                orientation: 'horizontal',
                isStacked: true,
                hAxis: {
                    title: 'Number of Associates',
                    minValue: 0,
                },
            }}
            // For tests
            rootProps={{ 'data-testid': '3' }}
        />
    </div >
    )
}