import React, { Component } from 'react';
import { Button, ButtonGroup} from "@blueprintjs/core";
import LoadingSymbol from '../../SmallComponents/LoadingSymbol';

class ManageStudent extends Component {
  state={
    student: [{}],
    isLoading: true,
  }

  componentDidMount = () => {
    this.getStudent();
  }

  getStudent = async () => {
    var user_id = this.props.match.params.studentID;
    console.log(user_id);
    // TODO change all instances of this call to /api/User/:user_id
    return fetch('/User/' + user_id)
      .then(response => {
        console.log(response);
        this.setState({isLoading: false});
        return response.json();
      })
      .then(json => {
        console.log(json);
        console.log(json.data);
        this.setState({ student: json.data });
      });
  }

  onRemoveStudent = (e) => {
    // TODO add confirmation popup
    // maybe add OTP to confirm?
        alert("This feature is not yet implemented");

        e.preventDefault();
        // var user_id = this.props.match.params.studentID;

        // const response = await fetch('/api/RemoveStudent', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "username": username,
        //         "otp": otp,
        //     })
        // });

        // var body = await response.json();
        // var message = await body.message;
        // this.setState({ responseToPost: message });
        // console.info(this.state.responseToPost);
        // console.log("Console message: " + message);
        // if(message === "Success"){
        //     alert("Removed " + username);
        // }else{
        //     alert("Invalid username or otp");
        // }
  }

  render() {
    if (this.state.isLoading){
      return (<LoadingSymbol/>);
    }
    var student = this.state.student;
    if (student === [{}]) {
      return (
        <h1 className="Body">Loading...</h1>
      )
    }
    else {
      return (
        <div className="Body2">
          <div className="Body"/>
          <ButtonGroup vertical>
            <h1> Manage Student </h1>
            <h3>{student.first_name + " " + student.last_name} </h3>
            <h5>{"(" + student.username + ")"}</h5>
            <Button
              text="Remove Student"
              intent="danger"
              onClick={(e) => this.onRemoveStudent(e)}
            />
            <br />
          </ButtonGroup>
          <h1>Grades Table </h1> 
          <h3>(not yet implemented)</h3>
        </div>
        // we want to see the grade for each lesson
        // we also want to access the saved xml for each lesson
      );
    }
  }
}

export default ManageStudent;