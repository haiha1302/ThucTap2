import '../../sass/buttonSubmit.scss'

const ButtonSubmit = (props) => {
  return (
    <button className="button-submit">{props.event}</button>
  )
}

export default ButtonSubmit