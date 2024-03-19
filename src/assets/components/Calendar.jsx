import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { EventForm } from "./EventForm";
const localizer = momentLocalizer(moment);

function BigCalendar() {
  const [events, setEvents] = useState([]);

  const [formMode, setFormMode] = useState("add");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = () => {
    setEventName("");
    setEventDate("");
    setEventStartTime("");
    setEventEndTime("");
    setFormMode("add");
    setShowForm(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setEventDate(moment(slotInfo.start).format("YYYY-MM-DD"));
    setFormMode("add");
    setShowForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventName(event.title);
    setEventDate(moment(event.start).format("YYYY-MM-DD"));
    setEventStartTime(moment(event.start).format("HH:mm"));
    setEventEndTime(moment(event.end).format("HH:mm"));
    setFormMode("update");
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      eventName.trim() !== "" &&
      eventDate &&
      eventStartTime &&
      eventEndTime
    ) {
      const startTime = moment(
        eventDate + " " + eventStartTime,
        "YYYY-MM-DD HH:mm"
      ).toDate();
      const endTime = moment(
        eventDate + " " + eventEndTime,
        "YYYY-MM-DD HH:mm"
      ).toDate();
      if (formMode === "add") {
        const newEvent = {
          id: events.length + 1,
          title: eventName,
          start: startTime,
          end: endTime,
        };
        setEvents([...events, newEvent]);
      } else if (formMode === "update" && selectedEvent) {
        const updatedEvents = events.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, title: eventName, start: startTime, end: endTime }
            : event
        );
        setEvents(updatedEvents);
      }
      setEventName("");
      setEventDate("");
      setEventStartTime("");
      setEventEndTime("");
      setSelectedSlot(null);
      setSelectedEvent(null);
      setShowForm(false);
    }
  };

  const handleCancelForm = () => {
    setEventName("");
    setEventDate("");
    setEventStartTime("");
    setEventEndTime("");
    setSelectedSlot(null);
    setSelectedEvent(null);
    setShowForm(false);
  };

  const handleRemoveEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setShowForm(false);
    }
  };

  return (
    <div className="mt-10">
      
      <Calendar
        className="custom-calendar bg-black text-red-700"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
      <div className="flex">
        <button className="bg-black mx-auto text-red-700 border border-red-700 p-2 rounded-lg m-2 hover:bg-red-700 hover:text-black" onClick={handleAddEvent}>
        Add Event
      </button>
      </div>
      
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70 backdrop-blur-lg z-10">
          <div class="bg-black rounded-lg p-8 max-w-md w-full">
          {selectedEvent && (
              <div className="text-red-700 bg-black float-end">
                <button onClick={handleRemoveEvent}>Remove Event</button>
              </div>
            )}
            <EventForm
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
              eventName={eventName}
              setEventName={setEventName}
              eventDate={eventDate}
              setEventDate={setEventDate}
              eventStartTime={eventStartTime}
              setEventStartTime={setEventStartTime}
              eventEndTime={eventEndTime}
              setEventEndTime={setEventEndTime}
              buttonText={formMode === "add" ? "Add Event" : "Save Changes"}
            />
            
          </div>
        </div>
      )}
    </div>
  );
}

export default BigCalendar;
