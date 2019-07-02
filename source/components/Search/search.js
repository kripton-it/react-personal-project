import React, { Component } from "react";

class Search extends Component {
    render () {
        return (
            <input placeholder = 'Поиск' type = 'search' value = { this.props.tasksFilter } onChange = { this.props._updateTasksFilter } />
        );
    }
}

export default Search;
