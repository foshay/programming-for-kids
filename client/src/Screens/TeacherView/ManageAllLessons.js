import React, { Component } from 'react';
import { 
  // HTMLTable, Card, 
  Button } from "@blueprintjs/core";
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class ManageAllLessons extends Component {
  state = {
    lessons: [{}]
  };

  apiGetLessons = async () => {
    return fetch('api/Lesson/all')
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ lessons: json.data });
      });
  }

    onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const lessons = reorder(
      this.state.lessons,
      result.source.index,
      result.destination.index
    );

    this.setState({
      lessons
    });
  }

  goToLesson = (lessonID) => {
    // changes the url when a button is clicked
    this.props.history.push(`/ManageLessons/${lessonID}`);
  }

  componentDidMount() {
    this.apiGetLessons();
  }

  render() {
    return (
      <div className="Body">
        <Link to="/ManageLessons/NewLesson">
          <Button
            text="Create New Lesson"
            icon="build"
            intent="success"
          />
        </Link>
        <br />
        {/* <Card> */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <table
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <thead>
                  <tr>
                    <th />
                    <th>Lesson Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lessons.map((lesson, index) => (
                    <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <td style={{ width: "120px" }}>{lesson.lesson_num}</td>
                          <td style={{ width: "120px" }}>{lesson.name}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
        {/* </Card> */}
      </div>
    );
  }
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: 250
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default ManageAllLessons;