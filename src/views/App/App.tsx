import "./App.scss"
import dayjs, { Dayjs } from "dayjs"
import { useParams } from "react-router-dom"
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { IoCloseCircleOutline } from 'react-icons/io5'
import React, { useEffect, useState } from "react"
import { ReactComponent as ArrowRight } from "../../assets/angle-right.svg"
import { MdNavigateNext } from 'react-icons/md'
import { RiAccountPinCircleFill } from 'react-icons/ri'
  import { Link } from "react-router-dom"

export const AccountBlock : React.FC = () => {
  return <div
    style={{
      height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 28
    }}>
    <Link className="hard-paragraphe" style={{ color: 'gray' }}to={"/login?from="+window.location.pathname}>Login/Signin</Link>
    <RiAccountPinCircleFill style={{ width:56, height: 56 }} color="gray"/>
    </div>
}

export type ActionProps = {
  content: React.ReactNode,
  goToNextPhase: () => void
  label?: string;
  active: boolean;
}
export const Action : React.FC<ActionProps> = ({ active, content, goToNextPhase, label= "Prochaine étape" }) => {
  return <div className="hard-paragraphe"
    onClick={goToNextPhase}
  style={{
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
      borderRadius: 8,
      flexDirection: 'column',
    height: '100%',
      justifyContent: 'center',
      padding: '12px var(--column-gap)',
    background: active? "var(--blue-joy)": "lightgray" 
  }}>
    <span className="label" >{label}</span>
    <span className="hard-paragraphe" style={{ display:'flex', alignItems: 'center' }}>
      {content} <MdNavigateNext color="white" style={{ marginLeft: 8, height: 32, width: 32 }} />
    </span>
  </div>
}

export type ProgressButtonProps = {
  title: string;
  passed: boolean;
  onClick: () => void;
  current: boolean;
  active: boolean;
}
export const ProgressButton: React.FC<ProgressButtonProps> = ({ active, title, current, passed, onClick }) => {
  const iconStyle = {
    height: 24,
    width: 24,
    marginRight: 12
  }
  return <div className={(active ? "progress-button" : "") + " paragraphe"} onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px 8px 12px',
      cursor: 'pointer',
      borderRadius: 8,
        color: current ? "white" : "black",
        backgroundColor: current ? 'var(--blue-joy)' : undefined
    }}>
    {passed ?
      <BsFillCheckCircleFill style={iconStyle} color={current ? "white" : "var(--blue-joy)"} /> :
      <IoCloseCircleOutline style={iconStyle} color={current ? "white" : "lightgray"}/> }
      {title}
    </div>
}

export type ProgressProps = {
  progress: number;
  setProgress: (p: number) => void,
  current: number;
}
export const Progress: React.FC<ProgressProps> = ({ current, progress, setProgress }) => {
    return <div style={{
      height: "100%",
      display: 'flex',
      alignItems: 'center',
      gap: 'max(40px, var(--column-gap))',
      padding: '12px var(--column-gap)',
      marginLeft: 'calc(-1 * var(--column-gap))',
    }}>
      <ProgressButton active={progress>=0} current={current===0} onClick={()=>setProgress(0)} title="Destination" passed={progress >= 1}/>
      <ProgressButton active={progress>=1} current={current===1} onClick={()=>setProgress(1)} title="Activités" passed={progress >= 2}/>
      <ProgressButton active={progress>=2} current={current===2} onClick={()=>setProgress(2)} title="Transports" passed={progress >= 3}/>
    </div>
}

export type LocationBlockProps = {
  location: string;
    change: (s: string) => void
}

const LocationBlock: React.FC<LocationBlockProps> = ({ location, change }) => {
  return <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      justifyContent: "center",
      padding: "12px var(--column-gap)",
      borderRadius: 8,
      cursor: "pointer",
    border: "2px solid lightgray"
  }}>
    <span className="label">
      Destination
    </span>
    <span className="hard-paragraphe">
      {location}
    </span>
  </div>
}

export type DateBlockProps = {
    start: Dayjs
    end: Dayjs
    change: (s: Dayjs, e: Dayjs) => void
}

const DateBlock: React.FC<DateBlockProps> = ({ start, end, change }) => {
    return (
        <div
            className="date-block"
            style={{
                height: "100%",
                padding: "4px 12px",
                background: "white",
                border: "2px solid lightgray",
                borderRadius: 8,
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gridTemplateRows: "1fr",
                alignItems: "center",
                position: "relative",
                overflow: "visible",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    justifyContent: "center",
                    padding: "8px calc(var(--column-gap) - 8px)",
                    borderRadius: 5,
                    cursor: "pointer",
                }}
            >
                <span className="label" style={{ color: "#808080" }}>
                    Départ
                </span>
                <span className="hard-paragraphe">{start.format("DD/MM/YYYY")}</span>
            </div>
            <ArrowRight style={{ color: "#808080", width: 40, height: 40, margin: "0 12px" }} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    justifyContent: "center",
                    padding: "8px calc(var(--column-gap) - 8px)",
                    borderRadius: 5,
                    cursor: "pointer",
                }}
            >
                <span className="label" style={{ color: "#808080" }}>
                    Arrivée
                </span>
                <span className="hard-paragraphe">{end.format("DD/MM/YYYY")}</span>
            </div>
        </div>
    )
}
export type HeaderProps = {
    start: Dayjs
    end: Dayjs
    changeDates: (s: Dayjs, e: Dayjs) => void
  location: string;
  changeLocation: (s:string)=> void
  progress: number;
  changePhase: (p: number) => void;
  next: () => void;
  actionContent:{
    label: string;
    content: React.ReactNode
  },
  phase: number;
  canProgress: boolean;
}
const Header: React.FC<HeaderProps> = ({
  progress,
  changePhase,
  start,
  end,
  changeDates,
  location,
  changeLocation,
  next,
  actionContent,
  phase,
  canProgress
}) => {
    const common = { height: 88 }
    return (
        <header
            style={{
                width: "100vw",
                height: "calc(2 * var(--row) + var(--row-gap))",
                display: "grid",
                padding: "0 var(--column-margin)",
                gridTemplateColumns: "repeat(12, 1fr)",
                columnGap: "var(--column-gap)",
                gridTemplateRows: "repeat(2,var(--row))",
                rowGap: "var(--row-gap)",
                alignItems: "center",
                boxShadow: "0px 2px 12px rgb(0,0,0,.15)",
            }}
        >
          <div style={{ gridColumn: "1/8", marginTop: 20, ...common, }}>
                <Progress setProgress={changePhase} current={phase} progress={progress} />
            </div>
            <div style={{ gridColumn: "8/13", marginTop: 20, ...common }}>
              <AccountBlock />
            </div>
          <div style={{ gridColumn: "1/6", marginBottom: 20, ...common, }}>
              <LocationBlock change={changeLocation} location={location}/>
            </div>
            <div style={{ gridColumn: "6/11", marginBottom: 20, ...common, }}>
                <DateBlock start={start} end={end} change={changeDates} />
            </div>
            <div style={{ gridColumn: "11/13", marginBottom: 20, ...common }}>
              <Action {...actionContent} goToNextPhase={next} active={canProgress}/>
            </div>
        </header>
    )
}

const PhaseContent = [
  {
    label: "",
    content: "Confirmer"
  },
  {
    label: "Prochaine étape",
    content: "Activités"
  },
  {
    label: "Prochaine étape",
    content: "Transports"
  },
  {
    label: "Dernière étape",
    content: "Résumé"
  }
]
export type Selection = {
  activities: Set<string>
  transports: Set<string>
}
export type AppParams = {
    session: string
}
const App: React.FC = () => {
    const { session } = useParams<AppParams>()
    const [phase, setPhase] = useState<number>(1)
    const [progress, setProgress] = useState<number>(1)
    const [location, setLocation] = useState<string>("Machu Picchu, Urubamba, Pérou")
    const [[startDate, endDate], setDates] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs().add(1, "week")])
    const [canProgress, setCP] = useState<boolean>(true)
  const [selection, setSelection] = useState<Selection>({activities:new Set(), transports:new Set()})
  useEffect(()=>{
    if(progress === 0){
      setCP(location && startDate && endDate? true : false)
    }else if(progress === 1){
      setCP(selection.activities.size !== 0)
    }else if(progress === 2){
      setCP(selection.transports.size !==0)
    }
  }, [selection,location, startDate, endDate])
  function addToSelection(itemId: string) {
    if(!phase || phase > 2) return
    setSelection(current=>{
      current[phase === 1 ? "activities" : "transports"].add(itemId)
      return current
    })
  }
  function removeFromSelection(itemId: string) {
    
    if(!phase || phase > 2) return
    setSelection(current=>{
      current[phase === 1 ? "activities" : "transports"].delete(itemId)
      return current
    })
  }
  function changePhase(p: number){
    if(p <= progress) setPhase(p)
  }
    function next(){
      if(!canProgress) return
      setPhase(progress + 1)
      setProgress(progress+1)
    }
    return (
        <main className="app" style={{ width: "100vw", height: "100vh" }} id={session}>
            <Header
              start={startDate}
              end={endDate}
              changeDates={(...d) => setDates(d)}
              changeLocation={setLocation}
              location={location}
              progress={progress}
              changePhase={changePhase}
              next={next}
              actionContent={PhaseContent[progress+1]}
              phase={phase}
              canProgress={canProgress}
          />
      {phase}
          <br/>
      {progress}
        </main>
    )
}

export default App
