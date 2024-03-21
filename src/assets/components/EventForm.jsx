export const EventForm = ({
    onSubmit,
    onCancel,
    eventName,
    setEventName,
    eventDate,
    setEventDate,
    eventStartTime,
    setEventStartTime,
    eventEndTime,
    setEventEndTime,
    buttonText,
  }) => (
    <form
      onSubmit={onSubmit}
      className="bg-gray-900 bg-opacity-50 p-6 rounded-md"
    >
      <input
        className="bg-gray-800 text-gray-500 placeholder-gray-500 rounded-md p-2 mb-4 w-full"
        type="text"
        placeholder="Enter event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <div className="mb-4">
        <label className="text-gray-500">Date :</label>
        <input
          className="bg-gray-800 text-gray-500 placeholder-gray-500 rounded-md p-2 w-full"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-500">Start Time :</label>
        <input
          className="bg-gray-800 text-gray-500 placeholder-gray-500 rounded-md p-2 w-full"
          type="time"
          value={eventStartTime}
          onChange={(e) => setEventStartTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-500">End Time:</label>
        <input
          className="bg-gray-800 text-gray-500 placeholder-gray-500 rounded-md p-2 w-full"
          type="time"
          value={eventEndTime}
          onChange={(e) => setEventEndTime(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
      >
        {buttonText}
      </button>
      <button
        type="button"
        className="bg-gray-900 hover:bg-gray-800 text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );