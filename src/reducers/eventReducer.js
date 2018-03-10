"use strict"

export function eventReducer(state = {events:[]}, action){
    switch(action.type){
        case "GET_EVENTS":
        return {...state, events: [...action.payload]}

        case "POST_EVENTS":
        return {events: [...state.books, ...action.payload]};

        case "DELETE_BOOK":
        const currentEventToDelete = [...state.events];
        const indexToDelete = currentEventToDelete.findIndex(
            function(event){
                return event._id === action.payload;
            }
        )
        return {events: [...currentEventToDelete.slice(0, indexToDelete),
        ...currentEventToDelete.slice(indexToDelete+1)]};

        case "UPDATE_BOOK":
        const currentBookToUpdate = [...state.events];
        const indexToUpdate = currentBookToUpdate.findIndex(
            function(event){
                event._id === action.payload._id;
            }
        )
        const newBookToUpdate = {...currentBookToUpdate[indexToUpdate],
            event_name: action.payload.event_name,
            date: action.payload.date,
            time: action.payload.time,
            timezone: action.payload.timezone,
            description: action.payload.description,
            speaker_name: action.payload.speaker_name,
            speaker_role: action.payload.speaker_role,
            speaker_company: action.payload.speaker_company,
            speaker_history: action.payload.speaker_history,
            no_of_people: action.payload.no_of_people
        }
        return {events: [...currentBookToUpdate.slice(0, indexToUpdate),
            newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]}
    }
    return state;
}