import type { ComponentType } from 'react'
import { Arrow, Box, critical, done, doneSoft, Frame, ink, Label, line, milestone, milestoneSoft, muted, plan, planSoft, surface, Tag } from './parts'

// Drawings placed in lessons with a line "@diagram name". Each is an original
// example made for this course (a clinic's booking system, an online order),
// not a copy of a figure from the source books.

function ContextDiagram() {
  return (
    <Frame
      width={720}
      height={380}
      caption="Context diagram for a clinic's booking system. Everything that exchanges something directly with the solution is drawn around it, so the diagram shows what is in scope and what is outside it."
      description="Context diagram. The clinic booking system is in the middle. A patient sends a booking request and receives a confirmation. Clinic staff supply free times and receive a day list. A payment provider receives payment requests and returns payment results. A reminder service receives reminders to send."
    >
      <circle cx="360" cy="190" r="72" fill={planSoft} stroke={plan} strokeWidth="2" />
      <Label x={360} y={190} text={['Clinic booking', 'system']} bold />
      <Box x={30} y={160} w={140} h={60} text="Patient" />
      <Box x={550} y={160} w={140} h={60} text="Payment provider" />
      <Box x={290} y={20} w={140} h={50} text="Clinic staff" />
      <Box x={290} y={310} w={140} h={50} text="Reminder service" />

      <Arrow points={[[170, 178], [288, 178]]} />
      <Tag x={229} y={164} text="booking request" />
      <Arrow points={[[288, 204], [170, 204]]} />
      <Tag x={229} y={218} text="confirmation" />

      <Arrow points={[[432, 178], [550, 178]]} />
      <Tag x={491} y={164} text="payment request" />
      <Arrow points={[[550, 204], [432, 204]]} />
      <Tag x={491} y={218} text="payment result" />

      <Arrow points={[[346, 70], [346, 118]]} />
      <Tag x={302} y={94} text="free times" />
      <Arrow points={[[374, 118], [374, 70]]} />
      <Tag x={410} y={94} text="day list" />

      <Arrow points={[[360, 262], [360, 310]]} />
      <Tag x={428} y={286} text="reminders to send" />
    </Frame>
  )
}

function ProcessFlow() {
  const lanes = ['Patient', 'Booking system', 'Receptionist']
  return (
    <Frame
      width={720}
      height={320}
      caption="Process flow with swim lanes for booking an appointment. Each lane belongs to one actor, so the picture shows who does each step and where work passes from one to another."
      description="Swim lane process flow with three lanes: patient, booking system and receptionist. The patient chooses a time. The booking system checks whether the time is free. If not, the patient chooses again. If it is, the system holds the time, the patient pays the deposit, the system sends a confirmation, and the booking shows on the receptionist's day list."
    >
      <rect x="1" y="10" width="718" height="300" fill="none" stroke={ink} strokeWidth="1.5" />
      <line x1="110" y1="10" x2="110" y2="310" stroke={ink} strokeWidth="1.5" />
      {lanes.map((lane, i) => (
        <g key={lane}>
          {i > 0 && <line x1="1" y1={10 + i * 100} x2="719" y2={10 + i * 100} stroke={ink} strokeWidth="1" />}
          <Label x={56} y={60 + i * 100} text={lane.split(' ')} bold />
        </g>
      ))}

      <Box x={130} y={40} w={120} h={40} text="Choose a time" />
      <Arrow points={[[250, 60], [330, 60], [330, 128]]} />
      <polygon points="330,128 388,160 330,192 272,160" fill={planSoft} stroke={plan} strokeWidth="1.5" />
      <Label x={330} y={160} text="Time free?" />

      <Arrow points={[[272, 160], [190, 160], [190, 80]]} />
      <Tag x={232} y={160} text="No" />
      <Arrow points={[[388, 160], [425, 160]]} />
      <Label x={405} y={148} text="Yes" size={12} fill={muted} />

      <Box x={425} y={140} w={115} h={40} text="Hold the time" />
      <Arrow points={[[482, 140], [482, 80]]} />
      <Box x={425} y={40} w={115} h={40} text="Pay the deposit" />
      <Arrow points={[[540, 60], [630, 60], [630, 140]]} />
      <Box x={565} y={140} w={130} h={40} text="Send confirmation" />
      <Arrow points={[[630, 180], [630, 238]]} />
      <Box x={565} y={238} w={130} h={46} text={['Booking shows', 'on the day list']} />
    </Frame>
  )
}

function Entity({ x, y, name, fields }: { x: number; y: number; name: string; fields: string[] }) {
  return (
    <>
      <rect x={x} y={y} width="170" height="96" rx="4" fill={surface} stroke={ink} strokeWidth="1.5" />
      <path d={`M${x},${y + 28} h170 v-24 a4,4 0 0 0 -4,-4 h-162 a4,4 0 0 0 -4,4 z`} fill={planSoft} stroke={ink} strokeWidth="1.5" />
      <Label x={x + 85} y={y + 15} text={name} bold />
      {fields.map((field, i) => (
        <Label key={field} x={x + 12} y={y + 46 + i * 19} text={field} anchor="start" size={12} />
      ))}
    </>
  )
}

function EntityRelationshipDiagram() {
  const small = { size: 11, fill: muted }
  return (
    <Frame
      width={720}
      height={340}
      caption="Entity relationship diagram for the same clinic. The boxes are data objects, the lines are relationships, and the ends of each line show cardinality: one patient books many appointments, and an appointment has no payment or one."
      description="Entity relationship diagram with four data objects. One patient books many appointments. One clinician attends many appointments. One appointment is paid by no payment or one payment."
    >
      <Entity x={20} y={30} name="Patient" fields={['Patient number', 'Name', 'Phone']} />
      <Entity x={275} y={30} name="Appointment" fields={['Appointment number', 'Date and time', 'Status']} />
      <Entity x={530} y={30} name="Clinician" fields={['Staff number', 'Name', 'Specialty']} />
      <Entity x={275} y={224} name="Payment" fields={['Payment number', 'Amount', 'Paid on']} />

      {/* Patient to Appointment: one to many */}
      <line x1="190" y1="78" x2="275" y2="78" stroke={ink} strokeWidth="1.5" />
      <path d="M263,78 L275,69 M263,78 L275,87" stroke={ink} strokeWidth="1.5" fill="none" />
      <Label x={232} y={64} text="books" size={12} />
      <Label x={204} y={93} text="one" {...small} />
      <Label x={254} y={93} text="many" {...small} />

      {/* Clinician to Appointment: one to many */}
      <line x1="445" y1="78" x2="530" y2="78" stroke={ink} strokeWidth="1.5" />
      <path d="M457,78 L445,69 M457,78 L445,87" stroke={ink} strokeWidth="1.5" fill="none" />
      <Label x={488} y={64} text="attends" size={12} />
      <Label x={467} y={93} text="many" {...small} />
      <Label x={517} y={93} text="one" {...small} />

      {/* Appointment to Payment: one to none or one */}
      <line x1="360" y1="126" x2="360" y2="224" stroke={ink} strokeWidth="1.5" />
      <circle cx="360" cy="212" r="5" fill={surface} stroke={ink} strokeWidth="1.5" />
      <Label x={372} y={175} text="is paid by" size={12} anchor="start" />
      <Label x={372} y={140} text="one" anchor="start" {...small} />
      <Label x={372} y={211} text="none or one" anchor="start" {...small} />
    </Frame>
  )
}

function StateDiagram() {
  const state = (x: number, y: number, name: string, stroke = ink) => <Box x={x} y={y} w={110} h={44} round={20} text={name} stroke={stroke} bold />
  return (
    <Frame
      width={720}
      height={250}
      caption="State diagram for an online order. Each rounded box is a valid state, and each arrow is an allowed move with the event that causes it. A move with no arrow, such as Shipped back to Placed, is not allowed."
      description="State diagram of an order. It starts as placed. Payment received moves it to paid. Handing it to the carrier moves it to shipped. The customer signing moves it to delivered. A placed order can be cancelled by the customer, and a paid order can be cancelled and refunded. Delivered and cancelled are end states."
    >
      <circle cx="26" cy="92" r="7" fill={ink} />
      <Arrow points={[[33, 92], [60, 92]]} />
      {state(60, 70, 'Placed')}
      {state(235, 70, 'Paid')}
      {state(410, 70, 'Shipped')}
      {state(585, 70, 'Delivered', done)}
      {state(235, 184, 'Cancelled', critical)}

      <Arrow points={[[170, 92], [235, 92]]} />
      <Label x={202} y={42} text={['payment', 'received']} size={12} fill={muted} />
      <Arrow points={[[345, 92], [410, 92]]} />
      <Label x={377} y={42} text={['handed to', 'carrier']} size={12} fill={muted} />
      <Arrow points={[[520, 92], [585, 92]]} />
      <Label x={552} y={42} text={['customer', 'signs']} size={12} fill={muted} />

      <Arrow points={[[115, 114], [115, 206], [235, 206]]} />
      <Label x={124} y={224} text="customer cancels" size={12} fill={muted} anchor="start" />
      <Arrow points={[[290, 114], [290, 184]]} />
      <Label x={300} y={150} text="cancelled and refunded" size={12} fill={muted} anchor="start" />

      <Label x={410} y={206} text="Delivered and Cancelled are end states:" size={12} fill={muted} anchor="start" />
      <Label x={410} y={224} text="no arrow leaves them." size={12} fill={muted} anchor="start" />
    </Frame>
  )
}

function Fishbone() {
  const bones: { x: number; up: boolean; name: string; causes: [string, string] }[] = [
    { x: 150, up: true, name: 'People', causes: ['Few staff at 9 am', 'New staff not trained'] },
    { x: 350, up: true, name: 'Process', causes: ['Double bookings allowed', 'No reminder sent'] },
    { x: 150, up: false, name: 'Systems', causes: ['Two calendars not linked', 'Booking system is slow'] },
    { x: 350, up: false, name: 'Environment', causes: ['Small waiting room', 'One check-in desk'] },
  ]
  return (
    <Frame
      width={720}
      height={340}
      caption="Fishbone (cause-and-effect) diagram for a clinic where patients wait too long. The problem is the head, each bone is a category of causes, and the causes are written along the bones. It is a way to collect possible causes before finding the root cause."
      description="Fishbone diagram. The problem at the head is that patients wait over 30 minutes. Four bones group possible causes. People: few staff at 9 am, new staff not trained. Process: double bookings allowed, no reminder sent. Systems: booking system is slow, two calendars not linked. Environment: one check-in desk, small waiting room."
    >
      <Arrow points={[[40, 170], [560, 170]]} />
      <Box x={560} y={135} w={150} h={70} text={['Patients wait', 'over 30 minutes']} fill={planSoft} stroke={plan} bold />
      {bones.map(({ x, up, name, causes }) => {
        const far = up ? 50 : 290
        // Where the bone is at a given height, so each cause starts just to its right.
        const at = (y: number) => x + ((y - far) / (170 - far)) * 80
        return (
          <g key={name}>
            <Arrow points={[[x, far], [x + 80, 170]]} />
            <Label x={x} y={up ? 34 : 306} text={name} bold />
            {causes.map((cause, i) => {
              const y = up ? 82 + i * 40 : 258 - i * 40
              return <Label key={cause} x={at(y) + 10} y={y} text={cause} anchor="start" size={12} />
            })}
          </g>
        )
      })}
    </Frame>
  )
}

// One plot area for the charts: 0 to 10 across (days, weeks or iterations), a count up the side.
const LEFT = 70
const BOTTOM = 290
const dayX = (day: number) => LEFT + day * 61

function Axes({ top, step, scale, yTitle, xTitle = 'Day of the iteration' }: { top: number; step: number; scale: number; yTitle: string; xTitle?: string }) {
  const ticks = Array.from({ length: top / step + 1 }, (_, i) => i * step)
  return (
    <>
      {ticks.map((value) => (
        <g key={value}>
          <line x1={LEFT} y1={BOTTOM - value * scale} x2={dayX(10)} y2={BOTTOM - value * scale} stroke={line} strokeWidth="1" />
          <Label x={LEFT - 10} y={BOTTOM - value * scale} text={String(value)} anchor="end" size={12} fill={muted} />
        </g>
      ))}
      {Array.from({ length: 11 }, (_, day) => (
        <Label key={day} x={dayX(day)} y={BOTTOM + 16} text={String(day)} size={12} fill={muted} />
      ))}
      <line x1={LEFT} y1={BOTTOM} x2={dayX(10)} y2={BOTTOM} stroke={ink} strokeWidth="1.5" />
      <line x1={LEFT} y1={BOTTOM} x2={LEFT} y2={BOTTOM - top * scale} stroke={ink} strokeWidth="1.5" />
      <Label x={(LEFT + dayX(10)) / 2} y={BOTTOM + 40} text={xTitle} size={12} />
      <text x="18" y={BOTTOM - (top * scale) / 2} textAnchor="middle" fontSize="12" transform={`rotate(-90 18 ${BOTTOM - (top * scale) / 2})`}>
        {yTitle}
      </text>
    </>
  )
}

function BurndownChart() {
  // The lesson's example: 40 points over 10 days. Days 0, 5, 8 and 10 are the values in its table.
  const actual = [40, 38, 35, 33, 30, 26, 19, 12, 6, 3, 0]
  const y = (points: number) => BOTTOM - points * 6.5
  return (
    <Frame
      width={720}
      height={345}
      caption="Burndown chart for the iteration in the table above: 40 points over 10 days. On day 5 the actual line is above the ideal line, so the team is behind. By day 8 it is below, so the team is ahead."
      description="Burndown chart of story points remaining over a 10-day iteration. The ideal line falls evenly from 40 to 0. The actual line starts at 40, is at 26 on day 5 where the ideal is 20, at 6 on day 8 where the ideal is 8, and reaches 0 on day 10."
    >
      <Axes top={40} step={10} scale={6.5} yTitle="Story points remaining" />
      <line x1={dayX(0)} y1={y(40)} x2={dayX(10)} y2={y(0)} stroke={muted} strokeWidth="2" strokeDasharray="6 5" />
      <polyline points={actual.map((p, d) => `${dayX(d)},${y(p)}`).join(' ')} fill="none" stroke={plan} strokeWidth="2.5" />
      {actual.map((p, d) => (
        <circle key={d} cx={dayX(d)} cy={y(p)} r="3.5" fill={plan} />
      ))}

      <line x1={dayX(5)} y1={y(26)} x2={dayX(5)} y2={y(20)} stroke={critical} strokeWidth="2" />
      <Label x={dayX(5) + 12} y={y(26) - 22} text={['Day 5: 26 left, ideal 20.', 'Actual is above ideal: behind.']} anchor="start" size={12} />
      <line x1={dayX(8)} y1={y(6)} x2={dayX(8)} y2={y(8)} stroke={done} strokeWidth="2" />
      <Label x={dayX(8) + 12} y={y(8) - 34} text={['Day 8: 6 left, ideal 8.', 'Below ideal: ahead.']} anchor="start" size={12} />

      <line x1="470" y1="38" x2="505" y2="38" stroke={muted} strokeWidth="2" strokeDasharray="6 5" />
      <Label x={513} y={38} text="Ideal" anchor="start" size={12} />
      <line x1="580" y1="38" x2="615" y2="38" stroke={plan} strokeWidth="2.5" />
      <Label x={623} y={38} text="Actual" anchor="start" size={12} />
    </Frame>
  )
}

function CumulativeFlowDiagram() {
  // Items that have arrived, been started and been finished by the end of each day.
  const arrived = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
  const started = [2, 5, 8, 11, 14, 17, 19, 21, 23, 25, 27]
  const finished = [0, 1, 3, 5, 7, 8, 9, 10, 11, 12, 13]
  const zero = arrived.map(() => 0)
  const y = (count: number) => BOTTOM - count * 8
  const band = (lower: number[], upper: number[]) =>
    [...upper.map((c, d) => `${dayX(d)},${y(c)}`), ...lower.map((c, d) => `${dayX(d)},${y(c)}`).reverse()].join(' ')
  return (
    <Frame
      width={720}
      height={345}
      caption="Cumulative flow diagram. Each band is the number of items in one state. The In process band grows from 2 items to 14 while Done rises slowly: work is started faster than it is finished, which is a bottleneck. The height of a band on any day is the work in that state; here 13 items are in process on day 9."
      description="Cumulative flow diagram over 10 days with three stacked bands: done at the bottom, in process in the middle, to do on top. The in process band widens steadily from 2 items to 14, showing a bottleneck. On day 9, 13 items are in process."
    >
      <Axes top={30} step={10} scale={8} yTitle="Number of items" />
      <polygon points={band(started, arrived)} fill={milestoneSoft} stroke={milestone} strokeWidth="1.5" />
      <polygon points={band(finished, started)} fill={planSoft} stroke={plan} strokeWidth="1.5" />
      <polygon points={band(zero, finished)} fill={doneSoft} stroke={done} strokeWidth="1.5" />
      <Label x={dayX(1) + 12} y={y(8.5)} text="To do" bold />
      <Label x={dayX(6)} y={y(14)} text="In process" bold />
      <Label x={dayX(9) - 10} y={y(4)} text="Done" bold />

      <line x1={dayX(9)} y1={y(25)} x2={dayX(9)} y2={y(12)} stroke={ink} strokeWidth="2" />
      <line x1={dayX(9) - 6} y1={y(25)} x2={dayX(9) + 6} y2={y(25)} stroke={ink} strokeWidth="2" />
      <line x1={dayX(9) - 6} y1={y(12)} x2={dayX(9) + 6} y2={y(12)} stroke={ink} strokeWidth="2" />
      <Label x={dayX(9) - 12} y={y(18.5)} text={['13 in', 'process']} anchor="end" size={12} />
    </Frame>
  )
}

function NetworkDiagram() {
  // The lesson's six activities, with the dates from its forward and backward pass (the project starts on day 1).
  const nodes = [
    { id: 'A', days: 3, x: 20, y: 115, es: 1, ef: 3, ls: 1, lf: 3 },
    { id: 'B', days: 4, x: 190, y: 30, es: 4, ef: 7, ls: 9, lf: 12 },
    { id: 'D', days: 2, x: 370, y: 30, es: 8, ef: 9, ls: 13, lf: 14 },
    { id: 'C', days: 6, x: 190, y: 200, es: 4, ef: 9, ls: 4, lf: 9 },
    { id: 'E', days: 5, x: 370, y: 200, es: 10, ef: 14, ls: 10, lf: 14 },
    { id: 'F', days: 3, x: 570, y: 115, es: 15, ef: 17, ls: 15, lf: 17 },
  ]
  const W = 130
  const H = 84
  return (
    <Frame
      width={720}
      height={330}
      caption="Network diagram for the example in this lesson. Each box shows early start and early finish on top, late start and late finish below. The critical path A, C, E, F (17 days) is drawn in blue: its early and late dates are equal, so its float is zero. B and D can each slip 5 days."
      description="Network diagram of six activities. A, 3 days, leads to B, 4 days, and to C, 6 days. B leads to D, 2 days. C leads to E, 5 days. D and E both lead to F, 3 days. The critical path is A, C, E, F at 17 days, with zero float. B and D have 5 days of total float."
    >
      <Arrow points={[[150, 142], [170, 142], [170, 72], [190, 72]]} />
      <Arrow points={[[150, 172], [170, 172], [170, 242], [190, 242]]} stroke={plan} />
      <Arrow points={[[320, 72], [370, 72]]} />
      <Arrow points={[[320, 242], [370, 242]]} stroke={plan} />
      <Arrow points={[[500, 72], [535, 72], [535, 142], [570, 142]]} />
      <Arrow points={[[500, 242], [535, 242], [535, 172], [570, 172]]} stroke={plan} />
      {nodes.map((n) => {
        const critical = n.es === n.ls
        return (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width={W} height={H} rx="4" fill={critical ? planSoft : surface} stroke={critical ? plan : ink} strokeWidth={critical ? 2 : 1.5} />
            <line x1={n.x} y1={n.y + 24} x2={n.x + W} y2={n.y + 24} stroke={critical ? plan : ink} strokeWidth="1" />
            <line x1={n.x} y1={n.y + H - 24} x2={n.x + W} y2={n.y + H - 24} stroke={critical ? plan : ink} strokeWidth="1" />
            <Label x={n.x + 8} y={n.y + 12} text={`ES ${n.es}`} anchor="start" size={12} />
            <Label x={n.x + W - 8} y={n.y + 12} text={`EF ${n.ef}`} anchor="end" size={12} />
            <Label x={n.x + W / 2} y={n.y + H / 2} text={`${n.id}: ${n.days} days`} bold />
            <Label x={n.x + 8} y={n.y + H - 12} text={`LS ${n.ls}`} anchor="start" size={12} />
            <Label x={n.x + W - 8} y={n.y + H - 12} text={`LF ${n.lf}`} anchor="end" size={12} />
            {!critical && <Label x={n.x + W / 2} y={n.y + H + 14} text={`Float ${n.ls - n.es} days`} size={12} fill={muted} />}
          </g>
        )
      })}
      <Label x={635} y={222} text={['Project ends', 'on day 17']} size={12} fill={muted} />
    </Frame>
  )
}

function EarnedValueChart() {
  // The lesson's road: $100,000 over 10 weeks. At week 4, PV 40, EV 30, AC 36 (thousands).
  const y = (thousands: number) => BOTTOM - thousands * 2.4
  return (
    <Frame
      width={720}
      height={345}
      caption="Earned value chart for the road project at the end of week 4. The gap between earned value and planned value is the schedule variance (30 − 40 = −$10,000). The gap between earned value and actual cost is the cost variance (30 − 36 = −$6,000). Both are negative: behind schedule and over budget."
      description="Earned value chart over 10 weeks with a budget at completion of 100 thousand dollars. Planned value rises in a straight line to 100 thousand at week 10 and is 40 thousand at week 4. At week 4 earned value is 30 thousand and actual cost is 36 thousand. Schedule variance is minus 10 thousand and cost variance is minus 6 thousand."
    >
      <Axes top={100} step={20} scale={2.4} yTitle="Value ($ thousand)" xTitle="Week" />
      <line x1={dayX(0)} y1={y(0)} x2={dayX(10)} y2={y(100)} stroke={muted} strokeWidth="2" strokeDasharray="6 5" />
      <polyline points={`${dayX(0)},${y(0)} ${dayX(4)},${y(36)}`} fill="none" stroke={critical} strokeWidth="2.5" />
      <polyline points={`${dayX(0)},${y(0)} ${dayX(4)},${y(30)}`} fill="none" stroke={plan} strokeWidth="2.5" />
      <circle cx={dayX(4)} cy={y(40)} r="4" fill={muted} />
      <circle cx={dayX(4)} cy={y(36)} r="4" fill={critical} />
      <circle cx={dayX(4)} cy={y(30)} r="4" fill={plan} />
      <line x1={dayX(4)} y1={y(0)} x2={dayX(4)} y2={y(100)} stroke={line} strokeWidth="1" strokeDasharray="3 4" />

      <Label x={dayX(4) - 10} y={y(40) - 12} text="PV 40" anchor="end" size={12} />
      <Label x={dayX(4) + 12} y={y(36) + 2} text="AC 36" anchor="start" size={12} />
      <Label x={dayX(4) + 12} y={y(30) + 8} text="EV 30" anchor="start" size={12} />
      <Label x={dayX(5) + 40} y={y(16)} text={['SV = EV − PV = −10', 'CV = EV − AC = −6']} anchor="start" size={12} />
      <Label x={dayX(10) - 6} y={y(100) - 12} text="BAC 100" anchor="end" size={12} />

      <line x1="100" y1="38" x2="135" y2="38" stroke={muted} strokeWidth="2" strokeDasharray="6 5" />
      <Label x={143} y={38} text="Planned value" anchor="start" size={12} />
      <line x1="250" y1="38" x2="285" y2="38" stroke={plan} strokeWidth="2.5" />
      <Label x={293} y={38} text="Earned value" anchor="start" size={12} />
      <line x1="395" y1="38" x2="430" y2="38" stroke={critical} strokeWidth="2.5" />
      <Label x={438} y={38} text="Actual cost" anchor="start" size={12} />
    </Frame>
  )
}

function WbsTree() {
  const second = [
    { code: '1.1', name: ['Project', 'management'], x: 20, pack: true },
    { code: '1.2', name: ['Booking', 'website'], x: 200, pack: false },
    { code: '1.3', name: ['Staff', 'day list'], x: 380, pack: false },
    { code: '1.4', name: ['Training'], x: 560, pack: true },
  ]
  const third = [
    { code: '1.2.1', name: 'Booking pages', x: 215, y: 205 },
    { code: '1.2.2', name: 'Payment', x: 215, y: 250 },
    { code: '1.2.3', name: 'Reminders', x: 215, y: 295 },
    { code: '1.3.1', name: 'Day list screen', x: 395, y: 205 },
    { code: '1.3.2', name: 'Printing', x: 395, y: 250 },
  ]
  return (
    <Frame
      width={720}
      height={340}
      caption="A work breakdown structure for a clinic's booking system. Each level divides the one above into deliverables, and the numbers are the code of accounts. The shaded boxes are work packages: the lowest level of each branch. Project management is in the WBS too, because of the 100 percent rule."
      description="Work breakdown structure tree. Level 1: clinic booking system, code 1. Level 2: 1.1 project management, 1.2 booking website, 1.3 staff day list, 1.4 training. Under 1.2: work packages 1.2.1 booking pages, 1.2.2 payment, 1.2.3 reminders. Under 1.3: work packages 1.3.1 day list screen and 1.3.2 printing. 1.1 and 1.4 are work packages themselves."
    >
      <Box x={270} y={12} w={180} h={46} text="1 Clinic booking system" bold />
      <line x1="360" y1="58" x2="360" y2="80" stroke={ink} strokeWidth="1.5" />
      <line x1="90" y1="80" x2="630" y2="80" stroke={ink} strokeWidth="1.5" />
      {second.map((b) => (
        <g key={b.code}>
          <line x1={b.x + 70} y1="80" x2={b.x + 70} y2="100" stroke={ink} strokeWidth="1.5" />
          <Box x={b.x} y={100} w={140} h={64} text={[b.code, ...b.name]} fill={b.pack ? planSoft : surface} stroke={b.pack ? plan : ink} />
        </g>
      ))}
      {[200, 380].map((x) => (
        <line key={x} x1={x + 4} y1="164" x2={x + 4} y2={x === 200 ? 312 : 267} stroke={ink} strokeWidth="1.5" />
      ))}
      {third.map((b) => (
        <g key={b.code}>
          <line x1={b.x - 11} y1={b.y + 17} x2={b.x} y2={b.y + 17} stroke={ink} strokeWidth="1.5" />
          <Box x={b.x} y={b.y} w={150} h={34} text={`${b.code} ${b.name}`} fill={planSoft} stroke={plan} />
        </g>
      ))}
      <rect x="560" y="236" width="16" height="16" rx="3" fill={planSoft} stroke={plan} strokeWidth="1.5" />
      <Label x={584} y={244} text="Work package" anchor="start" size={12} />
    </Frame>
  )
}

function ControlChart() {
  // Twenty samples of a 50 mm part. Sample 5 is above the upper control limit; samples 12 to 18 are a run of seven above the mean.
  const samples = [49.6, 50.5, 49.2, 50.3, 53.6, 49.8, 50.9, 49.1, 50.2, 49.5, 49.9, 50.6, 51.2, 50.8, 51.5, 50.4, 51.1, 50.7, 49.4, 50.1]
  const x = (n: number) => 80 + n * 31
  const y = (mm: number) => 170 - (mm - 50) * 28
  const rule = (mm: number, stroke: string, dash?: string) => <line x1="70" y1={y(mm)} x2="690" y2={y(mm)} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
  return (
    <Frame
      width={720}
      height={345}
      caption="Control chart for a part that must be 50 mm thick. The control limits sit three standard deviations either side of the mean and come from the process; the tolerance comes from the requirement. Sample 5 is outside a control limit, and samples 12 to 18 are seven in a row above the mean. Both signal a process out of control, although every part is within tolerance."
      description="Control chart of twenty samples around a mean of 50 millimetres, with control limits at 47 and 53 and tolerance limits at 46 and 54.5. Sample 5 measures 53.6, above the upper control limit but within tolerance. Samples 12 to 18 are all above the mean, a run of seven."
    >
      {rule(54.5, critical, '2 5')}
      {rule(53, milestone, '7 5')}
      {rule(50, ink)}
      {rule(47, milestone, '7 5')}
      {rule(46, critical, '2 5')}
      <Label x={694} y={y(54.5) - 9} text="Upper tolerance" anchor="end" size={12} fill={muted} />
      <Label x={694} y={y(53) - 9} text="Upper control limit" anchor="end" size={12} fill={muted} />
      <Label x={694} y={y(50) + 11} text="Mean" anchor="end" size={12} fill={muted} />
      <Label x={694} y={y(47) - 9} text="Lower control limit" anchor="end" size={12} fill={muted} />
      <Label x={694} y={y(46) + 11} text="Lower tolerance" anchor="end" size={12} fill={muted} />
      <rect x={x(11) - 12} y={y(51.5) - 12} width={31 * 6 + 24} height={y(50.4) - y(51.5) + 24} rx="6" fill="none" stroke={plan} strokeWidth="1.5" strokeDasharray="4 4" />
      <Label x={x(14)} y={y(51.5) - 24} text="Run of seven above the mean" size={12} />
      <polyline points={samples.map((mm, n) => `${x(n)},${y(mm)}`).join(' ')} fill="none" stroke={plan} strokeWidth="2" />
      {samples.map((mm, n) => (
        <circle key={n} cx={x(n)} cy={y(mm)} r="3.5" fill={mm > 53 ? critical : plan} />
      ))}
      <Label x={x(4) + 10} y={y(53.6) - 4} text="Outside the control limit" anchor="start" size={12} />
      {[1, 5, 10, 15, 20].map((n) => (
        <Label key={n} x={x(n - 1)} y={318} text={String(n)} size={12} fill={muted} />
      ))}
      <Label x={380} y={336} text="Sample" size={12} />
    </Frame>
  )
}

function BurnupChart() {
  // The lesson's numbers: the scope line steps up from 120 to 135 points.
  const completed = [0, 14, 27, 41, 55, 68, 80, 93, 106, 120, 135]
  const y = (points: number) => BOTTOM - points * 1.6
  return (
    <Frame
      width={720}
      height={345}
      caption="Burnup chart for a release. The lower line is the work completed; the upper line is the total scope. After iteration 4 the scope line steps up from 120 to 135 points: scope was added. The gap between the two lines is the work left."
      description="Burnup chart over 10 iterations. Completed work rises steadily from 0 to 135 story points. The total scope line is level at 120 points until iteration 4, then steps up to 135. The two lines meet at iteration 10."
    >
      <Axes top={150} step={30} scale={1.6} yTitle="Story points" xTitle="Iteration" />
      <polyline points={`${dayX(0)},${y(120)} ${dayX(4)},${y(120)} ${dayX(4)},${y(135)} ${dayX(10)},${y(135)}`} fill="none" stroke={milestone} strokeWidth="2.5" />
      <polyline points={completed.map((p, i) => `${dayX(i)},${y(p)}`).join(' ')} fill="none" stroke={plan} strokeWidth="2.5" />
      {completed.map((p, i) => (
        <circle key={i} cx={dayX(i)} cy={y(p)} r="3.5" fill={plan} />
      ))}
      <Label x={dayX(4) + 10} y={y(135) - 14} text="Scope added: 120 to 135" anchor="start" size={12} />
      <line x1={dayX(6)} y1={y(80)} x2={dayX(6)} y2={y(135)} stroke={ink} strokeWidth="1.5" strokeDasharray="3 4" />
      <Label x={dayX(6) + 10} y={y(107)} text="55 points left" anchor="start" size={12} />
      <line x1="100" y1="38" x2="135" y2="38" stroke={milestone} strokeWidth="2.5" />
      <Label x={143} y={38} text="Total scope" anchor="start" size={12} />
      <line x1="240" y1="38" x2="275" y2="38" stroke={plan} strokeWidth="2.5" />
      <Label x={283} y={38} text="Completed" anchor="start" size={12} />
    </Frame>
  )
}

function UseCaseDiagram() {
  const cases = [
    { text: 'Book an appointment', y: 70 },
    { text: 'Cancel an appointment', y: 140 },
    { text: 'Pay a deposit', y: 210 },
    { text: 'View the day list', y: 280 },
  ]
  const actor = (x: number, y: number, name: string) => (
    <g>
      <circle cx={x} cy={y - 26} r="9" fill="none" stroke={ink} strokeWidth="1.5" />
      <line x1={x} y1={y - 17} x2={x} y2={y + 6} stroke={ink} strokeWidth="1.5" />
      <line x1={x - 14} y1={y - 8} x2={x + 14} y2={y - 8} stroke={ink} strokeWidth="1.5" />
      <line x1={x} y1={y + 6} x2={x - 11} y2={y + 22} stroke={ink} strokeWidth="1.5" />
      <line x1={x} y1={y + 6} x2={x + 11} y2={y + 22} stroke={ink} strokeWidth="1.5" />
      <Label x={x} y={y + 38} text={name} bold />
    </g>
  )
  const link = (x: number, y: number, to: number) => <line x1={x} y1={y} x2={x < 360 ? 262 : 458} y2={to} stroke={ink} strokeWidth="1.5" />
  return (
    <Frame
      width={720}
      height={340}
      caption="Use case diagram for the clinic's booking system. The box is the boundary of the solution. Each oval is a goal an actor reaches with the system, and a line joins an actor to the use cases it takes part in. Actors stand outside the box: they may be people or other systems."
      description="Use case diagram. Inside the system boundary are four use cases: book an appointment, cancel an appointment, pay a deposit, view the day list. The patient is linked to book, cancel and pay. The payment provider is linked to pay a deposit. The receptionist is linked to cancel an appointment and view the day list."
    >
      <rect x="215" y="20" width="290" height="305" rx="6" fill="none" stroke={ink} strokeWidth="1.5" />
      <Label x={360} y={36} text="Clinic booking system" size={12} fill={muted} />
      {link(84, 150, 70)}
      {link(84, 158, 140)}
      {link(84, 166, 210)}
      {link(636, 96, 140)}
      {link(636, 104, 280)}
      {link(636, 250, 210)}
      {cases.map((c) => (
        <g key={c.text}>
          <ellipse cx="360" cy={c.y} rx="98" ry="26" fill={planSoft} stroke={plan} strokeWidth="1.5" />
          <Label x={360} y={c.y} text={c.text} />
        </g>
      ))}
      {actor(60, 160, 'Patient')}
      {actor(660, 100, 'Receptionist')}
      {actor(660, 250, 'Payment provider')}
    </Frame>
  )
}

export const diagrams: Record<string, ComponentType> = {
  'context-diagram': ContextDiagram,
  'process-flow': ProcessFlow,
  'entity-relationship-diagram': EntityRelationshipDiagram,
  'state-diagram': StateDiagram,
  fishbone: Fishbone,
  'burndown-chart': BurndownChart,
  'cumulative-flow-diagram': CumulativeFlowDiagram,
  'network-diagram': NetworkDiagram,
  'earned-value-chart': EarnedValueChart,
  'wbs-tree': WbsTree,
  'control-chart': ControlChart,
  'burnup-chart': BurnupChart,
  'use-case-diagram': UseCaseDiagram,
}
