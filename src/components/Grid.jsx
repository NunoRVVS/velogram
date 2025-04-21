import { useState, useEffect } from 'react'
import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid() {
  const [savedWorkouts, setSavedWorkouts] = useState(null)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [openPhases, setOpenPhases] = useState({ phase1: true, phase2: false })

  const completedWorkout = Object.keys(savedWorkouts || {}).filter((key) => {
    const entry = savedWorkouts[key]
    return entry.isComplete
  })

  useEffect(() => {
    if (!localStorage) return
    let savedData = {}
    if (localStorage.getItem('velogram')) {
      savedData = JSON.parse(localStorage.getItem('velogram'))
    }
    setSavedWorkouts(savedData)
  }, [])

  function handleSave(index, data) {
    const newObj = {
      ...savedWorkouts,
      [index]: {
        ...data,
        isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
      }
    }
    setSavedWorkouts(newObj)
    localStorage.setItem('velogram', JSON.stringify(newObj))
    setSelectedWorkout(null)
  }

  function handleComplete(index, data) {
    const newObj = { ...data }
    newObj.isComplete = true
    handleSave(index, newObj)
  }

  function togglePhase(phase) {
    setOpenPhases(prev => ({ ...prev, [phase]: !prev[phase] }))
  }

  const renderWorkoutCards = (start, end) => {
    return Object.keys(training_plan)
      .slice(start, end)
      .map((_, workoutIndexLocal) => {
        const workoutIndex = start + workoutIndexLocal
        const isLocked = workoutIndex === 0
          ? false
          : !completedWorkout.includes(`${workoutIndex - 1}`)

        const type = ['Tuesday', 'Thursday', 'Saturday'][workoutIndex % 3]
        const weekNum = Math.floor(workoutIndex / 3) + 1
        const icon = [
          <i className='fa-solid fa-dumbbell'></i>,
          <i className='fa-solid fa-weight-hanging'></i>,
          <i className='fa-solid fa-bolt'></i>
        ][workoutIndex % 3]
        const trainingPlan = training_plan[workoutIndex]

        if (workoutIndex === selectedWorkout) {
          return (
            <WorkoutCard
              savedWeights={savedWorkouts?.[workoutIndex]?.weights}
              handleSave={handleSave}
              handleComplete={handleComplete}
              key={workoutIndex}
              trainingPlan={trainingPlan}
              type={type}
              workoutIndex={workoutIndex}
              icon={icon}
              weekNum={weekNum}
            />
          )
        }

        return (
          <button
            onClick={() => {
              if (isLocked) return
              setSelectedWorkout(workoutIndex)
            }}
            className={'card plan-card ' + (isLocked ? 'inactive' : '')}
            key={workoutIndex}
          >
            <div className='plan-card-header'>
              <p>Week {weekNum}</p>
              {isLocked ? <i className='fa-solid fa-lock'></i> : icon}
            </div>
            <div className='plan-card-header'>
              <h4><b>{type}</b></h4>
            </div>
          </button>
        )
      })
  }

  return (
    <div>
      {/* Phase 1 */}
      <div className='phase-section'>
        <button className='phase-toggle' onClick={() => togglePhase('phase1')}>
          {openPhases.phase1 ? '▼' : '▶'} Phase 1
        </button>
        {openPhases.phase1 && (
          <div className='training-plan-grid'>
            {renderWorkoutCards(0, 24)}
          </div>
        )}
      </div>

      {/* Phase 2 */}
      <div className='phase-section'>
        <button className='phase-toggle' onClick={() => togglePhase('phase2')}>
          {openPhases.phase2 ? '▼' : '▶'} Phase 2
        </button>
        {openPhases.phase2 && (
          <div className='training-plan-grid'>
            {renderWorkoutCards(24, training_plan.length)}
          </div>
        )}
      </div>
    </div>
  )
}
