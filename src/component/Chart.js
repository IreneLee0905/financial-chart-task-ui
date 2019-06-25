import * as React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    // this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const url = "http://127.0.0.1:8000/stock/";
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    let stocks = [];
    jsonResponse.results.forEach((obj) => {
      stocks.push([parseInt(obj.date) * 1000, obj.data]);
    });
    this.setState({stocks: stocks}, () => {
      console.log(this.state);
    });


  }

  render() {
    const options = {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: 'AAPL Stock Price'
      },
      xAxis: {
        type: 'datetime',
        min: 1520063200000,
        max: 1702269785200,

        tickInterval: 24 * 3600 * 1000,
        labels: {
          format: '{value:%e.%b}'
        },
      },
      series: [{
        name: 'AAPL',
        data: this.state.stocks,
        tooltip: {
          valueDecimals: 2
        }
      }]

    };
    return (

      <div>
        <HighchartsReact highcharts={Highcharts} options={options}/>
      </div>
    )
  }

}
