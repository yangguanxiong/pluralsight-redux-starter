import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseAction from '../../actions/courseActions';

class CoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: { title: "" }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({ course: course });
    }

    onClickSave() {
        // alert(`Save ${this.state.course.title}`);
        this.props.actions.createCourse(this.state.course);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        return (
            <div>
                <h1>courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add course</h2>
                <input
                    type="text"
                    value={this.state.course.title}
                    onChange={this.onTitleChange} />

                <input
                    type="submit"
                    value="Save"
                    onClick={this.onClickSave}
                />
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        courses: state.courses
    };

}

function mapDispatchToProps(dispatch) {
    return {
        // createCourse: course => dispatch(courseAction.createCourse(course))
        actions: bindActionCreators(courseAction, dispatch)
    };
}

CoursePage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);