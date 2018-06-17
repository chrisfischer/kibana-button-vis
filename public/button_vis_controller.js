class VisController {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;

    this.container = document.createElement('div');
    this.container.className = 'myvis-container-div';
    this.el.appendChild(this.container);
  }

  destroy() {
    this.el.innerHTML = '';
  }

  render(visData, status) {
    this.container.innerHTML = '';

    const table = visData.tables[0];
    const metrics = [];
    let bucketAgg;

    if (table) {

      table.columns.forEach((column, i) => {
        // we have multiple rows … first column is a bucket agg
        if (table.rows.length > 1 && i == 0) {
          bucketAgg = column.aggConfig;
          return;
        }

        table.rows.forEach(row => {
          const value = row[i];
          metrics.push({
            title: bucketAgg ? `${row[0]} ${column.title}` : column.title,
            column: column.title,
            row: row[0],
            value: row[i],
            formattedValue: column.aggConfig ? column.aggConfig.fieldFormatter('text')(value) : value,
            bucketValue: bucketAgg ? row[0] : null,
            aggConfig: column.aggConfig
          });
        });
      });

      metrics.forEach(metric => {
        const metricBtn = document.createElement(`button`);
        metricBtn.innerHTML = this.vis.params.buttonTitle.replace("{{value}}", String(metric.value))
                                                         .replace("{{row}}", metric.row)
                                                         .replace("{{column}}", metric.column);

        metricBtn.setAttribute('style', `font-size: ${this.vis.params.fontSize}pt;` 
                                      + `margin: ${this.vis.params.margin}px;`
                                      + 'width: 95%');

        metricBtn.setAttribute('class', 'btn btn-primary')

        const code = this.vis.params.code.replace("{{value}}", String(metric.value))
                                         .replace("{{row}}", metric.row)
                                         .replace("{{column}}", metric.column)
        const func = Function(code)

        metricBtn.addEventListener('click', () => {
          func()
        });

        this.container.appendChild(metricBtn);
        console.log("added")
        
      });
    }

    return new Promise(resolve => {
      resolve('when done rendering');
    });
  }
};

export { VisController };
