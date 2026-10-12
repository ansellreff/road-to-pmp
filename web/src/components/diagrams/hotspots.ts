// The areas of each drawing that a hot spot question can ask for.
// at: left, top, width and height, in the drawing's own units.
// A question lists some of these names as its options; only those are drawn as selectable.
// tools/check_content.py reads the names from this file.

export interface Spot {
  name: string
  at: [number, number, number, number]
}

export const hotspots: Record<string, Spot[]> = {
  'process-groups-figure': [
    { name: 'Initiating', at: [20, 40, 140, 60] },
    { name: 'Planning', at: [200, 40, 140, 60] },
    { name: 'Executing', at: [380, 40, 140, 60] },
    { name: 'Closing', at: [560, 40, 140, 60] },
    { name: 'Monitoring and Controlling', at: [200, 160, 320, 60] },
  ],
  'power-interest-figure': [
    { name: 'High power, low interest', at: [120, 30, 280, 130] },
    { name: 'High power, high interest', at: [400, 30, 280, 130] },
    { name: 'Low power, low interest', at: [120, 160, 280, 130] },
    { name: 'Low power, high interest', at: [400, 160, 280, 130] },
  ],
  'raci-figure': [
    { name: 'Write the requirements', at: [20, 56, 680, 44] },
    { name: 'Build the booking page', at: [20, 100, 680, 44] },
    { name: 'Test the booking page', at: [20, 144, 680, 44] },
    { name: 'Train the clinic staff', at: [20, 188, 680, 44] },
    { name: 'Approve the release', at: [20, 232, 680, 44] },
  ],
  'network-figure': [
    { name: 'Activity A', at: [50, 40, 110, 50] },
    { name: 'Activity B', at: [50, 200, 110, 50] },
    { name: 'Activity C', at: [240, 40, 110, 50] },
    { name: 'Activity D', at: [240, 200, 110, 50] },
    { name: 'Activity E', at: [430, 40, 110, 50] },
    { name: 'Activity F', at: [430, 200, 110, 50] },
    { name: 'Activity G', at: [590, 120, 110, 50] },
  ],
  'earned-value-figure': [
    { name: 'Foundations', at: [20, 56, 680, 44] },
    { name: 'Walls', at: [20, 100, 680, 44] },
    { name: 'Roof', at: [20, 144, 680, 44] },
    { name: 'Wiring', at: [20, 188, 680, 44] },
  ],
  'control-figure': [
    { name: 'Sample 2', at: [106, 165, 32, 32] },
    { name: 'Sample 4', at: [190, 39, 32, 32] },
    { name: 'Sample 6', at: [274, 123, 32, 32] },
    { name: 'Sample 11', at: [484, 193, 32, 32] },
    { name: 'Sample 15', at: [652, 123, 32, 32] },
    { name: 'Samples 1 to 3', at: [64, 116, 116, 81] },
    { name: 'Samples 5 to 7', at: [232, 123, 116, 67] },
    { name: 'Samples 8 to 14', at: [358, 158, 284, 67] },
  ],
  'board-figure': [
    { name: 'To do', at: [20, 20, 128, 290] },
    { name: 'Analysis', at: [158, 20, 128, 290] },
    { name: 'Development', at: [296, 20, 128, 290] },
    { name: 'Test', at: [434, 20, 128, 290] },
    { name: 'Done', at: [572, 20, 128, 290] },
  ],
  'burndown-figure': [
    { name: 'Day 2', at: [168, 44, 48, 252] },
    { name: 'Day 4', at: [290, 44, 48, 252] },
    { name: 'Day 5', at: [351, 44, 48, 252] },
    { name: 'Day 7', at: [473, 44, 48, 252] },
    { name: 'Day 9', at: [595, 44, 48, 252] },
    { name: 'Day 10', at: [656, 44, 48, 252] },
  ],
  'trace-figure': [
    { name: 'R1 Book online', at: [20, 56, 680, 44] },
    { name: 'R2 Send reminders', at: [20, 100, 680, 44] },
    { name: 'R3 Export to a spreadsheet', at: [20, 144, 680, 44] },
    { name: 'R4 Pay a deposit', at: [20, 188, 680, 44] },
  ],
  // Lesson drawings that give no answer away once their caption is hidden.
  'process-flow': [
    { name: 'Choose a time', at: [130, 40, 120, 40] },
    { name: 'Time free?', at: [272, 128, 116, 64] },
    { name: 'Hold the time', at: [425, 140, 115, 40] },
    { name: 'Pay the deposit', at: [425, 40, 115, 40] },
    { name: 'Send confirmation', at: [565, 140, 130, 40] },
    { name: 'Booking shows on the day list', at: [565, 238, 130, 46] },
  ],
  'state-diagram': [
    { name: 'Placed', at: [60, 70, 110, 44] },
    { name: 'Paid', at: [235, 70, 110, 44] },
    { name: 'Shipped', at: [410, 70, 110, 44] },
    { name: 'Delivered', at: [585, 70, 110, 44] },
    { name: 'Cancelled', at: [235, 184, 110, 44] },
  ],
  'use-case-diagram': [
    { name: 'Book an appointment', at: [262, 44, 196, 52] },
    { name: 'Cancel an appointment', at: [262, 114, 196, 52] },
    { name: 'Pay a deposit', at: [262, 184, 196, 52] },
    { name: 'View the day list', at: [262, 254, 196, 52] },
  ],
}
