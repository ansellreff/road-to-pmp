import type { ComponentType } from 'react'
import { Axes, BOTTOM, dayX } from './index'
import { Arrow, Box, critical, Frame, ink, Label, line, milestone, muted, plan, planSoft, surface } from './parts'

// Drawings made for hot spot questions. Unlike the lesson drawings they carry no note
// that gives an answer away: the learner reads the answer from the picture. Each is an
// original example. The areas a question can ask for are listed in hotspots.ts.

/** A table: the first column is text, the others are centred. Rows are 44 high from y = 56. */
function Table({ columns, widths, rows }: { columns: string[]; widths: number[]; rows: string[][] }) {
  const lefts = widths.map((_, i) => 20 + widths.slice(0, i).reduce((sum, w) => sum + w, 0))
  const cell = (text: string, column: number, y: number, bold: boolean) =>
    column === 0 ? (
      <Label key={column} x={lefts[0] + 12} y={y} text={text} anchor="start" bold={bold} />
    ) : (
      <Label key={column} x={lefts[column] + widths[column] / 2} y={y} text={text} bold={bold} />
    )
  return (
    <>
      <rect x="20" y="16" width="680" height="40" fill={planSoft} />
      <rect x="20" y="16" width="680" height={40 + rows.length * 44} fill="none" stroke={ink} strokeWidth="1.5" />
      {columns.map((name, i) => cell(name, i, 36, true))}
      {rows.map((row, r) => (
        <g key={r}>
          <line x1="20" y1={56 + r * 44} x2="700" y2={56 + r * 44} stroke={r ? line : ink} strokeWidth={r ? 1 : 1.5} />
          {row.map((text, i) => cell(text, i, 78 + r * 44, false))}
        </g>
      ))}
    </>
  )
}

function ProcessGroupsFigure() {
  return (
    <Frame
      width={720}
      height={250}
      description="The five process groups. Initiating leads to Planning, Planning to Executing, and Executing to Closing. Monitoring and Controlling sits under Planning and Executing and exchanges with both."
    >
      <Box x={20} y={40} w={140} h={60} text="Initiating" bold />
      <Box x={200} y={40} w={140} h={60} text="Planning" bold />
      <Box x={380} y={40} w={140} h={60} text="Executing" bold />
      <Box x={560} y={40} w={140} h={60} text="Closing" bold />
      <Box x={200} y={160} w={320} h={60} text="Monitoring and Controlling" bold />
      <Arrow points={[[160, 70], [200, 70]]} />
      <Arrow points={[[340, 70], [380, 70]]} />
      <Arrow points={[[520, 70], [560, 70]]} />
      <Arrow points={[[250, 100], [250, 160]]} />
      <Arrow points={[[290, 160], [290, 100]]} />
      <Arrow points={[[430, 100], [430, 160]]} />
      <Arrow points={[[470, 160], [470, 100]]} />
    </Frame>
  )
}

function PowerInterestFigure() {
  return (
    <Frame
      width={720}
      height={340}
      description="A grid with four boxes. Power runs up the side from low to high, and interest runs along the bottom from low to high."
    >
      <rect x="120" y="30" width="560" height="260" fill={surface} stroke={ink} strokeWidth="1.5" />
      <line x1="400" y1="30" x2="400" y2="290" stroke={ink} strokeWidth="1" />
      <line x1="120" y1="160" x2="680" y2="160" stroke={ink} strokeWidth="1" />
      <Label x={108} y={95} text="High" anchor="end" fill={muted} />
      <Label x={108} y={225} text="Low" anchor="end" fill={muted} />
      <Label x={260} y={308} text="Low" fill={muted} />
      <Label x={540} y={308} text="High" fill={muted} />
      <Label x={400} y={328} text="Interest in the project" bold />
      <text x="40" y="160" textAnchor="middle" fontWeight="700" transform="rotate(-90 40 160)">
        Power over the project
      </text>
    </Frame>
  )
}

function RaciFigure() {
  return (
    <Frame
      width={720}
      height={292}
      description="A RACI chart of five activities against four roles: analyst, developer, tester and project manager. Write the requirements: R, C, I, A. Build the booking page: C, R, I, A. Test the booking page: I, C, R, I. Train the clinic staff: A, I, R, A. Approve the release: R, I, C, A."
    >
      <Table
        columns={['Activity', 'Analyst', 'Developer', 'Tester', 'Project manager']}
        widths={[240, 100, 110, 100, 130]}
        rows={[
          ['Write the requirements', 'R', 'C', 'I', 'A'],
          ['Build the booking page', 'C', 'R', 'I', 'A'],
          ['Test the booking page', 'I', 'C', 'R', 'I'],
          ['Train the clinic staff', 'A', 'I', 'R', 'A'],
          ['Approve the release', 'R', 'I', 'C', 'A'],
        ]}
      />
    </Frame>
  )
}

function NetworkFigure() {
  const nodes: [string, number, number, number][] = [
    ['A', 3, 50, 40],
    ['B', 5, 50, 200],
    ['C', 4, 240, 40],
    ['D', 6, 240, 200],
    ['E', 5, 430, 40],
    ['F', 2, 430, 200],
    ['G', 3, 590, 120],
  ]
  return (
    <Frame
      width={720}
      height={290}
      description="Network diagram of seven activities. A, 3 days, and B, 5 days, start the project. C, 4 days, follows A. D, 6 days, follows both A and B. E, 5 days, follows C. F, 2 days, follows D. G, 3 days, follows both E and F and ends the project."
    >
      <Arrow points={[[160, 55], [240, 55]]} />
      <Arrow points={[[160, 76], [200, 76], [200, 214], [240, 214]]} />
      <Arrow points={[[160, 236], [240, 236]]} />
      <Arrow points={[[350, 65], [430, 65]]} />
      <Arrow points={[[350, 225], [430, 225]]} />
      <Arrow points={[[540, 65], [565, 65], [565, 135], [590, 135]]} />
      <Arrow points={[[540, 225], [565, 225], [565, 155], [590, 155]]} />
      {nodes.map(([id, days, x, y]) => (
        <Box key={id} x={x} y={y} w={110} h={50} text={[id, `${days} days`]} />
      ))}
    </Frame>
  )
}

function EarnedValueFigure() {
  return (
    <Frame
      width={720}
      height={248}
      description="A table of four work packages with planned value, earned value and actual cost in thousands of dollars. Foundations: 20, 20, 18. Walls: 30, 24, 24. Roof: 10, 12, 15. Wiring: 16, 12, 14."
    >
      <Table
        columns={['Work package', 'Planned value', 'Earned value', 'Actual cost']}
        widths={[230, 150, 150, 150]}
        rows={[
          ['Foundations', '$20,000', '$20,000', '$18,000'],
          ['Walls', '$30,000', '$24,000', '$24,000'],
          ['Roof', '$10,000', '$12,000', '$15,000'],
          ['Wiring', '$16,000', '$12,000', '$14,000'],
        ]}
      />
    </Frame>
  )
}

function ControlFigure() {
  const samples = [101, 98.5, 102, 107.5, 99, 101.5, 100.5, 98, 97, 99, 96.5, 98.5, 97.5, 99, 101.5]
  const x = (n: number) => 80 + n * 42
  const y = (value: number) => 160 - (value - 100) * 14
  const rule = (value: number, stroke: string, dash?: string) => <line x1="60" y1={y(value)} x2="700" y2={y(value)} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
  return (
    <Frame
      width={720}
      height={330}
      description="Control chart of fifteen samples of a part that should weigh 100 grams. The mean is 100, the control limits are 94 and 106, and the tolerance limits are 91 and 109. Sample 4 is 107.5. Samples 8 to 14 are all between 96.5 and 99. Every other sample is between 98 and 102."
    >
      {rule(109, critical, '2 5')}
      {rule(106, milestone, '7 5')}
      {rule(100, ink)}
      {rule(94, milestone, '7 5')}
      {rule(91, critical, '2 5')}
      <Label x={64} y={y(109) - 9} text="Upper tolerance" anchor="start" size={12} fill={muted} />
      <Label x={64} y={y(106) - 9} text="Upper control limit" anchor="start" size={12} fill={muted} />
      <Label x={64} y={y(100) + 11} text="Mean" anchor="start" size={12} fill={muted} />
      <Label x={64} y={y(94) + 11} text="Lower control limit" anchor="start" size={12} fill={muted} />
      <Label x={64} y={y(91) - 9} text="Lower tolerance" anchor="start" size={12} fill={muted} />
      <polyline points={samples.map((value, n) => `${x(n)},${y(value)}`).join(' ')} fill="none" stroke={plan} strokeWidth="2" />
      {samples.map((value, n) => (
        <g key={n}>
          <circle cx={x(n)} cy={y(value)} r="3.5" fill={plan} />
          <Label x={x(n)} y={306} text={String(n + 1)} size={12} fill={muted} />
        </g>
      ))}
      <Label x={374} y={322} text="Sample" size={12} />
    </Frame>
  )
}

function BoardFigure() {
  const columns: [string, string, number][] = [
    ['To do', 'No limit', 6],
    ['Analysis', 'Limit 3', 2],
    ['Development', 'Limit 4', 4],
    ['Test', 'Limit 2', 4],
    ['Done', 'No limit', 5],
  ]
  return (
    <Frame
      width={720}
      height={330}
      description="A kanban board with five columns. To do has no limit and holds 6 cards. Analysis has a limit of 3 and holds 2. Development has a limit of 4 and holds 4. Test has a limit of 2 and holds 4. Done has no limit and holds 5."
    >
      {columns.map(([name, limit, cards], i) => {
        const left = 20 + i * 138
        return (
          <g key={name}>
            <rect x={left} y="20" width="128" height="290" rx="4" fill={surface} stroke={ink} strokeWidth="1.5" />
            <line x1={left} y1="72" x2={left + 128} y2="72" stroke={ink} strokeWidth="1" />
            <Label x={left + 64} y={38} text={name} bold />
            <Label x={left + 64} y={57} text={limit} size={12} fill={muted} />
            {Array.from({ length: cards }, (_, card) => (
              <rect key={card} x={left + 14} y={84 + card * 36} width="100" height="26" rx="3" fill={planSoft} stroke={plan} strokeWidth="1.5" />
            ))}
          </g>
        )
      })}
    </Frame>
  )
}

function BurndownFigure() {
  const actual = [50, 47, 44, 41, 41, 33, 27, 31, 20, 11, 4]
  const y = (points: number) => BOTTOM - points * 5
  return (
    <Frame
      width={720}
      height={345}
      description="Burndown chart of a 10-day iteration that starts with 50 story points. The ideal line falls evenly to 0. Points remaining at the end of each day: 47, 44, 41, 41, 33, 27, 31, 20, 11 and 4."
    >
      <Axes top={50} step={10} scale={5} yTitle="Story points remaining" />
      <line x1={dayX(0)} y1={y(50)} x2={dayX(10)} y2={y(0)} stroke={muted} strokeWidth="2" strokeDasharray="6 5" />
      <polyline points={actual.map((p, d) => `${dayX(d)},${y(p)}`).join(' ')} fill="none" stroke={plan} strokeWidth="2.5" />
      {actual.map((p, d) => (
        <circle key={d} cx={dayX(d)} cy={y(p)} r="3.5" fill={plan} />
      ))}
      <line x1="150" y1="20" x2="185" y2="20" stroke={muted} strokeWidth="2" strokeDasharray="6 5" />
      <Label x={193} y={20} text="Ideal" anchor="start" size={12} />
      <line x1="260" y1="20" x2="295" y2="20" stroke={plan} strokeWidth="2.5" />
      <Label x={303} y={20} text="Actual" anchor="start" size={12} />
    </Frame>
  )
}

function TraceFigure() {
  return (
    <Frame
      width={720}
      height={248}
      description="A requirements traceability matrix with four rows. R1 Book online: objective cut phone calls, design D-01, test T-01 passed. R2 Send reminders: objective fewer missed visits, design D-02, no test. R3 Export to a spreadsheet: no objective, design D-03, test T-03 passed. R4 Pay a deposit: objective fewer missed visits, design D-04, test T-04 passed."
    >
      <Table
        columns={['Requirement', 'Business objective', 'Design', 'Test']}
        widths={[230, 190, 100, 160]}
        rows={[
          ['R1 Book online', 'Cut phone calls', 'D-01', 'T-01 passed'],
          ['R2 Send reminders', 'Fewer missed visits', 'D-02', 'None'],
          ['R3 Export to a spreadsheet', 'None', 'D-03', 'T-03 passed'],
          ['R4 Pay a deposit', 'Fewer missed visits', 'D-04', 'T-04 passed'],
        ]}
      />
    </Frame>
  )
}

export const figures: Record<string, ComponentType> = {
  'process-groups-figure': ProcessGroupsFigure,
  'power-interest-figure': PowerInterestFigure,
  'raci-figure': RaciFigure,
  'network-figure': NetworkFigure,
  'earned-value-figure': EarnedValueFigure,
  'control-figure': ControlFigure,
  'board-figure': BoardFigure,
  'burndown-figure': BurndownFigure,
  'trace-figure': TraceFigure,
}
