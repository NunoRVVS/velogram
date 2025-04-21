import React, { useState } from "react"
import Modal from "./Modal"
import { exerciseDescriptions } from "../utils"

export default function WorkouCard(props) {
  const{ trainingPlan, workoutIndex, type, weekNum, icon, savedoptions, 
    handleSave, handleComplete } = props
  //this will be a check step where even if the traning plan is not available, it will not break the app
  //this is why we are using optional chaining {}
  const { warmup, workout, cooldown } = trainingPlan || {}

  const [showExerciseDescription, setShowExerciseDescription]= useState(null)
  // this was commented out because we used useState instead 
  // const showExerciseDescription = { name: 'aadd', description: 'aaasdvdsdd' }
  const [options, setoptions] = useState(savedoptions || {})

  function handleAddWeight(title, weight) {
    // console.log(title, weight)
    const newObj = {
      ...options,
      [title]: weight
    }
    setoptions(newObj)
  }

  return (
    <div className="workout-container">
      {/* the modal will be here and it will be a pop up */}
      {showExerciseDescription && (
        <Modal showExerciseDescription={showExerciseDescription} 
        handleCloseModal={() => {
          setShowExerciseDescription(null)
        }} />)}
      <div className="workout-card card">
        <div className="plan-card-header">
          <p>Week {weekNum}</p>
          {icon}
        </div>
        <div className="plan-card-header">
          <h2><b>{type} workout</b></h2>
        </div>
      </div>

      <div className="workout-grid">
        <div className="exercise-name">
          <h4>Warmup</h4>
        </div>
        <h6>Duration</h6>
        <h6>Zone</h6>
        <h6 className="weight-input">Done</h6>
        {warmup.map((warmupExercise, warmupIndex) => {
          return (
            <React.Fragment key={warmupIndex}>
              <div className="exercise-name">
                <p>{warmupIndex + 1}. {warmupExercise.name}</p>
                <button onClick={() => {
                  setShowExerciseDescription({
                    name: warmupExercise.name,
                    description: exerciseDescriptions[warmupExercise.name]
                  })
                }} className="help-icon">
                  <i className="fa-regular fa-circle-question" />
                </button>
              </div>
              <p className="exercise-info">{warmupExercise.duration} mins</p>
              <p className="exercise-info">{warmupExercise.zone}</p>
              <select value={options[warmupExercise.name] || ''} 
              onChange={(e) => {
                handleAddWeight(warmupExercise.name, e.target.value)
              }} className="weight-input">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </React.Fragment>
          )
        })}
      </div>
      
      <div className="workout-grid">
        <div className="exercise-name">
          <h4>Workout</h4>
        </div>
        <h6>Duration</h6>
        <h6>Zone</h6>
        <h6 className="weight-input">Done</h6>
        {workout.map((workoutExercise, wIndex) => {
          return (
            <React.Fragment key={wIndex}>
              <div className="exercise-name">
                <p>{wIndex + 1}. {workoutExercise.name}</p>
                <button onClick={() => {
                  setShowExerciseDescription({
                    name: workoutExercise.name,
                    description: exerciseDescriptions[workoutExercise.name]
                  })
                }} className="help-icon">
                  <i className="fa-regular fa-circle-question" />
                </button>
              </div>
              <p className="exercise-info">{workoutExercise.duration} mins</p>
              <p className="exercise-info">{workoutExercise.zone}</p>
              <select value={options[workoutExercise.name] || ''} 
              onChange={(e) => {
                handleAddWeight(workoutExercise.name, e.target.value)
              }} className="weight-input">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </React.Fragment>
          )
        })}
      </div>

      <div className="workout-grid">
        <div className="exercise-name">
          <h4>Cooldown</h4>
        </div>
        <h6>Duration</h6>
        <h6>Zone</h6>
        <h6 className="weight-input">Done</h6>
        {cooldown.map((cooldownExercise, cooldownIndex) => {
          return (
            <React.Fragment key={cooldownIndex}>
              <div className="exercise-name">
                <p>{cooldownIndex + 1}. {cooldownExercise.name}</p>
                <button onClick={() => {
                  setShowExerciseDescription({
                    name: cooldownExercise.name,
                    description: exerciseDescriptions[cooldownExercise.name]
                  })
                }} className="help-icon">
                  <i className="fa-regular fa-circle-question" />
                </button>
              </div>
              <p className="exercise-info">{cooldownExercise.duration} mins</p>
              <p className="exercise-info">{cooldownExercise.zone}</p>
              <select value={options[cooldownExercise.name] || ''} 
              onChange={(e) => {
                handleAddWeight(cooldownExercise.name, e.target.value)
              }} className="weight-input">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </React.Fragment>
          )
        })}
      </div>

      <div className="workout-buttons">
        <button onClick={() => {
          //workoutIndex is not the same as the wIndex in the workout map.
          //this will show the day that we are on
          handleSave(workoutIndex, { options })
        }}>Save & Exit</button>
        <button onClick={() => {
          handleComplete(workoutIndex, { options })
        }} disabled={
            warmup.some(ex => options[ex.name] !== 'yes') ||
            workout.some(ex => options[ex.name] !== 'yes') ||
            cooldown.some(ex => options[ex.name] !== 'yes')}>Complete</button>
      </div>
    </div>
  )
}
