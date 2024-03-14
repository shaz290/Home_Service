const { gql, default: request } = require("graphql-request")

const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/' + process.env.NEXT_PUBLIC_MASTER_URL_KEY + '/master'



const getCategory = async () => {
  const query = gql`
    query Category {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
      `

  const result = await request(MASTER_URL, query)
  return result
}

const getAllBuisnessList = async () => {
  const query = gql`
  query BuisnessList {
    buisnessLists {
      address
      about
      contactPerson
      email
      id
      name
      images {
        url
      }
      category {
        name
      }
    }
  }
  `

  const result = await request(MASTER_URL, query)
  return result
}



const getBuisnessBycategory = async (category) => {
  const query = gql`
  query MyQuery {
    buisnessLists(where: {category: {name: "`+ category + `"}}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }
  `

  const result = await request(MASTER_URL, query)
  return result

}


const getBuisnessById = async (id) => {
  const query = gql`
  query GetBuisnessById {
    buisnessList(where: {id: "`+ id + `"}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const createNewBooking = async (buisnessId, date, time, userEmail, userName) => {
  const mutationQuery = gql`
  mutation CreateBooking {
    createBooking(
      data: {bookingStatus: Booked, bookings: {connect: {id: "`+ buisnessId + `"}}, date: "` + date + `", time: "` + time + `", userEmail: "` + userEmail + `", userName: "` + userName + `"}
    ) {
      id
    }

    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `

  const result = await request(MASTER_URL, mutationQuery)
  return result
}

// const getBuisnessBookedSlot = async (buisnessId, date) => {
//   const query = gql`
//   query BuisnessBookedSlot {
//     bookings(where: {bookings: {id: "`+ buisnessId + `"}, date: "` + date + `"}) {
//       date
//       time
//     }
//   }
//   `

const getBuisnessBookedSlot = async (buisnessId, date) => {
  const query = gql`
  query BuisnessBookedSlot {
    bookings(where: {date: "` + date + `", id: "`+ buisnessId + `"}) {
      date
      time
    }
  }
  `

  const result = await request(MASTER_URL, query)
  return result
}

const getuserBookingHistory = async (userEmail) => {
  const query = gql`
  query getUserBookingHistory {
    bookings(where: {userEmail: "`+userEmail+`"}) {
      id
      bookings {
        email
        id
        name
        address
        contactPerson
      }
      date
      time
    }
  }
  `
  const result = await request(MASTER_URL, query)
  return result

}

export default {
  getCategory,
  getAllBuisnessList,
  getBuisnessBycategory,
  getBuisnessById,
  createNewBooking,
  getBuisnessBookedSlot,
} 