import * as React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getHighChart = this.getHighChart.bind(this);
  }

  componentDidMount() {
    this.getHighChart();
  }

  //fetch data from restful api and render chart
  getHighChart() {
    const that = this;
    // url for reading restful api
    const url = "http://127.0.0.1:8000/stock/";
    fetch(url)
      .then(promise => {
        return promise.json()
      })
      .then(response => {
        return Promise.resolve(response)
      })
      .then(jsonResponse => {
        // console.log(jsonResponse);
        let stocks = jsonResponse.results.map((obj) => {
          //TODO fix datetime setting to microseconds
          return ([parseInt(obj.date) * 1000, obj.data]);
        });
        that.setState({stocks: stocks});
      });

  }

  render() {
    //options for HighchartsReact settings
    const options = {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: 'AAPL Stock Price'
      },
      xAxis: {
        type: 'datetime',
        min: 1520063200000, //TODO fix mix and max settings
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
