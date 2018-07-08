import React from "react";
import { Table, Button, Label, Icon, Dropdown } from "semantic-ui-react";
import _ from "lodash";

export default class DataGrid extends React.Component {
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
      this.setState({
        sorting: {
          sortBy: column,
          sortDir: column !== sorting.sortBy ?
            "asc" :
            (sorting.sortDir === "asc" ? "desc" : "asc"),
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

  getOperationsMenu = (operations, item) => (
    <Dropdown icon="ellipsis horizontal">
      <Dropdown.Menu>
        {operations.map(i => React.cloneElement(i, { item }))}
      </Dropdown.Menu>
    </Dropdown>
  )

  render() {
    console.log(this.state);
    const { paginate, sort } = this;
    const {
      data, columnTitles, dataFormatting, operations,
    } = this.props;
    const { pageSize, activePage, sorting } = this.state;

    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            {this.getColList(data).map(i => (
              <Table.HeaderCell
                content={
                  <React.Fragment>
                    {columnTitles && columnTitles[i] ? columnTitles[i] : i}
                    {sorting && sorting.sortBy === i && <Icon name={sorting.sortDir === "asc" ? "caret down" : "caret up"} />}
                  </React.Fragment>
                }
                key={i}
                onClick={() => this.setSorting(i)}
                style={{ cursor: "pointer" }}
              />
            ))}
            {operations && <Table.HeaderCell />}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginate(sort(data)).map(i =>
            (
              <Table.Row>
                {Object.keys(i).map(k =>
                  <Table.Cell content={dataFormatting && dataFormatting[k] ? dataFormatting[k](i[k]) : i[k]} />)}
                {operations && <Table.Cell width={1} style={{ overflow: "visible", textAlign: "right" }}>{this.getOperationsMenu(operations, i)}</Table.Cell>}
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={operations ? this.getColList(data).length + 1 : this.getColList(data).length}>
              <div style={{ float: "left" }}>
                <Label basic size="small" content="Sayfa boyutu" style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0", margin: "0" }} />
                <Button.Group
                  size="mini"
                  compact
                  buttons={[5, 10, 15, 20].map(i =>
                    ({
                      key: i,
                      content: i,
                      active: pageSize === i,
                      onClick: () => this.setPageSize(i),
                      style: i === 5 ?
                        { borderTopLeftRadius: "0", borderBottomLeftRadius: "0", border: "border: 1px solid rgba(34, 36, 38, 0.05);" }
                        : { border: "border: 1px solid rgba(34, 36, 38, 0.05)" },
                    }))}
                />
              </div>
              <div style={{ float: "right" }}>
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
export const sampleColumns = [
  {
    columnName: "cgpa",
    displayName: "CGPA",
  },
  {
    columnName: "name",
    displayName: "Name",
  },
  {
    columnName: "discipline",
    displayName: "Discipline",
  },
  {
    columnName: "university",
    displayName: "University",
  },
  {
    columnName: "year",
    displayName: "Year",
    // render:()=>{
    //     return <div style={{backgroundColor:"lightblue"}}>"Custom Column"</div>
    // },
    // "flexBasis":"190px"
  },
];
export const sampleData = [
  {
    cgpa: 5.2,
    name: "Rishabh",
    discipline: "Computer Science",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.9,
    name: "Suyash",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.4,
    name: "Tanuj",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 9.7,
    name: "Karan",
    discipline: "Computer Science",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.2,
    name: "Harsh",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 4.2,
    name: "Sanchit",
    discipline: "Mathematics",
    university: "BITS Pilani",
    year: "fifth",
  },
  {
    cgpa: 7.9,
    name: "Rahul",
    discipline: "Computer Science",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.1,
    name: "Ram",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 8.9,
    name: "Rohan",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 3.9,
    name: "Karshit",
    discipline: "IT",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 4.9,
    name: "Amitesh",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 9.0,
    name: "Ayush",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 5.0,
    name: "Sullu",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.6,
    name: "Dhruv Suri",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.3,
    name: "Shan Balasubraniam",
    discipline: "Computer Science",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 9.2,
    name: "Punit",
    discipline: "Computer Science",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 8.5,
    name: "Prerak",
    discipline: "Computer Science",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 8.7,
    name: "Anand Mishra",
    discipline: "Computer Science",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.6,
    name: "Rakesh",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 5.9,
    name: "Roshan",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 2.9,
    name: "Shah Rukh",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.4,
    name: "Anmol",
    discipline: "Physics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 7.5,
    name: "Rishi",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 6.9,
    name: "GKB",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 4.9,
    name: "Ramu",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 5.4,
    name: "Rishikesh",
    discipline: "Electrical and Electronics",
    university: "BITS Pilani",
    year: "fourth",
  },
  {
    cgpa: 4.7,
    name: "Sharma",
    discipline: "Information Systems",
    university: "BITS Pilani",
    year: "fourth",
  },
];
