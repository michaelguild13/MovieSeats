export interface iSeat {
    id: string,
    row: string,
    column: number,
    status: string
}

export interface iVenueData {
    venue: {
        layout: {
            rows: number,
            columns: number
        }
    },
    seats?: {
        [key: string]: iSeat
    }
}

export default {
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