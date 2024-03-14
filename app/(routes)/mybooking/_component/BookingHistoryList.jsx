import React from 'react'

const BookingHistoryList = ({ bookingHistory }) => {
    return (
        <div>
            {bookingHistory.map((booking, index) => (
                <div key={index}>
{booking.date}
                </div>
            ))}

        </div>
    )
}

export default BookingHistoryList