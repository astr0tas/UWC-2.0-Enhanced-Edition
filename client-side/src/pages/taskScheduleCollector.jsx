import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../css/taskScheduleCollector.css';
import { timeTableCollector } from '../data/timeTable.js';
import { Collector } from '../data/worker.js';

var timeTableIndex = -1, shiftIndex = -1;

export { timeTableIndex, shiftIndex };

export const TaskScheduleCollector = () =>
{

    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('WorkerManage');
            setColor[0].style.color = "blue";
            effectRan.current = true;
        }

    });

    const getShifts = (event, index) =>
    {
        event.preventDefault();
        document.getElementById('TaskScheduleCollector').innerHTML = "";
        let key;
        for (key in timeTableCollector[index].shifts)
        {
            document.getElementById('TaskScheduleCollector').innerHTML += "<tr>"
                + "<td>" + timeTableCollector[index].date + " ca " + timeTableCollector[index].shifts[key].period + "</td>"
                + "<td>" + timeTableCollector[index].shifts[key].count + "</td>"
                + "<td>" + "<input type = 'checkbox' class = 'checkBox' id=\"" + key + "\"/> </td>"
                + "</tr>";
        }

        let obj = document.getElementsByClassName('checkBox');
        for (let i = 0; i < obj.length; i++)
            obj[i].addEventListener('click', () => { changeIndex(index, Number(obj[i].id)) });
    }

    const changeIndex = (updateTimeTableIndex, updateShiftIndex) =>
    {
        let obj = document.getElementById(String(updateShiftIndex));
        if (obj.checked === true)
        {
            timeTableIndex = updateTimeTableIndex;
            shiftIndex = updateShiftIndex;
        }
        else
        {
            timeTableIndex = -1;
            shiftIndex = -1;
        }
    }

    const Navigate = useNavigate();

    const currentURL = useParams();
    const collectorID = currentURL.collectorID;

    const chooseRoute = (event) =>
    {
        event.preventDefault();
        if (timeTableIndex === -1 || shiftIndex === -1)
            window.alert("B???n ch??a ch???n ca l??m!");
        else
        {
            let isOK = true;
            for (let key1 in Collector)
            {
                if (Collector[key1].ID === collectorID)
                {
                    for (let key2 in Collector[key1].lichlamviec)
                    {
                        if (Collector[key1].lichlamviec[key2].Ngay === timeTableCollector[timeTableIndex].date && Collector[key1].lichlamviec[key2].Thoigian === timeTableCollector[timeTableIndex].shifts[shiftIndex].period)
                        {
                            isOK = false;
                            break;
                        }
                    }
                    break;
                }
            }
            if (isOK)
                Navigate("./taskRoute");
            else
                window.alert("Nh??n vi??n ???? ???????c ph??n c??ng ca l??m n??y!");
        }
    }

    const goBack = (event) =>
    {
        event.preventDefault();
        Navigate(-1);
    }

    return (
        <div className='mytaskScheduleCollector'>
            <h1 >B???ng ca l??m</h1>
            <h3>Ch???n ng??y</h3>
            <view>
                <button onClick={ (event) => { getShifts(event, 0) } }>{ timeTableCollector[0].date }</button>
                <button onClick={ (event) => { getShifts(event, 1) } }>{ timeTableCollector[1].date }</button>
                <button onClick={ (event) => { getShifts(event, 2) } }>{ timeTableCollector[2].date }</button>
                <button onClick={ (event) => { getShifts(event, 3) } }>{ timeTableCollector[3].date }</button>
                <button onClick={ (event) => { getShifts(event, 4) } }>{ timeTableCollector[4].date }</button>
                <button onClick={ (event) => { getShifts(event, 5) } }>{ timeTableCollector[5].date }</button>
                <button onClick={ (event) => { getShifts(event, 6) } }>{ timeTableCollector[6].date }</button>
            </view>
            <table>
                <thead>
                    <tr>
                        <th><h3>Th???i gian</h3></th>
                        <th><h3>S??? nh??n vi??n trong ca</h3></th>
                        <th><h3>T??c v???</h3></th>
                    </tr>
                </thead>
                <tbody id="TaskScheduleCollector">
                </tbody>
            </table>
            <br />
            <br />
            <view>
                <button onClick={ goBack }>Quay l???i</button>
                <button onClick={ chooseRoute }>Ti???p t???c</button>
            </view>
        </div>
    );
}