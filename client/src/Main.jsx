import React from "react";

import {
  Chart,
  Axis,
  Tooltip,
  Interval,
  Coordinate,
  Interaction,
  getTheme,
  Line,
  Point
} from "bizcharts";


class Main extends React.Component {
  render() {
    const data_circle = [
      { item: '', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYYYY', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ];

    const cols_circle = {
      percent: {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      },
    };
    const data_hist = [
      { year: "1951 年", sales: 38 },
      { year: "1952 年", sales: 52 },
      { year: "1956 年", sales: 61 },
      { year: "1957 年", sales: 45 },
      { year: "1958 年", sales: 48 },
      { year: "1959 年", sales: 38 },
      { year: "1960 年", sales: 38 },
      { year: "1962 年", sales: 38 },
    ];

    const data = [
      {
        country: "中国",
        population: 131744
      },
      {
        country: "印度",
        population: 104970
      },
      {
        country: "美国",
        population: 29034
      },
      {
        country: "印尼",
        population: 23489
      },
      {
        country: "巴西",
        population: 18203
      }
    ];

    // 数据源
    const data_4 = [
      { year: '1991', value: 3, marked: false },
      { year: '1992', value: 4, marked: true },
      { year: '1993', value: 3.5, marked: false },
      { year: '1994', value: 5, marked: false },
      { year: '1995', value: 4.9, marked: false },
      { year: '1996', value: 6, marked: true },
      { year: '1997', value: 7, marked: false },
      { year: '1998', value: 9, marked: false },
      { year: '1999', value: 13, marked: false },
    ];

    return (
      <secthion className="content">
        <div className="branch">
          <div className="branch__title">Moments Charts</div>
          <div className="branch__serch">
            <div className="branch__serch-icon icon-serch" />
            <input placeholder="Поиск филиалов" className="branch__serch-input" />
          </div>
          <div className="branch__item branch__item--active">
            <div className="branch__item-text branch__item-text--active">
              Название в несколько строк
            </div>
            <div className="branch__item-city branch__item-city--active">
              г. Саратов
            </div>
            <div className="branch__item-check branch__item-check--active icon-check" />
          </div>
          <div className="branch__item">
            <div className="branch__item-text">
              Название в несколько строк
            </div>
            <div className="branch__item-city">
              г. Саратов
            </div>
            <div className="branch__item-check icon-check" />
          </div>
          <div className="branch__item">
            <div className="branch__item-text">
              Название в несколько строк
            </div>
            <div className="branch__item-city">
              г. Саратов
            </div>
            <div className="branch__item-check icon-check" />
          </div>
          <div className="branch__item">
            <div className="branch__item-text">
              Название в несколько строк
            </div>
            <div className="branch__item-city">
              г. Саратов
            </div>
            <div className="branch__item-check icon-check" />
          </div>
        </div>
        <div className="info">
          <div className="info__container">
            <div className="info__container-text">
              Количество продаж
            </div>
            <div className="info__container-diagrams">
              <Chart
                height={250}
                autoFit
                data={data_hist}
                interactions={["active-region", "element-cursor-pointer", 'element-active']}
                padding={[30, 30, 30, 50]}
              >
                <Interval position="year*sales" state={{
                  active: {
                    style: {
                      stroke: 'red'
                    }
                  }
                }} />
                <Tooltip shared />
              </Chart>
            </div>
            <a className="button" href="/More">Подробнее</a>
          </div>
          <div className="info__container">
            <div className="info__container-text">
              Суммы продаж
            </div>
            <div className="info__container-diagrams">
              <Chart height={250} data={data} autoFit>
                <Coordinate transpose />
                <Interval position="country*population" />
              </Chart>
            </div>
            <a className="button" href="/More">Подробнее</a>

          </div>
          {/* </div> */}
          <div className="info__container">
            <div className="info__container-text">
              Аналитика продаваемых продуктов
            </div>
            <div className="info__container-diagrams">
              <Chart height={250} data={data_circle} scale={cols_circle} autoFit onIntervalClick={e => {
                const states = e.target.cfg.element.getStates();// 如果是选中，值为['selected'];取消选中，值为[]
              }}>
                <Coordinate type="theta" radius={0.75} />
                <Tooltip showTitle={false} />
                <Axis visible={false} />
                <Interval
                  position="percent"
                  adjust="stack"
                  color="item"
                  style={{
                    lineWidth: 1,
                    stroke: '#fff',
                  }}
                  label={['count', {
                    // label 太长自动截断
                    layout: { type: 'limit-in-plot', cfg: { action: 'ellipsis' } },
                    content: (data_circle) => {
                      return `${data_circle.item}: ${data_circle.percent * 100}%`;
                    },
                  }]}
                  state={{
                    selected: {
                      style: (t) => {
                        const res = getTheme().geometries.interval.rect.selected.style(t);
                        return { ...res, fill: 'red' }
                      }
                    }
                  }}
                />
                <Interaction type='element-single-selected' />
              </Chart>
            </div>
            <a className="button" href="/More">Подробнее</a>
          </div>
          <div className="info__container">
            <div className="info__container-text">
              Рост продаж
            </div>
            <div className="info__container-diagrams">
              <Chart
                padding={[10, 20, 50, 40]}
                autoFit
                height={250}
                data={data_4}
                scale={{ value: { min: 0 } }
                }
              >
                <Line position="year*value" />
                <Point position="year*value" style={
                  ['year*value*marked', (year, value, marked) => {
                    console.log('marked', marked)
                    return {
                      fill: marked ? 'red' : 'white'
                    }
                  }]} />
                <Tooltip showCrosshairs />
              </Chart>
            </div>
            <a className="button" href="/More">Подробнее</a>
          </div>
        </div>
      </secthion >);
  }
}


export default Main;