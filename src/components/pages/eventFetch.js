"use strict"

import React from 'react';
import {Grid, Row, Col, Well, Button, Glyphicon, Modal, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {getEvents} from '../../actions/eventsAction';

import EventItem from './eventItem';

class EventFetch extends React.Component{

    componentDidMount(){
        // Dispatch an action on loading
        this.props.getEvents();
    }

    render(){
        if (this.props.show){
            return this.renderList();
        } else {
            return(<div></div>)
        }
    }

    renderList(){
        const eventList = this.props.events.map(function(eventArr){
            return (
                <Col xs={12} md={6} key={eventArr._id}>
                <EventItem
                    _id = {eventArr._id}
                    event_name = {eventArr.event_name}
                    date = {eventArr.date}
                    time = {eventArr.time}
                    description = {eventArr.description}
                    speaker = {eventArr.speaker}
                    // speaker_name = {eventArr.speaker_name}
                    // speaker_role = {eventArr.speaker_role}
                    // speaker_company = {eventArr.speaker_company}
                    // speaker_history = {eventArr.speaker_history}
                    no_of_people = {eventArr.no_of_people}
                />
                </Col>
            )
        })
        return(
            <Grid>
            <Well>
                <strong>You have so many events down here!!</strong>
            </Well>
            {eventList}
            </Grid>
        )
    }
}

function mapStateToProps(state){
    return {
        events: state.events
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getEvents: getEvents
    }, dispatch)
}

export default connect (mapStateToProps,
        mapDispatchToProps)(EventFetch);