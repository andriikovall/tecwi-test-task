export interface AvailableDay {
  caption: string,
  selected: boolean,
  availableTime: Date[]
}


export interface AvailableTime {
  caption: string,
  date: Date,
  selected: boolean
}
