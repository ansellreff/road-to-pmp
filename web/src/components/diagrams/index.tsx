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

// One plot area for both charts: days 0 to 10 across, a count up the side.
const LEFT = 70
const BOTTOM = 290
const dayX = (day: number) => LEFT + day * 61

function Axes({ top, step, scale, yTitle }: { top: number; step: number; scale: number; yTitle: string }) {
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
      <Label x={(LEFT + dayX(10)) / 2} y={BOTTOM + 40} text="Day of the iteration" size={12} />
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

export const diagrams: Record<string, ComponentType> = {
  'context-diagram': ContextDiagram,
  'process-flow': ProcessFlow,
  'entity-relationship-diagram': EntityRelationshipDiagram,
  'state-diagram': StateDiagram,
  fishbone: Fishbone,
  'burndown-chart': BurndownChart,
  'cumulative-flow-diagram': CumulativeFlowDiagram,
}
