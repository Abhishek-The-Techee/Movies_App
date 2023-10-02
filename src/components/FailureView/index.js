import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onClickTryAgain = () => {
    onRetry()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dnebrhaqh/image/upload/v1695617715/Background-Complete_x355vo.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-desc">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={onClickTryAgain}>
        Try Again
      </button>
    </div>
  )
}
export default FailureView
