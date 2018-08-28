import React from "react";
import propTypes from "prop-types";
import { Table, Button, Label, Icon, Dropdown } from "semantic-ui-react";
import _ from "lodash";
import LocalizationService from "../../service/LocalizationService";
import "./DataGrid.scss";

const localizer = new LocalizationService("dataGrid");
export default class DataGrid extends React.Component {
  static propTypes = {
    data: propTypes.arrayOf(propTypes.object).isRequired,
    columnTitles: propTypes.object.isRequired,
    dataFormatting: propTypes.object,
    operations: propTypes.arrayOf(propTypes.element),
  }
  static defaultProps = {
    dataFormatting: null,
    operations: null,
  }
  constructor(props) {
    super(props);
    this.paginate = this.paginate.bind(this);
    this.sort = this.sort.bind(this);
  }
  state = {
    sorting: null,
    pageSize: 5,
    activePage: 1,
  }
  setPageSize = pageSize => this.setState({ pageSize });
  getColList = data => _.uniqWith(_.flatten(data.map(i => _.keysIn(i))), _.isEqual);

  setSorting = (column) => {
    const { sorting } = this.state;
    if (!sorting) this.setState({ sorting: { sortBy: column, sortDir: "asc" } });
    else {
      const calcSortDir = (col) => {
        if (col !== sorting.sortBy) return "asc";
        return sorting.sortDir === "asc" ? "desc" : "asc";
      };
      this.setState({
        sorting: {
          sortBy: column,
          sortDir: calcSortDir(column),
        },
      });
    }
  }
  sort(data) {
    const { sorting } = this.state;
    return !sorting ? data : _.orderBy(data, [sorting.sortBy], [sorting.sortDir]);
  }
  next = () => {
    const { data } = this.props;
    const { pageSize, activePage } = this.state;
    const lastPage = Math.ceil(data.length / pageSize);
    if (activePage !== lastPage) this.setState({ activePage: activePage + 1 });
  }
  prev = () => {
    const { activePage } = this.state;
    if (activePage !== 1) this.setState({ activePage: activePage - 1 });
  }

  paginate = (data) => {
    const { pageSize, activePage } = this.state;
    const start = (activePage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }


  render() {
    const getOperationsMenu = (operations, item) => (
      <Dropdown icon="ellipsis horizontal">
        <Dropdown.Menu>
          {operations.map(i => React.cloneElement(i, { item }))}
        </Dropdown.Menu>
      </Dropdown>
    );
    const { paginate, sort } = this;
    const {
      data, columnTitles, dataFormatting, operations,
    } = this.props;
    const { pageSize, activePage, sorting } = this.state;

    return (
      <Table fixed className="data-grid">
        <Table.Header>
          <Table.Row>
            {this.getColList(data).map((i, ind) => (
              <Table.HeaderCell
                content={
                  <React.Fragment>
                    {columnTitles && columnTitles[i] ? columnTitles[i] : i}
                    {sorting && sorting.sortBy === i && <Icon name={sorting.sortDir === "asc" ? "caret down" : "caret up"} />}
                  </React.Fragment>
                }
                key={`header-${ind}`}
                onClick={() => this.setSorting(i)}
                className="data-grid-header"
              />
            ))}
            {operations && <Table.HeaderCell />}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginate(sort(data)).map((i, ind) =>
            (
              <Table.Row key={`row-${ind}`}>
                {Object.keys(i).map((k, ind2) =>
                  (<Table.Cell
                    content={dataFormatting && dataFormatting[k] ? dataFormatting[k](i[k]) : i[k]}
                    key={`cell-${ind}.${ind2}`}
                  />))
                }
                {
                  operations &&
                  <Table.Cell
                    className="data-grid-operations-cell"
                    width={1}
                  >{getOperationsMenu(operations, i)}
                  </Table.Cell>
                }
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={operations ? this.getColList(data).length + 1 : this.getColList(data).length}>
              <div className="data-grid-page-length">
                <Label basic size="small" content={localizer.string("pageSize")} className="data-grid-page-length-label" />
                <Button.Group
                  size="mini"
                  compact
                  buttons={[5, 10, 15, 20].map(i =>
                    ({
                      key: i,
                      content: i,
                      active: pageSize === i,
                      onClick: () => this.setPageSize(i),
                      className: "data-grid-page-length-button",
                      style: i === 5 ?
                        { borderTopLeftRadius: "0", borderBottomLeftRadius: "0" } : {},
                    }))}
                />
              </div>
              <div className="data-grid-pagination">
                <Button.Group>
                  <Button icon="chevron left" onClick={this.prev} disabled={activePage === 1} />
                  <Button icon="chevron right" onClick={this.next} disabled={Math.ceil(data.length / pageSize) === activePage} />
                </Button.Group>
              </div>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}
