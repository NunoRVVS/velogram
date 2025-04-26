import React, { useState } from "react"
import Modal from "./Modal"
import { exerciseDescriptions } from "../utils"

export default function WorkouCard(props) {
  const {
    trainingPlan, workoutIndex, type, weekNum, icon, savedoptions,
    handleSave, handleComplete, isCompleted
  } = props

  const { warmup, workout, cooldown } = trainingPlan || {}
  const [showExerciseDescription, setShowExerciseDescription] = useState(null)
  const [options, setoptions] = useState(savedoptions || {})

  function handleAddOption(key, value) {
    const updated = { ...options, [key]: value }
    setoptions(updated)
  }

  const getKey = (section, name) => `${section}_${name}`

  const canComplete =
    warmup.every(exSession => options[getKey('warmup', exSession.name)] === 'yes') &&
    workout.every(exSession => options[getKey('workout', exSession.name)] === 'yes') &&
    cooldown.every(exSession => options[getKey('cooldown', exSession.name)] === 'yes')

  return (
    <div className="workout-container">
      {showExerciseDescription && (
        <Modal showExerciseDescription={showExerciseDescription}
          handleCloseModal={() => setShowExerciseDescription(null)} />
      )}

      <div className="workout-card card">
        <div className="plan-card-header">
          <p>Week {weekNum}</p>
          {icon}
        </div>
        <div className="plan-card-header">
          <h2><b>{type} workout</b></h2>
        </div>
      </div>

      {['warmup', 'workout', 'cooldown'].map((section, idxSession) => (
        <div className="workout-grid" key={idxSession}>
          <div className="exercise-name">
            <h4>{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
          </div>
          <h6>Duration</h6>
          <h6>Zone</h6>
          <h6 className="weight-input">Done</h6>
          {trainingPlan[section].map((exercise, i) => {
            const key = getKey(section, exercise.name)
            return (
              <React.Fragment key={i}>
                <div className="exercise-name">
                  <p>{exercise.name}</p>
                  <button onClick={() => {
                    setShowExerciseDescription({
                      name: exercise.name,
                      description: exerciseDescriptions[exercise.name]
                    })
                  }} className="help-icon">
                    <i className="fa-regular fa-circle-question" />
                  </button>
                </div>
                <p className="exercise-info">{exercise.duration} mins</p>
                <p className="exercise-info">{exercise.zone}</p>
                <select
                  disabled={isCompleted}
                  value={options[key] || ''}
                  onChange={(e) => handleAddOption(key, e.target.value)}
                  className="weight-input"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </React.Fragment>
            )
          })}
        </div>
      ))}

      <div className="workout-buttons">
        <button onClick={() => handleSave(workoutIndex, { options })} disabled={isCompleted}>
          Save & Exit
        </button>
        <button
          onClick={() => handleComplete(workoutIndex, { options })}
          disabled={!canComplete || isCompleted}
        >
          Complete
        </button>
      </div>
    </div>
  )
}
