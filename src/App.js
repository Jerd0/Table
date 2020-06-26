import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import TableSearch from './TableSearch/TableSearch';
import _ from 'lodash';
import FormContainer from './containers/FormContainer';
const bottomStyle = {
  marginRight: '1em',
  marginBottom: '1em'
};
class App extends Component {

  state ={
    isModeSelected: false,
    isLoading: false,
    data: [],
    search: '',
    sort: 'asc',  // 'desc'
    sortField: 'id',
    row: null,
    currentPage: 0,
      add:null
  }

  async fetchData() {
    const response = await fetch('http://localhost:3000/users')
    const data = await response.json()
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }
  handleFormDelete(id) {
    let userData = id;
    console.log(userData)
    fetch(`http://localhost:3000/users/${userData.id}`,{
      method: "DELETE",
      body: JSON.stringify(userData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(this.fetchData())
    })
    this.handleRow()
  }
 handleRow=()=>{
    this.setState({row: !this.state.row})
 }
 handleAdd=()=>{
      this.setState({add: !this.state.add})
     this.fetchData()
 }
  handleModal = () => {
    this.setState({showModal: !this.state.showModal});
  this.fetchData()
  }
  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortField, sort);
    this.setState({ data, sort, sortField })
  }

  modeSelectHandler = () => {
    this.setState({
      isModeSelected: true,
      isLoading: true,
    })
    this.fetchData()
  }


  onRowSelect = row => (
    this.setState({row})
  )

  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

  getFilteredData(){
    const {data, search} = this.state
    if (!search) {
      return data
    }
   let result = data.filter(item => {
     return (
       item['name'].toLowerCase().includes(search.toLowerCase()) ||
       item['mission'].toLowerCase().includes(search.toLowerCase())
     );
   });
   if(!result.length){
     result = this.state.data
   }
    return result
  }

  render() {
    const pageSize = 50;
    if(!this.state.isModeSelected){
      return (
        <div className="container">
          {this.modeSelectHandler()}
        </div>
      )
    }
   
    const filteredData = this.getFilteredData();
    // debugger
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        : <React.Fragment>
            <TableSearch onSearch={this.searchHandler}/>
            <div style={{display:'flex'}}>
              <button style={bottomStyle} onClick={this.handleModal} className="btn btn-outline-primary">Добавить</button>
            </div>
              {this.state.showModal && <FormContainer
                  handleModal={this.handleModal}/>}

              <Table
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
              delet={this.state.data}
              onDelete={this.handleFormDelete}
            />
          </React.Fragment>

      }

      {
        this.state.data.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        forcePage={this.state.currentPage}
      /> : null
      }
        {
          this.state.row ? this.handleFormDelete(this.state.row) : null
        }
      </div>
    );
  }
}

export default App;
