// import react from 'react';
import "./home.css";
import CardInfo from "../../components/cardInfo/CardInfo";
import Chart from "../../components/chart/Chart";
import WidgetLg from "../../components/widgetLg/WidgrtLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";

const jsonData = require("../../data.json");

export default function Home() {
    return (
        <div className='home'>
            <CardInfo />
            <Chart title={"Sales"} data={jsonData.data} dataKey={"amount"} grid />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}