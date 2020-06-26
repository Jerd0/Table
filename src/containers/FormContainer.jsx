import React, {Component} from 'react';
import {format} from 'date-fns'
import Input from '../components/Input';
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);
      this.state = {
          newUser: {
              name: '',
              date: '',
              days: '',
              mission: '',
              isMultiple: true,
          }
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handleName = this.handleName.bind(this);
      this.handleDays = this.handleDays.bind(this);
      this.handleMission = this.handleMission.bind(this);
      this.handleIsMultiple = this.handleIsMultiple.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
      this.handleInput = this.handleInput.bind(this);
  }
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'isMultiple' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value    });
    }

  /* This lifecycle hook gets executed when the component mounts */
    handleIsMultiple(e) {
        let target = e.target;
        let value = target.name === 'isMultiple' ? target.checked : target.value;
        this.setState( prevState => ({ newUser :
                {...prevState.newUser, isMultiple: value
                }
        }))
    }
    handleMission(e){
        let value=e.target.value;
        this.setState( prevState => ({ newUser :
                {...prevState.newUser, mission: value
                }
        }))
    }
    handleDays(e) {
        let value = e.target.value;
        value=parseInt(value)
        this.setState( prevState => ({ newUser :
                {...prevState.newUser, days: value
                }
        }))
    }
  handleName(e) {
        let value = e.target.value;
        this.setState( prevState => ({ newUser :
                {...prevState.newUser, name: value
                }
        }))
    }
  handleDate(e) {
       let value =parseInt(format(new Date(e.target.value), 'T'));
   this.setState( prevState => ({ newUser : 
        {...prevState.newUser, date: value
        }
      }))
  }
  handleInput(e) {
      let value = e.target.value;
      let name = e.target.name;
      this.setState( prevState => ({ newUser :
              {...prevState.newUser, [name]: value
              }
      }))
  }



  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch('http://localhost:3000/users/',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json()
            // .then(data =>{this.fetchData()})
      })
      e.preventDefault();
      this.setState(  this.state = {
          newUser: {
              name: '',
              date: '',
              days: '',
              mission: '',
              isMultiple: false,
          }
      })

  }

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState(  this.state = {
          newUser: {
              name: '',
              date: '',
              days: '',
              mission: '',
              isMultiple: false,
          }
      })
  }
  render() {
    return (

        <form className="container-fluid" style={{border: '2px solid grey'}}  onSubmit={this.handleFormSubmit}>
            <div style={{display:'flex', width:'100%'}}>
            <Input inputType={'text'}
                   title= {'Имя'}
                   name= {'name'}
                   value={this.state.newUser.name}
                   placeholder = {'Введите имя'}
                   handleChange = {this.handleInput}

                   />
          <Input inputType={'Date'}
                 name={'date'}
                 title= {'Первый полёт'}
                 value={this.state.newUser.date}
                 placeholder = {'Первый полёт'}
                 handleChange={this.handleDate}
                 />
            <Input inputType={'text'}
                   name={'mission'}
                   title= {'Название миссии'}
                   value={this.state.newUser.mission}
                   placeholder = {'Введите название миссии'}
                   handleChange={this.handleInput}
            />
            <Input inputType={'number'}
                   name={'days'}
                   title= {'Дней в космосе'}
                   value={this.state.newUser.days}
                   placeholder = {'Введите количество дней в космосе'}
                   handleChange={this.handleInput}
            />
            <Input inputType={'checkbox'}
                name={'isMultiple'}
                title= {'Повторные полёты'}
                checked={this.state.newUser.isMultiple}
                onChange={this.handleIsMultiple}
                />
            </div>
            <div style={{display:'flex', width:'100%', justifyContent: 'space-around', marginBottom:'1%'}}>

          <Button
              action = {this.handleFormSubmit}
              type = {'primary'}
              title = {'Принять'}

          /> { /*Submit */ }

          <Button
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Очистить'}
          /> {/* Clear the form */}
            </div>
        </form>

    );
  }
}



export default FormContainer;