import React, { Component } from 'react';
import { Card, Text, EditableText } from '@blueprintjs/core';

class EditField extends Component {
    render(){
        return(
            <Card>
                <Text className="Text-Edit-Title">
                    {this.props.title}
                </Text>
                <br/>
                <EditableText
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e)}
                />
            </Card>
        );
    }
}

export default EditField