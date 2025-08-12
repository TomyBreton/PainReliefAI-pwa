import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { store, save, load } from './state'
import { generatePlan } from './ai'

function Header(){
  return (
    <div className="header">
      <h1 style={{margin:0}}>PainRelief AI</h1>
      <nav>
        <Link to="/">Plan</Link>
        <Link to="/exercises">Exercises</Link>
        <Link to="/education">Education</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/flare">Flare</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  )
}

function Onboarding(){
  const nav = useNavigate();
  return (
    <div className="container">
      <Header/>
      <div className="card">
        <h2>Welcome</h2>
        <p>Personalized, daily guidance to manage pain — physical, psychological, and lifestyle.</p>
        <button onClick={()=>nav('/consent')}>Get Started</button>
      </div>
    </div>
  )
}

function Consent(){
  const nav = useNavigate();
  return (
    <div className="container">
      <Header/>
      <div className="card" style={{maxHeight:300, overflow:'auto'}}>
        <h2>Consent & Privacy</h2>
        <p>Educational guidance only; not a substitute for professional medical advice. You can export/delete your data anytime.</p>
      </div>
      <button onClick={()=>nav('/checkin')}>Agree & Continue</button>
    </div>
  )
}

function Pill({label, value, current, set}:{label:string, value:string, current:string, set:(v:any)=>void}){
  const active = value===current;
  return <span onClick={()=>set(value)} className={"pill "+(active?'active':'')}>{label}</span>
}

function CheckIn(){
  const nav = useNavigate();
  const [pain,setPain] = React.useState(5);
  const [sleep,setSleep] = React.useState<'Poor'|'Fair'|'Good'>('Fair');
  const [mood,setMood] = React.useState<'Sad'|'Neutral'|'Happy'>('Neutral');
  const [activity,setActivity] = React.useState<'Low'|'Moderate'|'High'>('Moderate');

  return (
    <div className="container">
      <Header/>
      <h2>Daily Check-In</h2>
      <div className="card">
        <strong>Pain level: {pain}/10</strong>
        <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
          <button className="ghost" onClick={()=>setPain(Math.max(0,pain-1))}>-</button>
          <div style={{flex:1}}>
            <div style={{height:10, borderRadius:6, background:'#D1FAE5'}}></div>
            <div style={{height:10, borderRadius:6, background:'var(--primary)', width: (pain*10)+'%', marginTop:-10}}></div>
          </div>
          <button className="ghost" onClick={()=>setPain(Math.min(10,pain+1))}>+</button>
        </div>
      </div>
      <div className="card">
        <strong>Sleep Quality</strong><br/>
        {(['Poor','Fair','Good'] as const).map(x=>(
          <Pill key={x} label={x} value={x} current={sleep} set={setSleep} />
        ))}
      </div>
      <div className="card">
        <strong>Mood</strong><br/>
        {(['Sad','Neutral','Happy'] as const).map(x=>(
          <Pill key={x} label={x} value={x} current={mood} set={setMood} />
        ))}
      </div>
      <div className="card">
        <strong>Activity Level</strong><br/>
        {(['Low','Moderate','High'] as const).map(x=>(
          <Pill key={x} label={x} value={x} current={activity} set={setActivity} />
        ))}
      </div>
      <button onClick={()=>{
        store.checkIn = { pain, sleep, mood, activity };
        store.plan = generatePlan(store.checkIn);
        save();
        nav('/');
      }}>Generate My Plan</button>
    </div>
  )
}

function Plan(){
  load();
  const p = store.plan;
  const nav = useNavigate();
  return (
    <div className="container">
      <Header/>
      {!p ? (
        <div className="card">
          <p>No plan yet. <button onClick={()=>nav('/checkin')}>Do a check-in</button></p>
        </div>
      ) : (
        <>
          <div className="card">
            <h2>Exercises</h2>
            <ul>
              {p.exercises.map(e=> <li key={e.id}>{e.name} – {e.duration}</li>)}
            </ul>
            <button onClick={()=>nav('/exercises')}>View All Exercises</button>
          </div>
          <div className="card">
            <h2>Education</h2>
            <ul>{p.education.map(ed=> <li key={ed.id}>{ed.title}</li>)}</ul>
            <button onClick={()=>nav('/education')}>Open Education</button>
          </div>
          <div className="card">
            <h2>Self-Care</h2>
            <ul>{p.lifestyle.map((l,i)=> <li key={i}>{l}</li>)}</ul>
          </div>
          <div className="card"><em>{p.notes}</em></div>
        </>
      )}
    </div>
  )
}

function Exercises(){
  const nav = useNavigate();
  const data = [
    { id:'mobility', name:'Lumbar mobility flow', duration:'8 min' },
    { id:'core', name:'Core activation', duration:'6 min' },
  ];
  return (
    <div className="container">
      <Header/>
      {data.map(x=>(
        <div className="card" key={x.id}>
          <strong>{x.name}</strong><div>Duration: {x.duration}</div>
          <button onClick={()=>nav('/exercise/'+x.id)}>Start</button>
        </div>
      ))}
    </div>
  )
}

function ExerciseDetail(){
  const nav = useNavigate();
  return (
    <div className="container">
      <Header/>
      <h2>Guided Exercise</h2>
      <div className="card">Step 1: Gentle warm-up</div>
      <div className="card">Step 2: Main movement</div>
      <div className="card">Step 3: Cool down & breath</div>
      <button onClick={()=>nav('/exercises')}>Complete</button>
    </div>
  )
}

function Education(){
  return (
    <div className="container">
      <Header/>
      <div className="card"><strong>Pain science basics</strong><div>Short summary...</div></div>
      <div className="card"><strong>Pacing & flare-ups</strong><div>Short summary...</div></div>
    </div>
  )
}

function Progress(){
  return (
    <div className="container">
      <Header/>
      <div className="card"><strong>Pain Trend</strong><div>Chart placeholder</div></div>
      <div className="card"><strong>Adherence</strong><div>% placeholder</div></div>
    </div>
  )
}

function Flare(){
  const nav = useNavigate();
  return (
    <div className="container">
      <Header/>
      <h2>Flare-Up Assistance</h2>
      <p>Gentle plan: breathing, light mobility, pacing.</p>
      <button onClick={()=>nav('/exercise/breath')}>Start Relief Plan</button>
    </div>
  )
}

function Settings(){
  const nav = useNavigate();
  return (
    <div className="container">
      <Header/>
      <div className="card"><strong>Data Export</strong><div>PDF export coming in MVP.</div></div>
      <button className="ghost" onClick={()=>nav('/')}>Back to Plan</button>
    </div>
  )
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Plan/>} />
      <Route path="/onboarding" element={<Onboarding/>} />
      <Route path="/consent" element={<Consent/>} />
      <Route path="/checkin" element={<CheckIn/>} />
      <Route path="/exercises" element={<Exercises/>} />
      <Route path="/exercise/:id" element={<ExerciseDetail/>} />
      <Route path="/education" element={<Education/>} />
      <Route path="/progress" element={<Progress/>} />
      <Route path="/flare" element={<Flare/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="*" element={<Onboarding/>} />
    </Routes>
  )
}
