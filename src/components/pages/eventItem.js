"use strict"

import React from 'react';
import {Row, Col, Well, Button, Glyphicon, Modal, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {findDOMNode} from 'react-dom';

import {getEvents, updateEvents, deleteEvents} from '../../actions/eventsAction';

class EventItem extends React.Component{
	constructor(){
		super();
		this.state = {
            show: false,
            event_name: "",
            date: "0000-00-00",
            time: "00:00",
            description: "",
            speaker_name: "",
            speaker_role: "",
            speaker_company: "",
            speaker_history: "",
            no_of_people: "0"

		}
	}
	open(){
		this.setState({show: true})
	}
	close(){
		this.setState({show: false})
	}
	updateEvent(){
        console.log('===checking before changing===', findDOMNode(this.refs.speaker_name).value);
        this.setState({show: false})
        this.state.event_name = (findDOMNode(this.refs.event_name).value !== undefined)?findDOMNode(this.refs.event_name).value:"";
        this.state.date = (findDOMNode(this.refs.date).value !== undefined)?findDOMNode(this.refs.date).value:"";
        this.state.time = (findDOMNode(this.refs.time).value !== undefined)?findDOMNode(this.refs.time).value:"";
        this.state.description = (findDOMNode(this.refs.description).value !== undefined)?findDOMNode(this.refs.description).value:"";
        // this.state.speaker_name = (findDOMNode(this.refs.speaker_name).value !== undefined)?findDOMNode(this.refs.speaker_name).value:"";;
        // this.state.speaker_role = (findDOMNode(this.refs.speaker_role).value !== undefined)?findDOMNode(this.refs.speaker_role).value:"";;
        // this.state.speaker_company = (findDOMNode(this.refs.speaker_company).value !== undefined)?findDOMNode(this.refs.speaker_company).value:"";;
        // this.state.speaker_history = (findDOMNode(this.refs.speaker_history).value !== undefined)?findDOMNode(this.refs.speaker_history).value:"";;
        this.state.no_of_people = (findDOMNode(this.refs.no_of_people).value !== undefined)?findDOMNode(this.refs.no_of_people).value:"";;
        console.log('===printing all states====', this.state)
        let new_event = [{
            event_details: false,
            _id: this.props._id,
            event_name: this.state.event_name,
            date: this.state.date,
            time: this.state.time,
            description: this.state.description,
            speaker: this.props.speaker,
            // speaker_name: this.state.speaker_name,
            // speaker_role: this.state.speaker_role,
            // speaker_company: this.state.speaker_company,
            // speaker_history: this.state.speaker_history,
            no_of_people: this.state.no_of_people
        }]
        console.log('===checking before sending===', new_event);
        this.props.updateEvents(new_event);
        window.alert('Your Event has been saved by Event_Manage.')
        this.props.getEvents();
    }
    deleteEvent(id){
        console.log('====this id would be deleted====', id)
        this.props.deleteEvents(id);
        this.props.getEvents();
    }

    open_event_details(){
        this.setState({event_details: true})
    }

    close_event_details(){
        this.setState({event_details: false})
    }

	render(){
        const show_speaker_list = this.props.speaker.map(function(sp){
            return(
                <Well>
                <h6><strong>Speaker Name:</strong> {sp.speaker_name}</h6>
                <h6><strong>Speaker Role:</strong> {sp.speaker_role}</h6>
                <h6><strong>Speaker Company:</strong> {sp.speaker_company}</h6>
                <h6><strong>Speaker History:</strong> {sp.speaker_company}</h6>
                </Well>
            )
        })
        return(
                 <Well>
                    <Row>
                        <Button onClick={this.open.bind(this)} bsStyle="link pull-left">
                        <Glyphicon glyph="pencil" />
                        Edit !!
                        </Button>
                        <Button onClick={this.deleteEvent.bind(this, this.props._id)} bsStyle="link pull-right" style={{color: "red"}}>
                        <Glyphicon glyph="remove" />
                        Delete Me
                        </Button>
                        <br/><br/>
                        <h6><strong>Event Name:</strong> {this.props.event_name}</h6>
                        <h6><strong>Date:</strong> {this.props.date}</h6>
                        <h6><strong>Time:</strong> {this.props.time}</h6>
                        <h6><strong>Description:</strong> {this.props.description}</h6>
                        <h6><strong>No. of People Participating:</strong> {this.props.no_of_people}</h6>
                        <Button onClick={this.open_event_details.bind(this)} bsStyle="primary"><i>click me for additional details</i></Button>
                        <Modal show={this.state.event_details} onHide={this.close_event_details.bind(this)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Here goes the details of the Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6><strong>Event Name:</strong> {this.props.event_name}</h6>
                            <h6><strong>Date:</strong> {this.props.date}</h6>
                            <h6><strong>Time:</strong> {this.props.time}</h6>
                            <h6><strong>Description:</strong> {this.props.description}</h6>
                            <h6><strong>No. of People:</strong> {this.props.no_of_people}</h6>
                            <h6><strong><i>The list of speakers are:</i></strong> {show_speaker_list}</h6>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.deleteEvent.bind(this, this.props._id)} bsStyle="danger pull-right">
                        Delete Me
                        </Button>
                        </Modal.Footer>
                        </Modal>
                        {/* <h6>Speaker Name: {this.props.speaker_name}</h6>
                        <h6>Speaker Role: {this.props.speaker_role}</h6>
                        <h6>Speaker Company: {this.props.speaker_company}</h6>
                        <h6>Speaker History: {this.props.speaker_history}</h6> */}
                    </Row>
                    <Modal show={this.state.show} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Option Activated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <FormGroup controlId = "event_name">
                    <ControlLabel>Event Name:</ControlLabel>
                    <FormControl
                        type="event_name"
                        placeholder = "Event Name"
                        ref = "event_name"
                    />
                    </FormGroup>
                    <FormGroup controlId = "date">
                    <ControlLabel>Date:</ControlLabel>
                    <FormControl
                        type="date"
                        placeholder = "dd::mm::yyyy"
                        ref = "date"
                    />
                    </FormGroup>
                    <FormGroup controlId = "time">
                    <ControlLabel>Time:</ControlLabel>
                    <FormControl
                        type="time"
                        placeholder = "hh::mm"
                        ref = "time"
                    />
                    </FormGroup>
                    <FormGroup controlId = "description">
                    <ControlLabel>Description:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder = "description"
                        ref = "description"
                    />
                    </FormGroup>
                    {/* <FormGroup controlId = "speaker_name">
                    <ControlLabel>Speaker Name:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder = "speaker name"
                        ref = "speaker_name"
                    />
                    </FormGroup>
                    <FormGroup controlId = "speaker_role">
                    <ControlLabel>Speaker Role:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder = "Speaker Role"
                        ref = "speaker_role"
                    />
                    </FormGroup>
                    <FormGroup controlId = "speaker_company">
                    <ControlLabel>Speaker Company:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder = "Speaker Company"
                        ref = "speaker_company"
                    />
                    </FormGroup>
                    <FormGroup controlId = "speaker_history">
                    <ControlLabel>Speaker History:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder = "Speaker History"
                        ref = "speaker_history"
                    />
                    </FormGroup> */}
                    <FormGroup controlId = "no_of_people">
                    <ControlLabel>No. Of People Participating:</ControlLabel>
                    <FormControl
                        type="number"
                        placeholder = "number of people participating"
                        ref = "no_of_people"
                    />
                    </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.updateEvent.bind(this)}>Update Event Info</Button>
					<Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                    </Modal>
                </Well>
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
        getEvents: getEvents,
        updateEvents: updateEvents,
        deleteEvents: deleteEvents
	}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(EventItem);