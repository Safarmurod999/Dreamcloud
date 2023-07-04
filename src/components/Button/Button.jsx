import './Button.scss';

function Button({title,src}) {
  return (
    <button className='button'>{title}<img src={src} alt="image" /></button>
  )
}

export default Button