import React, { useEffect } from "react";
import { useMessageContext } from "../doctorContextsAndBookingContexts/MessageContext.jsx"; // Adjusted import to match the path

const Inbox = () => {
  const { state, getAllMessages, deleteMessage } = useMessageContext();
  const { messages, loading, error } = state;

  useEffect(() => {
    // Fetch all messages when component mounts
    getAllMessages();
  }, []); // Added getAllMessages to dependency array

  const handleDelete = (id) => {
    console.log("Deleting message with id:", id); // Log the id before deleting
    // Call delete function from context
    deleteMessage(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-transparent border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching messages: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages available.</p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className="bg-gray-800 border border-b-gray-300 border-1 text-white p-6 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-700"
          >
            <h3 className="text-xl font-semibold">{message.name}</h3>
            <p className="text-sm text-gray-400">{message.email}</p>
            <p className="mt-2 text-gray-300">{message.message}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(message._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {message.response && (
              <div className="mt-4 text-gray-300">
                <strong>Response:</strong> {message.response}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Inbox;
