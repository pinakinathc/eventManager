"use strict"

import React from 'react';
import {Well, FormControl, Glyphicon, FormGroup, ControlLabel, Button, Row, Alert, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {getEvents, postEvents} from '../../actions/eventsAction';

class EventForm extends React.Component{
    constructor(){
        super();
        this.state = {
            show_modal: false,
            show_component: true,
            event_name: "",
            date: "0000-00-00",
            time: "00:00",
            description: "",
            speaker: [],
            // speaker_name: "",
            // speaker_role: "",
            // speaker_company: "",
            // speaker_history: "",
            no_of_people: "0"
        }
        var show_component_try = true;
    }

    open_show_modal(){
        this.setState({show_modal: true})
    }

    close_show_modal(){
        this.setState({show_modal: false})
    }

    add_speaker_info(){
        console.log('====checking before add_speaker_info()=====', this.state)
        this.setState({show_modal: false})
        let temp = {
            speaker_name: findDOMNode(this.refs.speaker_name).value,
            speaker_role: findDOMNode(this.refs.speaker_role).value,
            speaker_company: findDOMNode(this.refs.speaker_company).value,
            speaker_history: findDOMNode(this.refs.speaker_history).value,            
        }
        this.state.speaker.push(temp)
        console.log('====checking after add_speaker_info()===', this.state)
        window.alert("Voila!! Speaker info added!!")
    }

    submit(){
        this.state.event_name = findDOMNode(this.refs.event_name).value;
        this.state.date = findDOMNode(this.refs.date).value;
        this.state.time = findDOMNode(this.refs.time).value;
        this.state.description = findDOMNode(this.refs.description).value;
        // this.state.speaker_name = findDOMNode(this.refs.speaker_name).value;
        // this.state.speaker_role = findDOMNode(this.refs.speaker_role).value;
        // this.state.speaker_company = findDOMNode(this.refs.speaker_company).value,
        // this.state.speaker_history = findDOMNode(this.refs.speaker_history).value,
        this.state.no_of_people = findDOMNode(this.refs.no_of_people).value;
        let new_event = [{
            event_name: this.state.event_name,
            date: this.state.date,
            time: this.state.time,
            description: this.state.description,
            speaker: this.state.speaker,
            // speaker_name: this.state.speaker_name,
            // speaker_role: this.state.speaker_role,
            // speaker_company: this.state.speaker_company,
            // speaker_history: this.state.speaker_history,
            no_of_people: this.state.no_of_people
        }]
        console.log('====printing before post call====', new_event)
        this.props.postEvents(new_event);
        window.alert('Your Event has been saved by Event_Manage. Please close this form and reload your event list to check your newly added event')
        findDOMNode(this.refs.event_name).value = '';
        findDOMNode(this.refs.date).value = '';
        findDOMNode(this.refs.time).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.no_of_people).value = '';        
        this.props.getEvents();
        console.log('====new event===', this.state)
    }

    close(){
        //this.props.show = false;
        this.setState({show_component: !(this.state.show_component)})
    }

    render(){
        if (this.props.show === this.state.show_component){
            return this.renderForm();
        } else {
            return this.renderEmpty();
        }
    }

    renderEmpty(){
        return(<div></div>)
    }

    renderForm(){
        const speaker_name = this.state.speaker.map(function(sp){
            return(
                <h6>
                    <Glyphicon glyph="asterisk" />
                    <strong>Speaker Name</strong>: {sp.speaker_name}
                </h6>
            )
        })
        return(
            <Well style={{textAlign:"left"}}>
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
                {speaker_name}
                <Button onClick={this.open_show_modal.bind(this)} bsStyle="success" className="center-block">Add Speaker</Button>
                <Modal show={this.state.show_modal} onHide={this.close_show_modal.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>Enter the details of the speaker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <FormGroup controlId = "speaker_name">
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
                </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.add_speaker_info.bind(this)} bsStyle="success">Add speaker details</Button>
                    <Button onClick={this.close_show_modal.bind(this)}>Close Modal without adding speaker</Button>
                </Modal.Footer>
                </Modal>

                <FormGroup controlId = "no_of_people">
                <ControlLabel>No. Of People Participating:</ControlLabel>
                <FormControl
                    type="number"
                    placeholder = "number of people participating"
                    ref = "no_of_people"
                />
                </FormGroup>
                <Button onClick={this.submit.bind(this)}
                bsStyle = 'primary pull-left' style={{textAlign:"left"}}> 
                    Save Form
                </Button>
                <Button onClick={this.close.bind(this)}
                bsStyle = 'primary pull-right'> 
                    Close Form
                </Button>
                <br/><br/>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return {events: state.events}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postEvents: postEvents,
        getEvents: getEvents
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)