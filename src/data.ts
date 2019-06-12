export interface iSeat {
    id: string,
    row: string,
    column: number,
    status: string
}

export interface iVenue {
    rows: number,
    columns: number
}

export interface iVenueWithSeats {
    venue: {
        layout: iVenue
    },
    seats?: {
        [key: string]: iSeat
    }
}

const data: iVenueWithSeats = {
  "venue": {
      "layout": {
          "rows": 10,
          "columns": 50
      }
  },
  "seats": {
      "a1": {
          "id": "a1",
          "row": "a",
          "column": 1,
          "status": "AVAILABLE"
      },
      "b5": {
          "id": "b5",
          "row": "b",
          "column": 5,
          "status": "AVAILABLE"
      },
      "h7": {
          "id": "h7",
          "row": "h",
          "column": 7,
          "status": "AVAILABLE"
      }
  }
}

export default data